'use client'
import axiosInstance from "@/utils/axios/axsionInstance";
import { useDebounce } from "@/utils/hooks/useDebounce";
import { RootState } from "@/utils/redux/store";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

export function useNavbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [showSearchResults, setShowSearchResults] = useState(false);


    const [, setIsMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const router = useRouter();
    const toggleDropdown = () => setIsOpen(!isOpen);
    const t = useTranslations()


    // Cart Details
    const totalLength = useSelector((state: RootState) => state?.cart?.totalQuantity);
    const totalAmount = useSelector((state: RootState) => state?.cart?.total)

    // @ts-expect-error typpe missing
    const WebDetails = useSelector((state: RootState) => state?.webDetails?.details)
    const dropdownRef = useRef<HTMLDivElement>(null)
    const searchRef = useRef<HTMLDivElement>(null)
    const [markets, setMarkets] = useState([])
    const debouncedSearchQuery = useDebounce(searchQuery, 500);

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
        if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
            setShowSearchResults(false);
        }
    };

    // Search API call
    const searchProducts = useCallback(async (query: string) => {
        if (!query.trim()) {
            setSearchResults([]);
            setShowSearchResults(false);
            return;
        }

        setIsSearching(true);
        setShowSearchResults(true);

        try {
            // Replace with your actual API endpoint
            const response: any = await axiosInstance.get(`/${process.env.NEXT_PUBLIC_API_APP_TYPE}/${process.env.NEXT_PUBLIC_API_VERSION}/search?query=${query}`);
            const data: any = response.data;
            setSearchResults(data?.data.products || []);
            setMarkets(data?.data.markets || []);
        } catch (error) {
            console.error('Search error:', error);
            setSearchResults([]);
        } finally {
            setIsSearching(false);
        }
    }, []);

    useEffect(() => {
        if (debouncedSearchQuery) {
            searchProducts(debouncedSearchQuery);
        } else {
            setSearchResults([]);
            setShowSearchResults(false);
        }
    }, [debouncedSearchQuery, searchProducts]);

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchResultClick = (product: any, type: string) => {
        setSearchQuery('');
        setShowSearchResults(false);

        if (type === 'product') {
            router.push(`/products/${product.id}`)
        } else {
            router.push(`/store/${product.slug}`)
        }
    };


    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            setShowSearchResults(false);
        }
    };



    const toggleSearch = () => {
        setIsSearchOpen(!isSearchOpen);
        setIsMobileMenuOpen(false);
        if (!isSearchOpen) {
            setSearchQuery("");
            setSearchResults([]);
        }
    };
    return {
        isOpen,
        toggleDropdown,
        totalLength,
        totalAmount,
        WebDetails,
        markets,
        searchQuery,
        searchResults,
        isSearching,
        showSearchResults,
        searchRef,
        dropdownRef,
        setSearchQuery,
        searchProducts,
        handleSearchInputChange,
        handleSearchResultClick,
        handleSearchSubmit,
        setShowSearchResults,
        debouncedSearchQuery,
        toggleSearch,
        t
    }
}