'use client'
import { storeEncryptedToken } from '@/utils/functions/bufferedEncryptedToken'
import { getToken, setToken } from '@/utils/redux/slices/tokenSlice'
import { AppStore, getStore } from '@/utils/redux/store'
import { setupListeners } from '@reduxjs/toolkit/query'
import { useEffect, useRef } from 'react'
import { Provider } from 'react-redux'

export default function StoreProvider({
    children,
}: {
    children: React.ReactNode
}) {
    const storeRef = useRef<AppStore | null>(null)
    if (!storeRef.current) {
        storeRef.current = getStore()
    }


    useEffect(() => {
        seeToken();
        if (storeRef.current != null) {
            const unsubscribe = setupListeners(storeRef.current.dispatch);
            return unsubscribe;
        }
    }, []);


    const seeToken = async () => {
        const token: any = await getToken();
        storeEncryptedToken(token);
        storeRef?.current?.dispatch(setToken(token))
    }

    useEffect(() => {
        seeToken();
    }, [])
    return <Provider store={storeRef.current}>
        {children}
    </Provider>
}