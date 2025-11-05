
import { apiAction, HttpMethod } from "@/utils/api/apiActions";

export default async function Home() {

  const home: any = await apiAction({
    endPoint: 'home/website',
    method: HttpMethod.GET,
  });
  return (
    <div className={`flex flex-col bg-[#f7f8f9] w-full max-w-full font-family-arabic overflow-x-hidden ${home?.data?.banners?.length == 0 ? 'pt-[80px] ' : ''}`}>
      Home Page
    </div>
  );
}
