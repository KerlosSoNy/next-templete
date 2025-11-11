'use client';
import React, { useRef } from 'react'
import { Slider, SliderRef } from '../common/slider'
import { useLocale } from 'next-intl';
import Image from 'next/image';
import FeaturedBadge from '../common/featuredBadge/featuredBadge';
import NewBadge from '../common/newBadge/newBadge';

export default function CategoriesSlider() {
    const locale = useLocale();
    const sliderRef = useRef<SliderRef>(null);
    return (
        <div className='pt-[70px] xl:pt-[107px] pb-[100px] flex flex-col items-center justify-center'>
            <span className='text-[22px] font-bold text-black'>اكتشفي <span className='text-[#CFAA45]'>فئات</span> عناية مهرة المتكاملة لجمالك الطبيعي</span>
            <span className='text-[#00000099] text-[14px] mt-3.5'>استكشفي مجموعتنا المتنوعة, كل فئة تمنحك لمسة فريدة تليق بك.</span>
            <div className='flex flex-row items-center gap-6 lg:gap-[66px] mt-[37px]'>
                <button onClick={() => sliderRef.current?.prev()} type='button' title='Prev'>
                    <svg width="19" height="14" viewBox="0 0 19 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.75 6.82143H17.75M17.75 6.82143L11.7138 0.75M17.75 6.82143L11.7138 12.8929" stroke="#CDA63D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
                <div className='w-[580px] lg:w-[720px] xl:w-[1074px] max-w-[820px] xl:max-w-[1074px] relative overflow-x-hidden'>
                    <Slider
                        ref={sliderRef}
                        breakpoints={{
                            768: {
                                slidesPerView: 1.5,
                                spaceBetween: 24
                            },
                            1024: {
                                slidesPerView: 2,
                                spaceBetween: 24
                            },
                            1280: {
                                slidesPerView: 3,
                                spaceBetween: 24
                            }
                        }}
                        direction={locale === "ar" ? "rtl" : "ltr"} slidesToShow={3} gap={24} loop autoScroll showDots={false} showButtons={false}>
                        <div className='w-full relative h-[490px] flex flex-col items-center justify-between rounded-[14px] p-6 bg-gradient-to-r from-[#edd260] to-[#f9f0ac]'>
                            <Image src='https://images.unsplash.com/photo-1620651546004-fec141c54129?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=774' fill alt='category' className='object-cover rounded-[14px]' />
                            <div className='flex flex-row items-center gap-1 justify-center rounded-full py-1.5 ps-1.5 pe-3 bg-[#00000029] backdrop-blur-xl'>
                                <FeaturedBadge />
                                <NewBadge />
                                <span className='font-medium text-[16px] text-white'>فئة العناية بالبشرة</span>
                            </div>
                            <div className='flex flex-col w-full z-5 relative'>
                                <div className='rounded-xl h-[124px] w-full bg-transparent'>
                                    <div className='categoryCard-clip-path bg-[#FFFFFF33] px-3 pt-3 overflow-hidden rounded-xl backdrop-blur-xl w-full h-[124px] flex flex-col justify-start'>
                                        <span className='text-white line-clamp-2 text-[14px]'>مجموعة من منتجات التجميل المصنوعة من أفضل المكونات الطبيعية، خالية من المواد...</span>
                                        <div className='flex flex-row items-center gap-5 mt-2'>
                                            <div className='flex flex-row items-center gap-1'>
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M11.7183 2.95471L10.385 2.25471C9.21434 1.64071 8.62901 1.33337 7.99967 1.33337C7.37034 1.33337 6.78501 1.64004 5.61434 2.25471L5.40034 2.36737L11.349 5.76671L14.0263 4.42671C13.5957 3.93871 12.901 3.57404 11.7183 2.95337M14.4983 5.30937L11.833 6.64271V8.66671C11.833 8.79932 11.7803 8.92649 11.6866 9.02026C11.5928 9.11403 11.4656 9.16671 11.333 9.16671C11.2004 9.16671 11.0732 9.11403 10.9795 9.02026C10.8857 8.92649 10.833 8.79932 10.833 8.66671V7.14271L8.49967 8.30937V14.6027C8.97834 14.4834 9.52301 14.198 10.385 13.7454L11.7183 13.0454C13.1523 12.2927 13.8697 11.9167 14.2683 11.24C14.6663 10.564 14.6663 9.72204 14.6663 8.04004V7.96204C14.6663 6.70004 14.6663 5.91071 14.4983 5.30937ZM7.49967 14.6027V8.30937L1.50101 5.30937C1.33301 5.91071 1.33301 6.70004 1.33301 7.96071V8.03871C1.33301 9.72204 1.33301 10.564 1.73101 11.24C2.12967 11.9167 2.84701 12.2934 4.28101 13.046L5.61434 13.7454C6.47634 14.198 7.02101 14.4834 7.49967 14.6027ZM1.97301 4.42737L7.99967 7.44071L10.2737 6.30404L4.34967 2.91871L4.28101 2.95471C3.09901 3.57471 2.40367 3.93937 1.97301 4.42804" fill="#F3C600" />
                                                </svg>
                                                <span className='text-white font-bold text-[14px]'>400</span>
                                                <span className='text-white font-light text-[12px] -ms-px'>قسم</span>
                                            </div>
                                            <div className='flex flex-row items-center gap-1'>
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M5.61153 2.16667C5.7982 1.77333 6.20087 1.5 6.6662 1.5H9.33287C9.7982 1.5 10.2002 1.77333 10.3875 2.16667C10.8429 2.17067 11.1982 2.19133 11.5155 2.31533C11.8944 2.46351 12.2238 2.71534 12.4662 3.042C12.7109 3.37133 12.8262 3.79333 12.9835 4.374L13.4782 6.18867L13.6649 6.74933L13.6809 6.76933C14.2815 7.53867 13.9955 8.68267 13.4235 10.97C13.0595 12.4253 12.8782 13.1527 12.3355 13.5767C11.7929 14 11.0429 14 9.54287 14H6.4562C4.9562 14 4.2062 14 3.66353 13.5767C3.12087 13.1527 2.93887 12.4253 2.57553 10.97C2.00353 8.68267 1.71753 7.53867 2.3182 6.76933L2.3342 6.74933L2.52087 6.18867L3.01553 4.374C3.17353 3.79333 3.28887 3.37067 3.53287 3.04133C3.77535 2.71492 4.1048 2.46333 4.48353 2.31533C4.80087 2.19133 5.15553 2.17 5.61153 2.16667ZM5.61287 3.16867C5.17153 3.17333 4.9942 3.19 4.84753 3.24733C4.64351 3.32712 4.46607 3.46274 4.33553 3.63867C4.2182 3.79667 4.14887 4.01733 3.95553 4.72867L3.57553 6.12133C4.25553 6 5.18487 6 6.45553 6H9.54287C10.8142 6 11.7429 6 12.4229 6.12L12.0435 4.72733C11.8502 4.016 11.7809 3.79533 11.6635 3.63733C11.533 3.46141 11.3556 3.32579 11.1515 3.246C11.0049 3.18867 10.8275 3.172 10.3862 3.16733C10.2915 3.36656 10.1423 3.53488 9.95591 3.65276C9.76947 3.77064 9.55344 3.83325 9.33287 3.83333H6.6662C6.4457 3.83331 6.22971 3.7708 6.04329 3.65304C5.85686 3.53528 5.70762 3.36777 5.61287 3.16867Z" fill="#F3C600" />
                                                </svg>
                                                <span className='text-white font-bold text-[14px]'>3,567</span>
                                                <span className='text-white font-light text-[12px] -ms-px'>منتج</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button title='Show' type='button' className='w-10 h-10 flex items-center justify-center rounded-full border border-transparent outline outline-[#CDA63D] mx-auto -mt-6'>
                                    <div className='w-8 h-8 bg-[#CDA63D] flex items-center justify-center rounded-full'>
                                        <svg className='w-[17px] h-2.5' width="19" height="14" viewBox="0 0 19 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M17.75 6.82143H0.750002M0.750002 6.82143L6.78621 0.75M0.750002 6.82143L6.78621 12.8929" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </Slider>
                </div>
                <button onClick={() => sliderRef.current?.next()} type='button' title='Prev'>
                    <svg width="19" height="14" viewBox="0 0 19 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.75 6.82143H0.750002M0.750002 6.82143L6.78621 0.75M0.750002 6.82143L6.78621 12.8929" stroke="#CDA63D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </div>
        </div>
    )
}
