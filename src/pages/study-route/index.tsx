import RouteBox from "./box"
import Route from "./route"
import { useUserQuery } from "@/base/query"
import { IUser } from "@/types/types"

const StudyRoutePage = () => {
	const user = useUserQuery().data as IUser

	return <div className="text-white relative z-[1] p-5 xl:p-10">
		<h2 className="font-semibold text-3xl mb-10">Chào mừng, {user?.displayName}</h2>

		<div className="flex gap-[60px] 4xl:gap-[100px] flex-wrap items-start md:justify-center">
			<Route />
			<RouteBox />
		</div>
	</div>
}

export default StudyRoutePage