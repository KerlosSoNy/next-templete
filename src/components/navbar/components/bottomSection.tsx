'use client'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavbar } from '../hooks/useNavbar';
import { RootState } from '@/utils/redux/store';
import StoreProvider from '@/app/[locale]/StoreProvider';
import ProfileSection from './profileSection';
import Link from 'next/link';
import Notifications from './notifications';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import MobileSearch from './mobileSearch/mobileSearch';
import MobileMenu from './mobileMenu';

export default function BottomSection() {
    const {
        totalLength,
        totalAmount,
        markets,
        searchQuery,
        searchResults,
        isSearching,
        showSearchResults,
        searchRef,
        setSearchQuery,
        handleSearchInputChange,
        handleSearchResultClick,
        handleSearchSubmit,
        setShowSearchResults,
        debouncedSearchQuery,
        t
    } = useNavbar()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname()
    const Token = useSelector((state: RootState) => state?.tokenSlice.token)
    const locale = useLocale()
    const [price, setPrice] = useState(0);
    const links = [{
        link: '/',
        name: 'nav.home'
    },
    {
        link: '/contact-us',
        name: 'nav.contactUs'
    },
    {
        link: '/categories',
        name: 'nav.categories'
    },
    {
        link: '/faqs',
        name: 'nav.faq'
    }
    ];

    useEffect(() => {
        setPrice(+((totalAmount).toFixed(2)))
    }, [totalAmount])

    const isLinkActive = (linkHref: string) => {
        if (linkHref === '/' && pathname === `/${locale}`) {
            return true;
        } else {
            if (pathname.includes(linkHref) && linkHref !== '/') {
                return true;
            } else {
                return false;
            }
        }
    };
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMobileMenuOpen]);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };
    function useHasMounted() {
        const [mounted, setMounted] = useState(false);
        useEffect(() => setMounted(true), []);
        return mounted;
    }
    const hasMounted = useHasMounted();
    return (
        <div className='md:mt-2 xl:mt-[14px] relative md:rounded-full h-[60px] xl:h-[70px] w-full md:w-[calc(100%-25px)] xl:w-[calc(100%-50px)] 2xl:w-[calc(100%-100px)] mx-auto bg-white shadow-2xl flex flex-row justify-between items-center px-[10px] xl:px-[17px]'>
            <StoreProvider>
                <button
                    title="Open Menu"
                    type="button"
                    onClick={toggleMobileMenu}
                    className="menu-button md:hidden w-[34px] h-[34px] rounded-full bg-[#4A3F35] flex items-center justify-center transition-transform hover:scale-105"
                >
                    {isMobileMenuOpen ? (
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13 1L1 13M1 1L13 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    ) : (
                        <svg width="19" height="14" viewBox="0 0 19 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.76948 0.818176H8.11688C8.45357 0.818176 8.77647 0.948436 9.01454 1.1803C9.25261 1.41216 9.38636 1.72664 9.38636 2.05454C9.38636 2.38244 9.25261 2.69692 9.01454 2.92878C8.77647 3.16064 8.45357 3.2909 8.11688 3.2909H1.76948C1.43279 3.2909 1.1099 3.16064 0.871822 2.92878C0.633748 2.69692 0.5 2.38244 0.5 2.05454C0.5 1.72664 0.633748 1.41216 0.871822 1.1803C1.1099 0.948436 1.43279 0.818176 1.76948 0.818176ZM1.76948 10.7091H12.2987C12.6354 10.7091 12.9583 10.8393 13.1964 11.0712C13.4344 11.3031 13.5682 11.6175 13.5682 11.9454C13.5682 12.2734 13.4344 12.5878 13.1964 12.8197C12.9583 13.0516 12.6354 13.1818 12.2987 13.1818H1.76948C1.43279 13.1818 1.1099 13.0516 0.871823 12.8197C0.633749 12.5878 0.5 12.2734 0.5 11.9454C0.5 11.6175 0.633749 11.3031 0.871823 11.0712C1.1099 10.8393 1.43279 10.7091 1.76948 10.7091ZM1.76948 5.76363H17.0032C17.3399 5.76363 17.6628 5.89389 17.9009 6.12575C18.139 6.35762 18.2727 6.67209 18.2727 6.99999C18.2727 7.3279 18.139 7.64237 17.9009 7.87424C17.6628 8.1061 17.3399 8.23636 17.0032 8.23636H1.76948C1.43279 8.23636 1.1099 8.1061 0.871822 7.87424C0.633748 7.64237 0.5 7.3279 0.5 6.99999C0.5 6.67209 0.633748 6.35762 0.871822 6.12575C1.1099 5.89389 1.43279 5.76363 1.76948 5.76363Z" fill="white" />
                        </svg>
                    )}
                </button>
                <Image
                    src={'/images/logos/footerLogo.png'}
                    alt='Ropita' width={82} height={24} className='absolute top-1/2 left-1/2 -translate-x-1/2 md:hidden -translate-y-1/2' />

                <div className="hidden md:flex flex-row items-center gap-[14px] xl:gap-[24px]">
                    <Link href={`${locale}` + '/my-orders'} className='hidden lg:flex flex-row rounded-full bg-[#D98E5D] text-white text-[12px] xl:text-[16px] gap-1 h-[28px] xl:h-[36px] px-[12px] items-center'>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.45837 8.33331V11.6666C1.45837 14.0241 1.45837 15.2025 2.19087 15.935C2.37171 16.1158 2.58004 16.2516 2.82671 16.355L2.81087 16.2433C2.70837 15.4783 2.70837 14.5241 2.70837 13.4158V6.58498C2.70837 5.47665 2.70837 4.52165 2.81087 3.75748L2.82754 3.64581C2.58932 3.74175 2.37282 3.88457 2.19087 4.06581C1.45837 4.79831 1.45837 5.97665 1.45837 8.33331ZM18.125 8.33331V11.6666C18.125 14.0241 18.125 15.2025 17.3925 15.935C17.2117 16.1158 17.0034 16.2516 16.7567 16.355L16.7725 16.2433C16.875 15.4783 16.875 14.5241 16.875 13.4158V6.58498C16.875 5.47665 16.875 4.52165 16.7725 3.75748L16.7559 3.64581C17.0034 3.74831 17.2117 3.88498 17.3925 4.06581C18.125 4.79831 18.125 5.97665 18.125 8.33331Z" fill="white" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M4.69087 2.39919C3.95837 3.13085 3.95837 4.31002 3.95837 6.66669V13.3334C3.95837 15.69 3.95837 16.8692 4.69087 17.6009C5.42254 18.3334 6.60171 18.3334 8.95837 18.3334H10.625C12.9817 18.3334 14.1609 18.3334 14.8925 17.6009C15.625 16.8692 15.625 15.69 15.625 13.3334V6.66669C15.625 4.31002 15.625 3.13085 14.8925 2.39919C14.1609 1.66669 12.9817 1.66669 10.625 1.66669H8.95837C6.60171 1.66669 5.42254 1.66669 4.69087 2.39919ZM6.66671 14.1667C6.66671 14.0009 6.73256 13.842 6.84977 13.7247C6.96698 13.6075 7.12595 13.5417 7.29171 13.5417H9.79171C9.95747 13.5417 10.1164 13.6075 10.2336 13.7247C10.3509 13.842 10.4167 14.0009 10.4167 14.1667C10.4167 14.3324 10.3509 14.4914 10.2336 14.6086C10.1164 14.7258 9.95747 14.7917 9.79171 14.7917H7.29171C7.12595 14.7917 6.96698 14.7258 6.84977 14.6086C6.73256 14.4914 6.66671 14.3324 6.66671 14.1667ZM7.29171 10.2084C7.12595 10.2084 6.96698 10.2742 6.84977 10.3914C6.73256 10.5086 6.66671 10.6676 6.66671 10.8334C6.66671 10.9991 6.73256 11.1581 6.84977 11.2753C6.96698 11.3925 7.12595 11.4584 7.29171 11.4584H12.2917C12.4575 11.4584 12.6164 11.3925 12.7337 11.2753C12.8509 11.1581 12.9167 10.9991 12.9167 10.8334C12.9167 10.6676 12.8509 10.5086 12.7337 10.3914C12.6164 10.2742 12.4575 10.2084 12.2917 10.2084H7.29171ZM6.66671 7.50002C6.66671 7.33426 6.73256 7.17529 6.84977 7.05808C6.96698 6.94087 7.12595 6.87502 7.29171 6.87502H12.2917C12.4575 6.87502 12.6164 6.94087 12.7337 7.05808C12.8509 7.17529 12.9167 7.33426 12.9167 7.50002C12.9167 7.66578 12.8509 7.82475 12.7337 7.94196C12.6164 8.05917 12.4575 8.12502 12.2917 8.12502H7.29171C7.12595 8.12502 6.96698 8.05917 6.84977 7.94196C6.73256 7.82475 6.66671 7.66578 6.66671 7.50002Z" fill="white" />
                        </svg>
                        <span>
                            {t('bottomSection.orders')}
                        </span>
                    </Link>

                    <Link href={'/cart'} className="flex flex-row items-center gap-[17px]">
                        <div className="flex flex-col items-end xl:gap-[2px]">
                            <span className="text-[12px] xl:text-[14px] text-text">{t('cart_title')} </span>
                            {<div className="flex flex-row items-center -mt-1 text-[12px] xl:text-[14px] text-[#FF743C] font-medium" dir="ltr">
                                <span> {price || '0'}</span>
                                <svg className="" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clipPath="url(#clip0_1773_5507)">
                                        <path d="M0.860519 10.5962C0.375362 10.6056 -0.00666867 10.1767 0.00270633 9.70322C-0.00198117 6.85556 0.000362579 4.05947 0.00270633 1.69932C0.00270633 1.16728 0.370675 0.796973 0.898018 0.794629C2.20583 0.789941 3.76208 0.787598 5.00427 0.796973C6.83005 0.771191 8.49645 2.22432 8.72614 4.029C8.83161 5.16338 8.75427 6.41025 8.77536 7.54463V7.91963C8.80348 9.0376 7.17224 9.15244 7.06208 8.06494C7.01755 6.86494 7.0738 5.679 7.03864 4.47666C7.0152 3.52041 6.22536 2.65791 5.27849 2.55478C4.12771 2.47744 2.88083 2.54072 1.73005 2.52197C1.73005 4.8376 1.73005 7.38994 1.72536 9.6915C1.73239 10.2024 1.35036 10.5962 0.860519 10.5962Z" fill="#FF743C" stroke="white" strokeWidth="0.7" />
                                        <path d="M8.77139 11.2078C8.1878 11.2078 7.60655 11.2055 7.02296 11.2031C5.18546 11.2453 3.45342 9.74766 3.27061 7.94766C3.17686 6.85078 3.22842 5.73984 3.21671 4.64766L3.21905 4.07578C3.21436 3.55547 3.59405 3.16875 4.08858 3.16875C5.10811 3.20391 4.94405 4.25625 4.94639 4.97578C4.94874 5.82422 4.93467 6.67031 4.95577 7.52578C4.97921 8.48203 5.76905 9.34453 6.71827 9.44766C7.1378 9.49219 7.49874 9.47578 7.89952 9.47578C8.56514 9.48281 9.58936 9.47344 10.2644 9.47813C10.2667 7.18359 10.2644 4.575 10.2667 2.29688C10.2667 1.8 10.644 1.40859 11.1245 1.40625C11.6214 1.40625 11.9917 1.79766 11.9917 2.31328V9.74531C12.0362 10.4578 11.9636 11.1914 11.0823 11.2078C10.33 11.2055 9.51905 11.2102 8.77139 11.2078Z" fill="#FF743C" stroke="white" strokeWidth="0.7" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_1773_5507">
                                            <rect width="12" height="12" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </div>}
                        </div>
                        <div className="relative">
                            <span className="bg-[#D98E5D] w-5 h-5 rounded-full flex items-center justify-center text-[10px] text-white font-semibold absolute -top-0.5 -start-3">
                                {hasMounted && totalLength > 0 ? totalLength <= 9 ? `0${totalLength}` : totalLength : '0'}
                            </span>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2.375C13.9724 2.375 15.5714 3.91402 15.5714 5.8125V6.5H8.42857V5.8125C8.42857 3.91402 10.0276 2.375 12 2.375ZM17 6.5V5.8125C17 3.15463 14.7614 1 12 1C9.23858 1 7 3.15463 7 5.8125V6.5H2V20.25C2 21.7688 3.27919 23 4.85714 23H19.1429C20.7208 23 22 21.7688 22 20.25V6.5H17ZM3.42857 7.875H20.5714V20.25C20.5714 21.0094 19.9318 21.625 19.1429 21.625H4.85714C4.06816 21.625 3.42857 21.0094 3.42857 20.25V7.875Z" fill="#222222" />
                            </svg>
                        </div>
                    </Link>
                    <Link href={Token && Token !== null ? '/favorite' : '/login'} className="relative">
                        <div className="bg-[#D98E5D] w-5 h-5 rounded-full flex items-center justify-center text-[10px] text-white font-semibold absolute -top-0.5 -start-3">
                            05
                        </div>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 5.66407L11.0145 4.68178C8.69849 2.37342 4.45695 3.17026 2.92549 6.07046C2.20523 7.43444 2.04328 9.40329 3.35715 11.9168C4.62254 14.3375 7.25305 17.2353 12 20.3928C16.747 17.2353 19.3775 14.3375 20.6429 11.9168C21.9567 9.40329 21.7948 7.43444 21.0745 6.07046C19.543 3.17026 15.3015 2.37342 12.9855 4.68178L12 5.66407ZM12 22C-9.08305 8.49121 5.50829 -2.05449 11.7584 3.52411C11.8404 3.59729 11.921 3.67325 12 3.75201C12.079 3.67325 12.1596 3.5973 12.2416 3.52412C18.4917 -2.0545 33.0831 8.4912 12 22Z" fill="#222222" />
                        </svg>
                    </Link>
                    <Notifications />
                </div>
            </StoreProvider>

            <div className="hidden md:flex flex-row items-center justify-center gap-1 2xl:gap-5 absolute left-1/2 -translate-x-1/2 ">
                {
                    links.map((link, index) => (
                        <Link key={index} href={`/${locale}/${link.link}` || '/'}
                            className={`text-[12px] px-2.5 rounded-full flex items-center h-7 xl:h-9 xl:text-[16px] ${isLinkActive(link.link) ? 'bg-[#4A3F35] text-[#FFFFFF] ' : 'text-[#7A7A7A]'}`}>{t(`${link.name}`)}</Link>
                    ))
                }
            </div>

            {/* Search and Profile */}
            <div className='flex flex-row items-center gap-2.5'>
                <MobileSearch />
                <div ref={searchRef} className="relative hidden xl:flex flex-row items-center rounded-full bg-black/5 w-[37px] md:w-[247px] lg:w-[175px] h-[28px] xl:h-[40px]">
                    <form onSubmit={handleSearchSubmit} className="hidden lg:flex items-center flex-1 px-3 gap-2">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.90906 2C5.93814 2 4.98903 2.28791 4.18174 2.82733C3.37444 3.36674 2.74524 4.13343 2.37368 5.03045C2.00213 5.92746 1.90491 6.91451 2.09433 7.86677C2.28375 8.81904 2.75129 9.69375 3.43783 10.3803C4.12438 11.0668 4.99909 11.5344 5.95135 11.7238C6.90362 11.9132 7.89067 11.816 8.78768 11.4444C9.6847 11.0729 10.4514 10.4437 10.9908 9.63639C11.5302 8.8291 11.8181 7.87998 11.8181 6.90906C11.818 5.60712 11.3008 4.35853 10.3802 3.43792C9.45959 2.51731 8.211 2.00008 6.90906 2Z" stroke="#52525B" strokeWidth="1.5" strokeMiterlimit="10" />
                            <path d="M10.5713 10.5716L13.9997 14" stroke="#52525B" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" />
                        </svg>
                        <input
                            type="text"
                            placeholder={t(`nav.searchProducts`)}
                            className=" w-full outline-none text-[12px] placeholder:text-[12px] placeholder:text-[#A1A1AA] placeholder:font-bold"
                            value={searchQuery}
                            onChange={handleSearchInputChange}
                            onFocus={() => searchQuery && setShowSearchResults(true)}
                        />
                    </form>

                    {/* Search Results Dropdown */}
                    {showSearchResults && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-md shadow-lg z-[1000001]  overflow-hidden w-[339px]">
                            {isSearching ? (
                                <div className="p-4 text-center">
                                    <div className="inline-flex items-center">
                                        <svg className="animate-spin h-5 w-5 mr-3 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        <span className="text-gray-600 mx-2">{t('searching')}</span>
                                    </div>
                                </div>
                            ) : (searchResults.length > 0 || markets.length > 0) ? (
                                <div className='flex flex-col'>
                                    <div className="py-2 flex flex-col max-h-[400px] overflow-y-scroll overflow-x-hidden">
                                        {markets.length > 0 &&
                                            <div className='flex flex-col'>
                                                <span className='text-[14px] text-[#A1A1AA] font-bold px-4'>{t('markets')}</span>
                                                {
                                                    markets.map((market: any, index: number) => {
                                                        return (
                                                            <div
                                                                key={`market-${index}`}
                                                                onClick={() => handleSearchResultClick(market, 'market')}
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
                                                        )
                                                    })
                                                }
                                            </div>}
                                        {searchResults.length > 0 &&
                                            <div className='flex flex-col'>
                                                <span className='text-[14px] text-[#A1A1AA] font-bold px-4'>{t('products')}</span>
                                                {searchResults?.map((product, index: number) => (
                                                    <div
                                                        key={`product-${index}`}
                                                        onClick={() => handleSearchResultClick(product, 'product')}
                                                        className="px-4 py-3 hover:bg-gray-50 cursor-pointer flex items-center gap-3 border-b last:border-b-0"
                                                    >
                                                        {product?.product_variant?.featured_thumb_image_url && (
                                                            <Image
                                                                src={product?.product_variant?.featured_thumb_image_url}
                                                                alt={product?.name || 'Search Result Image'}
                                                                width={48}
                                                                height={48}
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
                                            </div>}

                                    </div>
                                    <div className="px-4 py-3 bg-gray-50 text-center">
                                        <button
                                            onClick={() => {
                                                setShowSearchResults(false);
                                                setSearchQuery('');
                                            }}
                                            className="text-[#FF743C] text-sm font-medium hover:underline"
                                        >
                                            {t('viewAllResults')} ({searchResults.length + markets.length})
                                        </button>
                                    </div>
                                </div>
                            ) : debouncedSearchQuery && !isSearching ? (
                                <div className="p-4 text-center text-gray-500">
                                    <p>{t('noResultsFound')}</p>
                                </div>
                            ) : null}
                        </div>
                    )}
                </div>
                <StoreProvider>
                    <ProfileSection />
                </StoreProvider>
            </div>

            <MobileMenu isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
        </div>
    )
}
