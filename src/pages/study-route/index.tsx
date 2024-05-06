import { useUserInfoQuery } from "@/base/query"
import MobileBreadcrumbs from "@/components-mobile/common/breadcrumbs"
import Tabs from "@/components-mobile/tab/tab"
import { GlobalContext } from "@/context/context"
import { IUser } from "@/types/types"
import { useContext } from "react"
import { BrowserView, MobileView } from "react-device-detect"
import RouteBox from "./box"
import Route from "./route"
import StudyRouteMobile from "./mobile"

const TabData = [
	{
		label: "Lộ trình học",
		panel: <Route />
	},
	{
		label: "Các khóa học",
    panel: <StudyRouteMobile />
	}
]

const StudyRoutePage = () => {
	const context = useContext(GlobalContext)
	const user = useUserInfoQuery(context.cookies.get()).data as IUser

	return <>
		<BrowserView>
			<div className="text-white relative z-[1] p-5 xl:p-10">
				<h2 className="font-semibold text-3xl mb-10">Chào mừng, {user?.displayName}</h2>

				<div className="flex gap-[60px] 4xl:gap-[100px] flex-wrap items-start md:justify-center">
					<Route />
					<RouteBox />
				</div>
			</div>
		</BrowserView>
		<MobileView>
			<MobileBreadcrumbs title={'Lộ trình học'} parentPage={"/"} />
			<Tabs data={TabData} />
		</MobileView>
	</>
}

export default StudyRoutePage