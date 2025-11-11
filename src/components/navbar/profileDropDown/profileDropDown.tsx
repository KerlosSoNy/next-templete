import { HttpMethod, useApi } from '@/hooks/useApi';
import { Link } from '@/i18n/navigation';
import { setToken } from '@/utils/redux/slices/tokenSlice';
import { RootState } from '@/utils/redux/store';
import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useDispatch } from 'react-redux';
// import { setToken } from '../../../../utils/redux/slices/tokenSlice';
// import useSocket from '../../../../utils/hook/useSocket';

export default function ProfileDropDown() {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    // const dispatch = useDispatch()
    const toggleMenu = () => setIsOpen(!isOpen);
    const [data, setData] = useState<Record<string, string>>({});
    const user = useSelector((state: RootState) => state.userSlice.user)
    const locale = useLocale()
    const t = useTranslations()
    useEffect(() => {
        if (localStorage.getItem('user')) setData(JSON.parse(localStorage.getItem('user') || ''))
    }, [])
    const dispatch = useDispatch()
    const { fetchData } = useApi({
        endPoint: "auth/logout",
        method: HttpMethod.GET,
        payload: data,
        navigateTo: '/'
    })

    // const data = useSocket({
    //     channal_name: 'vendorx-test-private',
    //     event: 'event.test-private',
    //     type: 'private',
    //     leave: true,
    // });

    const handleLogOut = async () => {
        const res = await fetchData();
        if (res && res.status === 200) {
            localStorage.clear();
            dispatch(setToken(null))
            // echo.leave('vendorx-test-private');
        }
    }
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
    return (
        <div dir={locale === 'ar' ? 'rtl' : 'ltr'} className="relative" ref={menuRef}>
            <button
                onClick={toggleMenu}
                className="flex items-center -ms-6 md:ms-0 gap-2 bg-main text-[#96908A] py-[7px] px-0 w-[34px] md:w-[44px] lg:w-fit justify-center lg:px-[16px] rounded-full border-0 md:border-[1px] border-[#ECD6C0] h-[34px] md:h-[44px]"
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 10C14.2091 10 16 8.20914 16 6C16 3.79086 14.2091 2 12 2C9.79086 2 8 3.79086 8 6C8 8.20914 9.79086 10 12 10Z" fill="#ECD6C0" />
                    <path d="M20 17.5C20 19.985 20 22 12 22C4 22 4 19.985 4 17.5C4 15.015 7.582 13 12 13C16.418 13 20 15.015 20 17.5Z" fill="#ECD6C0" />
                </svg>
                <span className='text-[16px] font-medium text-[#ECD6C0] hidden lg:block'>{user?.full_name || data?.full_name || "Loading"}</span>
            </button>

            {isOpen && (
                <ul className={`absolute -end-full lg:-right-2 mt-2 md:mt-[10px] w-48 bg-white rounded-[14px] z-[10000] border-[#E9E9E9] shadow-lg overflow-hidden `}>
                    <li className=" hover:bg-gray-100 flex cursor-pointer relative w-full">
                        <Link href='/profile' className='ps-4 flex flex-row items-center gap-3 !w-[100%] !h-full' onClick={toggleMenu}>
                            <svg width="19" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M11.2788 0.152C10.9088 -4.47035e-08 10.4388 0 9.49983 0C8.56083 0 8.09183 -4.47035e-08 7.72083 0.152C7.47672 0.251745 7.25474 0.398782 7.06767 0.584647C6.88061 0.770512 6.73214 0.991536 6.63083 1.235C6.53683 1.458 6.50083 1.719 6.48583 2.098C6.47869 2.3725 6.4019 2.64068 6.26266 2.87736C6.12342 3.11403 5.9263 3.31142 5.68983 3.451C5.44857 3.5851 5.17737 3.65615 4.90135 3.65754C4.62534 3.65894 4.35343 3.59065 4.11083 3.459C3.77283 3.281 3.52783 3.183 3.28583 3.151C2.75641 3.08192 2.22109 3.2242 1.79583 3.547C1.47783 3.789 1.24283 4.193 0.773827 5C0.303827 5.807 0.0698272 6.21 0.0168272 6.605C-0.0531728 7.131 0.0908273 7.663 0.416827 8.084C0.564827 8.276 0.773827 8.437 1.09683 8.639C1.57383 8.936 1.87983 9.442 1.87983 10C1.87983 10.558 1.57383 11.064 1.09783 11.36C0.773827 11.563 0.564827 11.724 0.415827 11.916C0.255394 12.1242 0.137577 12.362 0.0691129 12.6158C0.000649229 12.8696 -0.0171181 13.1343 0.0168272 13.395C0.0698272 13.789 0.303827 14.193 0.773827 15C1.24383 15.807 1.47783 16.21 1.79583 16.453C2.21983 16.776 2.75583 16.918 3.28583 16.849C3.52783 16.817 3.77283 16.719 4.11083 16.541C4.35355 16.4092 4.62564 16.3408 4.90185 16.3422C5.17807 16.3436 5.44945 16.4147 5.69083 16.549C6.17683 16.829 6.46483 17.344 6.48583 17.902C6.50083 18.282 6.53683 18.542 6.63083 18.765C6.83483 19.255 7.22683 19.645 7.72083 19.848C8.09083 20 8.56083 20 9.49983 20C10.4388 20 10.9088 20 11.2788 19.848C11.5229 19.7483 11.7449 19.6012 11.932 19.4154C12.119 19.2295 12.2675 19.0085 12.3688 18.765C12.4628 18.542 12.4988 18.282 12.5138 17.902C12.5338 17.344 12.8228 16.828 13.3098 16.549C13.5511 16.4149 13.8223 16.3439 14.0983 16.3425C14.3743 16.3411 14.6462 16.4093 14.8888 16.541C15.2268 16.719 15.4718 16.817 15.7138 16.849C16.2438 16.919 16.7798 16.776 17.2038 16.453C17.5218 16.211 17.7568 15.807 18.2258 15C18.6958 14.193 18.9298 13.79 18.9828 13.395C19.0166 13.1343 18.9987 12.8695 18.9301 12.6157C18.8614 12.3619 18.7434 12.1241 18.5828 11.916C18.4348 11.724 18.2258 11.563 17.9028 11.361C17.4258 11.064 17.1198 10.558 17.1198 10C17.1198 9.442 17.4258 8.936 17.9018 8.64C18.2258 8.437 18.4348 8.276 18.5838 8.084C18.7443 7.87579 18.8621 7.63799 18.9305 7.38422C18.999 7.13044 19.0168 6.86565 18.9828 6.605C18.9298 6.211 18.6958 5.807 18.2258 5C17.7558 4.193 17.5218 3.79 17.2038 3.547C16.7786 3.2242 16.2432 3.08192 15.7138 3.151C15.4718 3.183 15.2268 3.281 14.8888 3.459C14.6461 3.59083 14.374 3.65922 14.0978 3.65782C13.8216 3.65642 13.5502 3.58528 13.3088 3.451C13.0725 3.3113 12.8756 3.11385 12.7366 2.87719C12.5975 2.64052 12.5209 2.37241 12.5138 2.098C12.4988 1.718 12.4628 1.458 12.3688 1.235C12.2675 0.991536 12.119 0.770512 11.932 0.584647C11.7449 0.398782 11.5229 0.251745 11.2788 0.152ZM9.49983 13C11.1698 13 12.5228 11.657 12.5228 10C12.5228 8.343 11.1688 7 9.49983 7C7.83083 7 6.47683 8.343 6.47683 10C6.47683 11.657 7.83083 13 9.49983 13Z" fill="#CDA63D" />
                            </svg>
                            <span className='py-[10px] mt-0.5 font-medium text-[18px] text-[#1f1f1f] w-full pe-4 border-b-[1px] border-[#E6E6E6] border-dashed'>{t(`profile_drow_down.profile`)}</span>
                        </Link>
                    </li>
                    <li className=" hover:bg-gray-100 flex cursor-pointer relative w-full">
                        <Link href='/addresses' className='ps-4 flex flex-row items-center gap-3 !w-[100%] !h-full' onClick={toggleMenu}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.436 5.14604C2 5.64204 2 6.49404 2 8.19604V17.59C2 18.796 2 19.399 2.315 19.853C2.629 20.307 3.179 20.498 4.279 20.879L5.573 21.328C6.274 21.571 6.813 21.758 7.266 21.878C7.562 21.957 7.833 21.725 7.833 21.419V6.26904C7.82954 6.1476 7.78597 6.03072 7.70908 5.93665C7.6322 5.84257 7.52633 5.77661 7.408 5.74904C7.019 5.65004 6.551 5.48804 5.91 5.26604C4.357 4.72704 3.58 4.45804 2.99 4.73104C2.77883 4.82992 2.59025 4.97118 2.436 5.14604ZM12.62 3.48004L11.084 4.54504C10.529 4.93004 10.121 5.21304 9.774 5.41404C9.69257 5.46011 9.6245 5.52654 9.57646 5.60683C9.52843 5.68712 9.50208 5.77851 9.5 5.87204V20.919C9.5 21.289 9.884 21.521 10.196 21.321C10.531 21.107 10.915 20.841 11.38 20.519L12.916 19.454C13.471 19.069 13.879 18.786 14.226 18.585C14.3074 18.539 14.3755 18.4725 14.4235 18.3923C14.4716 18.312 14.4979 18.2206 14.5 18.127V3.07904C14.5 2.70804 14.116 2.47704 13.804 2.67604C13.469 2.89104 13.085 3.15704 12.62 3.48004ZM19.72 3.11904L18.427 2.67104C17.726 2.42804 17.187 2.24104 16.734 2.12104C16.438 2.04204 16.167 2.27404 16.167 2.58004V17.73C16.1705 17.8515 16.214 17.9684 16.2909 18.0624C16.3678 18.1565 16.4737 18.2225 16.592 18.25C16.981 18.349 17.449 18.51 18.09 18.733C19.643 19.272 20.42 19.541 21.01 19.268C21.2212 19.1692 21.4097 19.0279 21.564 18.853C22 18.357 22 17.505 22 15.803V6.40904C22 5.20304 22 4.59904 21.685 4.14604C21.371 3.69204 20.821 3.50104 19.721 3.12004" fill="#CDA63D" />
                            </svg>
                            <span className='py-[10px] mt-0.5 font-medium text-[18px] text-[#1f1f1f] w-full pe-4 border-b-[1px] border-[#E6E6E6] border-dashed'>{t(`profile_drow_down.address`)}</span>
                        </Link>
                    </li>
                    <li className=" hover:bg-gray-100 flex cursor-pointer relative w-full">
                        <button className='ps-4 flex flex-row items-center gap-3 !w-[100%] !h-full' onClick={() => {
                            toggleMenu()
                            handleLogOut()
                        }}>
                            <svg className={`${locale !== 'en' ? "-ms-1.5" : ""}`} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M7.87493 12.0004C7.87493 11.8015 7.95395 11.6107 8.0946 11.47C8.23525 11.3294 8.42602 11.2504 8.62493 11.2504H19.5979L17.6369 9.57036C17.5621 9.50628 17.5006 9.42808 17.4559 9.34022C17.4113 9.25237 17.3844 9.15659 17.3768 9.05835C17.3692 8.9601 17.381 8.86132 17.4116 8.76764C17.4421 8.67396 17.4908 8.58722 17.5549 8.51236C17.619 8.43751 17.6972 8.37601 17.7851 8.33138C17.8729 8.28675 17.9687 8.25986 18.0669 8.25224C18.1652 8.24463 18.264 8.25644 18.3577 8.287C18.4513 8.31756 18.5381 8.36628 18.6129 8.43036L22.1129 11.4304C22.1953 11.5008 22.2614 11.5882 22.3067 11.6866C22.352 11.785 22.3755 11.892 22.3755 12.0004C22.3755 12.1087 22.352 12.2157 22.3067 12.3141C22.2614 12.4125 22.1953 12.5 22.1129 12.5704L18.6129 15.5704C18.4618 15.6998 18.2654 15.7639 18.0669 15.7485C17.8685 15.7331 17.6844 15.6395 17.5549 15.4884C17.4255 15.3372 17.3614 15.1408 17.3768 14.9424C17.3922 14.744 17.4858 14.5598 17.6369 14.4304L19.5969 12.7504H8.62493C8.42602 12.7504 8.23525 12.6713 8.0946 12.5307C7.95395 12.39 7.87493 12.1993 7.87493 12.0004Z" fill="#CDA63D" />
                                <path d="M14.625 8C14.625 8.702 14.625 9.053 14.456 9.306C14.3832 9.41478 14.2898 9.50821 14.181 9.581C13.928 9.75 13.577 9.75 12.875 9.75H8.625C8.02826 9.75 7.45597 9.98705 7.03401 10.409C6.61205 10.831 6.375 11.4033 6.375 12C6.375 12.5967 6.61205 13.169 7.03401 13.591C7.45597 14.0129 8.02826 14.25 8.625 14.25H12.875C13.577 14.25 13.928 14.25 14.181 14.418C14.2899 14.4911 14.3833 14.5849 14.456 14.694C14.625 14.947 14.625 15.298 14.625 16C14.625 18.828 14.625 20.243 13.746 21.121C12.868 22 11.454 22 8.626 22H7.626C4.796 22 3.383 22 2.504 21.121C1.625 20.243 1.625 18.828 1.625 16V8C1.625 5.172 1.625 3.757 2.504 2.879C3.383 2.001 4.797 2 7.625 2H8.625C11.454 2 12.868 2 13.746 2.879C14.625 3.757 14.625 5.172 14.625 8Z" fill="#CDA63D" />
                            </svg>
                            <span className={`pt-[10px] pb-[16px] mt-1 ${locale === 'ar' ? '-ms-8' : '-ms-[58px]'} font-medium text-[18px] text-[#1f1f1f] w-full pe-4 border-b-[1px] border-[#E6E6E6] border-dashed`}>{t(`profile_drow_down.logout`)}</span>
                        </button>
                    </li>
                </ul>
            )}
        </div>
    );
};

