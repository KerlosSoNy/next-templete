import React from 'react'
import TopSection from './components/topSection'
import BottomSection from './components/bottomSection'
import StoreProvider from '@/app/[locale]/StoreProvider'

export default function Navbar() {
    return (
        <div className='w-full flex flex-col !font-family-arabic fixed top-0 z-10000000'>
            <TopSection />
            <StoreProvider>
                <BottomSection />
            </StoreProvider>
        </div>
    )
}
