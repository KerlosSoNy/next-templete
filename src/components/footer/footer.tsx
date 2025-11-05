import StoreProvider from '@/app/[locale]/StoreProvider';
import Image from 'next/image'
import React from 'react'
import ContactUsFooter from './components/contactUsFooter';
import FooterSocialMedia from './components/footerSocialMedia';
import Link from 'next/link';
import { getLocale, getTranslations } from 'next-intl/server';
import LocationFooter from './components/locationFooter';

export default async function Footer() {
    const t = await getTranslations();
    const locale = await getLocale();
    const year = new Date().getFullYear();

    const navLinks = [
        { id: 1, name: `footer.nav.home`, href: '/' },
        // { id: 2, name: `footer.nav.chatBot`, href: '/chat' },
        { id: 3, name: `footer.nav.contact`, href: '/contact' },
        { id: 4, name: "bottomSection.categories", href: '/categories' },
        { id: 5, name: 'footer.nav.faq', href: '/faq' },
    ];

    return (
        <div className='h-fit pt-[50px] md:pt-0 md:h-[470px] font-family-arabic overflow-hidden w-full bg-[#4A3F35] relative px-[20px] xl:px-[50px] 2xl:px-[100px] pb-[50px] flex flex-row items-end justify-center'>
            <div className='absolute top-0 left-0 w-full h-[240px]'>
                <div className='relative w-full h-[240px]'>
                    <Image
                        src={'/images/backgrounds/footerBg.png'}
                        alt='Ropita'
                        fill
                        priority
                        className='object-cover'
                    />
                </div>
            </div>
            <span className='absolute bottom-[14px] left-1/2 -translate-x-1/2 text-[12px] md:text-[14px] text-white'>
                {t('footer.copyright', { year })}
            </span>

            <div className='flex flex-col w-full'>
                <Image
                    src={'/images/logos/footerLogo.png'}
                    alt='Ropita'
                    width={151}
                    height={44}
                    className='md:ms-10 mb-[35px]'
                />
                <div className='w-full bg-[#C3B49A80] h-fit md:h-[280px] backdrop-blur-[54px] flex flex-col md:flex-row pb-5 md:pb-0 px-5 xl:px-10 pt-5 lg:pt-10 items-start justify-between'>
                    <div className='h-fit flex flex-col md:flex-row items-start'>
                        <div className='max-w-[376px] flex flex-col'>
                            <span className='text-[12px] lg:text-[14px] xl:text-[16px] text-white lg:leading-[26px] max-w-[376px] pb-[12px]'>
                                {t('footer.description')}
                            </span>
                            <div className='w-full border-t border-dashed border-[#FFFFFF80] mb-3' />
                            <StoreProvider>
                                <LocationFooter />
                            </StoreProvider>
                            <Image
                                src={'/images/logos/vendorX.png'}
                                alt='Ropita'
                                width={138}
                                height={43}
                                className='mt-[12px]'
                            />
                        </div>
                        <div className='w-[1px] h-[100px] mx-10 xl:mx-[86px] bg-[#FFFFFF80] my-auto hidden md:block' />
                        <div className="w-full md:w-fit md:border-t-0 border-t border-[#FFFFFF80] border-dashed pt-2 md:pt-0 flex-col me-[45px]  mt-4 md:mt-0 ">
                            <span className="font-medium text-[20px] md:text-[16px] xl:text-[20px] text-white mb-[19px]">
                                {t('footer.sections')}
                            </span>
                            <br />
                            <div className="w-[52px] h-[1px] bg-white mb-[18px] hidden md:block" />
                            <div className='flex flex-row mt-2 md:mt-0 w-full md:w-fit justify-between md:flex-col '>
                                {navLinks.map((link) => {
                                    return (
                                        <Link
                                            href={`/${locale}` + link.href}
                                            key={link.id}
                                            className="text-[14px] md:text-[12px] xl:text-[14px] text-white md:mb-[14px] xl:mb-[18px] hover:underline"
                                        >
                                            {t(`${link.name}`)}
                                        </Link>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="bg-[#E1D2B8] rounded-[14px] mt-4 md:-mt-20 lg:-mt-30 pt-[15px] lg:pt-[29px] px-3.5 lg:px-[20px] xl:px-[32px] pb-4 lg:pb-[30px] w-full md:w-[441px] items-start flex flex-col gap-4 md:gap-0 md:flex-col">
                        <div className="flex flex-col">
                            <span className="text-[22px] lg:text-[24px] font-[700] text-[#4A3F35]">
                                {t('new_footer.contactUs.title')}
                            </span>
                            <span className="text-[14px] lg:text-[16px] text-[#4A3F35] mt-[12px]">
                                {t('new_footer.contactUs.description')}
                            </span>
                        </div>
                        <StoreProvider>
                            <ContactUsFooter />
                        </StoreProvider>
                        <div className='flex flex-col items-center gap-[14px] w-full pt-[17px] md:mt-[25px] border-t border-[#4A3F3580] border-dashed'>
                            <span className='text-[16px] lg:text-[20px] text-center font-[500] text-[#4A3F35]'>
                                {t('footer.socialMediaTitle')}
                            </span>
                            <StoreProvider>
                                <FooterSocialMedia />
                            </StoreProvider>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}