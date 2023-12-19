import { useAllUnitsQuery, useCategoriesQuery, useCoursesQuery, useUnitsQuery, useUserInfoQuery } from "@/base/query"
import { GlobalContext } from "@/context/context"
import { ICategory, ICourse, IUnit } from "@/types/types"
import { nanoid } from "nanoid"
import Link from "next/link"
import { useContext, useEffect, useState } from "react"
import { ReactSVG } from "react-svg"
import icon1 from "../../../public/dump/icon-1.svg"
import icon2 from "../../../public/dump/icon-2.svg"
import icon3 from "../../../public/dump/icon-3.svg"
import banner from "public/images/user-banner.png"
import hand from "public/images/hand.svg"
import coin from "public/images/coin.svg"
import silver from "public/images/silver.svg"
import computer from "public/images/computer.svg"
import note from "public/images/note.svg"
import nextArrow from "public/images/next-2.svg"
import nextArrowBlue from "public/images/next-2-blue.svg"
import Image from "next/image"

const colors = [
	{
		text: '#F09000',
		bgc: '#FCE1A8'
	},{
		text: '#F09000',
		bgc: '#FCE1A8'
	},{
		text: '#007DF0',
		bgc: '#53CBED'
	},{
		text: '#007DF0',
		bgc: '#53CBED'
	},{
		text: '#FF228B',
		bgc: '#FF87C0'
	},{
		text: '#FF228B',
		bgc: '#FF87C0'
	},{
		text: '#608200',
		bgc: '#AFCD58'
	},{
		text: '#608200',
		bgc: '#AFCD58'
	},{
		text: '#7B00DB',
		bgc: '#CB87FF'
	},{
		text: '#7B00DB',
		bgc: '#CB87FF'
	}
]

const Route = () => {
	const context = useContext(GlobalContext)
	const { isFetched: isFinishFetchUserInfo, data: userInfo  } = useUserInfoQuery(context.cookies.get())
	const { isFetched: isFinishFetchCategories, data: categories } = useCategoriesQuery(context.cookies.get())
	const { isFetched: isFinishFetchCourses, data: courses } = useCoursesQuery(context.cookies.get())
	
	const [availableCategories, setAvailableCategories] = useState<ICategory[]>([])
	const [choice, setChoice] = useState(0)
	const [allCourses, setAllCourses] = useState<ICourse[]>([])

	useEffect(() => {
		if (isFinishFetchCourses && isFinishFetchCategories && typeof window !== undefined) {
			setAvailableCategories(categories.filter((cat : ICategory) => courses.some((course: ICourse) => course.categoryId === cat.id)))
			setAllCourses(courses)
		}

	}, [categories, courses, isFinishFetchCategories, isFinishFetchCourses])

	return <div>
		<div className="relative">
			<Image src={banner} width={1039} height={137} alt="route banner" />
			{isFinishFetchUserInfo && userInfo &&
				<div className="absolute left-[56px] top-1/2 -translate-y-1/2">
					<div className="flex items-center gap-4 font-semibold text-[22px]">
						<ReactSVG src={hand["src"]} />
						Hi {userInfo.displayName}, Happy learning
					</div>

					<div className="flex gap-[42px] items-center mt-[16px]">
						<span className="py-[6px] px-[12px] bg-[#FFBD00] text-sea font-semibold rounded-full">Premium User</span>

						<div className="inline-flex items-center gap-[12px]">
							<ReactSVG src={coin["src"]} />
							<span>0</span>
						</div>

						<div className="inline-flex items-center gap-[12px]">
							<ReactSVG src={silver["src"]} />
							<span>50</span>
						</div>
					</div>
				</div>
			}
		</div>

		<div className="flex mt-[40px]">
			<div className="flex flex-col gap-[30px] w-1/2">
				<button className="flex items-center justify-between w-full bg-white text-[#F4754C] rounded-[16px] p-[20px]"
					onClick={() => setChoice(1)}
				>
					<div className="flex items-center">
						<ReactSVG src={computer["src"]} />
						<div className="flex flex-col gap-[10px] text-left items-start ml-[20px]">
							<span className="font-semibold">Khóa học của tôi</span>
							<span className="italic">{availableCategories.length} khóa học</span>
						</div>
					</div>
					<ReactSVG src={nextArrow["src"]} />
				</button>

				<button className="flex items-center justify-between w-full bg-white text-sea rounded-[16px] p-[20px]"
					onClick={() => setChoice(2)}
				>
					<div className="flex items-center">
						<ReactSVG src={note["src"]} />
						<div className="flex flex-col gap-[10px] text-left items-start ml-[20px]">
							<span className="font-semibold">IELTS Speaking Test</span>
							<span className="italic">5 lượt</span>
						</div>
					</div>
					<ReactSVG src={nextArrowBlue["src"]} />
				</button>
			</div>

			{choice === 1 && 
				<div className="w-1/2 grid grid-cols-2 gap-[33px] pl-[60px]">
					{allCourses.sort((a, b) => a.categoryId - b.categoryId)
						.map((c: ICourse, index) => (
							<Link href={'/categories/' + c.categoryId} key={nanoid()} className="block rounded-[16px] overflow-hidden">
								<div className="flex flex-col items-center py-[23px]" style={{backgroundColor: colors[index].bgc}}>
									<span className="font-bold opacity-20 text-[50px]" style={{color: colors[index].text}}>0{availableCategories.find(cat => cat.id === c.categoryId)?.name.split(":")[0].slice(-1)}</span>
									<span className="font-bold text-[24px] mt-[-20px]" style={{color: colors[index].text}}>{availableCategories.find(cat => cat.id === c.categoryId)?.name.split(":").pop()}</span>
								</div>
								<div className="flex flex-col gap-[6px] pt-[8px] pb-[13px] px-[25px] bg-white bg-opacity-20">
									<span className="capitalize font-semibold text-[14px]">{c.name}</span>
									<span>{context.units.get().filter((u: IUnit) => u.courseId === c.id).length} bài học</span>
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