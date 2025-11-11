import BannerSlider from "@/components/home/bannerSlider";
import CategoriesSlider from "@/components/home/categoriesSlider";
import DiscountSections from "@/components/home/discountSections";
import DiscoverMore from "@/components/home/discoverMore";
import MostSelling from "@/components/home/mostSelling";
import OneProduct from "@/components/home/oneProduct";
import RelatedProducts from "@/components/home/relatedProducts";
import { HttpMethod } from "@/hooks/useApi";
import { apiAction } from "@/utils/api/apiActions";

export default async function Home() {

  const home: any = await apiAction({
    endPoint: 'home/website',
    method: HttpMethod.GET,
  });
  return (
    <div className={`flex flex-col bg-[#f7f8f9] w-full max-w-full font-family-arabic overflow-x-hidden relative`}>
      <div className="w-[1144.65px] h-[2404.44px] absolute top-[500px] left-1/2 -translate-x-1/2  bg-[#CDA63D29] rounded-full blur-[140px]" />
      <div className="w-[1283.21px] h-[2121.52px] absolute top-[800px] -left-[270px] bg-[#CDA63D29] rounded-full blur-[140px]" />
      <div className="relative z-2">
        <BannerSlider />
        <CategoriesSlider />
        <MostSelling />
        <DiscoverMore />
        <DiscountSections />
        <OneProduct />
        <RelatedProducts />
      </div>
    </div>
  );
}
