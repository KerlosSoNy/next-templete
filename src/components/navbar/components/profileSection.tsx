'use client'
import { setIsLogOut } from '@/utils/redux/slices/addressDialog'
import { AppDispatch, RootState } from '@/utils/redux/store'
import { useLocale, useTranslations } from 'next-intl'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function ProfileSection() {
    const Token = useSelector((state: RootState) => state?.tokenSlice.token)
    const user: any = useSelector((state: RootState) => state.userSlice.user)
    const [data, setData] = useState<any>(null)
    const [menu, setMenu] = useState(false);
    const dispatch = useDispatch<AppDispatch>()
    const menuRef = useRef<HTMLDivElement>(null);
    const t = useTranslations()
    const locale = useLocale()
    const handleClickOutside = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node) && (event.target as HTMLElement).id !== 'langButton') {
            setMenu(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (window.localStorage.getItem('user')) setData(JSON.parse(window.localStorage.getItem('user') || ''))
        }
    }, [])
    return (
        <div className="hidden md:block">
            {(Token && Token !== 'null') ?
                <div className="relative z-10" ref={menuRef}>
                    <button
                        id="langButton"
                        onClick={() => setMenu(!menu)}
                        className="bg-[#EFF2F9] rounded-full h-[28px] xl:h-[41px] py-[6.5px] min-w-[100px] xl:min-w-[130px] px-2.5 flex flex-row items-center"
                    >
                        <div className="flex flex-row items-center gap-1.5">
                            <span className="bg-gradient-to-br from-second-color to-third-color w-[28px] h-[28px] rounded-full font-bold text-[18px] flex items-start justify-center text-white">
                                {user?.full_name?.charAt(0) || data?.full_name?.charAt(0)}
                            </span>
                            <span className="font-bold text-[14px] text-[#2D3436] mx-2">{user?.full_name || data?.full_name || "Loading"}</span>
                        </div>
                        <svg className={`${menu ? "rotate-180" : ""} duration-500 transition-all`} width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M13.207 15.707C13.0195 15.8944 12.7652 15.9998 12.5 15.9998C12.2348 15.9998 11.9805 15.8944 11.793 15.707L6.136 10.05C6.04049 9.95772 5.96431 9.84738 5.9119 9.72537C5.85949 9.60337 5.8319 9.47215 5.83075 9.33937C5.8296 9.20659 5.8549 9.07491 5.90518 8.95202C5.95546 8.82912 6.02971 8.71747 6.1236 8.62357C6.2175 8.52968 6.32915 8.45543 6.45205 8.40515C6.57494 8.35487 6.70662 8.32957 6.8394 8.33072C6.97218 8.33187 7.1034 8.35946 7.2254 8.41187C7.34741 8.46428 7.45775 8.54046 7.55 8.63597L12.5 13.586L17.45 8.63597C17.6386 8.45381 17.8912 8.35302 18.1534 8.35529C18.4156 8.35757 18.6664 8.46274 18.8518 8.64815C19.0372 8.83356 19.1424 9.08437 19.1447 9.34657C19.147 9.60876 19.0462 9.86137 18.864 10.05L13.207 15.707Z" fill="#828282" />
                        </svg>
                    </button>
                    <ul className={`absolute left-0 w-full mt-2 bg-white rounded-md shadow-md transition-max-height duration-300 overflow-hidden ${menu ? 'max-h-40' : 'max-h-0'}`}>
                        <li className="px-4 py-2 cursor-pointer w-full flex hover:bg-gray-100">
                            <Link href="/settings" className="w-full h-full text-[14px] text-nowrap">{t(`myProfile`)}</Link>
                        </li>
                        <li onClick={() => dispatch(setIsLogOut(true))} className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-nowrap">{t(`logout`)}</li>
                    </ul>
                </div> :
                <div className="flex flex-row items-center gap-1 xl:gap-2.5">
                    <Link href={`/${locale}` + '/login'} className="flex items-center flex-row gap-1.5 px-2 lg:px-3.5 h-[28px] lg:h-[36px] text-white text-[10px] lg:text-[14px] rounded-full border border-white bg-[#C3B49A]">
                        {t('nav.login')}
                    </Link>
                    <Link href={`/${locale}` + '/sign-up'} className="flex flex-row items-center gap-1.5 px-2 lg:px-3.5  h-[28px] lg:h-[36px]  text-[10px] lg:text-[14px] text-[#C3B49A] rounded-full bg-[#C3B49A29]">
                        {t('nav.signUp')}
                    </Link>
                </div>
            }
        </div>
    )
}
