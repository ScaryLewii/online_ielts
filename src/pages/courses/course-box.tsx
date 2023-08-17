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
	unitIds: number[],
	hasWindow: boolean
}

const CourseBox = observer(({courseId}: ICouseBox) => {
	const context = useContext(GlobalContext)
	const courseContext = useContext(CourseContext)

	const state = useObservable({
		course: {},
		unitIds: [],
		hasWindow: false,
	} as unknown as ICourseState)

	const setActiveCourse = () => {
		const activeCourse = context.courses.get().filter((c: ICourse) => c.id === courseId)[0]
		courseContext.activeCourse.set(activeCourse)
	}

	useEffect(() => {
		context.courses.get().map((c: ICourse) => {
			c.id === courseId && state.course.set(c)
		})
	
		const ids: number[] = []
		context.units.get().forEach((u: IUnit) => {
			if (u.courseId === courseId) {
				ids.push(u.id)
			}
			state.unitIds.set(ids)
		})

		if (typeof window !== "undefined") {
			state.hasWindow.set(true);
		}

		console.log(context.units.get())
	}, [context.courses, context.units, courseId, state.course, state.hasWindow, state.unitIds])

	return <>
		{ state.course.get() &&
			<div className="text-white">
				<button className="mb-5 cursor-pointer" onClick={() => setActiveCourse()}>
					<h3 className={`font-semibold ${courseContext.activeCourse.id.get() === courseId ? "text-cyan" : ""}`}>{state.course.name.get()}</h3>
				</button>
				{state.unitIds.get().length && state.unitIds.get().map((id: number) =>
					<UnitBox key={nanoid()} unitId={id} />
				)}
			</div>
		}
	</>
})

export default CourseBox