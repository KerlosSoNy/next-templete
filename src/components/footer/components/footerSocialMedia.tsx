"use client"
import { RootState } from '@/utils/redux/store'
import Link from 'next/link'
import React from 'react'
import { useSelector } from 'react-redux'

export default function FooterSocialMedia() {
    const webDetails = useSelector((state: RootState) => state?.footerSlice?.footerData)
    const webObject = Object.fromEntries(
        webDetails.map(item => [item.key, item.value])
    )
    const {
        facebook_url,
        instagram_url,
        linkedin_url,
        twitter_url,
    } = webObject
    return (
        <div className="flex  flex-row gap-4 pt-3.5">
            {/* Linkedin */}
            <Link href={linkedin_url || ''} className="w-8 h-8 rounded-full bg-[#CFAA45] flex items-center justify-center border border-[#fff] outline-4 outline-[#CFAA45]">
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_166_20943)">
                        <path fillRule="evenodd" clipRule="evenodd" d="M4.35415 4.16275H6.76295V5.39765H6.79781C7.13326 4.79584 7.95352 4.16275 9.1767 4.16275C11.7203 4.16275 12.1907 5.74567 12.1907 7.80487V11.9995H9.67861V8.28114C9.67861 7.39474 9.66015 6.25367 8.3724 6.25367C7.0644 6.25367 6.86394 7.21858 6.86394 8.21656V11.9995H4.35413V4.16275H4.35415ZM2.61263 1.9859C2.61263 2.70694 2.02747 3.29211 1.30642 3.29211C0.585371 3.29211 0 2.70694 0 1.9859C0 1.26485 0.585371 0.679688 1.30642 0.679688C2.02747 0.679688 2.61263 1.26485 2.61263 1.9859ZM0 4.16275H2.61263V11.9995H0V4.16275Z" fill="white" />
                    </g>
                    <defs>
                        <clipPath id="clip0_166_20943">
                            <rect width="12.1905" height="12.1905" fill="white" />
                        </clipPath>
                    </defs>
                </svg>
            </Link>
            {/* X */}
            <Link href={twitter_url || ""} className="w-8 h-8 rounded-full bg-[#CFAA45] flex items-center justify-center border border-[#fff] outline-4 outline-[#CFAA45]">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_166_20945)">
                        <path d="M10.8 0.660156H12.904L8.30857 5.91101L13.7143 13.0573H9.48286L6.16629 8.72416L2.37543 13.0573H0.268L5.18229 7.43958L0 0.660156H4.33886L7.33371 4.62073L10.8 0.660156ZM10.0611 11.7996H11.2263L3.704 1.85216H2.45257L10.0611 11.7996Z" fill="white" />
                    </g>
                    <defs>
                        <clipPath id="clip0_166_20945">
                            <rect width="13.7143" height="13.7143" fill="white" />
                        </clipPath>
                    </defs>
                </svg>
            </Link>
            {/* Insta */}
            <Link href={instagram_url || ""} className="w-8 h-8 rounded-full bg-[#CFAA45] flex items-center justify-center border border-[#fff] outline-4 outline-[#CFAA45]">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M3.95818 0H9.75636C11.9337 0 13.7143 1.75851 13.7143 3.90679V9.68929C13.7143 11.8381 11.9337 13.5961 9.75636 13.5961H3.95818C1.7808 13.5961 0 11.8381 0 9.68929V3.90679C0 1.75851 1.78078 0 3.95818 0ZM6.8202 3.12726C8.93608 3.12726 10.6531 4.84427 10.6531 6.96015C10.6531 9.07629 8.93608 10.793 6.8202 10.793C4.70381 10.793 2.98706 9.07629 2.98706 6.96015C2.98706 4.84427 4.70381 3.12726 6.8202 3.12726ZM6.8202 4.42185C8.22135 4.42185 9.3585 5.55876 9.3585 6.96015C9.3585 8.36154 8.22133 9.49871 6.8202 9.49871C5.41856 9.49871 4.28164 8.36156 4.28164 6.96015C4.28164 5.55876 5.41856 4.42185 6.8202 4.42185ZM10.5283 2.59603C10.872 2.59603 11.1507 2.87469 11.1507 3.21814C11.1507 3.56186 10.872 3.84051 10.5283 3.84051C10.1849 3.84051 9.90619 3.56186 9.90619 3.21814C9.90619 2.87469 10.1849 2.59603 10.5283 2.59603ZM4.43196 1.1106H9.28307C11.1046 1.1106 12.5943 2.59299 12.5943 4.40443V9.27981C12.5943 11.0912 11.1046 12.5734 9.28307 12.5734H4.43196C2.61043 12.5734 1.12046 11.0912 1.12046 9.27979V4.40439C1.12046 2.59299 2.61043 1.1106 4.43196 1.1106Z" fill="white" />
                </svg>

            </Link>
            {/* Facebook */}
            <Link href={facebook_url || ""} className="w-8 h-8 rounded-full bg-[#CFAA45] flex items-center justify-center border border-[#fff] outline-4 outline-[#CFAA45]">
                <svg width="7" height="14" viewBox="0 0 7 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M4.71418 2.57145H6.85688V0H4.71418C3.06019 0 1.71448 1.34571 1.71448 2.9997V4.28541H0V6.85714H1.71396V13.7143H4.28567V6.85714H6.4284L6.85688 4.28544H4.28567V2.9997C4.28567 2.76735 4.48183 2.57121 4.71416 2.57121V2.57147L4.71418 2.57145Z" fill="white" />
                </svg>
            </Link>
        </div>
    )
}
