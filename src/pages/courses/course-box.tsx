import { FC, useContext, useEffect, useState } from "react"
import UnitBox from "./unit-box"
import { StateContext } from "@/components/common/layout"
import { nanoid } from "nanoid"
import { IVideo } from "../writing/video"
import { ICourse, ILesson, IUnit } from "./types"
import { observer, useObservable } from "@legendapp/state/react"
import { ICourseCat } from "@/components/navigation/sidenav"

interface ICouseBox {
	courseId: number
}

interface ICourseState {
	course: ICourse,
	unitIds: number[]
}

const CourseBox: FC<ICouseBox> = ({courseId}) => {
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
	}, [])

	return <section className="text-white">
		<h3 className="font-semibold mb-5">{course?.name}</h3>
		{unitIds && unitIds.map((id: number) =>
			<UnitBox key={nanoid()} unitId={id} />
		)}
	</section>
}

export default CourseBox