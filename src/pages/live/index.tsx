import { useAllLivesQuery, useAuthorsQuery, useCoinQuery, useEndedLivesQuery, useIncomingLivesQuery, useMyLivesQuery, useUserInfoQuery } from "@/base/query"
import { GlobalContext } from "@/context/context"
import { IAuthor, IEvent } from "@/types/types"
import Image from "next/image"
import coin from "public/images/coin.svg"
import silver from "public/images/silver.svg"
import { useContext, useEffect, useState } from "react"
import { ReactSVG } from "react-svg"
import RouteBox from "../all-courses/box"
import EventCard from "@/components/live-schedule/event-card"
import AuthorCard from "@/components/author/author-card"

const buttons = [
	{
		label: "Sự kiện sắp diễn ra"
	},
	{
		label: "Sự kiện đã kết thúc"
	},
	{
		label: "Sự kiện của tôi"
	},
	{
		label: "Hồ sơ diễn giả"
	},
]

const LivePage = () => {
	const context = useContext(GlobalContext)
	const { isFetched: isFinishFetchUserInfo, data: userInfo  } = useUserInfoQuery(context.cookies.get())
	// const { isFetched: isFinishFetchLives, data: allLives, refetch: refreshLives } = useAllLivesQuery(context.cookies.get())
	const { isFetched: isFinishFetchMyLives, data: myLives, refetch: refreshMyLives } = useMyLivesQuery(context.cookies.get())
	const { isFetched: isFinishFetchIncomingLives, data: incomingLives, refetch: refreshIncomingLives } = useIncomingLivesQuery(1, 100, context.cookies.get())
	const { isFetched: isFinishFetchEndedLives, data: endedLives, refetch: refreshEndedLives } = useEndedLivesQuery(1, 100, context.cookies.get())
	const { isFetched: isFinishFetchCoin, data: myCoin } = useCoinQuery(context.cookies.get())
	const { isFetched: isFinishFetchAuthors, data: authorData} = useAuthorsQuery(1, 100, context.cookies.get()) 

	const [tabActive, setTabActive] = useState(0)

	const onRegisterSuccess = () => {
		// refreshLives()
		refreshMyLives()
		refreshIncomingLives()
		refreshEndedLives()
	}

	useEffect(() => {
		
	}, [])

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
					<h2 className="font-semibold text-[22px] capitalize">{!!userInfo?.displayName?.trim() ? userInfo.displayName : userInfo.userName  ?? "Guest"}</h2>

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
			<div className="w-full">
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
					{/* {tabActive === 0 && isFinishFetchLives && isFinishFetchMyLives && allLives?.map((live: IEvent, index: number) => (
						<EventCard key={index} event={live} isSuccess={myLives?.some((l: IEvent) => l.id === live.id)} onRegisterSuccess={onRegisterSuccess} />
					))} */}
					{tabActive === 0 && isFinishFetchIncomingLives && incomingLives?.items?.map((live: IEvent, index: number) => (
						<EventCard key={index} event={live} isSuccess={myLives?.some((l: IEvent) => l.id === live.id)} onRegisterSuccess={onRegisterSuccess} />
					))}

					{tabActive === 1 && isFinishFetchEndedLives && endedLives?.items?.map((live: IEvent, index: number) => (
						<EventCard key={index} event={live} isSuccess={myLives?.some((l: IEvent) => l.id === live.id)} />
					))}
					

					{tabActive === 2 && isFinishFetchMyLives && myLives?.map((live: IEvent, index: number) => (
						<EventCard key={index} event={live} isSuccess={true} onRegisterSuccess={onRegisterSuccess} />
					))}

					{tabActive === 3 && isFinishFetchAuthors && authorData?.items?.map((author: IAuthor, index: number) => (
						<AuthorCard key={author.id} item={author}/>
					))}
				</div>
			</div>

			<RouteBox isPersonal={tabActive === 1} isFuture={tabActive === 2} />
		</div>
	</div>
}

export default LivePage