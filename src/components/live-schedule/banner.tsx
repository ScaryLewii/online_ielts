import { IBanner } from "@/types/types";
import Image from "next/image";

interface BannerProps {
  item: IBanner
}

const Banner = ({item}: BannerProps) => {
  const onClickButton = () => {
    window.open(item.link, item.newTab ? '_blank' : '_self')
  }
  return <div className="flex w-full h-[250px]" style={{backgroundImage: `url(${item.image})`, backgroundPosition: 'center center'}}>
    <div className="flex w-1/3 h-full flex-col">
      <div className="flex flex-1 flex-col text-left justify-center ps-[40px]">
        <label className="text-4xl font-bold" style={{ color: item.titleColor }}>{item.title}</label>
        <label className="text-3xl font-bold" style={{ color: item.descriptionColor }}>{item.description}</label>
      </div>
      <div className="h-1/4">
        <button onClick={onClickButton} className="py-[10px] px-[30px] justify-self-end text-2xl rounded-[30px] font-bold" style={{ color: item.buttonTitleColor, backgroundColor: item.buttonColor }}>{item.buttonTitle}</button>
      </div>
      <div className="h-[30px]">
        
      </div>
    </div>
  </div>
}

export default Banner;