'use client'
import { RootState } from '@/utils/redux/store'
import Link from 'next/link'
import React from 'react'
import { useSelector } from 'react-redux'

export default function SocialMedia() {
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
        <div className="hidden lg:flex  flex-row gap-4">
            {/* Linkedin */}
            <Link href={linkedin_url || ''} className="w-6 h-6 rounded-full bg-[#fff] flex items-center justify-center border-[1px] border-[#4A3F35] outline-4 outline-[#fff]">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_304_522)">
                        <path fillRule="evenodd" clipRule="evenodd" d="M3.26561 3.12206H5.0722V4.04824H5.09834C5.34993 3.59688 5.96513 3.12206 6.88251 3.12206C8.79018 3.12206 9.14299 4.30925 9.14299 5.85365V8.99963H7.25894V6.21085C7.25894 5.54605 7.2451 4.69025 6.27929 4.69025C5.29829 4.69025 5.14794 5.41394 5.14794 6.16242V8.99963H3.26559V3.12206H3.26561ZM1.95947 1.48942C1.95947 2.03021 1.5206 2.46908 0.979812 2.46908C0.439028 2.46908 0 2.03021 0 1.48942C0 0.948637 0.439028 0.509766 0.979812 0.509766C1.5206 0.509766 1.95947 0.948637 1.95947 1.48942ZM0 3.12206H1.95947V8.99963H0V3.12206Z" fill="#4A3F35" />
                    </g>
                    <defs>
                        <clipPath id="clip0_304_522">
                            <rect width="9.14284" height="9.14286" fill="white" />
                        </clipPath>
                    </defs>
                </svg>
            </Link>
            {/* X */}
            <Link href={twitter_url || ""} className="w-6 h-6 rounded-full bg-[#fff] flex items-center justify-center border-[1px] border-[#4A3F35] outline-4 outline-[#fff]">
                <svg width="11" height="10" viewBox="0 0 11 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.09998 0H9.67798L6.23141 3.93814L10.2857 9.29785H7.11213L4.6247 6.048L1.78157 9.29785H0.201L3.88671 5.08457L0 0H3.25414L5.50027 2.97043L8.09998 0ZM7.54584 8.35456H8.41969L2.77799 0.893999H1.83942L7.54584 8.35456Z" fill="#4A3F35" />
                </svg>
            </Link>
            {/* Insta */}
            <Link href={instagram_url || ""} className="w-6 h-6 rounded-full bg-[#fff] flex items-center justify-center border-[1px] border-[#4A3F35] outline-4 outline-[#fff]">
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M2.96863 0H7.31726C8.95029 0 10.2857 1.31889 10.2857 2.93009V7.26697C10.2857 8.87856 8.95029 10.1971 7.31726 10.1971H2.96863C1.3356 10.1971 0 8.87856 0 7.26697V2.93009C0 1.31889 1.33558 0 2.96863 0ZM5.11514 2.34545C6.70204 2.34545 7.9898 3.6332 7.9898 5.22011C7.9898 6.80721 6.70204 8.09478 5.11514 8.09478C3.52785 8.09478 2.24029 6.80721 2.24029 5.22011C2.24029 3.6332 3.52785 2.34545 5.11514 2.34545ZM5.11514 3.31639C6.166 3.31639 7.01886 4.16907 7.01886 5.22011C7.01886 6.27115 6.16598 7.12403 5.11514 7.12403C4.06391 7.12403 3.21122 6.27117 3.21122 5.22011C3.21122 4.16907 4.06391 3.31639 5.11514 3.31639ZM7.89621 1.94702C8.154 1.94702 8.36299 2.15601 8.36299 2.41361C8.36299 2.67139 8.154 2.88039 7.89621 2.88039C7.63862 2.88039 7.42963 2.67139 7.42963 2.41361C7.42963 2.15601 7.63862 1.94702 7.89621 1.94702ZM3.32397 0.83295H6.96229C8.32843 0.83295 9.44573 1.94474 9.44573 3.30332V6.95986C9.44573 8.31841 8.32845 9.43002 6.96229 9.43002H3.32397C1.95782 9.43002 0.840341 8.31841 0.840341 6.95984V3.30329C0.840341 1.94474 1.95782 0.83295 3.32397 0.83295Z" fill="#4A3F35" />
                </svg>
            </Link>
            {/* Facebook */}
            <Link href={facebook_url || ""} className="w-6 h-6 rounded-full bg-[#fff] flex items-center justify-center border-[1px] border-[#4A3F35] outline-4 outline-[#fff]">
                <svg width="6" height="11" viewBox="0 0 6 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M3.53563 1.92859H5.14265V0H3.53563C2.29514 0 1.28586 1.00929 1.28586 2.24977V3.21406H0V5.14285H1.28547V10.2857H3.21425V5.14285H4.82129L5.14265 3.21408H3.21425V2.24977C3.21425 2.07551 3.36137 1.92841 3.53561 1.92841V1.9286L3.53563 1.92859Z" fill="#4A3F35" />
                </svg>
            </Link>
        </div>
    )
}
