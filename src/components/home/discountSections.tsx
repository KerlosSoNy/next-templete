'use client';
import { Link } from '@/i18n/navigation'
import { useLocale } from 'next-intl';
import Image from 'next/image'
import React, { useRef } from 'react'
import { Slider, SliderRef } from '../common/slider';

export default function DiscountSections() {
    const sliderRef = useRef<SliderRef>(null);
    const locale = useLocale();
    return (
        <div className='w-full py-[50px] flex flex-col items-center justify-center'>
            <span className='max-w-[556px] text-center text-[32px] font-extrabold text-text'><span className="text-[#CFAA45]">خصومات مميزة</span> لمنتجاتك المفضلة دائماً</span>
            <Link href="#" className='text-[12px] font-medium text-white rounded-full flex items-center justify-center px-4 h-[30px] bg-[#B7623F] relative z-4 mt-[15px]'>
                اكتشف المزيد
            </Link>
            <div className='w-[620px] lg:w-[920px] xl:w-[1200px] 2xl:w-[1320px] max-w-[1200px] 2xl:max-w-[1320px] h-[550px] mx-auto overflow-hidden mt-6'>
                <Slider
                    ref={sliderRef}
                    breakpoints={{
                        768: {
                            slidesPerView: 1.5,
                            spaceBetween: 14
                        },
                        1024: {
                            slidesPerView: 2,
                            spaceBetween: 14
                        },
                        1280: {
                            slidesPerView: 3,
                            spaceBetween: 24
                        }
                    }}
                    direction={locale === "ar" ? "rtl" : "ltr"} slidesToShow={3} gap={24} loop autoScroll showDots={false} showButtons={false}>
                    {
                        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, index: number) => {
                            return (
                                <div key={index} className='h-[550px] gap-6 flex flex-col items-start justify-between w-full relative overflow-hidden bg-white rounded-[14px] px-4 pt-4 pb-4'>
                                    <div className='w-full h-full absolute top-0 end-0 '>
                                        <div className='relative w-full h-full'>
                                            <Image fill src='https://images.unsplash.com/photo-1580870069867-74c57ee1bb07?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870' alt='Discount Banner' className='w-full object-cover' />
                                        </div>
                                    </div>
                                    <div className='flex flex-row items-center justify-between gap-[11px] w-full relative z-2'>
                                        <div className='flex flex-col w-full max-w-[200px] 2xl:max-w-[253px]'>
                                            <span className='text-white text-[23px] font-bold'>زيت شعر مهرة لتكثيف الشعر </span>
                                            <div className='flex flex-col 2xl:flex-row items-start 2xl:items-center gap-1 2xl:gap-2.5 mt-1'>
                                                <div className='flex flex-row gap-1 items-center bg-[#FFC7001A] px-1.5 backdrop-blur-xl rounded-[5px] h-5'>
                                                    <span className='text-[10px] text-white font-normal'> (1,890) <span className='font-medium'>4.9</span></span>
                                                    {
                                                        Array.from({ length: 5 }).map((_, starIndex) => (
                                                            <svg key={starIndex} width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M4.01242 2.37071C4.56764 1.37471 4.84525 0.876709 5.26029 0.876709C5.67533 0.876709 5.95294 1.37471 6.50815 2.37071L6.65179 2.62839C6.80957 2.91142 6.88845 3.05294 7.01145 3.14631C7.13446 3.23969 7.28764 3.27435 7.59402 3.34367L7.87296 3.40678C8.95112 3.65073 9.4902 3.7727 9.61845 4.18513C9.74671 4.59756 9.3792 5.02732 8.64418 5.88683L8.45402 6.10919C8.24515 6.35344 8.14072 6.47556 8.09374 6.62664C8.04675 6.77772 8.06254 6.94066 8.09412 7.26654L8.12287 7.56322C8.23399 8.70999 8.28956 9.28337 7.95378 9.53827C7.61801 9.79317 7.11327 9.56077 6.10378 9.09597L5.84262 8.97572C5.55576 8.84364 5.41232 8.7776 5.26029 8.7776C5.10825 8.7776 4.96482 8.84364 4.67796 8.97572L4.41679 9.09597C3.40731 9.56077 2.90257 9.79317 2.56679 9.53827C2.23102 9.28337 2.28658 8.70999 2.39771 7.56322L2.42645 7.26654C2.45803 6.94066 2.47382 6.77772 2.42684 6.62664C2.37986 6.47556 2.27542 6.35344 2.06655 6.10919L1.8764 5.88683C1.14138 5.02732 0.773868 4.59756 0.902123 4.18513C1.03038 3.7727 1.56946 3.65073 2.64762 3.40678L2.92655 3.34367C3.23293 3.27435 3.38612 3.23969 3.50912 3.14631C3.63212 3.05294 3.71101 2.91142 3.86878 2.62839L4.01242 2.37071Z" fill="#FFC700" />
                                                            </svg>
                                                        ))
                                                    }
                                                </div>
                                                <div className='flex flex-row gap-1 items-center bg-[#FFC7001A] px-1.5 backdrop-blur-xl rounded-[5px] h-5'>
                                                    <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M5.85258 2.32872C7.2203 2.32872 8.32905 3.43747 8.32905 4.80521C8.32905 6.17296 7.2203 7.28168 5.85258 7.28168C4.48487 7.28168 3.37612 6.17296 3.37612 4.80521C3.37612 3.43747 4.48487 2.32872 5.85258 2.32872ZM6.07721 9.35256V14L10.6615 12.2175V9.31123L7.07696 10.705C6.97271 10.7453 6.85672 10.7022 6.8025 10.6084L6.07721 9.35256ZM5.62796 14V9.35256L4.90287 10.6085C4.87524 10.6562 4.831 10.692 4.7786 10.7092C4.72621 10.7263 4.66934 10.7235 4.61886 10.7014L1.04367 9.31123V12.2175L5.62796 14ZM10.7881 6.8365L6.1772 8.62932L7.09429 10.2178L11.7052 8.42497L10.7881 6.8365ZM5.52797 8.62932L0.917089 6.8365L0 8.42497L4.61091 10.2178L5.52797 8.62932ZM5.85258 7.73093C4.62268 7.73093 3.57003 6.97203 3.13734 5.89695L1.43684 6.55813L5.85258 8.27511L10.2683 6.55813L8.56783 5.89695C8.13514 6.97203 7.08255 7.73093 5.85258 7.73093ZM10.374 4.63969C10.4336 4.63969 10.4907 4.66336 10.5329 4.70548C10.575 4.74761 10.5987 4.80474 10.5987 4.86432C10.5987 4.92389 10.575 4.98103 10.5329 5.02315C10.4907 5.06528 10.4336 5.08894 10.374 5.08894H9.32198C9.26241 5.08894 9.20527 5.06528 9.16315 5.02315C9.12102 4.98103 9.09735 4.92389 9.09735 4.86432C9.09735 4.80474 9.12102 4.74761 9.16315 4.70548C9.20527 4.66336 9.26241 4.63969 9.32198 4.63969H10.374ZM5.62796 0.224597C5.62797 0.165028 5.65164 0.107901 5.69376 0.0657813C5.73589 0.023662 5.79302 -4.65387e-10 5.85258 0C5.91215 -4.65387e-10 5.96928 0.023662 6.01141 0.0657813C6.05353 0.107901 6.0772 0.165028 6.07721 0.224597V1.27669C6.07721 1.33626 6.05354 1.3934 6.01142 1.43552C5.96929 1.47765 5.91216 1.50131 5.85258 1.50131C5.79301 1.50131 5.73588 1.47765 5.69375 1.43552C5.65163 1.3934 5.62796 1.33626 5.62796 1.27669V0.224597ZM3.36042 0.920206C3.3455 0.894726 3.33576 0.866543 3.33178 0.837282C3.3278 0.808021 3.32966 0.778261 3.33724 0.74972C3.34482 0.721179 3.35797 0.694422 3.37595 0.670992C3.39392 0.647563 3.41636 0.627924 3.44197 0.61321C3.46757 0.598497 3.49583 0.588998 3.52513 0.585264C3.55442 0.58153 3.58416 0.583633 3.61264 0.591453C3.64112 0.599272 3.66776 0.612654 3.69104 0.630824C3.71432 0.648995 3.73377 0.671595 3.74827 0.697321L4.27428 1.60843C4.28892 1.63389 4.2984 1.66199 4.30218 1.69112C4.30595 1.72025 4.30395 1.74984 4.29629 1.77819C4.28863 1.80655 4.27546 1.83312 4.25753 1.85638C4.2396 1.87965 4.21726 1.89915 4.19179 1.91378C4.14036 1.94333 4.07929 1.95124 4.02203 1.93577C3.96477 1.9203 3.916 1.88271 3.88644 1.83129L3.36042 0.920206ZM1.74385 2.65766C1.71838 2.64291 1.69606 2.6233 1.67817 2.59993C1.66029 2.57656 1.64718 2.54989 1.6396 2.52145C1.63202 2.49301 1.63012 2.46336 1.63401 2.43419C1.6379 2.40502 1.6475 2.3769 1.66226 2.35143C1.677 2.32597 1.69662 2.30366 1.71999 2.28577C1.74336 2.26789 1.77003 2.25478 1.79846 2.24721C1.8269 2.23963 1.85655 2.23773 1.88572 2.24161C1.91489 2.2455 1.94301 2.25509 1.96848 2.26984L2.87953 2.79586C2.93049 2.82588 2.96751 2.87483 2.98252 2.93204C2.99754 2.98924 2.98933 3.05006 2.95969 3.10124C2.93004 3.15242 2.88137 3.18981 2.82428 3.20525C2.76718 3.22069 2.7063 3.21293 2.6549 3.18367L1.74385 2.65766ZM1.21289 4.97073C1.15332 4.97073 1.09618 4.94707 1.05406 4.90494C1.01193 4.86282 0.988267 4.80568 0.988267 4.74611C0.988267 4.68653 1.01193 4.6294 1.05406 4.58728C1.09618 4.54515 1.15332 4.52148 1.21289 4.52148H2.26495C2.32453 4.52148 2.38166 4.54515 2.42379 4.58728C2.46591 4.6294 2.48958 4.68653 2.48958 4.74611C2.48958 4.80568 2.46591 4.86282 2.42379 4.90494C2.38166 4.94707 2.32453 4.97073 2.26495 4.97073H1.21289ZM7.94101 0.756426C8.00259 0.649364 8.13933 0.612413 8.24636 0.673932C8.27183 0.688559 8.29418 0.708061 8.31211 0.731325C8.33004 0.754589 8.34321 0.781158 8.35088 0.809515C8.35854 0.837872 8.36053 0.86746 8.35676 0.89659C8.35298 0.925719 8.3435 0.953819 8.32885 0.979282L7.8029 1.89039C7.78826 1.91586 7.76876 1.93819 7.74549 1.95612C7.72223 1.97405 7.69566 1.98722 7.6673 1.99488C7.63895 2.00254 7.60936 2.00454 7.58024 2.00077C7.55111 1.99699 7.52301 1.98752 7.49754 1.97288C7.47208 1.95825 7.44974 1.93875 7.43182 1.91548C7.41389 1.89222 7.40072 1.86565 7.39306 1.83729C7.3854 1.80894 7.3834 1.77935 7.38717 1.75023C7.39094 1.7211 7.40042 1.693 7.41505 1.66753L7.94101 0.756426ZM9.67765 2.37218C9.72908 2.3424 9.79023 2.33426 9.84766 2.34957C9.9051 2.36487 9.95409 2.40236 9.98388 2.45379C10.0137 2.50522 10.0218 2.56638 10.0065 2.62381C9.99119 2.68124 9.9537 2.73024 9.90227 2.76003L8.99116 3.28604C8.93979 3.31484 8.87914 3.32226 8.82234 3.3067C8.76554 3.29113 8.71715 3.25383 8.68763 3.20287C8.65812 3.1519 8.64985 3.09137 8.66461 3.03436C8.67938 2.97734 8.71599 2.92843 8.76654 2.8982L9.67765 2.37218ZM6.79031 3.67583L5.32328 5.14285L4.82271 4.51284C4.69953 4.35793 4.47414 4.33218 4.31921 4.45533C4.16427 4.57851 4.1385 4.80389 4.26168 4.95883L4.99839 5.88594C5.12584 6.06842 5.38814 6.09338 5.5469 5.9346L7.29794 4.18356C7.4381 4.04337 7.4381 3.81605 7.29794 3.67585C7.15777 3.53566 6.93053 3.53566 6.79031 3.67583Z" fill="#B7623F" />
                                                    </svg>
                                                    <span className='font-semibold text-white text-[10px]'>458</span>
                                                    <span className='font-normal text-white text-[10px]'>تم البيع</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='flex flex-col w-full max-w-[124px]'>
                                            <div className='flex flex-row items-end'>
                                                <span className='text-[74px] font-extrabold leading-[75px] text-white'>20</span>
                                                <span className='text-[24px] font-extrabold text-white'>%</span>
                                            </div>
                                            <div className='flex flex-row justify-end w-full'>
                                                <span className='font-medium text-white text-[18px]'>خصم</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='bg-transparent rounded-[14px] w-full h-[104px] relative backdrop-blur-none'>
                                        <button type='button' title='favorite' className='absolute -top-6 end-3.5 lg:end-4.5 xl:end-3 2xl:end-4 z-4 flex items-center justify-center rounded-full w-8 h-8 bg-[#EFF0F4]'>
                                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g clipPath="url(#clip0_166_16562)">
                                                    <path d="M4.08008 1.85938H4.08398C4.67869 1.85475 5.26533 2.00045 5.78906 2.28223C6.31265 2.56401 6.75728 2.97296 7.08105 3.47168L7.49805 4.11426L7.91797 3.47363C8.24456 2.97654 8.6901 2.56894 9.21387 2.28711C9.73757 2.00535 10.3233 1.85807 10.918 1.85938C12.8305 1.8689 14.3897 3.36912 14.4941 5.25781L14.5 5.44238C14.4991 6.32189 14.0964 7.2453 13.4248 8.16406C12.7562 9.07877 11.8534 9.94418 10.9336 10.6973C10.0161 11.4484 9.09534 12.0758 8.40332 12.5156C8.05792 12.7351 7.77059 12.9076 7.57031 13.0244C7.54607 13.0386 7.5226 13.051 7.50098 13.0635C7.47935 13.0508 7.45588 13.0378 7.43164 13.0234C7.23127 12.9051 6.94403 12.7306 6.59863 12.5088C5.90634 12.0642 4.98533 11.4309 4.06738 10.6758C3.14704 9.91863 2.24426 9.0503 1.5752 8.1377C0.902024 7.21946 0.5 6.30335 0.5 5.43945C0.500031 3.46231 2.10289 1.85938 4.08008 1.85938Z" stroke="#CDA63D" />
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_166_16562">
                                                        <rect width="15" height="15" fill="white" />
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                        </button>
                                        <div className='w-full h-[104px] product-clip-path bg-[#FFFFFF33] backdrop-blur-xl rounded-[14px] ps-2.5 pe-3.5 pt-6 pb-2.5 flex flex-col'>
                                            <span className='text-[14px] font-normal text-white line-clamp-2'>مجموعة من منتجات التجميل المصنوعة من أفضل المكونات الطبيعية، خالية من المواد مجموعة من منتجات التجميل المصنوعة ...</span>
                                            <div className='mt-1.5 flex flex-row items-center gap-1.5'>
                                                <span className='text-[16px] font-bold text-[#FFC700]'>$14.00</span>
                                                <span className='text-[14px] line-through text-[#FFFFFFB2]'>$14.00</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
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
