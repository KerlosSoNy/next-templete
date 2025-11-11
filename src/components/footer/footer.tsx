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
        <div className='h-[375px] w-full bg-[#CFAA45] pt-[19px] rounded-t-[30px]'>
            <div className='w-full h-full rounded-t-[30px] bg-[#FBF5B9] relative pb-[30px] flex flex-row items-start justify-center gap-12 lg:gap-[114px] 3xl:gap-60 pt-2'>
                {/* Flower Bg */}
                <div className='absolute bottom-[30px] w-full h-[136px]'>
                    <div className='relative w-full h-full'>
                        <Image src={'/images/bg/footer.png'} alt='Flowers' fill priority sizes='auto' />
                    </div>
                </div>
                <div className='border border-[#CFAA45] bg-[#FBF5B970] backdrop-blur-[20px] flex flex-col px-[15px] pt-3.5 rounded-[14px] pb-5'>
                    <Image src={'/images/logo/muhraHorse.png'} alt='Muhra Logo' width={221} height={129} className='w-[221px] h-[129px]' />
                    <span className='text-[18px] font-bold text-[#8DA138]'>{t('new_footer.contactUs.title')}</span>
                    <StoreProvider>
                        <ContactUsFooter />
                    </StoreProvider>
                </div>
                <div className="flex  flex-col  mt-5 relative z-3">
                    <span className="font-bold text-[20px] md:text-[16px] xl:text-[18px]  text-[#8DA138]">
                        {t('footer.sections')}
                    </span>
                    <div className='flex flex-row mt-5 w-full md:w-fit justify-between md:flex-col '>
                        {navLinks.map((link) => {
                            return (
                                <Link
                                    href={`/${locale}` + link.href}
                                    key={link.id}
                                    className="text-[14px] md:text-[12px] xl:text-[14px] text-text/70 md:mb-3.5 xl:mb-[18px] hover:underline"
                                >
                                    {t(`${link.name}`)}
                                </Link>
                            )
                        })}
                    </div>
                </div>
                <div className="flex-col flex max-w-[296px]  mt-5 relative z-3">
                    <StoreProvider>
                        <LocationFooter />
                    </StoreProvider>
                    <span className='mt-3.5 font-bold text-[18px] text-[#8DA138]'>{t('new_footer.contactUs.description')}</span>
                    <StoreProvider>
                        <FooterSocialMedia />
                    </StoreProvider>
                </div>
            </div>
        </div>
    )
}