'use client'
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocale } from 'next-intl';
import { removeToast } from '@/utils/redux/slices/toast';
import { AppDispatch, RootState } from '@/utils/redux/store';
import { X } from 'lucide-react';

const Toast: React.FC = () => {
    const toast = useSelector((state: RootState) => state.toast)
    const dispatch = useDispatch<AppDispatch>();
    const icons: Record<string, React.ReactNode> = {
        success: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="url(#paint0_linear_357_13873)" />
            <path d="M8 12.5C8 12.5 9.348 13.007 10 15C10 15 13.177 10 16 9" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <defs>
                <linearGradient id="paint0_linear_357_13873" x1="12" y1="0" x2="12" y2="24" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#28A745" />
                    <stop offset="1" stopColor="#007F1D" />
                </linearGradient>
            </defs>
        </svg>,
        error: <div className='w-8 h-8 rounded-full flex items-center justify-center bg-white '>
            <X className='w-6 h-6' />
        </div>,
        info: <span>info</span>,
        warning: <span>warning</span>,
    };
    const locale = useLocale();
    if (toast && (!toast.currentToast || toast.currentToast === null)) {
        return null;
    }

    const positionClass = locale !== 'ar'
        ? 'left-1/2 -translate-x-1/2 xl:-translate-x-0 xl:left-4'
        : 'xl:right-4 right-1/2 translate-x-1/2 xl:translate-x-0';

    const backgroundColorClass = toast?.currentToast?.type === 'success'
        ? 'bg-[#338A31]'
        : toast.currentToast?.type === 'error'
            ? 'bg-[#fb3748]'
            : toast.currentToast?.type === 'info'
                ? 'bg-blue-500'
                : 'bg-yellow-500';

    return (
        <div className={`fixed top-5 w-full px-4 ${positionClass} z-[99999999999999999] flex flex-col gap-2`}>
            <div
                className={`flex flex-row max-w-[300px] h-[78px] p-0.5 justify-start items-center shadow-lg rel rounded-[15px] relative z-[5] min-w-[300px] md:min-w-[280px] bg-white`}
            >
                <div className={`flex flex-row justify-start relative items-center w-full px-5 rounded-[15px] ${backgroundColorClass}`}>
                    <div
                        className={`rounded-[16px] -ms-3.5 w-[50px] 3xl:w-[66px] h-[74px] 3xl:h-[74px] flex items-center justify-center `}
                    >
                        {icons[toast?.currentToast?.type || 0]}
                    </div>
                    <div className='flex flex-col ms-2.5 gap-1.5'>
                        <p className="text-[16px] font-bold text-text">{toast?.currentToast?.title}</p>
                        <p className={`text-[12px] ${toast?.currentToast?.type === 'success' ? 'text-[#338A31]' : 'text-[#fff]'}  max-w-[388px]`}>{toast?.currentToast?.message}</p>
                    </div>
                </div>
                <div onClick={() => dispatch(removeToast())} className="cursor-pointer absolute end-4 top-4">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.4775 8.5L8.47754 16.5" stroke="white" strokeWidth="1.34661" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M8.47754 8.5L16.4775 16.5" stroke="white" strokeWidth="1.34661" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
            </div>
            {
                toast?.queue?.map((toast, index) => (
                    <div
                        key={index}
                        className={`flex flex-row max-w-[300px] relative h-[78px] p-0.5 justify-start items-center shadow-lg rounded-[15px] z-[2] min-w-[280px] md:min-w-[280px] bg-white`}
                    >
                        <div className={`flex flex-row justify-start items-center w-full px-5 rounded-[15px] ${backgroundColorClass}`}>
                            <div
                                className={`rounded-[16px] -ms-3.5 w-[50px] 3xl:w-[66px] h-[74px] 3xl:h-[74px] flex items-center justify-center ${backgroundColorClass}`}
                            >
                                {icons[toast?.type || 0]}
                            </div>
                            <div className='flex flex-col ms-2.5 gap-1.5'>
                                <p className="text-[16px] font-bold text-text">{toast?.title}</p>
                                <p className={`text-[12px]  ${toast?.type === 'success' ? 'text-[#338A31]' : 'text-[#fff]'}  text-[#7A7A7A] max-w-[388px]`}>{toast?.message}</p>
                            </div>
                        </div>
                        <div onClick={() => dispatch(removeToast())} className="cursor-pointer absolute end-4 top-4">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16.4775 8.5L8.47754 16.5" stroke="white" strokeWidth="1.34661" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M8.47754 8.5L16.4775 16.5" stroke="white" strokeWidth="1.34661" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default Toast;