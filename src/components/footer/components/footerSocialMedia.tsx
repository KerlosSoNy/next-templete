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
        <div className="flex  flex-row gap-4">
            {/* Linkedin */}
            <Link href={linkedin_url || ''} className="w-[34px] h-[34px] rounded-full bg-[#fff] flex items-center justify-center border-[1px] border-[#4A3F35] outline-4 outline-[#fff]">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_333_10388)">
                        <path fillRule="evenodd" clipRule="evenodd" d="M4.95962 5.33943H7.51896V6.6515H7.556C7.91241 6.01208 8.78394 5.33943 10.0836 5.33943C12.7861 5.33943 13.2859 7.02127 13.2859 9.20917V13.666H10.6168V9.71521C10.6168 8.77341 10.5972 7.56102 9.229 7.56102C7.83925 7.56102 7.62627 8.58625 7.62627 9.6466V13.666H4.9596V5.33943H4.95962ZM3.10925 3.02652C3.10925 3.79263 2.48752 4.41437 1.72141 4.41437C0.955299 4.41437 0.333344 3.79263 0.333344 3.02652C0.333344 2.26041 0.955299 1.63867 1.72141 1.63867C2.48752 1.63867 3.10925 2.26041 3.10925 3.02652ZM0.333344 5.33943H3.10925V13.666H0.333344V5.33943Z" fill="#4A3F35" />
                    </g>
                    <defs>
                        <clipPath id="clip0_333_10388">
                            <rect width="12.9524" height="12.9524" fill="white" transform="translate(0.333344 0.916504)" />
                        </clipPath>
                    </defs>
                </svg>
            </Link>
            {/* X */}
            <Link href={twitter_url || ""} className="w-[34px] h-[34px] rounded-full bg-[#fff] flex items-center justify-center border-[1px] border-[#4A3F35] outline-4 outline-[#fff]">
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.6871 0.916504H13.9226L9.03999 6.49553L14.7836 14.0885H10.2877L6.76382 9.4845L2.73605 14.0885H0.496908L5.71832 8.11964L0.212158 0.916504H4.82218L8.00421 5.12461L11.6871 0.916504ZM10.9021 12.7521H12.1401L4.14765 2.183H2.81801L10.9021 12.7521Z" fill="#4A3F35" />
                </svg>
            </Link>
            {/* Insta */}
            <Link href={instagram_url || ""} className="w-[34px] h-[34px] rounded-full bg-[#fff] flex items-center justify-center border-[1px] border-[#4A3F35] outline-4 outline-[#fff]">
                <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M4.41747 0.916504H10.578C12.8915 0.916504 14.7833 2.78493 14.7833 5.06747V11.2114C14.7833 13.4945 12.8915 15.3623 10.578 15.3623H4.41747C2.10401 15.3623 0.211914 13.4945 0.211914 11.2114V5.06747C0.211914 2.78493 2.10399 0.916504 4.41747 0.916504ZM7.45836 4.23922C9.70648 4.23922 11.5308 6.06354 11.5308 8.31166C11.5308 10.5601 9.70648 12.3841 7.45836 12.3841C5.2097 12.3841 3.38565 10.5601 3.38565 8.31166C3.38565 6.06354 5.2097 4.23922 7.45836 4.23922ZM7.45836 5.61472C8.94708 5.61472 10.1553 6.82269 10.1553 8.31166C10.1553 9.80063 8.94706 11.0089 7.45836 11.0089C5.96912 11.0089 4.76115 9.80066 4.76115 8.31166C4.76115 6.82269 5.96912 5.61472 7.45836 5.61472ZM11.3982 3.67478C11.7634 3.67478 12.0595 3.97086 12.0595 4.33578C12.0595 4.70098 11.7634 4.99705 11.3982 4.99705C11.0333 4.99705 10.7372 4.70098 10.7372 4.33578C10.7372 3.97086 11.0333 3.67478 11.3982 3.67478ZM4.92087 2.09652H10.0752C12.0105 2.09652 13.5934 3.67155 13.5934 5.59621V10.7763C13.5934 12.7009 12.0106 14.2757 10.0752 14.2757H4.92087C2.98549 14.2757 1.4024 12.7009 1.4024 10.7763V5.59616C1.4024 3.67155 2.98549 2.09652 4.92087 2.09652Z" fill="#4A3F35" />
                </svg>
            </Link>
            {/* Facebook */}
            <Link href={facebook_url || ""} className="w-[34px] h-[34px] rounded-full bg-[#fff] flex items-center justify-center border-[1px] border-[#4A3F35] outline-4 outline-[#fff]">
                <svg width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M5.7715 3.64867H8.04812V0.916504H5.7715C4.01414 0.916504 2.58433 2.34632 2.58433 4.10368V5.46975H0.762695V8.20221H2.58378V15.4879H5.31621V8.20221H7.59286L8.04812 5.46978H5.31621V4.10368C5.31621 3.85681 5.52463 3.64842 5.77148 3.64842V3.64869L5.7715 3.64867Z" fill="#4A3F35" />
                </svg>
            </Link>
        </div>
    )
}
