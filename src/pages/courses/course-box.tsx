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
	const units = useUnitsQuery(courseId).data as IUnit[]

	const setActiveCourse = () => {
		const activeCourse = courses?.find((c: ICourse) => c.id === courseId)
		courseContext.activeCourse.set(activeCourse)
	}

	const course = courses?.find((c: ICourse) => c.id === courseId)

	return <>
		{ course &&
			<div className="text-white" data-video={course.introVideo}>
				<button className="mb-5 cursor-pointer" onClick={() => setActiveCourse()}>
					<h3 className={`font-semibold ${courseContext?.activeCourse.id.get() === courseId ? "text-cyan" : ""}`}>{course.name}</h3>
				</button>
				{units && units.map((unit: IUnit) =>
					<UnitBox key={nanoid()} unit={unit} courseId={courseId} />
				)}
			</div>
		}
	</>
}

export default CourseBox