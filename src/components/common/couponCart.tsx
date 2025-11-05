import React from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../utils/redux/store";
import { removeDiscount } from "../../utils/redux/slices/cart";
import { showToast } from "@/utils/redux/slices/toast";
import { useTranslations } from "next-intl";
import { FaCheck } from "react-icons/fa";

interface CouponProps {
    code: string;
    setCode: (code: string) => void;
    setStatus: (status: "none" | "valid" | "invalid") => void;
    status: "none" | "valid" | "invalid";
    errors: any
    onApply: (code: string) => void;
}


const CouponInput: React.FC<CouponProps> = ({ onApply, setStatus, status, code, setCode, errors }) => {
    const t = useTranslations();
    const Token = useSelector((state: RootState) => state.tokenSlice.token);
    const dispatch = useDispatch<AppDispatch>();
    const handleApply = () => {
        if (Token && Token !== "null") {
            if (onApply) {
                if (code !== "") {
                    onApply(code)
                }
            } else {
                setStatus("invalid");
            }
        } else {
            dispatch(showToast(t('toast.error'), t("product_details.login_first"), "error"));
        }
    };


    const handleReset = () => {
        dispatch(removeDiscount());
        setCode("");
        setStatus("none");
    };

    const borderClass =
        status === "valid"
            ? "border-green-500"
            : status === "invalid"
                ? "border-red-500"
                : "border-transparent";
    return (
        <div className="max-w-md space-y-2 mt-[18px]">
            <label className="block font-bold text-[#09090B] text-[15px]">{t('coupon.label')}</label>
            <div
                className={`flex items-center mt-1.5 h-[51px] px-[12px] border ${borderClass} rounded-[12px] bg-[#F4F4F5] overflow-hidden`}
            >
                <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.35275 15.3479L2.75436 13.7494C2.10239 13.0975 2.10239 12.0248 2.75436 11.3729L4.35275 9.77446C4.62616 9.50105 4.84699 8.96474 4.84699 8.58617V6.32526C4.84699 5.39987 5.60413 4.64276 6.52952 4.64276H8.79041C9.16897 4.64276 9.70528 4.42196 9.97869 4.14855L11.5771 2.55014C12.2291 1.89816 13.3017 1.89816 13.9537 2.55014L15.5521 4.14855C15.8255 4.42196 16.3618 4.64276 16.7403 4.64276H19.0012C19.9266 4.64276 20.6837 5.39987 20.6837 6.32526V8.58617C20.6837 8.96474 20.9046 9.50105 21.178 9.77446L22.7764 11.3729C23.4284 12.0248 23.4284 13.0975 22.7764 13.7494L21.178 15.3479C20.9046 15.6213 20.6837 16.1576 20.6837 16.5361V18.7969C20.6837 19.7223 19.9266 20.4796 19.0012 20.4796H16.7403C16.3618 20.4796 15.8255 20.7004 15.5521 20.9738L13.9537 22.5722C13.3017 23.2242 12.2291 23.2242 11.5771 22.5722L9.97869 20.9738C9.70528 20.7004 9.16897 20.4796 8.79041 20.4796H6.52952C5.60413 20.4796 4.84699 19.7223 4.84699 18.7969V16.5361C4.84699 16.1471 4.62616 15.6108 4.35275 15.3479Z" stroke="#F15A29" strokeWidth="1.59184" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M9.26538 15.0612L15.2654 9.06116" stroke="#F15A29" strokeWidth="1.59184" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M15.7609 15.5612H15.7699" stroke="#F15A29" strokeWidth="2.12245" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M9.76088 9.56116H9.76988" stroke="#F15A29" strokeWidth="2.12245" strokeLinecap="round" strokeLinejoin="round" />
                </svg>

                <input
                    type="text"
                    value={code}
                    disabled={status === "valid" || Token === "null" || !Token}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="ACB-3XA-EEE-ACN"
                    className="flex-1 px-3 py-2 outline-none"
                />
                <button
                    onClick={() => {
                        if (status === "valid") {
                            handleReset();
                        } else {
                            handleApply()
                        }
                    }}
                    disabled={Token === "null" || !Token}
                    className=""
                >
                    {
                        (status === 'none' || status === 'invalid') && (
                            <FaCheck />
                        )
                    }
                    {
                        status === 'valid' && (
                            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12.7856 14.0312L15.8306 17.0762C16.0231 17.2687 16.2681 17.3649 16.5656 17.3649C16.8631 17.3649 17.1081 17.2687 17.3006 17.0762C17.4931 16.8837 17.5894 16.6387 17.5894 16.3412C17.5894 16.0437 17.4931 15.7987 17.3006 15.6062L14.2556 12.5612L17.3006 9.51616C17.4931 9.32366 17.5894 9.07865 17.5894 8.78116C17.5894 8.48365 17.4931 8.23866 17.3006 8.04616C17.1081 7.85366 16.8631 7.75741 16.5656 7.75741C16.2681 7.75741 16.0231 7.85366 15.8306 8.04616L12.7856 11.0912L9.74064 8.04616C9.54814 7.85366 9.30314 7.75741 9.00564 7.75741C8.70814 7.75741 8.46314 7.85366 8.27064 8.04616C8.07814 8.23866 7.98189 8.48365 7.98189 8.78116C7.98189 9.07865 8.07814 9.32366 8.27064 9.51616L11.3156 12.5612L8.27064 15.6062C8.07814 15.7987 7.98189 16.0437 7.98189 16.3412C7.98189 16.6387 8.07814 16.8837 8.27064 17.0762C8.46314 17.2687 8.70814 17.3649 9.00564 17.3649C9.30314 17.3649 9.54814 17.2687 9.74064 17.0762L12.7856 14.0312ZM12.7856 23.0612C11.3331 23.0612 9.96814 22.7854 8.69064 22.2338C7.41314 21.6822 6.30189 20.9342 5.35689 19.9899C4.41189 19.0456 3.66395 17.9344 3.11305 16.6562C2.56215 15.378 2.28635 14.013 2.28565 12.5612C2.28495 11.1094 2.56075 9.74436 3.11305 8.46616C3.66535 7.18796 4.41329 6.07671 5.35689 5.13241C6.30049 4.18811 7.41174 3.44016 8.69064 2.88856C9.96954 2.33696 11.3345 2.06116 12.7856 2.06116C14.2367 2.06116 15.6017 2.33696 16.8806 2.88856C18.1595 3.44016 19.2708 4.18811 20.2144 5.13241C21.158 6.07671 21.9063 7.18796 22.4593 8.46616C23.0123 9.74436 23.2877 11.1094 23.2856 12.5612C23.2835 14.013 23.0077 15.378 22.4582 16.6562C21.9087 17.9344 21.1608 19.0456 20.2144 19.9899C19.268 20.9342 18.1567 21.6825 16.8806 22.2348C15.6045 22.7871 14.2395 23.0626 12.7856 23.0612Z" fill="#848484" />
                            </svg>
                        )
                    }
                </button>
            </div>

            {status === "valid" && (
                <p className="text-[#1FC16B] text-[13px] flex items-start gap-1">
                    <svg className="shrink-0" width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 1.91833C12.864 1.91833 16 5.05433 16 8.91833C16 12.7823 12.864 15.9183 9 15.9183C5.136 15.9183 2 12.7823 2 8.91833C2 5.05433 5.136 1.91833 9 1.91833ZM8.3 12.4183H9.7V11.0183H8.3V12.4183ZM8.3 9.61833H9.7V5.41833H8.3V9.61833Z" fill="#1FC16B" />
                    </svg>
                    <span>{t('coupon.validMessage')}</span>
                </p>
            )}

            {status === "invalid" && (
                <p className="text-red-600 flex items-center gap-1">
                    {
                        errors.length > 0 ? (
                            errors[0]
                        ) : t('coupon.invalidMessage')
                    }
                </p>
            )}
        </div>
    );
};

export default CouponInput;