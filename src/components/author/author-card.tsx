import { IAuthor } from "@/types/types";
import Image from "next/image";
import Link from "next/link";

interface AuthorCardProps {
  item: IAuthor
}

const AuthorCard = ({item}: AuthorCardProps) => {
  return (
    <article className="rounded-[16px] overflow-hidden bg-white text-sea">
      <div className="relative overflow-hidden">
        <div className="absolute z-[2] flex flex-col [&>span:first-child]:z-[2]">

        </div>
        <div className="pb-[100%]"></div>
        <Link href={`/author/${item.id}`}>
          <Image className="w-full h-full absolute top-0 left-0" style={{objectFit: 'cover'}} src={item.avatar || "https://placehold.co/307x148"} width={300} height={600} alt={item.name} unoptimized />
        </Link>
      </div>
      <div className="p-2 lg:p-[20px] flex flex-col gap-[14px]">
        <Link href={`/author/${item.id}`}>
          <h2 className="font-bold cursor-pointer">{item.name}</h2>
        </Link>
        {/* <div>
          <div>Ngày: <span className="font-bold">{moment(event.startTime).format("DD-MM-YYYY")}</span></div>
          <div>Giờ: <span className="font-bold">{new Date(event.startTime).getHours()}h - {new Date(event.endTime).getHours()}h</span></div>
        </div> */}
        <div className="text-[11px] lg:text-base" dangerouslySetInnerHTML={{ __html: item.introduce }}></div>
      </div>
    </article>
  )
} 

export default AuthorCard
