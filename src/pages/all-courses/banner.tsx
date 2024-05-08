import { useCoinQuery, useUserInfoQuery } from "@/base/query"
import { GlobalContext } from "@/context/context"
import Image from "next/image"
import coin from "public/images/coin.svg"
import hand from "public/images/hand.svg"
import silver from "public/images/silver.svg"
import banner from "public/images/user-banner.png"
import { useContext } from "react"
import { ReactSVG } from "react-svg"

const AllCourseBanner = () => {
	const context = useContext(GlobalContext)
	const { isFetched: isFinishFetchUserInfo, data: userInfo  } = useUserInfoQuery(context.cookies.get())
	const { isFetched: isFinishFetchCoin, data: myCoin } = useCoinQuery(context.cookies.get())
	const isPremiumUser = userInfo?.roles?.some((p: string) => p.toLocaleLowerCase() === 'premium') 

	return (
		<div className="relative">
			<Image src={banner} width={1039} height={137} className="h-[107px] lg:h-auto object-cover rounded-lg" alt="route banner" />
			{isFinishFetchUserInfo && userInfo &&
				<div className="absolute px-5 lg:pr-0 lg:pl-[56px] top-1/2 -translate-y-1/2">
					<div className="flex items-center gap-4 font-semibold text-base lg:text-[22px]">
						<ReactSVG src={hand["src"]} />
						Hi {userInfo.displayName ?? "Guest"}, Happy learning
					</div>

					{isFinishFetchCoin && myCoin &&
						<div className="flex gap-5 lg:gap-[42px] items-center mt-3 lg:mt-4">
							{isPremiumUser ? <span className="py-[6px] px-[12px] bg-[#FFBD00] text-sea font-semibold rounded-full text-xs lg:text-[22px]">Premium User</span>: null}

							<div className="inline-flex items-center gap-2 lg:gap-[12px]">
								<ReactSVG src={coin["src"]} />
								<span>{myCoin.pCoin ?? 0}</span>
							</div>

							<div className="inline-flex items-center gap-2 lg:gap-[12px]">
								<ReactSVG src={silver["src"]} />
								<span>{myCoin.fCoin ?? 0}</span>
							</div>
						</div>
					}
				</div>
			}
		</div>
	)
}

export default AllCourseBanner