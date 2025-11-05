/* eslint-disable @typescript-eslint/no-unused-vars */
import { PhoneInput } from 'react-international-phone';

import 'react-international-phone/style.css';
import './style.css';
import { HttpMethod, useApi } from '../../../utils/hooks/useApi';
import { useEffect, useState } from 'react';
import { convertToAllowedCountries } from '../inputPhoneTwo/inputPhoneAddress';
import { useLocale, useTranslations } from 'next-intl';
// import { useEffect, useState } from 'react';
// import { HttpMethod, useApi } from '../../../utils/hooks/useApi';
export default function InputPhone({
    width,
    error,
    inWidth,
    label,
    is_fully_rounded,
    isContact,
    placeholder,
    inContact = false,
    isAutoFocus = false,
    ...props
}: {
    width: string;
    inWidth: string;
    placeholder?: string;
    label: string;
    error: string;
    is_fully_rounded?: boolean
    inContact?: boolean
    isContact?: boolean
    isAutoFocus?: boolean
} & React.ComponentProps<any>) {
    const t = useTranslations()
    const locale = useLocale();
    const { fetchData, payLoad } = useApi({
        endPoint: 'auth/registrable',
        method: HttpMethod.GET,
        withOutToast: true
    })

    const [newAllowedCountries, setNewAllowedCountries] = useState<string[][] | null>(null);

    useEffect(() => {
        if (payLoad) {
            setNewAllowedCountries(convertToAllowedCountries(payLoad))
            localStorage.setItem('registrable', JSON.stringify(convertToAllowedCountries(payLoad)))
        }
    }, [payLoad])

    const [defaultCountry, setDefaultCountry] = useState<string | null>(null);
    useEffect(() => {
        if (newAllowedCountries && newAllowedCountries?.length > 0) {
            setDefaultCountry(newAllowedCountries[0][1])
        }
    }, [newAllowedCountries])

    useEffect(() => {
        if (JSON.parse(localStorage.getItem('registrable') || '[]').length === 0) {
            fetchData()
        } else {
            const newArrays = JSON.parse(localStorage.getItem('registrable') || '[]');
            setNewAllowedCountries(newArrays)
            if (JSON.parse(localStorage.getItem('registrable') || '[]') !== newAllowedCountries) {
                fetchData()
            }
        }
    }, [])
    return (
        <>
            <div className={`flex ${width} flex-col relative font-normal xl:font-medium`}>
                <div className='mb-1 flex flex-row w-fit'>
                    <label
                        htmlFor='phone'
                        className={`dark:text-textColor text-[#000000] font-[400] text-[14px] md:text-[18px] inputLabel `}
                    >
                        {label}
                    </label>
                </div>
                <div className='relative'>
                    <PhoneInput
                        className={`
                        ${error ? 'border-[#D5533B] !bg-[#D2D2D2]/[10%]' : isContact ? "bg-white border-[#000000]/[10%]" : inContact ? "border-transparent !bg-[#F5F5F5]" : '!border-main-color/[10%] !bg-[#D2D2D2]/[10%]'}
                        dark:text-white
                        ps-1
                        mt-0.5        
                        ${is_fully_rounded ? "rounded-full" : "rounded-[8px]"}             
                        border-[2px]
                        h-[54px] md:h-[64px] input-phone-number
                        w-[100%] align-middle items-center
                        `}

                        placeholder={placeholder}
                        countrySelectorStyleProps={{
                            required: true,
                            className: 'dark:!text-white',
                        }}

                        autoFocus={isAutoFocus}
                        dialCodePreviewStyleProps={{
                            required: true,
                            className: '!bg-#0D0D0D',
                        }}
                        inputProps={{
                            required: true,
                            className:
                                `bg-opacity-50 text-gray-950 block border-transparent border-gray-700 h-[48px] w-[100%] ${locale === 'ar' ? "ps-3" : ""} shadow-sm focus:border-0 focus:ring focus:ring-main-color !bg-transparent`,
                        }}
                        defaultCountry={defaultCountry === null ? 'ps' : defaultCountry}
                        countries={defaultCountry === null ? [['Palestine', 'ps', '970']] : newAllowedCountries}
                        {...props}
                    />
                </div>
                {<span className='text-red-500 text-sm min-h-[15px] 2xl:min-h-[24px]'>{error ? t(`${error}`) : ''}</span>}
            </div>
        </>
    );
}