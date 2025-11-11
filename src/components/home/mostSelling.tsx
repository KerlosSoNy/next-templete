'use client';
import { Link } from '@/i18n/navigation'
import Image from 'next/image'
import React, { useRef } from 'react'
import { Slider, SliderRef } from '../common/slider';
import { useLocale } from 'next-intl';
import MostSellerCard from './mostSellerCard';

export default function MostSelling() {
    const sliderRef = useRef<SliderRef>(null);
    const locale = useLocale();
    return (
        <div className='flex flex-col items-center w-full relative'>
            <div className='w-full h-[130px] absolute top-0 left-0'>
                <div className='relative w-full h-full bg-[#683C15]'>

                </div>
            </div>
            <div className='flex flex-row items-start gap-6 py-11 px-[150px] relative'>
                <div className='w-[280px] lg:w-[361px] h-[524px] relative bg-white/60 backdrop-blur-[34px] flex flex-col items-center justify-center mt-7 lg:mt-5 px-4 lg:px-10'>
                    <div className='relative -mt-20 rotate-y-180 flex w-full flex-row justify-start px-10'>
                        <Image width={103} height={96} alt='shadow' src={'/images/banner/batterfly.png'} />
                    </div>
                    <span className='text-text font-extrabold text-[26px] lg:text-[32px] leading-[46px] text-center mt-[33px]'>اكتشفي سرّ جمالك مع <span className='text-[#CFAA45]'>أكثر منتجات مهرة طلباً</span> وإلهاماً للجمال الطبيعي</span>
                    <Link href="#" className='text-[12px] font-medium text-white rounded-full flex items-center justify-center px-4 h-[30px] bg-[#B7623F] relative z-4 mt-6'>
                        اكتشف المزيد
                    </Link>
                    <div className='absolute bottom-0 start-0'>
                        <div className='relative w-[135px] lg:w-[168px] h-[120px] lg:h-[145px]'>
                            <Image src='/images/banner/flower.png' alt='flower' fill />
                        </div>
                    </div>
                </div>
                <div className='flex flex-col w-[372px] lg:w-[472px] xl:w-[755px] relative z-4'>
                    <span className='text-[22px] font-bold text-[#F3C600]'>الأكثر طلباً</span>
                    <span className='text-[14px] font-normal text-white/60 mt-2'>اكتشفي المنتجات اللي حبتها الزبونات وصارت المفضلة من مهرة.</span>
                    <div className='w-full flex flex-row items-center justify-end gap-5 mt-2'>
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
                    <div className='w-[372px] xl:w-[755px] h-[443px] relative overflow-x-hidden mt-[9px]'>
                        <Slider
                            ref={sliderRef}
                            direction={locale === "ar" ? "rtl" : "ltr"}
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
                            slidesToShow={3} gap={24} loop autoScroll showDots={false} showButtons={false}>
                            {
                                [1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => (
                                    <MostSellerCard key={index} />
                                ))
                            }
                        </Slider>
                    </div>
                </div>
            </div>
        </div>
    )
}
