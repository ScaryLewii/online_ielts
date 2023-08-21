import { getSession } from "next-auth/react"
import route from "../../../public/images/route.svg"
import { ReactSVG } from "react-svg"
import icon1 from "../../../public/dump/icon-1.svg"
import icon2 from "../../../public/dump/icon-2.svg"
import icon3 from "../../../public/dump/icon-3.svg"
import icon4 from "../../../public/dump/icon-4.svg"
import { useContext } from "react"
import { GlobalContext } from "@/context/context"
import { nanoid } from "nanoid"
import { ICourseCat } from "@/types/types"
import Link from "next/link"

const PlainContent = () => {
	return <>
		<div className="flex items-center gap-2 mt-5 opacity-0 group-hover:opacity-100 whitespace-nowrap">
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
	const context = useContext(GlobalContext)
	const Items = [
		{
			color: "text-light",
			position: "top-[45px] left-[250px]",
		},
		{
			color: "text-[#53CBED]",
			position: "top-[285px] left-[100px] flex flex-col items-end",
		},
		{
			color: "text-[#FF64AE]",
			position: "top-[520px] left-[200px]",
		},
		{
			color: "text-[#AFCD58]",
			position: "top-[765px] left-[80px] flex flex-col items-end",
		},
		{
			color: "text-[#AE59F0]",
			position: "top-[1030px] left-[420px]",
		},
	]

	return <div className="relative">
		<ReactSVG src={route['src']} />
		{ context.categories.get() && 
			context.categories.get().map((cat: ICourseCat, index: number) => {
				if (cat.active) {
					return (
						<div key={nanoid()} className={`absolute cursor-pointer group ${Items[index].position}`}>
							<Link href={`/courses/${cat.slug}`} className={`${Items[index].color} font-semibold text-[22px] group-hover:text-cyan`}>{cat.name}</Link>
							<PlainContent />
						</div>
					)
				}
			})
		}
	</div>
}

export default Route