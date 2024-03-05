"use client"
import { useCourseQuery } from "@/base/query"
import CourseDetail from "@/components/course/course-detail"
import { GlobalContext } from "@/context/context"
import CourseInfo from "@/pages/courses/course-info"
import { useRouter } from "next/router"
import { useContext } from "react"


const CourseContent = () => {
	const { query, isReady } = useRouter()
	const context = useContext(GlobalContext)
	if(!isReady || !isFetchedCourse) return <></>

	return <>
		{isClient &&
			<div className="flex gap-10 flex-wrap text-white p-5 xl:p-10 relative z-[1]">
				<div className="w-full lg:w-auto lg:min-w-[550px] border border-white py-5 px-5">
					{/* <CourseBox courseId={course.id} /> */}
					<CourseDetail item={courseData} />
				</div>
				<div className=" xl:max-w-[450px]">
					<CourseInfo videoUrl={courseData?.introVideo} />
				</div>
			</div>
		}
	</>
}

export default CourseContent