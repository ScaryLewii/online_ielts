"use client"

import { useUserInfoQuery } from "@/base/query"
import MobileBreadcrumbs from "@/components-mobile/common/breadcrumbs"
import { GlobalContext } from "@/context/context"
import { useContext } from "react"
import { ReactSVG } from "react-svg"
import hand from "public/images/hand.svg"
import btnBg from "public/images/menu-btn-mobile.svg"
import Link from "next/link"

const MenuPageMobile = () => {
	const context = useContext(GlobalContext)
	const { isFetched: isFinishFetchUserInfo, data: userInfo  } = useUserInfoQuery(context.cookies.get())
	
	return (
		<>
			<MobileBreadcrumbs title="Ant Edu Course" />

			{isFinishFetchUserInfo && userInfo &&
				<div className="flex items-center gap-4 font-semibold text-base lg:text-[22px] p-5 text-black-mb dark:text-white">
					<ReactSVG src={hand["src"]} />
					Hi {userInfo.displayName ?? "Guest"}, Happy learning
				</div>
			}

			<div className="grid grid-rows-2 grid-cols-2 overflow-hidden gap-5 px-5 mt-5">
				<Link href="/study-route" className="relative">
					<ReactSVG src={btnBg["src"]} />
					<span className="text-[#FF6341] font-bold absolute top-1/2 left-5 -translate-y-1/2">
						Lộ trình học <br /> của tôi
					</span>
				</Link>
				<Link href="https://ant-edu.ai/user/assesment-history" target="_blank" className="relative">
					<ReactSVG src={btnBg["src"]} />
					<span className="text-[#83B000] font-bold absolute top-1/2 left-5 -translate-y-1/2">
						Lịch sử <br /> luyện tập
					</span>
				</Link>
				<Link href="/live" className="relative">
					<ReactSVG src={btnBg["src"]} />
					<span className="text-[#3060CF] font-bold absolute top-1/2 left-5 -translate-y-1/2">
						Sự kiện  <br /> trực tuyến
					</span>
				</Link>
				<Link href="https://ant-edu.ai/list-test" target="_blank" className="relative">
					<ReactSVG src={btnBg["src"]} />
					<span className="text-[#FF64AE] font-bold absolute top-1/2 left-5 -translate-y-1/2">
						Kiểm tra <br /> trình độ
					</span>
				</Link>
			</div>
		</>
	)
}

export default MenuPageMobile