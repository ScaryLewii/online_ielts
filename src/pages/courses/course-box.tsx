import { useContext, useEffect, useState } from "react"
import UnitBox from "./unit-box"
import { nanoid } from "nanoid"
import { ICourse, ILesson, IUnit } from "../../types/types"
import { observer, useObservable } from "@legendapp/state/react"
import { CourseContext, GlobalContext } from "@/context/context"
import { fetchData } from "@/base/base"
import { useCoursesQuery, useLessonsQuery, useUnitsQuery } from "@/base/query"

interface ICouseBox {
	courseId: number
}

const CourseBox = ({courseId}: ICouseBox) => {
	const courseContext = useContext(CourseContext)
	const courses = useCoursesQuery().data as ICourse[]
	const allLessons = useLessonsQuery().data as ILesson[]
	const units = useUnitsQuery().data as IUnit[]
	const [course, setCourse] = useState<ICourse | null>(null)
	const [lessons, setLessons] = useState<ILesson[]>([])
	const [unitIds, setUnitIds] = useState<number[]>([])

	const setActiveCourse = () => {
		const activeCourse = courses?.find((c: ICourse) => c.id === courseId)
		courseContext.activeCourse.set(activeCourse)
	}

	useEffect(() => {
		const _course = courses?.find((c: ICourse) => c.id === courseId)
		_course && setCourse(_course)

		const _lessons = allLessons?.filter((l: ILesson) => l.courseId === courseId)
		console.log(allLessons)

		console.log(units)
		const ids = units?.filter((u: IUnit) => u.courseId === courseId).map((u: IUnit) => u.id)
		ids && setUnitIds(ids)
	}, [courseId, courses, units])

	return <>
		{ course &&
			<div className="text-white">
				<button className="mb-5 cursor-pointer" onClick={() => setActiveCourse()}>
					<h3 className={`font-semibold ${courseContext?.activeCourse.id.get() === courseId ? "text-cyan" : ""}`}>{course?.name}</h3>
				</button>
				{unitIds?.map((id: number) =>
					<UnitBox key={nanoid()} unitId={id} courseId={courseId} />
				)}
			</div>
		}
	</>
}

export default CourseBox