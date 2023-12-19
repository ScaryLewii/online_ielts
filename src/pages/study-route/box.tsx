"use client"

import { useAllLessonsProgressQuery, useAllLessonsQuery, useCoursesQuery } from "@/base/query"
import { GlobalContext } from "@/context/context"
import { ICourse, ILesson, ILessonProgress, IUnit } from "@/types/types"
import { useObservable } from "@legendapp/state/react"
import Image from "next/image"
import { useContext, useEffect } from "react"
import certificate from "../../../public/images/certificate.svg"
import conquer from "../../../public/images/conquer.svg"
import contract from "../../../public/images/contract.svg"
import Calendar from "react-calendar"
import calendar from "public/images/calendar.svg"
import social from "public/images/social-network.svg"
import { ReactSVG } from "react-svg"
import Link from "next/link"
import Countdown from 'react-countdown';

const RouteBox = () => {
	const context = useContext(GlobalContext)

	const allCourses = useCoursesQuery(context.cookies.get()).data as ICourse[]
	const state = useObservable(0)
	
	const units = context.units.get()
	const userLessons = useAllLessonsProgressQuery(allCourses, context.cookies.get()).map(array => array.data)
	const lessons = useAllLessonsQuery(allCourses, context.cookies.get()).map(array => array.data)

	const completeCourses = allCourses?.filter(course => course.isComplete === true)

	useEffect(() => {
		const handleBoxState = () => {
			units?.map((u: IUnit) => {
				if (!u) return
				const lessonCount = lessons?.filter((l: ILesson) => l && l?.courseId === u.courseId)
				lessons.map((l: ILesson) => {
					if (!l) return
					const lessonCompletes = userLessons?.filter((ul: ILessonProgress) => ul && ul.lessonId === l.id)
					if (lessonCompletes.length === lessonCount.length) {
						state.set(v => v+1)
					}
				})
			})
		}

		handleBoxState()
	}, [lessons, state, units, userLessons])

	return <div className="max-w-[400px]">
		<Calendar className="bg-sea rounded-[10px] p-[20px] mb-[18px] border border-cyan" />

		<div className="flex flex-col gap-[20px] border border-white rounded-[10px] bg-white bg-opacity-20 py-[16px] px-[24px]">
			<div className="flex flex-col gap-[16px]">
				<h2 className="font-bold text-[14px]">Take it easy - ngại chi Speaking band 9.0 cùng Hannah Vân Anh</h2>
				<div className="flex items-center gap-[20px]">
					<ReactSVG src={calendar["src"]} />
					<span className="font-bold text-[14px]">30/10/2023 - 19h</span>
				</div>
				<div className="flex items-center gap-[20px]">
					<ReactSVG src={social["src"]} />
					<Link href={"event.link.com"} className="italic text-[14px] text-cyan">event.link.com</Link>
				</div>
			</div>

			<div className="flex flex-col gap-[8px] text-center">
				<h2 className="font-bold text-[13px] text-[#FFC848]">COMING SOON...</h2>
				<Countdown 
					date={"12/31/2023"}
					zeroPadTime={2}
					renderer={props => <div className="flex items-center justify-center gap-[12px]">
						<div className="flex flex-col gap-[4px]"> 
							<span className="font-bold flex justify-center items-center w-[48px] h-[48px] rounded-[8px] border border-[#0D2654] bg-gradient-to-b from-[#041A42] to-[#000D23]">{props.days}</span>
							<span>Ngày</span>
						</div>
						<div className="flex flex-col gap-[4px]"> 
							<span className="font-bold flex justify-center items-center w-[48px] h-[48px] rounded-[8px] border border-[#0D2654] bg-gradient-to-b from-[#041A42] to-[#000D23]">{props.hours}</span>
							<span>Giờ</span>
						</div>
						<div className="flex flex-col gap-[4px]"> 
							<span className="font-bold flex justify-center items-center w-[48px] h-[48px] rounded-[8px] border border-[#0D2654] bg-gradient-to-b from-[#041A42] to-[#000D23]">{props.minutes}</span>
							<span>Phút</span>
						</div>
					</div>}
				/>
			</div>
		</div>
	</div>
}

export default RouteBox