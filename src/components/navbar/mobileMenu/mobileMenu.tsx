'use client'
import { RootState } from '@/utils/redux/store';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';

export default function MobileMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const handleToggle = () => setIsOpen(!isOpen);
    const location = usePathname();
    const t = useTranslations()
    const menuRef = useRef<HTMLDivElement>(null);
    const Token = useSelector((state: RootState) => state?.tokenSlice.token)

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add("no-scroll");
        } else {
            document.body.classList.remove("no-scroll");
        }

        return () => document.body.classList.remove("no-scroll");
    }, [isOpen]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuRef]);

    const handleResetCategories = () => {
        localStorage.removeItem('subCategories')
        localStorage.removeItem('last_category')
    }
    return (
        <div className="rounded-[5px] xl:hidden font-inter text-start scrollbar-hide z-999 overflow-hidden flex flex-col gap-2.5 md:gap-6 overflow-y-auto items-start justify-start" ref={menuRef}>
            <button
                onClick={handleToggle}
                type="button"
                title={isOpen ? "Close Menu" : "Open Menu"}
                className="relative group"
            >
                <div className="relative flex overflow-hidden items-center justify-center rounded-full w-[50px] h-[50px] transform transition-all   duration-200">
                    <div className={`flex flex-col  w-5 h-5 transform transition-all duration-300 origin-center overflow-hidden justify-between`}>
                        <div className={`bg-black h-0.5 w-7 transform transition-all duration-300 origin-left delay-100 ${isOpen ? 'translate-y-6' : ''}`}></div>
                        <div className={`bg-black h-0.5 w-7 rounded transform transition-all duration-300 delay-75 ${isOpen ? 'translate-y-6' : ''}`}></div>
                        <div className={`bg-black h-0.5 w-7 transform transition-all duration-300 origin-left ${isOpen ? 'translate-y-6' : ''}`}></div>

                        <div className={`absolute items-center justify-between transform transition-all duration-500  flex ${isOpen ? ' right-[15px] top-1/2 -translate-y-1/2' : '-translate-x-10 '}`}>
                            <div className={`absolute bg-black h-0.5 w-5 transform transition-all duration-500 delay-300 ${isOpen ? 'rotate-45' : 'rotate-0'}`}></div>
                            <div className={`absolute bg-black h-0.5 w-5 transform transition-all duration-500 delay-300 ${isOpen ? '-rotate-45' : 'rotate-0'}`}></div>
                        </div>
                    </div>
                </div>
            </button>
            <div
                className={`fixed end-6 z-100000 text-start bg-[#775229] w-[calc(100%-48px)]! md:w-[375px]! shadow-2xl rounded-[20px] md:rounded-[20px] top-[70px] md:top-[70px]
         overflow-hidden transition-all duration-700 ease-in-out ${isOpen ? 'max-h-[500px]  p-2.5' : 'max-h-0  p-0'}`}
            >
                <div className='rounded-[20px] px-[18px] py-7 bg-main relative overflow-hidden'>
                    <Image fill src="/images/nav/TopMenu.png" alt="Bg" className="absolute top-0 left-0 w-full" />
                    {/* Links */}
                    <div className="flex md:hidden flex-col items-center gap-4 border-b border-dashed border-white pb-3 mb-[18px]">
                        <Link href="/" onClick={() => {
                            handleToggle()
                        }} className="relative flex flex-row items-center gap-1.5">
                            <span className={`${location === "/" ? "text-[#F3C600]" : "text-[#ffffff]"} font-bold text-[16px]`}>{t('navbar.home')}</span>
                            {
                                location === "/" && (
                                    <div className="w-[26px] h-px left-1/2 -translate-x-1/2 -bottom-3 absolute bg-main"></div>
                                )
                            }
                        </Link>
                        <Link href='/categories' onClick={() => {
                            handleToggle();
                            handleResetCategories()
                        }} className="flex relative flex-row items-center gap-1.5">
                            <span className={`${location === "/categories" ? "text-[#F3C600]" : "text-[#ffffff]"} font-bold text-[16px]`}>{t('navbar.categories')}</span>
                            {
                                location === "/products" && (
                                    <div className="w-[26px] h-px left-1/2 -translate-x-1/2 -bottom-3 absolute bg-main"></div>
                                )
                            }
                        </Link>
                        <Link href='/contact_us' onClick={() => {
                            handleToggle();
                        }} className="flex relative flex-row items-center gap-1.5">
                            <span className={`${location === "/contact_us" ? "text-[#F3C600]" : "text-[#ffffff]"} font-bold  text-[16px]`}>{t('navbar.contact_us')}</span>
                            {
                                location === "/" && (
                                    <div className="w-[26px] h-px left-1/2 -translate-x-1/2 -bottom-3 absolute bg-main" />
                                )
                            }
                        </Link>
                    </div>
                    {/* Buttons of mobile Menu */}
                    <div className="grid grid-cols-2 items-center gap-4">
                        {/* Favorite */}
                        {Token && <Link href={'/favorite'} onClick={() => {
                            handleToggle();
                        }} className="flex relative border border-[#F9E8D7] rounded-full bg-[#F9E8D7] w-full text-main font-medium text-[16px] p-[5.5px] h-11 flex-row justify-center items-center gap-3">
                            <div className=' w-fit h-fit rounded-full flex items-center justify-center'>
                                <Image width={20} height={20} src="/images/nav/heart.svg" alt="Heart Icon" />
                            </div>
                            <span className={`text-[#683C15] font-medium text-[16px]`}>{t('navbar.favorite')}</span>
                        </Link>}
                        {/* My Orders */}
                        {Token &&
                            <Link href={'/prev_orders'} className="flex relative border border-[#F9E8D7] rounded-full bg-[#F9E8D7] w-full text-main font-medium text-[16px] p-[5.5px] h-11 flex-row justify-center  items-center gap-3">
                                <div className=' w-fit h-fit  rounded-full flex items-center justify-center'>
                                    <Image src="/images/nav/orders.svg" alt="Orders Icon" width={20} height={20} />
                                </div>
                                <span className="font-medium text-[16px] text-[#683C15]">{t(`navbar.myOrders`)}</span>
                            </Link>
                        }
                        {/* Login */}
                    </div>
                    <div className='flex flex-col gap-2.5'>
                        {
                            Token ?
                                null :
                                <>
                                    <Link onClick={() => handleToggle()} href='/login' className="flex flex-col items-center justify-center rounded-full bg-[#ECD6C0] w-full text-main font-medium text-[14px] h-11 relative z-3">
                                        {t('navbar.login')}
                                    </Link>
                                    <Link href='/signup' onClick={() => handleToggle()} className="flex flex-col items-center justify-center rounded-full bg-main w-full text-white font-medium text-[14px] h-11 relative z-3 border border-white">
                                        {t('navbar.signup')}
                                    </Link>
                                </>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
