import CourseColor from "@/base/course-color"
import { useCategoriesQuery, useCoursesQuery } from "@/base/query"
import { GlobalContext } from "@/context/context"
import { ICategory, ICourse } from "@/types/types"
import { nanoid } from "nanoid"
import Link from "next/link"
import courseIcon from "public/images/course.svg"
import examIcon from "public/images/exam.svg"
import lock from "public/images/lock-icon.svg"
import nextArrow from "public/images/next-2.svg"
import { useContext, useEffect, useState } from "react"
import { ReactSVG } from "react-svg"
import AllCourseBanner from "./banner"
import CourseDropdown from "./dropdown"

const Route = () => {
	const context = useContext(GlobalContext)
	const { isFetched: isFinishFetchCategories, data: categories } = useCategoriesQuery(context.cookies.get())
	const { isFetched: isFinishFetchCourses, data: courses } = useCoursesQuery(context.cookies.get())
	
	const [availableCategories, setAvailableCategories] = useState<ICategory[]>([])
	const [choice, setChoice] = useState(0)
	const [allCourses, setAllCourses] = useState<ICourse[]>([])

	useEffect(() => {
		if (isFinishFetchCourses && isFinishFetchCategories && typeof window !== undefined) {
			setAvailableCategories(categories.filter((cat : ICategory) => courses?.some((course: ICourse) => course.categoryId === cat.id)))
			setAllCourses(courses)
		}

	}, [categories, courses, isFinishFetchCategories, isFinishFetchCourses])

	return <div>
		<AllCourseBanner />

		<div className="flex mt-[40px]">
			<span className="text-[#F4754C] lg:text-[#93D3E6] bg-[#F4754C] lg:bg-[#93D3E6]"></span>
			<div className="flex flex-col gap-[30px] w-1/2">
				<CourseDropdown iconSrc={courseIcon["src"]} activeColor="#F4754C" number={availableCategories.length} text1="Khóa học của tôi" text2="khóa học" handleClick={() => setChoice(1)} handleItemClick={() => setChoice(1)} />
				
				<Link href="/exam" className="flex items-center justify-between w-full rounded-[16px] p-[20px] text-[#93D3E6] bg-white">
					<div className="flex items-center">
						<div className="w-[60px] h-[60px] rounded-[16px] flex items-center justify-center bg-[#93D3E6] fill-white">
							<ReactSVG src={examIcon["src"]} />
						</div>
						<div className="flex flex-col gap-[10px] text-left items-start ml-[20px] text-sea">
							<span className="font-semibold">IELTS Speaking Test</span>
							<span className="italic">5 lượt</span>
						</div>
					</div>
					<ReactSVG src={nextArrow["src"]} />
				</Link>
			</div>

			{choice === 1 && allCourses &&
				<div className="w-1/2 grid grid-cols-2 gap-[33px] pl-[60px]">
					{allCourses.sort((a, b) => a.categoryId - b.categoryId)
						.map((c: ICourse, index) => (
							<Link href={'/all-courses/course/' + c.id} key={nanoid()} className="block rounded-[16px] overflow-hidden">
								<div className="flex flex-col items-center py-[23px]" style={{backgroundColor: CourseColor[index]?.bgc}}>
									<span className="font-bold opacity-20 text-[50px]" style={{color: CourseColor[index]?.text}}>0{availableCategories.find(cat => cat.id === c.categoryId)?.name.split(":")[0].slice(-1)}</span>
									<span className="font-bold text-[24px] mt-[-20px]" style={{color: CourseColor[index]?.text}}>{availableCategories.find(cat => cat.id === c.categoryId)?.name.split(":").pop()}</span>
								</div>
								<div className="flex flex-col gap-[6px] pt-[8px] pb-[13px] px-[25px] bg-white bg-opacity-20">
									<span className="capitalize font-semibold text-[14px]">{c.name}</span>
									<span className="flex items-center gap-1">
										{c.isLocked && <ReactSVG src={lock["src"]} />}
										{c.totalLessons} bài học
									</span>
								</div>
							</Link>
						)
					)}
				</div>
			}
		</div>
	</div>
}

export default Route