import RouteBox from "./box"
import Route from "./route"

const StudyRoutePage = () => {
	return <div className="text-white">
		<h2 className="font-semibold text-3xl mb-10">Chào mừng, Ngoc Tran</h2>

		<div className="flex gap-[60px] 4xl:gap-[100px] flex-wrap items-start">
			<Route />
			<RouteBox />
		</div>
	</div>
}

export default StudyRoutePage