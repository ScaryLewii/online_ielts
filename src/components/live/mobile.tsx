import { useAllLivesQuery, useAuthorsQuery, useBannersQuery, useCoinQuery, useEndedLivesQuery, useIncomingLivesQuery, useMyLivesQuery, useUserInfoQuery } from "@/base/query"
import MobileBreadcrumbs from "@/components-mobile/common/breadcrumbs"
import AuthorCard from "@/components/author/author-card"
import Banner from "@/components/live-schedule/banner"
import EventCard from "@/components/live-schedule/event-card"
import { GlobalContext } from "@/context/context"
import AllCourseBanner from "@/pages/all-courses/banner"
import RouteBox from "@/pages/all-courses/box"
import { IAuthor, IEvent } from "@/types/types"
import Image from "next/image"
import coin from "public/images/coin.svg"
import silver from "public/images/silver.svg"
import { useContext, useState } from "react"
import { Carousel } from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { ReactSVG } from "react-svg"

const buttons = [
	{
		label: "Tất cả sự kiện"
	},
	{
		label: "Hồ sơ diễn giả"
	},
]

const LivePageMobile = () => {
	const context = useContext(GlobalContext)
	const { isFetched: isFinishFetchUserInfo, data: userInfo } = useUserInfoQuery(context.cookies.get())
	const { isFetched: isFinishFetchLives, data: allLives, refetch: refreshLives } = useAllLivesQuery(context.cookies.get())
	const { isFetched: isFinishFetchCoin, data: myCoin } = useCoinQuery(context.cookies.get())
	const { isFetched: isFinishFetchAuthors, data: authorData } = useAuthorsQuery(1, 100, context.cookies.get())


	const [tabActive, setTabActive] = useState(0)

	const onRegisterSuccess = () => {
		refreshLives()
	}

	const isPremiumUser = userInfo?.roles?.some((p: string) => p.toLocaleLowerCase() === 'premium')

	return <>
		<MobileBreadcrumbs title="Sự kiện trực tuyến" parentPage="/menu" />

		<div className="text-black-mb dark:text-white relative z-[1] p-5 xl:px-10">
			{isFinishFetchUserInfo && userInfo &&
				<div className={`flex items-center gap-3 mb-[50px]`}>
					<Image className="rounded-full border-2 border-cyan w-[68px] h-[68px]" alt="profile image"
						width={85}
						height={85}
						src={userInfo.avatar ? `https://apitest.ant-edu.ai${userInfo.avatar}` : "https://placehold.co/68x68"} unoptimized={true}
					/>

					<div className="flex flex-col gap-2">
						<h2 className="font-semibold text-[18px] capitalize">{!!userInfo?.displayName?.trim() ? userInfo.displayName : userInfo.userName ?? "Guest"}</h2>

						{isFinishFetchCoin && myCoin &&
							<div className="flex gap-3 items-center">
								{isPremiumUser ? <span className="py-[6px] px-3 bg-[#FFBD00] text-sea font-semibold rounded-full">Premium User</span> : null}

								<div className="inline-flex items-center gap-2">
									<ReactSVG src={coin["src"]} />
									<span>{myCoin.pCoin ?? 0}</span>
								</div>

								<div className="inline-flex items-center gap-2">
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
					<h1 className="font-bold text-[24px] text-black-mb dark:text-white border-l-[7px] border-cyan pl-[13px] mb-[20px]">Danh mục sự kiện</h1>

					<div className="flex items-center gap-[30px]">
						{buttons.map((b, index) =>
							<button key={index}
								onClick={() => setTabActive(index)}
								className={`py-[10px] px-[12px] text-black-mb dark:text-white border-b-2 ${tabActive === index ? "border-cyan" : "border-transparent opacity-60"}`}>
								{b.label}
							</button>)}
					</div>

					{tabActive === 0 && isFinishFetchAuthors && 
						<div className="w-full mt-5 flex flex-col gap-5">
							{/* <RouteBox isPersonal={false} isFuture={true} /> */}
							<Carousel showArrows showIndicators={false} showThumbs={false} showStatus={false} className="w-full" infiniteLoop autoPlay swipeable emulateTouch>
								{tabActive === 0 && isFinishFetchLives && isFinishFetchLives && allLives?.map((live: IEvent, index: number) => (
									<div key={index} className="px-7 text-sea">
										<EventCard event={live} isSuccess={allLives?.some((l: IEvent) => l.id === live.id)} onRegisterSuccess={onRegisterSuccess} />
									</div>
								))}
							</Carousel>
						</div>
					}
					

					{tabActive === 1 && isFinishFetchAuthors && 
						<div className="grid grid-cols-2 gap-5 mt-5">
							{authorData?.items?.map((author: IAuthor, index: number) => (
								<AuthorCard key={author.id} item={author} />
							))}
						</div>
					}
				</div>
			</div>
		</div>
	</>
}

export default LivePageMobile