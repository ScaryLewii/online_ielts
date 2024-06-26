
"use client"

import { useCourseQuery } from "@/base/query"
import MobileBreadcrumbs from "@/components-mobile/common/breadcrumbs"
import CourseDetail from "@/components/course/course-detail"
import { GlobalContext } from "@/context/context"
import CourseInfo from "@/pages/courses/course-info"
import { useRouter } from "next/router"
import { useContext } from "react"
import { MobileView } from "react-device-detect"

const CourseContent = () => {
	const { isReady, query } = useRouter()
	const context = useContext(GlobalContext)
	const courseId = query.course_id as string
	const { isFetched: isFinishFetchCourse, data: courseData } = useCourseQuery(+courseId, context.cookies.get())

	if (!isReady || !isFinishFetchCourse) return <span className="loading loading-bars"></span>

	return <>
		<MobileView>
			<MobileBreadcrumbs title="Khóa học của tôi" isSubMenu />
		</MobileView>
		<div className="flex gap-10 flex-wrap text-white p-5 xl:p-10 relative z-[1]">
			<div className="w-full lg:w-auto lg:min-w-[550px] border border-black-mb dark:border-white py-5 px-5">
				{/* <CourseBox courseId={course.id} /> */}
				<CourseDetail item={courseData} />
			</div>
			<div className=" xl:max-w-[450px]">
				<CourseInfo videoUrl={courseData?.introVideo} />
			</div>
		</div>
	</>
}

export default CourseContent