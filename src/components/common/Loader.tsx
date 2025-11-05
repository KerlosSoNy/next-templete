import React from 'react'
import Image from 'next/image';

export default function Loader() {
    return (
        <div className='h-full min-h-[50vh] w-[100vw]  flex flex-row items-center justify-center'>
            <Image src={'/images/logos/footerLogo.png'} alt='Ropita' width={151} height={44} className='ms-10 mb-[35px]' />
        </div>
    )
}
