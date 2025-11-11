'use client';
import React, { useRef } from 'react'
import { Slider, SliderRef } from '../common/slider';
import { useLocale } from 'next-intl';
import Image from 'next/image';

export default function OneProduct() {
    const sliderRef = useRef<SliderRef>(null);
    const locale = useLocale();
    return (
        <div className='w-full h-fit py-10 lg:py-0 lg:h-[550px] bg-[#9C6B32] px-10 lg:px-[100px] 2xl:px-[194px] flex flex-col items-center justify-center relative '>
            <div className='absolute bottom-0 left-5 w-[121px] h-[calc(119px-36px)] overflow-hidden'>
                <div className='relative w-full h-full'>
                    <Image alt='flower' fill src='/images/banner/smallFlower.png' />
                </div>
            </div>
            <div className='xl:block hidden absolute top-1/3 -translate-y-1/3 right-0 w-[66px] h-[96] overflow-hidden'>
                <div className='relative w-full h-full'>
                    <Image alt='flower' fill src='/images/banner/leftFLower.png' />
                </div>
            </div>
            <div className='flex flex-col lg:flex-row items-center gap-8 xl:gap-[60px] '>
                <div className='flex flex-col lg:max-w-[248px]'>
                    <span className='text-[36px] font-medium text-white'>زيت شعر مهرة لتكثيف الشعر </span>
                    <div className='flex flex-row gap-1 items-center w-fit mt-2.5 backdrop-blur-xl rounded-[5px] h-5'>
                        <span className='text-[14px] text-white font-normal'> (1,890) <span className='font-medium'>4.9</span></span>
                        {
                            Array.from({ length: 5 }).map((_, starIndex) => (
                                <svg key={starIndex} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.91788 3.49667C6.73684 2.02754 7.14632 1.29297 7.75852 1.29297C8.37071 1.29297 8.78019 2.02754 9.59915 3.49667L9.81103 3.87675C10.0437 4.29423 10.1601 4.50297 10.3415 4.6407C10.523 4.77843 10.7489 4.82956 11.2008 4.93181L11.6123 5.0249C13.2026 5.38473 13.9978 5.56464 14.1869 6.17299C14.3761 6.78134 13.834 7.41524 12.7499 8.68304L12.4694 9.01104C12.1613 9.37131 12.0072 9.55144 11.9379 9.77429C11.8686 9.99714 11.8919 10.2375 11.9385 10.7182L11.9809 11.1558C12.1448 12.8473 12.2268 13.693 11.7315 14.069C11.2362 14.445 10.4917 14.1022 9.0027 13.4166L8.61747 13.2393C8.19434 13.0444 7.98278 12.947 7.75852 12.947C7.53426 12.947 7.32269 13.0444 6.89956 13.2393L6.51433 13.4166C5.02532 14.1022 4.28081 14.445 3.78553 14.069C3.29025 13.693 3.37221 12.8473 3.53612 11.1558L3.57853 10.7182C3.62511 10.2375 3.6484 9.99714 3.5791 9.77429C3.5098 9.55144 3.35575 9.37131 3.04767 9.01104L2.76718 8.68304C1.683 7.41524 1.14091 6.78134 1.33009 6.17299C1.51927 5.56464 2.31443 5.38473 3.90475 5.0249L4.31619 4.93181C4.7681 4.82956 4.99406 4.77843 5.17549 4.6407C5.35692 4.50297 5.47328 4.29423 5.70601 3.87675L5.91788 3.49667Z" fill="#FFC700" />
                                </svg>
                            ))
                        }
                    </div>
                    <span className='mt-[18px] text-[12px] text-white font-normal line-clamp-5 text-justify'>نسعى لتقديم أفضل المنتجات الطبيعية المميزة والخالية من الإضافات، والمختارة بعناية من لتقديم أفضل المنتجات الطبيعية المميزة الجديد والخالية من الإضافات، والمختارة بعناية من نسعى لتقديم أفضل المنتجات</span>
                    <div className='w-full flex flex-row items-center justify-start gap-5 mt-6'>
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
                <div className='w-[685px] h-[326px] overflow-hidden relative '>
                    <Slider
                        ref={sliderRef}
                        direction={locale === "ar" ? "rtl" : "ltr"} slidesToShow={1} gap={24} loop autoScroll showDots={false} showButtons={false}>
                        {
                            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, index: number) => {
                                return (
                                    <div key={index} className='bg-white rounded-[18px] overflow-hidden w-[745px] h-[326px] flex flex-row relative'>
                                        <div className='w-1/2 absolute top-0  start-0 bg-gradient-to-l from-[#D9D9D9] to-white h-[184px]' />

                                        <div className='flex flex-col gap-[9px] absolute top-1/2 -translate-y-1/2 start-[-7px]'>
                                            {
                                                Array.from({ length: 12 }).map((_, starIndex) => (
                                                    <div className='w-4 h-4 bg-[#9C6B32] rounded-full' key={starIndex} />
                                                ))
                                            }
                                        </div>
                                        <div className='w-[280px] h-full relative flex flex-col justify-between items-center pt-[57px] pb-[32px]'>
                                            <div className='flex flex-col w-full max-w-[124px]'>
                                                <div className='flex flex-row items-end'>
                                                    <span className='text-[74px] font-extrabold leading-[75px] text-[#9C6B32]'>20</span>
                                                    <span className='text-[24px] font-extrabold text-[#9C6B32]'>%</span>
                                                </div>
                                                <div className='flex flex-row justify-center w-full'>
                                                    <span className='font-medium text-[#CDA63D] text-[18px]'>خصم</span>
                                                </div>
                                            </div>

                                            <div className='flex flex-col'>
                                                <div className='mt-2 w-full  flex flex-col items-center'>
                                                    <span className='text-[16px] font-bold text-[#CDA63D]'>$14.00</span>
                                                    <span className='text-[14px] font-light line-through text-[#222222B2]'>$14.00</span>
                                                </div>
                                                <button type='button' title='order now' className='mt-2 h-[34px] rounded-full bg-[#9C6B32] flex items-center justify-center px-[30px] text-white font-medium text-[12px]'>
                                                    اطلبة الان
                                                </button>
                                            </div>

                                            <div className='flex flex-col gap-[9px] absolute top-1/2 -translate-y-1/2 end-2'>
                                                {
                                                    Array.from({ length: 16 }).map((_, starIndex) => (
                                                        <div className='w-1 h-2 bg-[#9C6B32] rounded-full' key={starIndex} />
                                                    ))
                                                }
                                            </div>
                                            <div className='w-5 h-[18px] rounded-b-full absolute bg-[#9C6B32] -top-1.5 -end-0' />
                                            <div className='w-5 h-[18px] rounded-t-full absolute bg-[#9C6B32] -bottom-1.5 -end-0' />
                                        </div>
                                        <div className='w-[calc(100%-280px)] h-full p-3.5'>
                                            <div className='relative flex flex-col justify-end w-full h-full rounded-[14px] overflow-hidden pb-2 px-3.5'>
                                                <Image alt='product' fill src='https://images.unsplash.com/photo-1580870069867-74c57ee1bb07?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870' />
                                                <div className='flex flex-row relative z-2 items-center justify-between w-full rounded-full h-10 ps-3 pe-2 bg-[#FFFFFF6B] backdrop-blur-xl mt-2'>
                                                    <div className='flex flex-row gap-1'>
                                                        <svg width="17" height="20" viewBox="0 0 17 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M8.14215 3.23973C10.0449 3.23973 11.5874 4.78223 11.5874 6.68504C11.5874 8.58785 10.0449 10.1303 8.14215 10.1303C6.23937 10.1303 4.69687 8.58785 4.69687 6.68504C4.69687 4.78223 6.23937 3.23973 8.14215 3.23973ZM8.45465 13.0113V19.4769L14.8324 16.9971V12.9538L9.84551 14.8929C9.70047 14.9489 9.5391 14.889 9.46367 14.7585L8.45465 13.0113ZM7.82965 19.4769V13.0113L6.8209 14.7586C6.78246 14.8249 6.72091 14.8748 6.64802 14.8986C6.57513 14.9225 6.49601 14.9186 6.42578 14.8878L1.45195 12.9538V16.997L7.82965 19.4769ZM15.0084 9.51098L8.59375 12.0052L9.86961 14.2151L16.2844 11.7209L15.0084 9.51098ZM7.69055 12.0052L1.27586 9.51098L0 11.7209L6.41473 14.2151L7.69055 12.0052ZM8.14215 10.7553C6.43109 10.7553 4.96664 9.69953 4.36469 8.20387L1.99895 9.12371L8.14215 11.5124L14.2854 9.12371L11.9196 8.20387C11.3177 9.69953 9.85328 10.7553 8.14215 10.7553ZM14.4324 6.45477C14.5153 6.45477 14.5948 6.48769 14.6534 6.5463C14.712 6.6049 14.7449 6.68439 14.7449 6.76727C14.7449 6.85015 14.712 6.92963 14.6534 6.98824C14.5948 7.04684 14.5153 7.07977 14.4324 7.07977H12.9688C12.8859 7.07977 12.8064 7.04684 12.7478 6.98824C12.6892 6.92963 12.6563 6.85015 12.6563 6.76727C12.6563 6.68439 12.6892 6.6049 12.7478 6.5463C12.8064 6.48769 12.8859 6.45477 12.9688 6.45477H14.4324ZM7.82965 0.312461C7.82966 0.229588 7.86259 0.150112 7.92119 0.0915153C7.97979 0.0329187 8.05927 -6.47448e-10 8.14215 0C8.22502 -6.47449e-10 8.3045 0.0329187 8.3631 0.0915153C8.42171 0.150112 8.45464 0.229588 8.45465 0.312461V1.77613C8.45465 1.85901 8.42172 1.9385 8.36312 1.9971C8.30451 2.05571 8.22503 2.08863 8.14215 2.08863C8.05927 2.08863 7.97978 2.05571 7.92118 1.9971C7.86257 1.9385 7.82965 1.85901 7.82965 1.77613V0.312461ZM4.67504 1.2802C4.65427 1.24475 4.64073 1.20554 4.63519 1.16483C4.62966 1.12412 4.63223 1.08272 4.64278 1.04301C4.65333 1.00331 4.67163 0.966084 4.69664 0.933488C4.72165 0.900893 4.75286 0.873572 4.78848 0.853102C4.8241 0.832632 4.86342 0.819418 4.90417 0.814223C4.94493 0.809027 4.98631 0.811954 5.02592 0.822832C5.06554 0.833711 5.10261 0.852327 5.13499 0.877606C5.16738 0.902885 5.19444 0.934327 5.21461 0.970117L5.94641 2.23766C5.96677 2.27308 5.97996 2.31218 5.98521 2.3527C5.99046 2.39322 5.98768 2.43439 5.97703 2.47383C5.96637 2.51328 5.94804 2.55025 5.9231 2.58261C5.89815 2.61498 5.86707 2.64211 5.83164 2.66246C5.76009 2.70357 5.67514 2.71457 5.59547 2.69305C5.51581 2.67153 5.44795 2.61924 5.40684 2.5477L4.67504 1.2802ZM2.42605 3.69734C2.39062 3.67684 2.35957 3.64955 2.33468 3.61703C2.3098 3.58452 2.29156 3.54742 2.28102 3.50786C2.27048 3.46829 2.26784 3.42704 2.27325 3.38646C2.27865 3.34587 2.29201 3.30675 2.31254 3.27133C2.33306 3.2359 2.36035 3.20486 2.39286 3.17998C2.42538 3.1551 2.46247 3.13687 2.50203 3.12633C2.54159 3.11579 2.58284 3.11314 2.62343 3.11854C2.66401 3.12395 2.70313 3.13729 2.73855 3.15781L4.00602 3.88961C4.07691 3.93138 4.12841 3.99948 4.1493 4.07906C4.17019 4.15865 4.15877 4.24327 4.11753 4.31447C4.07629 4.38567 4.00858 4.43768 3.92915 4.45916C3.84972 4.48064 3.76502 4.46985 3.69352 4.42914L2.42605 3.69734ZM1.68738 6.91531C1.6045 6.91531 1.52502 6.88239 1.46641 6.82378C1.40781 6.76518 1.37488 6.68569 1.37488 6.60281C1.37488 6.51993 1.40781 6.44045 1.46641 6.38184C1.52502 6.32324 1.6045 6.29031 1.68738 6.29031H3.15102C3.2339 6.29031 3.31338 6.32324 3.37199 6.38184C3.43059 6.44045 3.46352 6.51993 3.46352 6.60281C3.46352 6.68569 3.43059 6.76518 3.37199 6.82378C3.31338 6.88239 3.2339 6.91531 3.15102 6.91531H1.68738ZM11.0476 1.05234C11.1332 0.903399 11.3235 0.851992 11.4724 0.937578C11.5078 0.957927 11.5389 0.985058 11.5638 1.01742C11.5888 1.04979 11.6071 1.08675 11.6178 1.1262C11.6284 1.16565 11.6312 1.20682 11.626 1.24734C11.6207 1.28787 11.6075 1.32696 11.5871 1.36238L10.8554 2.62992C10.8351 2.66535 10.8079 2.69642 10.7756 2.72136C10.7432 2.74631 10.7062 2.76463 10.6668 2.77529C10.6273 2.78594 10.5862 2.78873 10.5457 2.78348C10.5051 2.77823 10.4661 2.76505 10.4306 2.74469C10.3952 2.72433 10.3641 2.69719 10.3392 2.66483C10.3142 2.63246 10.2959 2.5955 10.2853 2.55605C10.2746 2.51661 10.2718 2.47545 10.2771 2.43493C10.2823 2.3944 10.2955 2.35531 10.3159 2.31988L11.0476 1.05234ZM13.4636 3.3002C13.5351 3.25876 13.6202 3.24744 13.7001 3.26873C13.78 3.29002 13.8482 3.34218 13.8896 3.41373C13.9311 3.48528 13.9424 3.57037 13.9211 3.65026C13.8998 3.73016 13.8476 3.79833 13.7761 3.83977L12.5086 4.57156C12.4371 4.61163 12.3527 4.62195 12.2737 4.60029C12.1947 4.57864 12.1273 4.52675 12.0863 4.45585C12.0452 4.38495 12.0337 4.30073 12.0543 4.22141C12.0748 4.14209 12.1257 4.07405 12.1961 4.03199L13.4636 3.3002ZM9.44672 5.11383L7.40578 7.15477L6.70937 6.27828C6.53801 6.06277 6.22445 6.02695 6.00891 6.19828C5.79336 6.36965 5.7575 6.6832 5.92887 6.89875L6.95379 8.18856C7.13109 8.44242 7.49602 8.47715 7.71687 8.25625L10.1529 5.8202C10.3479 5.62516 10.3479 5.30891 10.1529 5.11387C9.95793 4.91883 9.6418 4.91883 9.44672 5.11383Z" fill="#9C6B32" />
                                                        </svg>
                                                        <span className='text-[14px] text-[#9C6B32] font-medium'>458</span>
                                                        <span className='text-[12px] text-[#9C6B32] font-normal'>تم البيع</span>
                                                    </div>
                                                    <button type='button' title='favorite' className='flex items-center justify-center rounded-full w-6 h-6 bg-[#EFF0F4]'>
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
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </Slider>
                </div>
            </div>
        </div>
    )
}
