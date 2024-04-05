import { IBanner } from "@/types/types";
import Image from "next/image";

interface BannerProps {
  item: IBanner
}

const Banner = ({item}: BannerProps) => {
  const onClickButton = () => {
    window.open(item.link, item.newTab ? '_blank' : '_self')
  }
  return <div className="flex w-full h-[175px]" style={{backgroundImage: `url(${item.image})`, backgroundPosition: 'center center', backgroundSize: 'cover'}}>
    <div className="flex w-2/5 h-full flex-col">
      <div className="flex flex-1 flex-col text-left justify-center ps-[40px]">
        <label className="text-3xl font-bold" style={{ color: item.titleColor }}>{item.title}</label>
        <label className="text-2xl font-bold" style={{ color: item.descriptionColor }}>{item.description}</label>
      </div>
      <div className="h-1/4">
        <button onClick={onClickButton} className="py-[5px] px-[30px] justify-self-end text-xl rounded-[30px] font-bold" style={{ color: item.buttonTitleColor, backgroundColor: item.buttonColor }}>{item.buttonTitle}</button>
      </div>
      <div className="h-[30px]">
        
      </div>
    </div>
  </div>
}

export default Banner;