import React from 'react'
import { Slider } from '../common/slider'
import { getLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation';
import Image from 'next/image';

export default async function BannerSlider() {
  const locale = await getLocale();
  return (
    <div className='w-full max-w-full overflow-x-hidden'>
      <Slider direction={locale === "ar" ? "rtl" : "ltr"} slidesToShow={1} loop autoScroll showDots={false} showButtons={false}>
        <div className='w-full md:h-[440px] lg:h-[580px] xl:h-[643px] flex flex-col items-start justify-center ps-[30px] lg:ps-[60px] xl:ps-[90px] 2xl:ps-[120px] 3xl:ps-60 bg-gradient-to-r from-[#edd260] to-[#f9f0ac] relative'>
          <div className='absolute   top-0 left-0 w-full h-full z-4'>
            <div className='relative w-full h-full '>
              <Image fill alt='shadow' src={'/images/banner/shadow.png'} />
            </div>
          </div>
          <div className='banner-clip-path  bg-[#7e5728] w-[72%] h-40 absolute bottom-0 -end-20 ' />

          <div className='absolute w-[350px] lg:w-[500px]! h-[350px] lg:h-[500px]! bottom-0 end-1/4 2xl:end-1/3 -translate-x-1/4 2xl:-translate-x-1/3 z-2'>
            <div className='relative w-[350px] lg:w-[500px]! h-[350px] lg:h-[500px]!'>
              <Image fill alt='shadow' src={'/images/banner/product.png'} />
            </div>
          </div>
          <div className='absolute w-[60px]! lg:w-[103px]! h-14! lg:h-24! top-[90px] lg:top-[172px] left-1/2 -translate-x-1/2'>
            <div className='relative w-[60px]! lg:w-[103px]! h-14! lg:h-24!'>
              <Image fill alt='shadow' src={'/images/banner/batterfly.png'} />
            </div>
          </div>

          <span className='text-[#683C15] font-bold text-[26px] lg:text-[32px] 2xl:text-[36px] max-w-[300px] lg:max-w-[380px] 2xl:max-w-[421px] text-start relative z-5'><span className='text-[#B7623F]'>مهرة</span> – جمالك يبدأ من الطبيعة، نقاء يلامس روحك ويغذي شعرك</span>
          <span className='max-w-[300px] lg:max-w-[380px] 2xl:max-w-[421px] text-[10px] lg:text-[12px] 2xl:text-[14px] text-[#683C15CC] mt-5 text-start relative z-5'>منتجات طبيعية بخلاصات نقية تمنحك العناية التي تستحقها، بعيدًا عن أي مواد كيميائية. اختَر الطبيعة، وامنحي شعرك إشراقة دائمة! ✨</span>
          <Link href='/' className='px-10 rounded-full h-9 lg:h-[52px] text-[14px] lg:text-[16px] text-white bg-[#B7623F] flex items-center justify-center mt-5 relative z-5'>
            معرفة المزيد
          </Link>
        </div>
      </Slider>
    </div>
  )
}
