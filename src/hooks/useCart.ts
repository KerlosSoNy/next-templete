import { RootState } from '@/utils/redux/store';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export const useCartTotal = () => {
  const [mounted, setMounted] = useState(false);
  const totalAmount = useSelector((state: RootState) => state?.cart?.total);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Always return a number, just return 0 until mounted
  return mounted ? totalAmount : 0;
};