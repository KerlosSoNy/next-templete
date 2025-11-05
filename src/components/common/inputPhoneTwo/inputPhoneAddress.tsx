/* eslint-disable @typescript-eslint/no-unused-vars */
import { PhoneInput } from 'react-international-phone';

import 'react-international-phone/style.css';
import '../inputPhone/style.css';
import { useEffect, useState } from 'react';
import { HttpMethod, useApi } from '../../../utils/hooks/useApi';
import { useLocale, useTranslations } from 'next-intl';
export default function InputPhoneِAddress({
    width,
    error,
    inWidth,
    label,
    is_fully_rounded,
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
            {/* {defaultCountry !== null */}
            {/* ?  */}
            <div className={`flex ${width} flex-col relative font-normal xl:font-medium`}>
                <div className='mb-1 flex flex-row w-fit'>
                    <label
                        htmlFor='phone'
                        className={`text-[#495057] font-bold text-[16px] inputLabel `}
                    >
                        {label}
                    </label>
                </div>
                <div className='relative'>
                    <PhoneInput
                        // key={defaultCountry}
                        className={`
                        ${error ? 'border-[#D5533B] bg-[#D5533B14]' : 'border-[#E9ECEF]'}
                        dark:text-white
                        ps-1
                        mt-0.5        
                        ${is_fully_rounded ? "rounded-full" : "rounded-[8px]"}             
                         border-[1px]
                        h-[46px] input-phone-number
                        w-[100%] align-middle items-center
                        border-textColor
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
                                `bg-opacity-50 text-gray-950 block border-transparent border-gray-700 h-[48px] w-[100%] ${locale === 'ar' ? "ps-3" : ""} shadow-sm focus:border-0 focus:ring focus:ring-gray-200 !bg-transparent`,
                        }}
                        defaultCountry={defaultCountry === null ? 'ps' : defaultCountry}
                        countries={defaultCountry === null ? [['Palestine', 'ps', '970']] : newAllowedCountries}
                        {...props}
                    />
                    {error && <div className='!text-sm mt-1  text-[#D5533B] w-full font-[400]'>{t(`${error}`)}</div>}
                </div>
            </div>
            {/* :
                <div className={`flex ${width} flex-col relative font-normal xl:font-medium`}>
                    <div className="mb-1 flex flex-row w-fit">
                        <label
                            htmlFor='phone'
                            className={`dark:text-textColor text-[#334151] font-[400] text-[16px] inputLabel `}
                        >
                            {label}
                        </label>
                    </div>
                    <div className="relative">
                        <div
                            className={`
                            animate-pulse
                            h-[52px]
                            w-full
                            border-[1px]
                            ${error ? 'border-[#D5533B] bg-[#D5533B14]' : inContact ? "border-transparent !bg-[#F5F5F5]" : 'border-main/[42%] !bg-white'}
                            ${is_fully_rounded ? "rounded-full" : "rounded-[12px]"}
                            bg-white
                            `}
                        />
                    </div>
                </div> */}
            {/* } */}
        </>
    );
}


type Country = {
    id: number;
    iso_code: string;
    name: string;
    phone_code: string;
};

export function convertToAllowedCountries(data: Country[]): [string, string, string][] {
    return data.map(country => [
        country.name,
        country.iso_code.toLowerCase(),
        country.phone_code.replace('+', ''),
    ]);
}