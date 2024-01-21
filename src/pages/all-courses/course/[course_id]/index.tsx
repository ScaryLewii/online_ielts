
import { useCategoriesQuery, useCourseQuery, useCoursesQuery } from "@/base/query"
import { CourseContext, GlobalContext } from "@/context/context"
import CourseBox from "@/pages/courses/course-box"
import CourseInfo from "@/pages/courses/course-info"
import { ICategory, ICourse } from "@/types/types"
import { observer, useObservable } from "@legendapp/state/react"
import { nanoid } from "nanoid"
import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react"

interface ICourseContent {
	activeCourse: ICourse,
	courseIds: number[]
}

const CourseContent = observer(() => {
	const router = useRouter()
	const context = useContext(GlobalContext)
	const courseId = router.query.course_id as string
	const courseData = useCourseQuery(+courseId, context.cookies.get()).data as ICourse

	const [course, setCourse] = useState<ICourse>()

	useEffect(() => {
		if (courseData) {
			console.log(courseData)
			setCourse(courseData)
		}
	}, [courseData])

	if (!course) return <></>

	return <div className="flex gap-10 flex-wrap text-white p-5 xl:p-10 relative z-[1]">
		<div className="w-full lg:w-auto lg:min-w-[550px] border border-white py-5 px-5">
			<CourseBox courseId={course.id} />
		</div>
		<div className=" xl:max-w-[450px]">
			<CourseInfo videoUrl={course.introVideo} />
		</div>
	</div>
})

export default CourseContent