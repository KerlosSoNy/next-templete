'use client';
import { useLocale } from "next-intl";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function LanguageDropdownMenu() {
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
        <div className="">
            <div className="relative flex flex-col items-center z-9">
                <div className="flex flex-row relative gap-1 items-center">
                    <span onClick={toggleDropdownVisibility} className="z-3 bg-[#FAF4DC] md:bg-main lg:bg-[#FAF4DC] rounded-full w-[34px] h-[34px] md:w-11 md:h-11 lg:w-[34px] lg:h-[34px] flex flex-row justify-center items-center">
                        <Image width={20} height={20} src="/images/nav/lang.svg" alt="" className="block lg:block" />
                        <Image width={20} height={20} src="/images/nav/Language.png" alt="" className="hidden lg:block " />
                    </span>
                    <button type="button" id="langButton" onClick={toggleDropdownVisibility}
                        className="hidden lg:flex relative  w-[102px] justify-between bg-[#FAF4DC] items-center gap-0.5 py-1.5 px-3 rounded-full flex-row">
                        <span className="text-[#9C6B32] font-normal text-[14px]">{currentLanguage === 'ar' ? "العربية" : "English"}</span>
                        <svg className={`${isDropdownVisible ? "rotate-180" : ""} ms-2.5`} width="10" height="7" viewBox="0 0 10 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.00116 4.49265L8.0257 1.1837C8.07649 1.12591 8.1387 1.07967 8.20827 1.04802C8.27783 1.01636 8.35319 1 8.4294 1C8.50561 1 8.58096 1.01636 8.65053 1.04802C8.72009 1.07967 8.78231 1.12591 8.83309 1.1837C8.94055 1.30518 9 1.4628 9 1.6262C9 1.7896 8.94055 1.94723 8.83309 2.06871L5.40549 5.81791C5.35604 5.87368 5.29591 5.91858 5.22879 5.94987C5.16167 5.98116 5.08897 5.99817 5.01515 5.99986C4.94133 6.00155 4.86795 5.98789 4.79951 5.95971C4.73107 5.93153 4.66901 5.88943 4.61714 5.83599L1.16669 2.07129C1.05937 1.94974 1 1.79215 1 1.62879C1 1.46542 1.05937 1.30783 1.16669 1.18628C1.21748 1.12849 1.27969 1.08226 1.34925 1.0506C1.41882 1.01895 1.49417 1.00258 1.57038 1.00258C1.6466 1.00258 1.72195 1.01895 1.79152 1.0506C1.86108 1.08226 1.92329 1.12849 1.97408 1.18628L5.00116 4.49265Z" fill="#9C6B32" stroke="#9C6B32" strokeWidth="0.3" />
                        </svg>
                    </button>
                </div>
                {isDropdownVisible && (
                    <div ref={menuRef} className="absolute end-0 top-10 md:top-12 lg:top-10 z-20 w-[102px] bg-[#FAF4DC] shadow-md rounded-md flex flex-col items-start p-0.5 border border-black/10">
                        <button type="button" title="Arabic" className="flex gap-2 w-full  items-center p-2 hover:bg-gray-100" onClick={() => toggleLanguage("ar")}>
                            <span className="text-[#1F1F1F] font-normal text-[14px]">العربية</span>
                        </button>
                        <button type="button" title="English" className="flex gap-2 w-full items-center p-2 hover:bg-gray-100" onClick={() => toggleLanguage("en")}>
                            <span className="text-[#1F1F1F] font-normal text-[14px]">English</span>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
