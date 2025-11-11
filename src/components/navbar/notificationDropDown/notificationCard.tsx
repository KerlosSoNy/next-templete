import { useTranslations } from "next-intl";

export default function NotificationsCard({ isRead, notification }: { notification: any, isRead?: boolean }) {
    const t = useTranslations()

    function timeDifferenceFromNow(dateString: string): string {
        try {
            if (!dateString) throw new Error("Invalid date string");

            // Split date and time
            const [datePart, timePart] = dateString.split(" ");
            if (!datePart || !timePart) throw new Error("Invalid date format");

            // Parse date
            const [year, month, day] = datePart.split("-").map(Number);
            if (isNaN(year) || isNaN(month) || isNaN(day)) throw new Error("Invalid date values");

            // Handle time and period
            let hours: number, minutes: number, period: string | null = null;
            if (timePart.includes("am") || timePart.includes("pm")) {
                // 12-hour format with AM/PM
                const match = timePart.match(/^(\d{1,2}):(\d{2})(am|pm)$/i);
                if (!match) throw new Error("Invalid 12-hour time format");

                hours = parseInt(match[1], 10);
                minutes = parseInt(match[2], 10);
                period = match[3].toLowerCase();

                // Convert 12-hour to 24-hour format
                if (period === "pm" && hours !== 12) hours += 12;
                if (period === "am" && hours === 12) hours = 0;
            } else {
                // 24-hour format
                const [h, m] = timePart.split(":").map(Number);
                if (isNaN(h) || isNaN(m) || h > 23 || m > 59) throw new Error("Invalid 24-hour time format");

                hours = h;
                minutes = m;
            }

            // Create Date object
            const inputDate = new Date(year, month - 1, day, hours, minutes);
            if (isNaN(inputDate.getTime())) throw new Error("Invalid date object");

            // Time difference calculations
            const now = new Date();
            const diffInMilliseconds = inputDate.getTime() - now.getTime();

            const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
            const diffInHours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
            const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));

            if (diffInMinutes < 0) {
                if (diffInMinutes > -60) {
                    return t("notifications.from_minutes_ago", { count: Math.abs(diffInMinutes) });
                } else if (diffInHours > -24) {
                    return t("notifications.from_hours_ago", { count: Math.abs(diffInHours) });
                } else {
                    return t("notifications.from_days_ago", { count: Math.abs(diffInDays) });
                }
            } else {
                if (diffInMinutes < 60) {
                    return t("notifications.from_minutes_later", { count: diffInMinutes });
                } else if (diffInHours < 24) {
                    return t("notifications.from_hours_later", { count: diffInHours });
                } else {
                    return t("notifications.from_days_later", { count: diffInDays });
                }
            }
        } catch (error: any) {
            // console.error("Error in timeDifferenceFromNow:", error.message);
            return t("notifications.invalid_date");
        }
    }

    return (
        <div className={`flex flex-col w-full items-start relative pb-3 ps-5 pt-[18px] ${isRead ? 'bg-[#FAF4DC] border-[1px] border-[#CDA63D] rounded-[14px]' : 'bg-white border-[1px] border-[#525252]/[16%] rounded-[14px]'} my-2.5`}>
            <div className="flex flex-row overflow-x-hidden items-center gap-[10px] w-full">
                <img src="https://plus.unsplash.com/premium_photo-1740928991572-4ef76c80f2bc?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="image pic" className="w-[44px] h-[44px] rounded-full object-cover" />
                <div className="flex flex-row justify-between w-full items-start pe-[26px] gap-3">
                    {<span title={notification?.data?.message} className="font-medium text-[14px] line-clamp-2 text-[#1F1F1F]">{notification?.data?.message}</span>}
                    {/* <span className="font-medium text-[14px] text-[#1F1F1F]">{"عرض خاص! احصل على خصم 15% على جميع أنواع البهارات الشرقية لفترة محدودة! 🛍️"}</span> */}
                </div>
            </div>
            {isRead &&
                <span className="absolute bottom-[17px] end-[26px]">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M2.97712 2L1.87793 3.08126L16.0226 17L17.1218 15.9184L2.97712 2Z" fill="#CDA63D" />
                        <path d="M4.20032 5.36425L5.23492 6.38229C4.10236 7.33118 3.20051 8.51233 2.61773 9.54574L2.61595 9.54923C4.23901 12.2195 6.81431 14.7432 10.0647 14.3604C10.942 14.257 11.7605 13.9619 12.5083 13.5397L13.5557 14.57C12.098 15.4906 10.4271 15.9781 8.6166 15.7371C5.35204 15.3027 2.68268 12.668 1 9.57368C1.79005 8.00941 2.87079 6.51291 4.20032 5.36425ZM6.55345 3.85551C7.4663 3.45528 8.45405 3.21989 9.50887 3.20313C9.56744 3.20278 10.2627 3.23526 10.5779 3.28625C10.7756 3.31838 10.9726 3.35854 11.1667 3.40848C14.2634 4.20231 16.5576 6.77833 18 9.43223C17.3949 10.6347 16.6023 11.8081 15.6572 12.8136L14.6538 11.8263C15.3519 11.0859 15.934 10.2617 16.3823 9.46227C16.3823 9.46227 15.9315 8.74911 15.5897 8.30138C15.37 8.01361 15.139 7.73421 14.8962 7.46494C14.7046 7.2526 13.9603 6.53142 13.7832 6.38124C12.5949 5.37577 11.1997 4.58683 9.52626 4.6001C8.87818 4.61023 8.25494 4.73596 7.66328 4.9476L6.55345 3.85551Z" fill="#CDA63D" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M7.0168 8.13607L7.81548 8.92165L10.8897 11.9467C10.4787 12.1737 10.0045 12.3029 9.50019 12.3029C7.92966 12.3029 6.65479 11.0484 6.65479 9.50301C6.65479 9.00673 6.78646 8.54049 7.0168 8.13607ZM9.44766 6.70382C9.46505 6.70347 9.48279 6.70312 9.50019 6.70312C11.0707 6.70312 12.3456 7.95796 12.3456 9.50301C12.3456 9.52047 12.3456 9.53758 12.3452 9.5547L9.44766 6.70382Z" fill="#CDA63D" />
                    </svg>

                </span>
            }
            <div className={`flex flex-col  pe-[44px] ms-[54px] w-full  pb-1.5 border-[#525252]/40`}>
                <span className="flex flex-row items-center gap-1">
                    <img src="/images/icons/note.svg" alt="Note Icon" />
                    <span className="text-[14px] pt-0.5 font-[400] text-[#525252]/60">{timeDifferenceFromNow(notification?.created_at)}</span>
                </span>
            </div>
        </div>
    )
}
