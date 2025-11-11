'use client';
import React, { useRef } from 'react'
import MostSellerCard from './mostSellerCard'
import { Slider, SliderRef } from '../common/slider'
import { useLocale } from 'next-intl';

export default function RelatedProducts() {
    const sliderRef = useRef<SliderRef>(null);
    const locale = useLocale();
    return (
        <div className='flex flex-col items-center justify-center pt-[100px] pb-20'>
            <div className='w-full flex flex-row items-center gap-[34px] max-w-[620px] lg:max-w-[820px] xl:max-w-[1012px]'>
                <div className='w-full h-px bg-[#0000004D]' />
                <span className='text-[22px] shrink-0 text-nowrap font-medium text-black'>منتجات ذات صلة</span>
                <div className='w-full h-px bg-[#0000004D]' />
            </div>
            <div className='w-[620px] lg:w-[820px] xl:w-[1012px] relative mt-7 overflow-x-hidden'>
                <Slider
                    ref={sliderRef}
                    breakpoints={{
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 16
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 16
                        },
                        1280: {
                            slidesPerView: 4,
                            spaceBetween: 16
                        }
                    }}
                    direction={locale === "ar" ? "rtl" : "ltr"} slidesToShow={4} gap={16} loop autoScroll showDots={false} showButtons={false}>
                    {
                        [1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => (
                            <MostSellerCard key={index} />
                        ))
                    }
                </Slider>
            </div>
            <div className='w-full flex flex-row items-center justify-center gap-5 mt-6'>
                <button onClick={() => sliderRef.current?.prev()} type='button' title='prev' className='w-[34px] h-[34px] rounded-full flex items-center justify-center bg-[#CDA63D]'>
                    <svg width="19" height="14" viewBox="0 0 19 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.75 6.82143H17.75M17.75 6.82143L11.7138 0.75M17.75 6.82143L11.7138 12.8929" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
                <button onClick={() => sliderRef.current?.next()} type='button' title='next' className='w-[34px] h-[34px] rounded-full flex items-center justify-center bg-[#E6D7AD]'>
                    <svg width="19" height="14" viewBox="0 0 19 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.75 6.82143H0.750002H17.75ZM0.750002 6.82143L6.78621 0.75L0.750002 6.82143ZM0.750002 6.82143L6.78621 12.8929L0.750002 6.82143Z" fill="#E6D7AD" />
                        <path d="M17.75 6.82143H0.750002M0.750002 6.82143L6.78621 0.75M0.750002 6.82143L6.78621 12.8929" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </div>
        </div>
    )
}
