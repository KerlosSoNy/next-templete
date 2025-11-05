import StoreProvider from '@/app/[locale]/StoreProvider'
import Image from 'next/image'
import React from 'react'
import SocialMedia from './socialMedia'
import DarkModeToggle from './darkMode'
import LanguageMenu from './LanguageSwitcher'
import { useTranslations } from 'next-intl'

export default function TopSection() {
    const t = useTranslations();
    return (
        <div
            className='h-10 md:h-[54px] w-full relative flex flex-row items-center justify-between px-2 lg:px-[25px] xl:px-[50px] bg-linear-to-l from-[#C4B59B] to-[#4A3F35]'
        >
            <span className='font-medium text-[10px] max-w-[250px] lg:max-w-none lg:text-[12px] text-white'>{t('free_delievery_for_orders_up_to_199')}</span>
            <Image src='/images/logos/logo.png' alt='Ropita' width={82} height={24} className='absolute top-1/2 left-1/2 md:block hidden -translate-x-1/2 -translate-y-1/2' />
            <div className='flex flex-row items-center'>
                <StoreProvider>
                    <SocialMedia />
                </StoreProvider>
                <LanguageMenu />
                <DarkModeToggle />
            </div>
        </div>
    )
}
