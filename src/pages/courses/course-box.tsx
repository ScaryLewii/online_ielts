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

const CourseBox: FC<ICouseBox> = observer(({courseId}) => {
	const context = useContext(StateContext)
	const [course, setCourse] = useState<ICourse | null>(null)
	const [unitIds, setUnitIds] = useState<number[]>([])

	const state = useObservable({
		course: null,
		unitIds: []
	} as unknown as ICourseState ) 

	useEffect(() => {
		context.courses.get().map((c: ICourse) => {
			c.id === courseId && setCourse(c)
		})

		const unitArray = [...context.units.get()] as IUnit[]
		unitArray.forEach(u => {
			if (u.courseId === courseId) {
				console.log(u)
			}
		})
	}, [])

	return <section className="text-white">
		<h3 className="font-semibold mb-5">{course?.name}</h3>
		{unitIds && unitIds.map((id: number) =>
			<UnitBox key={nanoid()} unitId={id} />
		)}
	</section>
})

export default CourseBox