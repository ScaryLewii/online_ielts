import { useContext, useEffect, useState } from "react"
import UnitBox from "./unit-box"
import { nanoid } from "nanoid"
import { ICourse, IUnit } from "../../components/types/types"
import { observer, useObservable } from "@legendapp/state/react"
import { CourseContext, GlobalContext } from "@/context/context"

interface ICouseBox {
	courseId: number
}

interface ICourseState {
	course: ICourse,
	unitIds: number[]
}

const CourseBox = ({courseId}: ICouseBox) => {
	const context = useContext(GlobalContext)
	const courseContext = useContext(CourseContext)
	const [course, setCourse] = useState<ICourse | null>(null)
	const [unitIds, setUnitIds] = useState<number[]>([])

	const setActiveCourse = () => {
		const activeCourse = context.courses.get().filter((c: ICourse) => c.id === courseId)[0]
		courseContext.activeCourse.set(activeCourse)
	}

	useEffect(() => {
		const unitArray = Object.values(context.units.get()) as IUnit[]
		const courses = Object.values(context.courses.get()) as ICourse[]
		courses.map((c: ICourse) => {
			c.id === courseId && setCourse(c)
		})

		const ids: number[] = []
		unitArray.forEach(u => {
			if (u.courseId === courseId) {
				ids.push(u.id)
			}
			setUnitIds(ids)
		})
	}, [context.courses, context.units, courseId, courseContext.activeCourse])

	return <>
		{ course &&
			<div className="text-white">
				<button className="mb-5 cursor-pointer" onClick={() => setActiveCourse()}>
					<h3 className={`font-semibold ${courseContext.activeCourse.id.get() === courseId ? "text-cyan" : ""}`}>{course.name}</h3>
				</button>
				{unitIds && unitIds.map((id: number) =>
					<UnitBox key={nanoid()} unitId={id} />
				)}
			</div>
		}
	</>
}

export default CourseBox