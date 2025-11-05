import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../../utils/redux/store';
import { useState, useEffect } from 'react';
import { setIsLogOut } from '../../../utils/redux/slices/addressDialog';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function MobileMenu({ isMobileMenuOpen, setIsMobileMenuOpen }: { isMobileMenuOpen: boolean, setIsMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
    const Token = useSelector((state: RootState) => state?.tokenSlice.token);
    const [show, setShow] = useState(false);
    const [shouldRender, setShouldRender] = useState(false);

    const navLinks = [{
        href: '/',
        name: 'nav.home'
    },
    {
        href: '/contact-us',
        name: 'nav.contactUs'
    },
    {
        href: '/categories',
        name: 'nav.categories'
    },
    {
        href: '/faqs',
        name: 'nav.faq'
    }
    ];
    const t = useTranslations();

    useEffect(() => {
        if (isMobileMenuOpen) {
            setShouldRender(true);
            // Small timeout to ensure DOM is ready
            setTimeout(() => setShow(true), 10);
        } else {
            setShow(false);
            // Wait for animation to complete before unmounting
            setTimeout(() => setShouldRender(false), 300);
        }
    }, [isMobileMenuOpen]);

    const handleClose = () => {
        setShow(false);
        setTimeout(() => {
            setIsMobileMenuOpen(false);
        }, 300);
    };
    const totalLength = useSelector((state: any) => state?.cart?.totalQuantity);
    const totalAmount = useSelector((state: any) => state?.cart?.total);
    const dispatch = useDispatch<AppDispatch>();

    function useHasMounted() {
        const [mounted, setMounted] = useState(false);
        useEffect(() => setMounted(true), []);
        return mounted;
    }
    const hasMounted = useHasMounted();
    if (!shouldRender) return null;

    return (
        <>
            {/* Overlay */}
            <div
                className={`fixed inset-0 bg-black/50 z-[1000000] md:hidden transition-opacity duration-300 ease-in-out ${show ? 'opacity-100' : 'opacity-0'
                    }`}
                onClick={handleClose}
            />

            {/* Menu Sidebar */}
            <div
                className={`fixed start-0 top-0 h-full w-[280px] bg-gradient-to-b from-[#C4B59B] to-[#4A3F35] z-[10000000] md:hidden shadow-xl transform transition-transform duration-300 ease-out ${show ? 'translate-x-0' : 'ltr:-translate-x-full rtl:translate-x-full'
                    }`}
            >
                <div className="flex items-center justify-between p-4 border-b border-gray-300">
                    <h2 className="text-lg text-white font-semibold">{t('menu')}</h2>
                    <button
                        type="button"
                        aria-label="Close"
                        onClick={handleClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13 1L1 13M1 1L13 13" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>

                <nav className="p-4 overflow-y-auto max-h-[calc(100vh-80px)]">
                    <ul className="space-y-4">
                        {navLinks.map((link: any, index: number) => (
                            <li
                                key={link.id}
                                className={`transform transition-all duration-500 ease-out ${show
                                    ? 'translate-x-0 opacity-100'
                                    : 'translate-x-8 opacity-0'
                                    }`}
                                style={{
                                    transitionDelay: show ? `${100 + index * 50}ms` : '0ms'
                                }}
                            >
                                <Link
                                    href={link.href}
                                    className="block py-2 text-white hover:text-[#4A3F35] transition-colors"
                                    onClick={handleClose}
                                >
                                    {t(`${link.name}`)}
                                </Link>
                            </li>
                        ))}

                        <li
                            className={`pt-4 border-t border-gray-300 transform transition-all duration-500 ease-out ${show
                                ? 'translate-x-0 opacity-100'
                                : 'translate-x-8 opacity-0'
                                }`}
                            style={{
                                transitionDelay: show ? `${100 + navLinks.length * 50}ms` : '0ms'
                            }}
                        >
                            {Token && Token !== 'null' ? (
                                <>
                                    <Link
                                        href="/settings"
                                        className="block py-2 text-white hover:text-[#4A3F35] transition-colors"
                                        onClick={handleClose}
                                    >
                                        {t(`myProfile`)}
                                    </Link>
                                    <Link
                                        href="/settings/orders"
                                        className="block py-2 text-white hover:text-[#4A3F35] transition-colors"
                                        onClick={handleClose}
                                    >
                                        {t("bottomSection.orders")}
                                    </Link>
                                    <button
                                        className="block w-full text-start py-2 text-white hover:text-[#4A3F35] transition-colors"
                                        onClick={() => {
                                            dispatch(setIsLogOut(true))
                                            handleClose();
                                        }}
                                    >
                                        {t(`logout`)}
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link
                                        href="/login"
                                        className="block py-2 text-white hover:text-[#ECB0CA] transition-colors"
                                        onClick={handleClose}
                                    >
                                        {t('nav.login')}
                                    </Link>
                                    <Link
                                        href="/sign-up"
                                        className="block py-2 text-white hover:text-[#ECB0CA] transition-colors"
                                        onClick={handleClose}
                                    >
                                        {t('nav.signUp')}
                                    </Link>
                                </>
                            )}
                        </li>
                    </ul>
                </nav>
                <div className="flex absolute bottom-4 flex-row w-full justify-between items-center gap-[14px] xl:gap-[24px] px-4">
                    <div className="flex flex-row items-center gap-[14px] xl:gap-[24px]">
                        <Link href={'/favorite'} className="relative">
                            <div className="bg-[#C4B59B] w-[20px] h-[20px] rounded-full flex items-center justify-center text-[10px] text-white font-semibold absolute -start-3">
                                05
                            </div>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 5.66407L11.0145 4.68178C8.69849 2.37342 4.45695 3.17026 2.92549 6.07046C2.20523 7.43444 2.04328 9.40329 3.35715 11.9168C4.62254 14.3375 7.25305 17.2353 12 20.3928C16.747 17.2353 19.3775 14.3375 20.6429 11.9168C21.9567 9.40329 21.7948 7.43444 21.0745 6.07046C19.543 3.17026 15.3015 2.37342 12.9855 4.68178L12 5.66407ZM12 22C-9.08305 8.49121 5.50829 -2.05449 11.7584 3.52411C11.8404 3.59729 11.921 3.67325 12 3.75201C12.079 3.67325 12.1596 3.5973 12.2416 3.52412C18.4917 -2.0545 33.0831 8.4912 12 22Z" fill="#fff" />
                            </svg>
                        </Link>
                        <Link href={'/notifications'} title="Notification" className="rounded-full  flex items-center justify-center">
                            <div className="relative">
                                <div className="bg-[#C4B59B] w-[20px] h-[20px] rounded-full flex items-center justify-center text-[10px] text-white font-semibold absolute -top-1 -start-3">
                                    05
                                </div>
                                <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16.7501 8.71V8.005C16.7501 4.136 13.7261 1 10.0001 1C6.27406 1 3.25006 4.136 3.25006 8.005V8.71C3.25127 9.55155 3.01111 10.3758 2.55806 11.085L1.45006 12.81C0.439062 14.385 1.21106 16.526 2.97006 17.024C7.56635 18.3257 12.4338 18.3257 17.0301 17.024C18.7891 16.526 19.5611 14.385 18.5501 12.811L17.4421 11.086C16.9887 10.3769 16.7482 9.55265 16.7491 8.711L16.7501 8.71Z" stroke="#fff" strokeWidth="1.2" />
                                    <path d="M5.50006 18C6.15506 19.748 7.92206 21 10.0001 21C12.0781 21 13.8451 19.748 14.5001 18" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" />
                                </svg>
                            </div>
                        </Link>
                    </div>
                    <Link href={'/cart'} className="flex flex-row items-center gap-[17px]">
                        <div className="flex flex-col items-end xl:gap-[2px]">
                            <span className="text-[14px] text-[#fff]">{t('cart_title')} </span>
                            <span className="flex flex-row items-center text-[14px] text-[#fff] font-medium" dir="ltr">{(totalAmount || 0).toFixed(2) || 0}
                                <svg className="ms-1" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clipPath="url(#clip0_1773_5507)">
                                        <path d="M0.860519 10.5962C0.375362 10.6056 -0.00666867 10.1767 0.00270633 9.70322C-0.00198117 6.85556 0.000362579 4.05947 0.00270633 1.69932C0.00270633 1.16728 0.370675 0.796973 0.898018 0.794629C2.20583 0.789941 3.76208 0.787598 5.00427 0.796973C6.83005 0.771191 8.49645 2.22432 8.72614 4.029C8.83161 5.16338 8.75427 6.41025 8.77536 7.54463V7.91963C8.80348 9.0376 7.17224 9.15244 7.06208 8.06494C7.01755 6.86494 7.0738 5.679 7.03864 4.47666C7.0152 3.52041 6.22536 2.65791 5.27849 2.55478C4.12771 2.47744 2.88083 2.54072 1.73005 2.52197C1.73005 4.8376 1.73005 7.38994 1.72536 9.6915C1.73239 10.2024 1.35036 10.5962 0.860519 10.5962Z" fill="#fff" stroke="white" strokeWidth="0.7" />
                                        <path d="M8.77139 11.2078C8.1878 11.2078 7.60655 11.2055 7.02296 11.2031C5.18546 11.2453 3.45342 9.74766 3.27061 7.94766C3.17686 6.85078 3.22842 5.73984 3.21671 4.64766L3.21905 4.07578C3.21436 3.55547 3.59405 3.16875 4.08858 3.16875C5.10811 3.20391 4.94405 4.25625 4.94639 4.97578C4.94874 5.82422 4.93467 6.67031 4.95577 7.52578C4.97921 8.48203 5.76905 9.34453 6.71827 9.44766C7.1378 9.49219 7.49874 9.47578 7.89952 9.47578C8.56514 9.48281 9.58936 9.47344 10.2644 9.47813C10.2667 7.18359 10.2644 4.575 10.2667 2.29688C10.2667 1.8 10.644 1.40859 11.1245 1.40625C11.6214 1.40625 11.9917 1.79766 11.9917 2.31328V9.74531C12.0362 10.4578 11.9636 11.1914 11.0823 11.2078C10.33 11.2055 9.51905 11.2102 8.77139 11.2078Z" fill="#fff" stroke="white" strokeWidth="0.7" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_1773_5507">
                                            <rect width="12" height="12" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </span>
                        </div>
                        <div className="relative">
                            <div className="bg-[#C4B59B] w-[20px] h-[20px] rounded-full flex items-center justify-center text-[10px] text-white font-semibold absolute -top-1 -start-3">
                                {hasMounted && totalLength > 0 ? totalLength <= 9 ? `0${totalLength}` : totalLength : '0'}
                            </div>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2.375C13.9724 2.375 15.5714 3.91402 15.5714 5.8125V6.5H8.42857V5.8125C8.42857 3.91402 10.0276 2.375 12 2.375ZM17 6.5V5.8125C17 3.15463 14.7614 1 12 1C9.23858 1 7 3.15463 7 5.8125V6.5H2V20.25C2 21.7688 3.27919 23 4.85714 23H19.1429C20.7208 23 22 21.7688 22 20.25V6.5H17ZM3.42857 7.875H20.5714V20.25C20.5714 21.0094 19.9318 21.625 19.1429 21.625H4.85714C4.06816 21.625 3.42857 21.0094 3.42857 20.25V7.875Z" fill="#fff" />
                            </svg>
                        </div>
                    </Link>

                </div>
            </div>
        </>
    );
}