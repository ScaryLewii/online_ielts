import { useCoursesQuery, useUnitsQuery } from "@/base/query"
import { CourseContext, GlobalContext } from "@/context/context"
import { nanoid } from "nanoid"
import { useContext } from "react"
import { ICourse, IUnit } from "../../types/types"
import UnitBox from "./unit-box"

interface ICouseBox {
	courseId: number
}

const CourseBox = ({courseId}: ICouseBox) => {
	const context = useContext(GlobalContext)
	const courseContext = useContext(CourseContext)

	const courses = useCoursesQuery(context.cookies.get()).data as ICourse[]
	const units = useUnitsQuery(courseId, context.cookies.get()).data as IUnit[]

	const setActiveCourse = () => {
		const activeCourse = courses?.find((c: ICourse) => c.id === courseId)
		courseContext.activeCourse.set(activeCourse)
	}

	const course = courses?.find((c: ICourse) => c.id === courseId)

	return <>
		{ course &&
			<div className="text-white" data-video={course.introVideo}>
				<button className="mb-5 cursor-pointer" onClick={() => setActiveCourse()}>
					<h3 className={`font-semibold ${courseContext?.activeCourse.id.get() === courseId ? "text-black-mb dark:text-cyan" : "text-sea dark:text-white"}`}>{course.name}</h3>
				</button>
				{units && units.map((unit: IUnit) =>
					<UnitBox key={nanoid()} unit={unit} courseId={courseId} />
				)}
			</div>
		}
	</>
}

export default CourseBox