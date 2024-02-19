import { useAllLivesQuery, useCoinQuery, useMyLivesQuery, useUserInfoQuery } from "@/base/query"
import { GlobalContext } from "@/context/context"
import { IEvent } from "@/types/types"
import Image from "next/image"
import coin from "public/images/coin.svg"
import silver from "public/images/silver.svg"
import { useContext, useEffect, useState } from "react"
import { ReactSVG } from "react-svg"
import RouteBox from "../all-courses/box"
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

	useEffect(() => {
		console.log(allLives)
	})

	const isPremiumUser = userInfo?.roles?.some((p: string) => p.toLocaleLowerCase() === 'premium') 

	return <div className="text-white relative z-[1] p-5 xl:p-10">
		{isFinishFetchUserInfo && userInfo &&
			<div className="flex items-center gap-[20px] mb-[50px]">
				<Image className="rounded-full border-2 border-cyan w-[85px] h-[85px]" alt="profile image"
					width={85}
					height={85}
					src={userInfo.avatar ? `https://apitest.ant-edu.ai${userInfo.avatar}` : "https://placehold.co/45x45"} unoptimized={true}
				/>

				<div className="flex flex-col gap-[10px]">
					<h2 className="font-semibold text-[22px] capitalize">{/\s+/.test(userInfo.displayName) ? userInfo.userName : userInfo.displayName ?? "Guest"}</h2>

					{isFinishFetchCoin && myCoin &&
						<div className="flex gap-[42px] items-center mt-[16px]">
							{isPremiumUser ? <span className="py-[6px] px-[12px] bg-[#FFBD00] text-sea font-semibold rounded-full">Premium User</span> : null}

							<div className="inline-flex items-center gap-[12px]">
								<ReactSVG src={coin["src"]} />
								<span>{myCoin.pCoin ?? 0}</span>
							</div>

							<div className="inline-flex items-center gap-[12px]">
								<ReactSVG src={silver["src"]} />
								<span>{myCoin.fCoin ?? 0}</span>
							</div>
						</div>
					}
				</div>
			</div>
		}

		<div className="flex gap-[60px] 4xl:gap-[100px] w-full items-start md:flex-col lg:flex-row xl:justify-between">
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

				<div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-[20px] mt-[34px] text-sea">
					{tabActive === 0 && isFinishFetchLives && isFinishFetchMyLives && allLives?.map((live: IEvent, index: number) => (
						<EventCard key={index} event={live} isSuccess={myLives?.some((l: IEvent) => l.id === live.id)} />
					))}

					{tabActive === 1 && isFinishFetchMyLives && myLives?.map((live: IEvent, index: number) => (
						<EventCard key={index} event={live} isSuccess={true} />
					))}

					{tabActive === 2 && isFinishFetchMyLives && myLives?.map((live: IEvent, index: number) => (
						<EventCard key={index} event={live} isSuccess={myLives?.some((l: IEvent) => l.id === live.id)} />
					))}
				</div>
			</div>

			<RouteBox isPersonal={tabActive === 1} isFuture={tabActive === 2} />
		</div>
	</div>
}

export default LivePage