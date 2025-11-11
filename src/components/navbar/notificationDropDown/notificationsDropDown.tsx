import { HttpMethod, useApi } from "@/hooks/useApi";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { Link } from "@/i18n/navigation";
import NotificationsCard from "./notificationCard";

export default function NotificationsPopUp() {
    const [isOpen, setIsOpen] = useState(false);
    const [tab, setTab] = useState(0);
    const t = useTranslations("notifications");
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuRef]);

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }

        return () => document.body.classList.remove("overflow-hidden");
    }, [isOpen])
    const { fetchData } = useApi({
        endPoint: "notifications",
        method: HttpMethod.GET,
        withOutToast: true
    })
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token !== null && isOpen === true) {
            fetchData();
        }
    }, [isOpen])
    const notificationsData = [
        {
            id: 1,
            is_read: false,
            created_at: "2025-04-15 09:30am",
            data: {
                message: "🎉 Welcome to our platform! Check out the latest features we've added just for you.",
            },
        },
        {
            id: 2,
            is_read: true,
            created_at: "2025-04-14 03:15pm",
            data: {
                message: "🔥 Flash Sale! Get 30% off on your next order. Don't miss out!",
            },
        },
        {
            id: 3,
            is_read: false,
            created_at: "2025-04-13 11:45am",
            data: {
                message: "🚀 Your weekly performance report is ready. Click here to view your progress.",
            },
        },
        {
            id: 4,
            is_read: true,
            created_at: "2025-04-12 08:20am",
            data: {
                message: "🎁 You've received a new reward! Redeem it now before it expires.",
            },
        },
        {
            id: 4,
            is_read: true,
            created_at: "2025-04-12 08:20am",
            data: {
                message: "🎁 You've received a new reward! Redeem it now before it expires.",
            },
        },
        {
            id: 4,
            is_read: true,
            created_at: "2025-04-12 08:20am",
            data: {
                message: "🎁 You've received a new reward! Redeem it now before it expires.",
            },
        },
    ];
    return (
        <div>
            <button onClick={() => setIsOpen(!isOpen)} title="Notifications" type="button" className="w-[34px] md:!w-[44px] relative !z-[1001] h-[34px] md:!h-[44px] rounded-full bg-[#F9E8D7]  flex-col flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.35194 20.242C8.78709 20.7922 9.34159 21.2364 9.97355 21.541C10.6055 21.8455 11.2984 22.0025 11.9999 22C12.7015 22.0025 13.3944 21.8455 14.0263 21.541C14.6583 21.2364 15.2128 20.7922 15.6479 20.242C13.227 20.5697 10.7729 20.5697 8.35194 20.242ZM18.7499 9V9.704C18.7499 10.549 18.9899 11.375 19.4419 12.078L20.5499 13.801C21.5609 15.375 20.7889 17.514 19.0299 18.011C14.4337 19.3127 9.56623 19.3127 4.96994 18.011C3.21094 17.514 2.43894 15.375 3.44994 13.801L4.55794 12.078C5.01115 11.3692 5.25165 10.5453 5.25094 9.704V9C5.25094 5.134 8.27294 2 11.9999 2C15.7269 2 18.7499 5.134 18.7499 9Z" fill="#9C6B32" />
                </svg>
            </button>
            {isOpen && <div className="fixed z-[1000] w-screen top-0 left-0 h-screen flex items-center justify-center bg-black/50 bg-opacity-50">
                <div ref={menuRef} className="bg-[#9C6B32] border-8 border-[#775229] flex overflow-hidden flex-col absolute top-[65px] md:top-[80px] end-[24px] md:end-[10%] lg:end-[8%] xl:end-[8%] 3xl:end-[6%] rounded-[24px] w-[95%] md:w-full max-w-[434px]">
                    <div className="flex shadow-[0px_14px_24px_0px_rgba(40,40,40,0.08)] pt-5 px-5 pb-[20px] relative flex-row items-center justify-between">
                        {/* Background */}
                        <img src="/images/notifications/topMiddle.png" alt="background" className="absolute top-0 left-1/2 -translate-x-1/2" />
                        {/* Content */}
                        <span className="text-[24px] font-bold text-[#FFFFFF] relative">{t(`title`)}</span>
                        <div className="flex flex-row rounded-full border-[1px] border-white p-1 items-center gap-2.5 bg-[#FFFFFF]/10 backdrop-blur-[34px]">
                            <span onClick={() => setTab(0)} className={`cursor-pointer text-[16px] flex flex-col duration-500 transition-all items-center justify-center font-[400] rounded-full h-[36px] px-3 ${tab === 0 ? 'text-white bg-[#CDA63D]' : 'text-[white]'}`}>
                                {t(`all`)}
                            </span>
                            <span onClick={() => setTab(1)} className={`cursor-pointer text-[16px] flex flex-row gap-1 duration-500 transition-all items-center justify-center font-[400] rounded-full h-[36px] px-3 ${tab === 1 ? 'text-white bg-[#CDA63D]' : 'text-white'}`}>
                                <img src="/images/notifications/eye.svg" alt="" className="" />
                                <span className="-mt-1">{t(`not_readed`)}</span>
                            </span>
                        </div>
                    </div>
                    <div className="bg-white relative">
                        <img src="/images/notifications/bottomLeftPopUp.png" alt="Background-01" className="absolute bottom-0 right-0" />
                        <img src="/images/notifications/bottomRightPopUp.png" alt="Background-02" className="absolute bottom-0 left-0" />
                        <div className="flex flex-col pb-2 px-4 relative max-h-[400px] overflow-y-scroll !overflow-x-hidden my-container">

                            {
                                notificationsData?.map((notification: any, index: number) => (
                                    <NotificationsCard isRead={!notification.is_read} key={index} notification={notification} />
                                ))
                            }
                            <Link onClick={() => setIsOpen(false)} href={'/notifications'} className="mx-auto mt-3 mb-2 font-medium text-[16px] text-[#CDA63D] hover:cursor-pointer">{t(`show_more`)}</Link>
                        </div>
                    </div>
                </div>
            </div>}
        </div>
    )
}
