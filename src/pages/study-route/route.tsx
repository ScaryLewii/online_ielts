import { useCategoriesQuery, useValidToken } from "@/base/query"
import { ICategory } from "@/types/types"
import { nanoid } from "nanoid"
import Link from "next/link"
import { ReactSVG } from "react-svg"
import icon1 from "../../../public/dump/icon-1.svg"
import icon2 from "../../../public/dump/icon-2.svg"
import icon3 from "../../../public/dump/icon-3.svg"
import routeMobile from "../../../public/images/route-mobile.svg"
import route from "../../../public/images/route.svg"

const PlainContent = () => {
	return <>
		<div className="hidden md:flex items-center gap-2 mt-5 opacity-0 group-hover:opacity-100 whitespace-nowrap">
			<button className="px-5 py-2 border border-[#51C84E] rounded-full inline-flex gap-2 items-center">
				<ReactSVG src={icon1["src"]} width={24} height={24} />
				Lý thuyết
			</button>
			<button className="px-5 py-2 border border-[#51C84E] rounded-full inline-flex gap-2 items-center">
				<ReactSVG src={icon2["src"]} width={24} height={24} />
				Luyện tập
			</button>
			<button className="px-5 py-2 border border-[#51C84E] rounded-full inline-flex gap-2 items-center">
				<ReactSVG src={icon3["src"]} width={24} height={24} />
				Ứng dụng
			</button>
		</div>
	</>
}

const Route = () => {
	const { isFetched: isFinishFetchToken, data: saveToken} = useValidToken()
	const allCategories = useCategoriesQuery(saveToken).data as ICategory[]

	const Items = [
		{
			color: "text-light",
			position: "md:top-[45px] md:left-[250px]",
			positionMb: "top-[8px] left-[135px]"
		},
		{
			color: "text-[#53CBED]",
			position: "md:top-[285px] md:left-[100px] md:flex flex-col items-end",
			positionMb: "top-[130px] left-[135px]"
		},
		{
			color: "text-[#FF64AE]",
			position: "md:top-[520px] md:left-[200px]",
			positionMb: "top-[285px] left-[135px]"
		},
		{
			color: "text-[#AFCD58]",
			position: "md:top-[765px] md:left-[80px] md:flex flex-col items-end",
			positionMb: "top-[423px] left-[135px]"
		},
		{
			color: "text-[#AE59F0]",
			position: "md:top-[1030px] md:left-[420px]",
			positionMb: "top-[568px] left-[135px]"
		},
	]

	return <div className="relative">
		<ReactSVG className="hidden md:block" src={route['src']} />
		<ReactSVG className="block md:hidden" src={routeMobile['src']} />
		{ allCategories && 
			allCategories.map((cat: ICategory, index: number) => {
				if (cat.active) {
					return (
						<div key={nanoid()} className={`absolute cursor-pointer group ${Items[index].positionMb} ${Items[index].position}`}>
							<Link href={`/categories/${cat.id}`} className={`${Items[index].color} font-semibold text-[18px] md:text-[22px] group-hover:text-cyan`}>{cat.name}</Link>
							<PlainContent />
						</div>
					)
				}
			})
		}
	</div>
}

export default Route