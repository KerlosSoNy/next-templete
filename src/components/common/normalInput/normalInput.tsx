import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import { FaEyeSlash } from 'react-icons/fa';
import { IoEyeSharp } from 'react-icons/io5';

type InputAndLabelProps = {
    label?: string;
    error?: string;
    info?: string;
    width?: string;
    placeholder?: string;
    icon?: React.ReactNode;
    see?: boolean;
    normalChange?: boolean;
    isLogin?: boolean;
    isSmall?: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setData?: React.Dispatch<React.SetStateAction<any>>;
    type?: React.ComponentProps<'input'>['type'];
} & React.ComponentProps<'input'>;

export default function NormalInput({
    label,
    error,
    width = 'w-full',
    placeholder,
    icon,
    info,
    isLogin,
    isSmall,
    setData,
    see = false,
    type,
    normalChange = false,
    ...props
}: InputAndLabelProps) {
    const [visible, setVisible] = useState(true);
    const [typeInput, setTypeInput] = useState(type);
    const handleVisible = () => {
        setTypeInput(typeInput === 'password' ? 'text' : 'password');
        setVisible(!visible);
    };
    const t = useTranslations()
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (setData) {
            setData((prevData: any) => ({
                ...prevData,
                [e.target.name]: e.target.value,
            }));
        }
    }
    const [isFocused, setIsFocused] = useState(false);
    return (
        <div
            className={`flex flex-col relative z-[3] font-semibold dark:text-white ${width}`}
        >
            <div className='flex flex-row'>
                <label
                    id={label}
                    htmlFor={label}
                    className={`${isSmall ? "text-[13px]" : "text-[16px]"} font-bold mb-1.5 text-[#495057]`}
                >
                    {label}
                </label>
            </div>
            <div className={`relative w-[100%] overflow-hidden rounded-[8px] h-[46px] border-[1px]  ${error ? 'border-red-500' : isLogin ? 'border-[#1f1f1f]' : isFocused ? 'border-main-color' : ' border-[#E9ECEF]'} `}>
                <input
                    title={label}
                    placeholder={placeholder}
                    id={label}
                    {...props}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    onChange={!normalChange ? handleOnChange : props.onChange}
                    type={typeInput || type}
                    className={`${icon ? 'px-13' : ''
                        }
                        bg-white
                        text-[15px]
                        placeholder:text-[15px]
                        text-[#A4A4A4] py-1  outline-none  w-full h-[46px] px-2`}
                />
                {icon && (
                    <div
                        className={`absolute  start-1
                            } top-1/2 text-[#D6D6D6] transform mx-3 -translate-y-1/2 text-2xl`}
                    >
                        {icon}
                    </div>
                )}
                {see && (
                    <button
                        title='See Password'
                        type='button'
                        aria-label={`see ${label}`}
                        onClick={handleVisible}
                        className={`absolute z-50 end-4 ${error ? 'top-[22px]' : 'top-1/2'
                            } -translate-y-1/2 text-2xl`}
                    >
                        {visible ? (
                            <FaEyeSlash className='text-[#84818A]' />
                        ) : (
                            <IoEyeSharp className='text-[#84818A]' />
                        )}
                    </button>
                )}
            </div>
            {error && <span className='text-red-500 text-sm font-[300]'>{t(`${error}`)}</span>}
            {info && !error && <span className='text-[11px] font-[400] mt-1 text-[#6C757D]'>{info}</span>}
        </div>
    );
}
