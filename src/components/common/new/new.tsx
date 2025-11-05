import { useTranslations } from 'next-intl'
import React from 'react'

export default function New() {
    const t = useTranslations()
    return (
        <div className='h-[22px] flex items-center bg-[#3DB39E] text-white text-[12px] font-medium px-[5px] '>
            {t('new')}
        </div>
    )
}
