// hooks/useApi.ts
'use client'

import { useState } from "react";
import * as yup from "yup";
import { useRouter, usePathname } from "next/navigation";
import { useDispatch } from "react-redux";
import { useTranslations } from "next-intl";
import axiosInstance from "@/utils/axios/axsionInstance";
import { AppDispatch } from "@/utils/redux/store";
import { showToast } from "@/utils/redux/slices/toast";
import { setErrorHandle } from "@/utils/redux/slices/errors_handle";
import { flattenObject } from "@/utils/functions/flattenObject";

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
    page_key?: string;
    params?: string;
}

export function useApi<T>({
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
    const [payLoad, setData] = useState<T | null>(null);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();
    const pathname = usePathname();
    const dispatch = useDispatch<AppDispatch>();
    const t = useTranslations();

    const fetchData = async () => {
        setLoading(true);
        setErrors({});

        try {
            if (validation) {
                await validation.validate(payload, { abortEarly: false });
            }

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
                        if (!withOutToast && (typeof errorMessage === "string")) {
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

    const resetErrors = () => setErrors({});

    return { payLoad, errors, setErrors, resetErrors, loading, fetchData };
}