'use client';
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';

import React, { useState, useEffect, useRef } from 'react';

const LanguageMenu: React.FC = () => {
    const router = useRouter();
    const pathname = usePathname();
    const currentLocale = useLocale();
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [currentLanguage, setCurrentLanguage] = useState(pathname.split('/')[1]);
    const menuRef = useRef<HTMLDivElement>(null);

    const toggleDropdownVisibility = () => {
        setDropdownVisible(!isDropdownVisible);
    };



    const changeLanguage = (newLocale: string) => {
        const pathWithoutLocale = pathname.replace(`/${currentLocale}`, '');
        router.push(`/${newLocale}${pathWithoutLocale}`);
    };

    const toggleLanguage = (newLocale: string) => {
        changeLanguage(newLocale);
        setCurrentLanguage(newLocale);
        setDropdownVisible(false);
        if (typeof window !== 'undefined') {
            window.localStorage.setItem('locale', newLocale);
        }
    }

    useEffect(() => {
        const pathWithoutLocale = pathname.replace(`/${currentLocale}`, '');
        if (typeof window !== 'undefined') {
            const storedLocale = window.localStorage.getItem('locale');
            if (storedLocale) {
                setCurrentLanguage(storedLocale);
                router.push(`/${storedLocale}${pathWithoutLocale}`);
            } else {
                setCurrentLanguage(pathname.split('/')[1])
                window.localStorage.setItem('locale', pathname.split('/')[1]);
            } router.push(`/${storedLocale}${pathWithoutLocale}`);
        } else {
            setCurrentLanguage(pathname.split('/')[1])

        }
    }, [pathname, currentLocale, router]);

    return (
        <div className="relative flex flex-col items-center lg:border-s border-white ps-1 ms-[18px]">
            <div
                title='Change Language'
                id="langButton"
                onClick={toggleDropdownVisibility}
                className="relative flex flex-row cursor-pointer gap-1 text-[14px] lg:text-[16px] font-bold text-white items-center justify-center min-w-[105px]"
            >
                <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.14355 0C11.0095 0 14.1436 3.13401 14.1436 7C14.1436 10.866 11.0095 14 7.14355 14C3.27756 14 0.143555 10.866 0.143555 7C0.143555 3.13401 3.27756 0 7.14355 0ZM5.97363 9.7998C6.26062 11.4797 6.76458 12.5995 7.14258 12.5996C7.52058 12.5996 8.02452 11.4798 8.31152 9.7998H5.97363ZM2.29199 9.7998C2.94875 10.934 3.98129 11.8032 5.21094 12.2568C4.91698 11.5849 4.69288 10.7447 4.5459 9.7998H2.29199ZM9.74023 9.7998C9.62299 10.6435 9.39947 11.4692 9.0752 12.2568C10.3049 11.8032 11.3374 10.9341 11.9941 9.7998H9.74023ZM1.71777 5.60059C1.48109 6.51877 1.48102 7.48222 1.71777 8.40039H4.3916C4.32674 7.46835 4.32676 6.53263 4.3916 5.60059H1.71777ZM5.7998 5.60059C5.72387 6.5322 5.72384 7.46877 5.7998 8.40039H8.48828C8.56424 7.46877 8.56422 6.53221 8.48828 5.60059H5.7998ZM9.89551 5.60059C9.96034 6.53263 9.96037 7.46835 9.89551 8.40039H12.5693C12.8061 7.48221 12.806 6.51878 12.5693 5.60059H9.89551ZM5.21094 1.74316C3.98129 2.1968 2.94875 3.06596 2.29199 4.2002H4.5459C4.68588 3.2553 4.91698 2.41513 5.21094 1.74316ZM7.14258 1.40039C6.76458 1.4005 6.26062 2.52028 5.97363 4.2002H8.31152C8.02452 2.5202 7.52058 1.40039 7.14258 1.40039ZM9.0752 1.74316C9.36915 2.41513 9.59325 3.25529 9.74023 4.2002H11.9941C11.3374 3.06594 10.3049 2.1968 9.0752 1.74316Z" fill="white" />
                </svg>
                <span className='w-fit h-fit transition-all duration-300 delay-300'>{currentLanguage === 'ar' ? "العربية" : 'English'}</span>
                <svg className='ms-1' width="11" height="6" viewBox="0 0 11 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.51867 5.40008L5.14355 6L10.1436 1.19983L8.89378 0L5.14355 3.59949L1.39333 0L0.143555 1.19983L4.51867 5.40008Z" fill="white" />
                </svg>
            </div>
            <div
                ref={menuRef}
                className={`absolute ${isDropdownVisible ? 'h-fit w-full xl:w-[95px] border-[1px] -bottom-[calc(20*4px)]' : 'w-0 h-0 border-[0px] -bottom-0'} top-7 duration-300 transition-all rounded-xl shadow-2xl !z-[9] mb-2 xl:mb-0 bg-[white]  backdrop-blur-2xl flex flex-col items-start border-black/10 overflow-hidden`}
            >
                <button
                    type="button"
                    title="Arabic"
                    className="flex gap-2 w-full items-center p-2 hover:bg-gray-100"
                    onClick={() => toggleLanguage('ar')}
                >
                    <span className="text-[#1F1F1F] font-[400] text-[14px]">العربية</span>
                </button>
                <button
                    type="button"
                    title="English"
                    className="flex gap-2 w-full items-center p-2 hover:bg-gray-100"
                    onClick={() => toggleLanguage('en')}
                >
                    <span className="text-[#1F1F1F] font-[400] text-[14px]">English</span>
                </button>
            </div>
        </div>
    );
};

export default LanguageMenu;