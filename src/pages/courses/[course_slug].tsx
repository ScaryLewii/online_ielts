import Image from "next/image"
import pin2 from "../../../public/images/pin2.svg"
import hat from "../../../public/images/hat.svg"
import arrow from "../../../public/images/arrow-right.svg"
import { ReactSVG } from "react-svg"
import lessonsData from "./data.json"
import { useContext, useEffect, useState } from "react"
import { observer, useObservable } from "@legendapp/state/react"
import { StateContext } from "@/components/common/layout"
import { useRouter } from "next/router"
import { ICourseCat } from "@/components/navigation/sidenav"
import { nanoid } from "nanoid"
import CourseBox from "./course-box"
import { ICourse } from "./types"

interface ICourseContentState {
	courses: ICourse[],
	courseIds: number[]
}

const CourseContent = () => {
	const router = useRouter()
	const context = useContext(StateContext)
	const [courseIds, setCourseIds] = useState<number[]>([])

	useEffect(() => {
		const categories = Object.values(context.categories.get()) as ICourseCat[]
		categories.map((cat: ICourseCat) => {
			if (router.asPath.includes(cat.slug)) {
				const courses = context.courses.get().filter((c: ICourse) => c.categoryId === cat.id)
				setCourseIds(courses.map((c: ICourse) => c.id))
			}
		})
	}, [context.categories, context.courses, router.asPath])

	return <div className="flex gap-14 flex-wrap text-white">
		<div className="w-full lg:w-auto lg:min-w-[650px] border border-white py-5 px-5">
			{courseIds.map((id: number) => 
				<CourseBox key={nanoid()} courseId={id} />
			)}
		</div>
		<div>
			<h3 className="text-xl font-semibold">Schedule</h3>
			<div className="flex items-center gap-2 mt-5">
				<Image src={pin2} width={24} height={24} alt="start date" />
				<p>Start date: February 21, 2023</p>
			</div>
			<div className="flex items-center gap-2 mt-5">
				<Image src={hat} width={24} height={24} alt="start date" />
				<p>Estimated end date: August 9, 2023</p>
			</div>

			<button className="py-4 px-8 bg-cyan rounded-full mt-10 flex items-center gap-2 hover:opacity-90">
				<span className="text-black font-semibold">Continue Your Study</span>
				<ReactSVG src={arrow["src"]} width={16} height={11} className="fill-black" />
			</button>
		</div>
	</div>
}

export default CourseContent