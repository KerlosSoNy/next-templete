import axiosInstance from '@/utils/axios/axsionInstance';
import { useDebounce } from '@/utils/hooks/useDebounce';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'

export default function MobileSearch() {
    const router = useRouter();
    const t = useTranslations()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const searchInputRef = useRef<HTMLInputElement>(null);
    const searchContainerRef = useRef<HTMLDivElement>(null);
    const [markets, setMarkets] = useState([])
    const debouncedSearchQuery = useDebounce(searchQuery, 500);
    const searchToggleRef = useRef<HTMLButtonElement>(null);

    const searchProducts = async (query: string) => {
        setIsSearching(true);
        try {
            const response: any = await axiosInstance.get(`/${process.env.NEXT_PUBLIC_API_APP_TYPE}/${process.env.NEXT_PUBLIC_API_VERSION}/search?query=${query}`);
            const data: any = response.data;
            setSearchResults(data?.data.products || []);
            setMarkets(data?.data.markets || []);
        } catch (error) {
            setSearchResults([]);
            return error;
        } finally {
            setIsSearching(false);
        }
    };

    useEffect(() => {
        if (debouncedSearchQuery) {
            searchProducts(debouncedSearchQuery);
        } else {
            setSearchResults([]);
        }
    }, [debouncedSearchQuery]);


    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (
                searchContainerRef.current &&
                !searchContainerRef.current.contains(target) &&
                !searchToggleRef.current?.contains(target)
            ) {
                setIsSearchOpen(false);
                setSearchQuery("");
                setSearchResults([]);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (isMobileMenuOpen && !target.closest('.mobile-menu') && !target.closest('.menu-button')) {
                setIsMobileMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isMobileMenuOpen]);

    useEffect(() => {
        if (isSearchOpen && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [isSearchOpen]);

    useEffect(() => {
        if (isSearchOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isSearchOpen]);

    const toggleSearch = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        setIsSearchOpen(!isSearchOpen);
        setIsMobileMenuOpen(false);
        if (!isSearchOpen) {
            setSearchQuery("");
            setSearchResults([]);
        }
    };

    const handleProductClick = (element: any, type: string) => {
        setIsSearchOpen(false);
        setSearchQuery("");
        setSearchResults([]);
        if (type === 'market') {
            router.push(`/store/${element?.slug}`);
        } else {
            router.push(`/product/${element?.id}`);
        }
    };

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            setIsSearchOpen(false);
            setSearchQuery("");
            setSearchResults([]);
        }
    };
    return (
        <div>
            <button
                ref={searchToggleRef}
                title="Search"
                type="button"
                onClick={toggleSearch}
                className="p-2 -ml-2 transition-colors xl:hidden hover:bg-gray-100 rounded-full"
            >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.90906 2C5.93814 2 4.98903 2.28791 4.18174 2.82733C3.37444 3.36674 2.74524 4.13343 2.37368 5.03045C2.00213 5.92746 1.90491 6.91451 2.09433 7.86677C2.28375 8.81904 2.75129 9.69375 3.43783 10.3803C4.12438 11.0668 4.99909 11.5344 5.95135 11.7238C6.90362 11.9132 7.89067 11.816 8.78768 11.4444C9.6847 11.0729 10.4514 10.4437 10.9908 9.63639C11.5302 8.8291 11.8181 7.87998 11.8181 6.90906C11.818 5.60712 11.3008 4.35853 10.3802 3.43792C9.45959 2.51731 8.211 2.00008 6.90906 2Z" stroke="#52525B" strokeWidth="1.5" strokeMiterlimit="10" />
                    <path d="M10.5713 10.5716L13.9997 14" stroke="#52525B" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" />
                </svg>
            </button>
            {isSearchOpen && (
                <div ref={searchContainerRef} className="fixed inset-x-0 top-[100px] md:top-[120px] z-[99999] xl:hidden animate-slideDown">
                    <form onSubmit={handleSearchSubmit} className="px-4 py-3">
                        <div className="relative">
                            <input
                                ref={searchInputRef}
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder={t(`nav.searchProducts`)}
                                className="w-full px-4 py-2 pr-10 border bg-white border-gray-300 rounded-full focus:outline-none focus:border-[#C1B299] focus:ring-1 focus:ring-[#C1B299]"
                            />
                            <button
                                type="submit"
                                title="search"
                                className="absolute right-2 top-1/2 -translate-y-1/2 p-1"
                            >
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.90906 2C5.93814 2 4.98903 2.28791 4.18174 2.82733C3.37444 3.36674 2.74524 4.13343 2.37368 5.03045C2.00213 5.92746 1.90491 6.91451 2.09433 7.86677C2.28375 8.81904 2.75129 9.69375 3.43783 10.3803C4.12438 11.0668 4.99909 11.5344 5.95135 11.7238C6.90362 11.9132 7.89067 11.816 8.78768 11.4444C9.6847 11.0729 10.4514 10.4437 10.9908 9.63639C11.5302 8.8291 11.8181 7.87998 11.8181 6.90906C11.818 5.60712 11.3008 4.35853 10.3802 3.43792C9.45959 2.51731 8.211 2.00008 6.90906 2Z" stroke="#ECB0CA" strokeWidth="1.5" strokeMiterlimit="10" />
                                    <path d="M10.5713 10.5716L13.9997 14" stroke="#ECB0CA" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" />
                                </svg>
                            </button>
                        </div>
                    </form>

                    {/* Search Results Dropdown */}
                    {searchQuery && (
                        <div className="px-4 pb-4">
                            <div className="bg-white border border-gray-200 rounded-lg shadow-lg max-h-[60vh] overflow-y-auto">
                                {isSearching ? (
                                    <div className="p-4 text-center">
                                        <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-[#ECB0CA]"></div>
                                        <p className="mt-2 text-sm text-gray-500">Searching...</p>
                                    </div>
                                ) : (searchResults.length > 0 || markets.length > 0) ? (
                                    <>
                                        <div className="p-3 border-b border-gray-100 bg-gray-50">
                                            <h3 className="text-sm font-semibold text-gray-700">
                                                {t("common.element_found", { element: searchResults.length + markets.length })}
                                            </h3>
                                        </div>
                                        <div className="max-h-[300px] overflow-y-auto">
                                            {
                                                markets.length > 0 && (
                                                    <div className='flex flex-col'>
                                                        <span className='text-[14px] text-[#A1A1AA] font-bold px-4'>{t('markets')}</span>
                                                        <div className="divide-y divide-gray-100">
                                                            {markets.map((market: any, index: number) => (
                                                                <div
                                                                    key={`market-${index}`}
                                                                    onClick={() => handleProductClick(market, 'market')}
                                                                    className="px-4 py-3 hover:bg-gray-50 cursor-pointer flex items-center gap-3 border-b last:border-b-0"
                                                                >
                                                                    {market?.logo_thumb && (
                                                                        <Image
                                                                            src={market?.logo_thumb}
                                                                            alt={market?.name}
                                                                            width={48}
                                                                            height={48}
                                                                            className="w-12 h-12 object-cover rounded"
                                                                        />
                                                                    )}
                                                                    <div className="flex-1">
                                                                        <h4 className="text-sm font-medium text-gray-900">{market?.name}</h4>
                                                                        {market?.description && (
                                                                            <p className="text-xs text-gray-500 truncate max-w-[240px]">{market?.description}</p>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )
                                            }
                                            {
                                                searchResults.length > 0 && (
                                                    <div className='flex flex-col'>
                                                        <span className='text-[14px] text-[#A1A1AA] font-bold px-4'>{t('products')}</span>
                                                        <div className="divide-y divide-gray-100">
                                                            {searchResults.map((product, index) => (
                                                                <div
                                                                    key={`product-${index}`}
                                                                    onClick={() => handleProductClick(product, 'product')}
                                                                    className="px-4 py-3 hover:bg-gray-50 cursor-pointer flex items-center gap-3 border-b last:border-b-0"
                                                                >
                                                                    {product?.product_variant?.featured_thumb_image_url && (
                                                                        <Image
                                                                            width={48}
                                                                            height={48}
                                                                            src={product?.product_variant?.featured_thumb_image_url}
                                                                            alt={product?.name}
                                                                            className="w-12 h-12 object-cover rounded"
                                                                        />
                                                                    )}
                                                                    <div className="flex-1">
                                                                        <h4 className="text-sm font-medium text-gray-900 max-w-[240px] truncate">{product?.product?.name}</h4>
                                                                        {product?.product?.description && (
                                                                            <p className="text-xs text-gray-500 truncate max-w-[240px]">{product?.product?.description}</p>
                                                                        )}
                                                                        <p className="text-sm text-[#FF743C] font-medium mt-1">
                                                                            {product?.price?.price}{product?.price?.currency_symbol}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </>
                                ) : (
                                    <div className="p-8 text-center">
                                        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto mb-4 text-gray-300">
                                            <circle cx="20" cy="20" r="16" stroke="currentColor" strokeWidth="2" />
                                            <path d="M32 32L44 44" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                        </svg>
                                        <p className="text-sm text-gray-500">{t('no_products_found')} {searchQuery}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
