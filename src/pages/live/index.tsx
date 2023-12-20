import { fetchData } from "@/base/base"
import { useAllLivesQuery, useCoinQuery, useMyLivesQuery, useUserInfoQuery } from "@/base/query"
import { GlobalContext } from "@/context/context"
import { IEvent } from "@/types/types"
import Image from "next/image"
import close from "public/images/close.svg"
import coin from "public/images/coin.svg"
import silver from "public/images/silver.svg"
import { useContext, useState } from "react"
import { ReactSVG } from "react-svg"
import RouteBox from "../study-route/box"
import EventCard from "./event-card"

const buttons = [
	{
		label: "Tất cả sự kiện"
	},
	{
		label: "Sự kiện của tôi"
	},
	{
		label: "Sự kiện sắp diễn ra"
	},
]

const LivePage = () => {
	const context = useContext(GlobalContext)
	const { isFetched: isFinishFetchUserInfo, data: userInfo  } = useUserInfoQuery(context.cookies.get())
	const { isFetched: isFinishFetchLives, data: allLives } = useAllLivesQuery(context.cookies.get())
	const { isFetched: isFinishFetchMyLives, data: myLives } = useMyLivesQuery(context.cookies.get())
	const { isFetched: isFinishFetchCoin, data: myCoin } = useCoinQuery(context.cookies.get())

	const [tabActive, setTabActive] = useState(0)
	const [modalOpen, setModalOpen] = useState(false)

	const registerLive = async (id: number) => {
		await fetchData(`live-schedules/${id}/register`, "GET", context.cookies.get())
		setTabActive(1)
	}

	return <div className="text-white relative z-[1] p-5 xl:p-10">
		{isFinishFetchUserInfo && userInfo &&
			<div className="flex items-center gap-[20px] mb-[50px]">
				<Image className="rounded-full border-2 border-cyan w-[85px] h-[85px]" alt="profile image"
					width={85}
					height={85}
					src={userInfo.avatar ? `https://apitest.ant-edu.ai${userInfo.avatar}` : "https://placehold.co/45x45"} unoptimized={true}
				/>

				<div className="flex flex-col gap-[10px]">
					<h2 className="font-semibold text-[22px] capitalize">{/\s+/.test(userInfo.displayName) ? userInfo.userName : userInfo.displayName}</h2>

					{isFinishFetchCoin && myCoin &&
						<div className="flex gap-[42px] items-center mt-[16px]">
							<span className="py-[6px] px-[12px] bg-[#FFBD00] text-sea font-semibold rounded-full">Premium User</span>

							<div className="inline-flex items-center gap-[12px]">
								<ReactSVG src={coin["src"]} />
								<span>{myCoin.pCoin}</span>
							</div>

							<div className="inline-flex items-center gap-[12px]">
								<ReactSVG src={silver["src"]} />
								<span>{myCoin.fCoin}</span>
							</div>
						</div>
					}
				</div>
			</div>
		}

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

					{tabActive === 2 && isFinishFetchMyLives && myLives?.map((live: IEvent, index: number) => (
						<EventCard key={index} event={live} handleOpenModal={() => setModalOpen(true)} registerLive={registerLive} />
					))}
				</div>
			</div>

			<RouteBox isPersonal={tabActive === 1} isFuture={tabActive === 2} />
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

				<button
					onClick={() => {registerLive;setModalOpen(false);setTabActive(1)}} 
					className="rounded-full py-[10px] px-[22px] bg-[#12C024] absolute left-[50px] bottom-[50px]">
					Đăng ký ngay
				</button>
			</div>
		</>}
	</div>
}

export default LivePage