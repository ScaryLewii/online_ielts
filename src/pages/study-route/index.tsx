import { useContext } from "react"
import RouteBox from "./box"
import Route from "./route"
import { StateContext } from "@/components/common/layout"

const StudyRoutePage = () => {
	const context = useContext(StateContext)

	return <div className="text-white">
		<h2 className="font-semibold text-3xl mb-10">Chào mừng, {context.user.displayName.get()}</h2>

		<div className="flex gap-[60px] 4xl:gap-[100px] flex-wrap items-start justify-center">
			<Route />
			<RouteBox />
		</div>
	</div>
}

export default StudyRoutePage