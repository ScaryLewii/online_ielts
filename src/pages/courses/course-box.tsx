import { useContext, useEffect, useState } from "react"
import UnitBox from "./unit-box"
import { nanoid } from "nanoid"
import { ICourse, IUnit } from "../../components/types/types"
import { observer, useObservable } from "@legendapp/state/react"
import { StateContext } from "@/context/context"

interface ICouseBox {
	courseId: number
}

interface ICourseState {
	course: ICourse,
	unitIds: number[]
}

const CourseBox = ({courseId}: ICouseBox) => {
	const context = useContext(StateContext)
	const [course, setCourse] = useState<ICourse | null>(null)
	const [unitIds, setUnitIds] = useState<number[]>([])

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
	}, [context.courses, context.units, courseId])

	return <section className="text-white">
		<h3 className="font-semibold mb-5">{course?.name}</h3>
		{unitIds && unitIds.map((id: number) =>
			<UnitBox key={nanoid()} unitId={id} />
		)}
	</section>
}

export default CourseBox