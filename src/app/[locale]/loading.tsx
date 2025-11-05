import React from 'react'
import { Commet } from 'react-loading-indicators'

export default function Loading() {
    return (
        <div className="flex flex-col gap-14 items-center justify-center w-full !h-[700px]">
            <Commet color="#958874" size="medium" text="" textColor="" />
            {/* <Image
                src="/images/logos/footerLogo.png"
                alt="Ropita"
                width={151}
                height={44}
                className="mb-[35px] fade-animation"
            /> */}
        </div>
    )
}
