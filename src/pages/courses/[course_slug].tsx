
import { createContext, useContext, useEffect } from "react"
import { observer, useObservable } from "@legendapp/state/react"
import { nanoid } from "nanoid"
import CourseBox from "./course-box"
import { ICourse, ICourseCat } from "../../components/types/types"
import { useRouter } from "next/router"
import { CourseContext, StateContext } from "@/context/context"
import ReactPlayer from "react-player/lazy"
import CourseInfo from "./course-info"

interface ICourseContent {
	activeCourseId: number,
	activeCourse: ICourse,
	courseIds: number[]
}

const CourseContent = observer(() => {
	const router = useRouter()
	const context = useContext(StateContext)

	const state = useObservable({
		activeCourseId: 0,
		activeCourse: {},
		courseIds: []
	} as unknown as ICourseContent)

	context.categories.get().map((cat: ICourseCat) => {
		if (router.asPath.includes(cat.slug)) {
			const courses = context.courses.get().filter((c: ICourse) => c.categoryId === cat.id)
			state.courseIds.set(courses.map((c: ICourse) => c.id))
			state.activeCourseId.set(state.courseIds.get()[0])
			state.activeCourse.set(context.courses.get().filter((c: ICourse) => c.id === state.activeCourseId.get())[0])
		}
	})

	return <div className="flex gap-14 flex-wrap text-white">
		<CourseContext.Provider value={state}>
			<div className="w-full lg:w-auto lg:min-w-[650px] border border-white py-5 px-5">
				{state.courseIds.get().map((id: number) => 
					<CourseBox key={nanoid()} courseId={id} />
				)}
			</div>
		</CourseContext.Provider>
		<CourseContext.Provider value={state}>
			<div className=" xl:max-w-[450px]">
				<CourseInfo />
			</div>
		</CourseContext.Provider>
	</div>
})

export default CourseContent