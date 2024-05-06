import { useCategoriesQuery, useCoursesQuery } from "@/base/query"
import { GlobalContext } from "@/context/context"
import { ICategory, ICourse } from "@/types/types"
import { nanoid } from "nanoid"
import Link from "next/link"
import { useContext, useEffect, useState } from "react"
import { ReactSVG } from "react-svg"
import CourseColor from "@/base/course-color"
import lock from "public/images/lock-icon.svg"
import MobileBreadcrumbs from "@/components-mobile/common/breadcrumbs"

const MyCourses = () => {
	const context = useContext(GlobalContext)
	const { isFetched: isFinishFetchCategories, data: categories } = useCategoriesQuery(context.cookies.get())
	const { isFetched: isFinishFetchCourses, data: courses } = useCoursesQuery(context.cookies.get())
	
	const [availableCategories, setAvailableCategories] = useState<ICategory[]>([])
	const [allCourses, setAllCourses] = useState<ICourse[]>([])

	useEffect(() => {
		if (isFinishFetchCourses && isFinishFetchCategories && typeof window !== undefined) {
			setAvailableCategories(categories.filter((cat : ICategory) => courses?.some((course: ICourse) => course.categoryId === cat.id)))
			setAllCourses(courses)
		}

	}, [categories, courses, isFinishFetchCategories, isFinishFetchCourses])

	return (
		<>
			<MobileBreadcrumbs title="Khóa học của tôi" isSubMenu />

			<div className="grid grid-cols-2 gap-3 p-5 mt-5">
				{allCourses.sort((a, b) => a.categoryId - b.categoryId)
					.map((c: ICourse, index) => (
						<Link href={'/all-courses/course/' + c.id} key={nanoid()} className="block rounded-[16px] overflow-hidden">
							<div className="flex justify-center items-center py-[23px] relative" style={{backgroundColor: CourseColor[index]?.bgc}}>
								<span className="font-bold opacity-20 text-[50px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{color: CourseColor[index]?.text}}>0{availableCategories.find(cat => cat.id === c.categoryId)?.name.split(":")[0].slice(-1)}</span>
								<span className="font-bold text-[24px]" style={{color: CourseColor[index]?.text}}>{availableCategories.find(cat => cat.id === c.categoryId)?.name.split(":").pop()}</span>
							</div>
							<div className="flex flex-col gap-[6px] py-3 px-2 bg-white bg-opacity-20 text-xs">
								<span className="capitalize font-semibold">{c.name}</span>
								<span className="flex items-center gap-1">
									{c.isLocked && <ReactSVG src={lock["src"]} />}
									{c.totalLessons} bài học
								</span>
							</div>
						</Link>
					)
				)}
			</div>
		</>
	)
}

export default MyCourses