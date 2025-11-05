// src/store/cartSlice.ts
import { Product } from '@/utils/types';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface CartProduct extends Product {
  originalPrice?: string;  // Store original price when coupon is applied
  couponCode?: string;     // Track which coupon is applied
  couponDiscountAmount?: string;
}

interface CartState {
  cart: CartProduct[];
  totalItems: number;
  totalQuantity: number;
  subtotal: number;
  total: number;
  discount: number;
  cartItems:any; // New field
}

const loadCartFromLocalStorage = (): CartProduct[] => {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const cartData = localStorage.getItem('cart');
    if (!cartData) return [];
    
    const parsedCart: unknown = JSON.parse(cartData);
    if (!Array.isArray(parsedCart)) {
      throw new Error('Invalid cart format');
    }
    return parsedCart as CartProduct[];
  } catch (e) {
    console.error('Error loading cart from localStorage:', e);
    return [];
  }
};

const getCartItems = (cart: CartProduct[]) => {
  return cart.map((item) => ({
    warehouse_stock_id: item.id,
    quantity: item.quantity || 1,
  }));
};

const calculateCartTotals = (cart: CartProduct[], currentDiscount: number = 0): Omit<CartState, 'cart' | 'discount'> => {
  const totalItems = cart.length;
  const totalQuantity = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  // @ts-expect-error type missing
  const subtotal = cart.reduce((sum, item) => sum + (parseFloat(item.price) * (item.quantity || 1)), 0);
  const total = Math.max(0, subtotal - currentDiscount);
  const cartItems = getCartItems(cart); 

  return {
    totalItems,
    totalQuantity,
    subtotal,
    total,
    cartItems 
  };
};

const initialCart = loadCartFromLocalStorage();
const initialState: CartState = {
  cart: initialCart,
  discount: 0,
  ...calculateCartTotals(initialCart, 0)
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const product = action.payload;
      const existingProduct = state.cart.find(
        (item) => item.id === product.id && item.color === product.color && item.size === product.size && item.fit === product.fit
      );
      
      if (existingProduct) {
        existingProduct.quantity = (existingProduct.quantity || 1) + 1;
      } else {
        state.cart.push({ ...product, quantity: 1 });
      }
      localStorage.setItem('cart', JSON.stringify(state.cart));
      Object.assign(state, calculateCartTotals(state.cart, state.discount));
    },
    removeFromCart: (state, action: PayloadAction<Product>) => {
      const product = action.payload;
      const index = state.cart.findIndex(
        (item) => item.id === product.id && item.color === product.color && item.size === product.size && item.fit === product.fit
      );
      
      if (index !== -1) {
        state.cart.splice(index, 1);
      }
      localStorage.setItem('cart', JSON.stringify(state.cart));
      Object.assign(state, calculateCartTotals(state.cart, state.discount));
    },
    increaseCount: (state, action: PayloadAction<Product>) => {
      const product = action.payload;
      const index = state.cart.findIndex(
        (item) => item.id === product.id && item.color === product.color && item.size === product.size && item.fit === product.fit
      );
      
      if (index !== -1) {
        state.cart[index].quantity = (state.cart[index].quantity || 1) + 1;
      } else {
        state.cart.push({ ...product, quantity: 1 });
      }
      localStorage.setItem('cart', JSON.stringify(state.cart));
      Object.assign(state, calculateCartTotals(state.cart, state.discount));
    },
    decreaseCount: (state, action: PayloadAction<Product>) => {
      const product = action.payload;
      const index = state.cart.findIndex(
        (item) => item.id === product.id && item.color === product.color && item.size === product.size && item.fit === product.fit
      );
      
      if (index !== -1) {
        if (state.cart[index].quantity > 1) {
          state.cart[index].quantity--;
        } else {
          state.cart.splice(index, 1);
        }
      }
      localStorage.setItem('cart', JSON.stringify(state.cart));
      Object.assign(state, calculateCartTotals(state.cart, state.discount));
    },
    updateProductAttributes: (
      state,
      action: PayloadAction<{
        product: Product;
        newColor: string;
        newSize: string;
        newCount: number;
      }>
    ) => {
      const { product, newColor, newSize, newCount } = action.payload;
      const currentProductIndex = state.cart.findIndex(
        (item) => item.id === product.id && item.color === product.color && item.size === product.size
      );

      const existingProductIndex = state.cart.findIndex(
        (item) => item.id === product.id && item.color === newColor && item.size === newSize
      );

      if (currentProductIndex !== -1) {
        if (newCount === 0) {
          state.cart.splice(currentProductIndex, 1);
        } else if (existingProductIndex !== -1 && existingProductIndex !== currentProductIndex) {
          state.cart[existingProductIndex].quantity += newCount;
          state.cart.splice(currentProductIndex, 1);
        } else {
          state.cart[currentProductIndex].color = newColor;
          state.cart[currentProductIndex].size = newSize;
          state.cart[currentProductIndex].quantity = newCount;
        }
      } else if (newCount > 0) {
        state.cart.push({ ...product, color: newColor, size: newSize, quantity: newCount });
      }

      localStorage.setItem('cart', JSON.stringify(state.cart));
      Object.assign(state, calculateCartTotals(state.cart, state.discount));
    },
    clearCart: (state) => {
      state.cart = [];
      state.discount = 0;
      localStorage.setItem('cart', JSON.stringify(state.cart));
      Object.assign(state, calculateCartTotals(state.cart, state.discount));
    },
applyDiscount: (state, action: PayloadAction<{ 
  couponData: any,
  couponCode: string 
}>) => {
  const { couponData, couponCode } = action.payload;
  // Add safety checks
  let totalDiscountAmount = 0;
  if(couponData?.level !== 'total'){
    if (!couponData || !couponData.applicants || !Array.isArray(couponData.applicants)) {
      return;
    }

    state.cart.forEach((item) => {
      const applicant = couponData.applicants.find(
        (app: any) => app.warehouse_stock_id === item.id
      );
      if (applicant) {
        if (!item.originalPrice) {
          // @ts-expect-error type missing
          item.originalPrice = item.price;
        }
        item.price = applicant.discounted_price;
        item.couponCode = couponCode;
        item.couponDiscountAmount = applicant.discount_amount;
      }
      if(applicant?.discounted_price){
          // @ts-expect-error type missing
          const itemDiscount = (parseFloat(item?.originalPrice) - parseFloat(applicant?.discounted_price)) * (item.quantity || 1);
          totalDiscountAmount += itemDiscount;
        }
    });
    state.discount = totalDiscountAmount;
    // @ts-expect-error type missing
    const newTotal = state.cart.reduce((sum, item) => sum + (parseFloat(item.price) * (item.quantity)), 0) ;

    state.total = Math.max(0, newTotal);
  }else{
    totalDiscountAmount = parseFloat(couponData.discount_value);
    state.discount = totalDiscountAmount;
    state.total = Math.max(0, couponData.new_total);
  }
},
    removeDiscount: (state) => {
      state.cart.forEach((item) => {
        if (item.originalPrice && item.couponCode) {
          //@ts-expect-error type missing
          item.price = item.originalPrice;
          delete item.originalPrice;
          delete item.couponCode;
          delete item.couponDiscountAmount;
        }
      });
      
      state.discount = 0;
      Object.assign(state, calculateCartTotals(state.cart, state.discount));
    }
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseCount,
  decreaseCount,
  updateProductAttributes,
  clearCart,
  applyDiscount,
  removeDiscount,
} = cartSlice.actions;

export default cartSlice.reducer;