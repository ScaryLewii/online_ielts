
import { createContext, useContext, useEffect, useState } from "react"
import { observer, useObservable } from "@legendapp/state/react"
import { nanoid } from "nanoid"
import { useRouter } from "next/router"
import { CourseContext, GlobalContext } from "@/context/context"
import { useCategoriesQuery, useCoursesQuery } from "@/base/query"
import { ICategory, ICourse } from "@/types/types"
import CourseBox from "@/pages/courses/course-box"
import CourseInfo from "@/pages/courses/course-info"

interface ICourseContent {
	activeCourse: ICourse,
	courseIds: number[]
}

const CourseContent = observer(() => {
	const router = useRouter()
	const context = useContext(GlobalContext)
	const categories = useCategoriesQuery().data as ICategory[]
	const allCourses = useCoursesQuery().data as ICourse[]

	const [courses, setCourses] = useState<ICourse[]>([])

	const state = useObservable({
		activeCourse: {},
		courseIds: []
	} as unknown as ICourseContent)

	useEffect(() => {
		categories?.map((cat: ICategory) => {
			if (router.asPath.includes('' + cat.id)) {
				const _courses = allCourses?.filter((c: ICourse) => c.categoryId === cat.id)
				if (_courses) {
					setCourses(_courses)
					state.activeCourse.set(_courses[0])
				}
			}
		})
	}, [allCourses, categories, context.categories, context.lessons, router.asPath, state.activeCourse])

	return <div className="flex gap-10 flex-wrap text-white p-5 xl:p-10 relative z-[1]">
		<CourseContext.Provider value={state}>
			<div>
				<div className="w-full lg:w-auto lg:min-w-[550px] border border-white py-5 px-5">
					{courses?.map((course: ICourse) => 
						<CourseBox key={nanoid()} courseId={course.id} />
					)}
				</div>
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