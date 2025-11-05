"use client";

import { useEffect, useState } from "react";
import * as yup from "yup";
import { useRouter, usePathname } from "next/navigation";
import axiosInstance from "../axios/axsionInstance";
import { flattenObject } from "../functions/flattenObject";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../redux/store";
import { setErrorHandle } from "../redux/slices/errors_handle";
import { showToast } from "../redux/slices/toast";
import { useTranslations } from "next-intl";

export const HttpMethod = {
    GET: "get",
    POST: "post",
    PUT: "put",
    DELETE: "delete",
    PATCH: "patch"
} as const;

export type HttpMethod = typeof HttpMethod[keyof typeof HttpMethod];

interface Props {
    endPoint: string;
    method?: HttpMethod;
    version?: string;
    payload?: any;
    validation?: yup.Schema;
    navigateTo?: string;
    withOutToast?: boolean;
    isModule?: boolean;
    isOpen?: boolean;
    page_key?: string;
    params?: string;
}

export function useApi<T>({
    isOpen,
    isModule,
    page_key,
    endPoint,
    navigateTo,
    method = HttpMethod.GET,
    validation,
    version,
    payload,
    withOutToast,
    params
}: Props) {
    const [payLoad, setData] = useState<T | null | any>(null);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();
    const pathname = usePathname();
    const dispatch = useDispatch<AppDispatch>();
    const  t = useTranslations();

    useEffect(() => {
        if (isModule) {
            setErrors({});
        }
    }, [isOpen, isModule]);

    const fetchData = async () => {
        setLoading(true);
        setErrors({});
        try {
            if (validation) await validation.validate(payload, { abortEarly: false });
            
            const response = await axiosInstance({
                method,
                url: `/${process.env.NEXT_PUBLIC_API_APP_TYPE}/${process.env.NEXT_PUBLIC_API_VERSION || version}/${endPoint}${params ? `${params}` : ""}`,
                data: payload,
                headers: {
                    "page-key": page_key,
                    "X-Api-Key": `${process.env.NEXT_PUBLIC_API_KEY}`,
                },
            });
            
            setData(response.data.data);
            
            if (!withOutToast) {
                dispatch(showToast(t('success'), response.data.message, "success"));
            }
            
            if (navigateTo) {
                router.push(navigateTo);
            }
            
            return response;
        } catch (err: any) {
            const errorMessage = err?.response?.data?.message || "An error occurred";
            const backEndValidationError = err?.response?.data?.errors || err?.response?.data?.message || {};
            
            // For Validation
            if (err.inner) {
                const validationErrors: any = {};
                err.inner.forEach((error: any) => {
                    validationErrors[error.path] = error.message;
                });
                setErrors(validationErrors);
            } else {
                if (err.response?.status === 403) {
                    dispatch(setErrorHandle({
                        message: err?.response?.data?.message || "You are not authorized to perform this action.",
                        link: `/${process.env.NEXT_PUBLIC_API_VERSION || version}/${endPoint}`,
                        page: pathname
                    }));
                    router.push("/forbidden");
                } else {
                    setErrors(flattenObject(backEndValidationError));
                    if (err?.response?.status !== 401) {
                        if (!withOutToast && ((typeof errorMessage === "string"))) {
                            dispatch(showToast(t('toast.error'), errorMessage, "error"));
                        } else {
                            if (!withOutToast) {
                                dispatch(showToast(t('toast.error'), "An error occurred", "error"));
                            }
                        }
                    }
                }
            }
            return err;
        } finally {
            setLoading(false);
        }
    };
    
    return { payLoad, errors, setErrors, loading, fetchData };
}