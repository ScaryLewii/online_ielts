import { useAllLivesQuery, useMyLivesQuery } from "@/base/query"
import { GlobalContext } from "@/context/context"
import Image from "next/image"
import { useContext, useState } from "react"
import RouteBox from "../study-route/box"
import { fetchData } from "@/base/base"
import { ReactSVG } from "react-svg"
import greenCheck from "public/images/green-check.svg"
import close from "public/images/close.svg"
import EventCard from "./event-card"
import { IEvent } from "@/types/types"

const buttons = [
	{
		label: "Tất cả sự kiện"
	},
	{
		label: "Sự kiện của tôi"
	}
]

const LivePage = () => {
	const context = useContext(GlobalContext)
	const { isFetched: isFinishFetchLives, data: allLives } = useAllLivesQuery(context.cookies.get())
	const { isFetched: isFinishFetchMyLives, data: myLives } = useMyLivesQuery(context.cookies.get())

	const [tabActive, setTabActive] = useState(0)
	const [modalOpen, setModalOpen] = useState(false)

	const registerLive = async (id: number) => {
		await fetchData(`live-schedules/${id}/register`, "GET", context.cookies.get())
		setTabActive(1)
	}

	return <div className="text-white relative z-[1] p-5 xl:p-10">
	<div className="flex gap-[60px] 4xl:gap-[100px] w-full items-start md:justify-between">
		<div>
			<h1 className="font-bold text-[24px] text-white border-l-[7px] border-cyan pl-[13px] mb-[20px]">Danh mục sự kiện</h1>
		
			<div className="flex items-center gap-[30px]">
				{buttons.map((b, index) => 
					<button key={index}
						onClick={() => setTabActive(index)}
						className={`py-[10px] px-[12px] text-white border-b-2 ${tabActive === index ? "border-cyan" : "border-transparent opacity-60"}`}>
						{b.label}
					</button>)}
			</div>

			<div className="grid grid-cols-3 gap-[48px] mt-[34px] text-sea">
				{tabActive === 0 && isFinishFetchLives && allLives?.map((live: IEvent, index: number) => (
					<EventCard key={index} event={live} handleOpenModal={() => setModalOpen(true)} registerLive={registerLive} />
				))}

				{tabActive === 1 && isFinishFetchMyLives && myLives?.map((live: IEvent, index: number) => (
					<EventCard key={index} event={live} isSuccess={true} />
				))}
			</div>
		</div>

		<RouteBox isPersonal={tabActive === 1} />
	</div>

	{modalOpen && <>
		<div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-70" onClick={() => setModalOpen(false)}></div>
		<div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
			<Image src={"https://placehold.co/889x500"} unoptimized alt="" width={889} height={500} />
			<button
				className="absolute top-[10px] right-[10px] h-[20px] w-[20px] flex justify-center items-center"
				onClick={() => setModalOpen(false)}
			>
				<ReactSVG src={close["src"]} />
			</button>
		</div>
	</>}
</div>
}

export default LivePage