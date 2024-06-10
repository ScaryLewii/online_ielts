import RouteBox from "./box"
import Route from "./route"

const StudyRoutePage = () => {
	return <div className="text-white relative z-[1] p-5 xl:p-10">
		<div className="flex gap-[60px] 4xl:gap-[100px] w-full items-start md:justify-between md:pb-10">
			<Route />
			<RouteBox />
		</div>
	</div>
}

export default StudyRoutePage