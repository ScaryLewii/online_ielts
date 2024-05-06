import { useCategoriesQuery, useCoursesQuery } from "@/base/query"
import RouteButton from "@/components-mobile/all-courses/route-button"
import { GlobalContext } from "@/context/context"
import { ICategory, ICourse } from "@/types/types"
import courseIcon from "public/images/course.svg"
import examIcon from "public/images/exam.svg"
import { useContext, useEffect, useState } from "react"
import AllCourseBanner from "../all-courses/banner"

const StudyRouteMobile = () => {
	const context = useContext(GlobalContext)
	const { isFetched: isFinishFetchCategories, data: categories } = useCategoriesQuery(context.cookies.get())
	const { isFetched: isFinishFetchCourses, data: courses } = useCoursesQuery(context.cookies.get())

	const [availableCategories, setAvailableCategories] = useState<ICategory[]>([])

	useEffect(() => {
		if (isFinishFetchCourses && isFinishFetchCategories && typeof window !== undefined) {
			setAvailableCategories(categories.filter((cat : ICategory) => courses?.some((course: ICourse) => course.categoryId === cat.id)))
		}

	}, [categories, courses, isFinishFetchCategories, isFinishFetchCourses])

	return (
		<>
			<AllCourseBanner />

			<div className="flex flex-col gap-5 mt-5">
				<RouteButton 
					label={"Khóa học của tôi"}
					description={`${availableCategories.length || 0} khóa học`}
					href={"/my-courses"}
					iconSrc={courseIcon["src"]}
					color={"#F4754C"}
				/>

				<RouteButton
					label={"IELTS Speaking Test"}
					description={"5 lượt"}
					href={"/exam"}
					iconSrc={examIcon["src"]}
					color={"#93D3E6"}
				/>
			</div>
		</>
	)
}

export default StudyRouteMobile