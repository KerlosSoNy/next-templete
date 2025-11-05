import { useEffect, useRef, useState } from 'react'
import NotificationsCard from './notificationsCard';
import { Commet } from "react-loading-indicators";
import { useTranslations } from 'next-intl';
import Link from 'next/link';


export default function Notifications() {
    const t = useTranslations()
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [loading,] = useState(false);
    const notifications = [
        {
            name: "تحديث في سياسة الخصوصية",
            description: "تم تحديث سياسة الخصوصية الخاصة بنا، يرجى مراجعة التغييرات الجديدة",
            type: "policy"
        },
        {
            name: "كوبون خصم 50%",
            description: "احصل على خصم 50% على جميع المنتجات باستخدام الكوبون: SAVE30",
            type: "discount"
        },
        {
            name: "منتج جديد متاح",
            description: "لقد قمت بتغيير كلمة المرور بنجاح. ننصحك بالاحتفاظ بها في مكان آمن وعدم مشاركتها مع أي شخص للحفاظ على أمان حسابك.",
            type: "new_product"
        },
        {
            name: "عيد ميلاد سعيد",
            description: "متجر \"تقنية العرب\" انضم إلى منصتنا مع مجموعة مميزة من المنتجات",
            type: "birthday"
        },
        {
            name: "تغير حالة الطلب",
            description: "لقد قمت بتغيير كلمة المرور بنجاح. ننصحك بالاحتفاظ بها في مكان آمن وعدم مشاركتها مع أي شخص للحفاظ على أمان حسابك.",
            type: "status",
            from: "قيد المعالجة",
            to: "تم الشحن"
        }
    ];

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [isOpen])

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);
    return (
        <div className="relative" ref={dropdownRef}>
            <button onClick={() => setIsOpen(!isOpen)} title="Notification" className="rounded-full  flex items-center justify-center">
                <div className="relative">
                    <div className="bg-[#D98E5D] w-[20px] h-[20px] rounded-full flex items-center justify-center text-[10px] text-white font-semibold absolute -top-1 -start-3">
                        05
                    </div>
                    <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.7501 8.71V8.005C16.7501 4.136 13.7261 1 10.0001 1C6.27406 1 3.25006 4.136 3.25006 8.005V8.71C3.25127 9.55155 3.01111 10.3758 2.55806 11.085L1.45006 12.81C0.439062 14.385 1.21106 16.526 2.97006 17.024C7.56635 18.3257 12.4338 18.3257 17.0301 17.024C18.7891 16.526 19.5611 14.385 18.5501 12.811L17.4421 11.086C16.9887 10.3769 16.7482 9.55265 16.7491 8.711L16.7501 8.71Z" stroke="#222222" strokeWidth="1.2" />
                        <path d="M5.50006 18C6.15506 19.748 7.92206 21 10.0001 21C12.0781 21 13.8451 19.748 14.5001 18" stroke="#222222" strokeWidth="1.2" strokeLinecap="round" />
                    </svg>
                </div>
            </button>
            <div className={`${isOpen ? "w-[562px] h-[660px] border" : "w-0 h-0 border-0"} flex flex-col shadow-[0px_20px_60px_0px_rgba(0,0,0,0.15)] overflow-hidden duration-300 transition-all bg-white absolute top-9  border-[#DCDCDC] start-0 rounded-[14px] z-[100]`}>
                <div className={`${isOpen ? "" : "hidden"} flex flex-row items-center justify-between border-b-[1px] border-[#E9ECEF] h-[60px] rounded-t-[14px] px-6 bg-[#F8F9FA]`}>
                    <span className="text-[#D98E5D] text-[18px] font-bold">{t('notifications')} (4)</span>
                    <span className="text-[14px] text-text/80">{t('mark_all_read')}</span>
                </div>
                <div className={`flex flex-col overflow-y-auto h-[calc(100%-100px)] pt-[14px] scroll-container max-h-full ${isOpen ? "" : "hidden"}`}>
                    {!loading ? notifications?.length > 0 ?
                        notifications.map((notification, index) => (
                            <NotificationsCard key={index} name={notification.name} description={notification.description} type={notification.type} />
                        )) : (
                            <div className='flex items-center col-span-3 flex-col justify-center min-h-full'>
                                <span className='font-medium text-[25px] text-text mt-3 '>{t('no_notifications')}</span>
                                <span className='text-[14px] text-text max-w-[307px] text-center mt-1'>{t('no_notifications_description')}</span>
                            </div>
                        ) :
                        <div className="relative col-span-1 w-full z-[50]">
                            <div className="flex flex-col items-center justify-center relative z-[10] min-h-[50vh] w-full text-center p-6">
                                <Commet color="#D89CB6" size="medium" text="" textColor="" />
                            </div>
                        </div>

                    }
                </div>
                {notifications?.length > 0 && <div className='h-[56px] w-full flex items-center justify-center bg-[#F7F8F9] border-t-[1px] border-[#D9D9D9]'>
                    <Link href="/notifications" className='text-[14px] text-[#BFA36F]'>{t('view_all_notifications')}</Link>
                </div>}
            </div>
        </div>
    )
}
