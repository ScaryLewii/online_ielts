import { useContext, useEffect, useState } from "react"
import UnitBox from "./unit-box"
import { nanoid } from "nanoid"
import { ICourse, IUnit } from "../../components/types/types"
import { observer, useObservable } from "@legendapp/state/react"
import { CourseContext, GlobalContext } from "@/context/context"
import { fetchData } from "@/base/base"

interface ICouseBox {
	courseId: number
}

interface ICourseState {
	course: ICourse,
	unitIds: number[],
}

const CourseBox = observer(({courseId}: ICouseBox) => {
	const context = useContext(GlobalContext)
	const courseContext = useContext(CourseContext)

	const state = useObservable({
		course: {},
		unitIds: [],
	} as unknown as {
		course: ICourse,
		unitIds: number[],
	})

	const setActiveCourse = () => {
		const activeCourse = context.courses.get().filter((c: ICourse) => c.id === courseId)[0]
		courseContext.activeCourse.set(activeCourse)
	}

	useEffect(() => {
		context.courses.get().map((c: ICourse) => {
			c.id === courseId && state.course.set(c)
		})
	
		const getUnitIds = async () => {
			const ids: number[] = []
			if (context.units.get().length) {
				context.units.get().forEach((u: IUnit) => {
					if (u.courseId === courseId) {
						ids.push(u.id)
					}
					state.unitIds.set(ids)
				})
	
				return
			}
			
			if (!context.units.get().length) {
				const token = localStorage.getItem("token")
				if (!token) {
					return
				}
	
				await fetchData(`courses/lessons/${courseId}`, token, "GET")
					.then(lessons => lessons.data.chapters.forEach((data: IUnit) => {
						ids.push(data.id)
					}))
	
				state.unitIds.set(unitIds => [...new Set([...unitIds, ...ids])])
			}
		}

		getUnitIds()
	}, [context.courses, context.units, courseId, state.course, state.unitIds])

	return <>
		{ state.course.get() &&
			<div className="text-white">
				<button className="mb-5 cursor-pointer" onClick={() => setActiveCourse()}>
					<h3 className={`font-semibold ${courseContext?.activeCourse.id.get() === courseId ? "text-cyan" : ""}`}>{state.course.name.get()}</h3>
				</button>
				{state.unitIds.get().map((id: number) =>
					<UnitBox key={nanoid()} unitId={id} courseId={courseId} />
				)}
			</div>
		}
	</>
})

export default CourseBox