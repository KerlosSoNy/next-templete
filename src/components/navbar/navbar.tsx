'use client'
import { useEffect, useState } from "react";
import LanguageDropdownMenu from "./languageDropDown/languageDropDown";
import ProfileDropDown from "./profileDropDown/profileDropDown";
import NotificationsPopUp from "./notificationDropDown/notificationsDropDown";
import MobileMenu from "./mobileMenu/mobileMenu";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { RootState } from "@/utils/redux/store";
import { usePathname } from "next/navigation";
import { Link } from "@/i18n/navigation";
import Image from "next/image";

export default function Navbar() {
    const t = useTranslations()
    const Token = useSelector((state: RootState) => state?.tokenSlice.token)
    const location = usePathname()
    const Cart = useSelector((state: RootState) => state.cart.cart);
    const [cartCount, setCartCount] = useState(0);
    useEffect(() => {
        if (Cart) {
            if (Cart?.length > 0) {
                setCartCount(Cart.reduce((acc, item) => acc + item.quantity, 0));
            } else {
                setCartCount(0);
            }
        }
    }, [Cart])

    return (
        <div className="flex flex-col fixed top-0 w-full z-100000">
            {/* Top Nav  */}
            <div className="w-full relative flex flex-row z-100000 justify-between px-6 xl:px-[60px] items-center h-[70px] md:h-20 bg-[#FAF4DC]">
                <Image width={100} height={100} src="/images/nav/topLeft.png" alt="Flower" className="absolute md:block hidden top-0 end-[15.4%] lg:end-[27.4%]" />
                <Image width={100} height={100} src="/images/nav/topRight.png" alt="Flower" className="absolute md:block hidden bottom-0 start-[18%] xl:start-[25.4%]" />
                <Image width={106.5} height={66} src="/images/nav/brownHourse.png" alt="Logo" className="w-[106.5px] h-[66px] absolute left-1/2 -translate-x-1/2" />
                <div className="flex flex-row items-center gap-2.5 md:gap-3.5">
                    <Link href='/cart' className="w-[34px] h-[34px] relative rounded-full flex flex-col md:w-11 md:h-11 items-center justify-center bg-[#683C15]">
                        <Image width={20} height={20} src="/images/nav/cart.svg" alt="Cart Icon" />
                        <span className="absolute -top-1 -right-2 min-w-5 text-main  min-h-5 rounded-full flex items-center justify-center bg-[#F9E8D7] text-[12px]">{cartCount}</span>
                    </Link>
                    {Token && <Link href='/favorite' className="w-[34px] shrink-0 hidden h-[34px] md:w-11 md:h-11 rounded-full xl:flex flex-col items-center justify-center bg-[#683C15]">
                        <Image width={20} height={20} src="/images/nav/heart.svg" alt="Heart Icon" />
                    </Link>}
                    {Token && <div className="md:hidden block">
                        <NotificationsPopUp />
                    </div>}
                    {Token &&
                        <Link href='/prev_orders' className="min-w-[102px] h-[34px] md:h-11 rounded-full  hidden  xl:flex flex-row items-center gap-1.5 justify-center bg-[#683C15] pe-3 ps-2">
                            <Image width={20} height={20} src="/images/nav/orders.svg" alt="Orders Icon" />
                            <span className="text-[#F9E8D7] text-[16px] font-normal">{t(`navbar.myOrders`)}</span>
                        </Link>
                    }
                </div>
                {
                    (Token && Token !== null) ?
                        <div className="flex flex-row items-center gap-2.5">
                            <ProfileDropDown />
                            <div className="md:block hidden">
                                <NotificationsPopUp />
                            </div>
                            {/* <div className="hidden flex-row gap-1 justify-center items-center relative  md:flex lg:hidden ">
                                <LanguageDropdownMenu />
                            </div> */}
                            <MobileMenu />
                        </div> :
                        <div className="flex flex-row items-center relative z-6 gap-3.5">
                            <motion.div whileTap={{ scale: 0.9 }}>
                                <Link href='/login' className="w-[147px] h-11 xl:flex hidden flex-col items-center justify-center rounded-full text-center border border-[#683C15] bg-[#683C15]/14% text-[#683C15] font-medium text-[16px]">
                                    {t('navbar.login')}
                                </Link>
                            </motion.div>
                            <motion.div whileTap={{ scale: 0.9 }}>
                                <Link href='/signUp' className="w-[133px] h-11 rounded-full xl:flex hidden flex-col items-center justify-center text-center bg-[#683C15] border border-white text-white font-medium text-[16px]">
                                    {t('navbar.signup')}
                                </Link>
                            </motion.div>
                            {/* <div className="hidden flex-row gap-1 justify-center items-center relative  md:flex lg:hidden ">
                                <LanguageDropdownMenu />
                            </div> */}
                            <MobileMenu />
                        </div>}
            </div>
            {/* Bottom Nav  */}
            <div className="w-full h-[46px] md:h-[60px] relative flex flex-row items-center justify-center gap-10 lg:gap-[68px] bg-[#683C15]">
                <Image src="/images/nav/background.png" alt="Background" fill className="w-full h-full top-0 left-0 absolute object-cover" />

                <motion.div whileTap={{ scale: 0.85, transition: { duration: 0.2 } }}>
                    <Link href='/' className={`text-[16px]  ms-6  lg:ms-0 font-medium ${location === '/' ? "text-[#F3C600]" : 'text-[#F9E8D7]'} relative`}>{t('navbar.home')}</Link>
                </motion.div>
                <motion.div whileTap={{ scale: 0.85, transition: { duration: 0.2 } }}>
                    <Link href='/about' className={`text-[16px]  font-medium ${location.includes('categories') ? "text-[#F3C600]" : 'text-[#F9E8D7]'} relative`}>{t('navbar.about')}</Link>
                </motion.div>
                <motion.div whileTap={{ scale: 0.85, transition: { duration: 0.2 } }}>
                    <Link href='/categories' className={`text-[16px]  font-medium ${location.includes('categories') ? "text-[#F3C600]" : 'text-[#F9E8D7]'} relative`}>{t('navbar.categories')}</Link>
                </motion.div>
                <motion.div whileTap={{ scale: 0.85, transition: { duration: 0.2 } }}>
                    <Link href='/contact_us' className={`text-[16px]  font-medium ${location.includes('contact_us') ? "text-[#F3C600]" : 'text-[#F9E8D7]'} relative`}>{t('navbar.contact_us')}</Link>
                </motion.div>
                <div className="absolute end-7 lg:end-9 xl:end-[60px] top-1/2 -translate-y-1/2">
                    <LanguageDropdownMenu />
                </div>
            </div>
        </div >
    )
}
