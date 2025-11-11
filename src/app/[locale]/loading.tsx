import Image from 'next/image'
import React from 'react'
import { Commet } from 'react-loading-indicators'

export default function Loading() {
    return (
        <div className="flex flex-col gap-14 items-center justify-center w-full h-[700px]!">
            <Commet color="#958874" size="medium" text="" textColor="" />
            <Image
                src="/images/logo/muhraHorse.png"
                alt="Murha Logo"
                width={151}
                height={44}
                className="mb-[35px] w-[151px] h-11 3xl:h-[120px] 3xl:w-60 fade-animation"
            />
        </div>
    )
}
