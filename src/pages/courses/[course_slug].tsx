import Image from "next/image"
import pin2 from "../../../public/images/pin2.svg"
import hat from "../../../public/images/hat.svg"
import arrow from "../../../public/images/arrow-right.svg"
import { ReactSVG } from "react-svg"
import lessonsData from "./data.json"
import { useContext, useEffect } from "react"
import { observer, useObservable } from "@legendapp/state/react"
import { StateContext } from "@/components/common/layout"
import { useRouter } from "next/router"
import { ICourseCat } from "@/components/navigation/sidenav"
import { nanoid } from "nanoid"
import CourseBox from "./course-box"

const CourseContent = observer(() => {
	const router = useRouter()
	const context = useContext(StateContext)

	useEffect(() => {
		const fetchCourses = () => {
			context.categories.get().map((cat: ICourseCat) => {
				if (router.asPath.includes(cat.slug)) {
					const url = "https://apionline.ant-edu.ai/api/courses/category/" + cat.id
					const headers = { 
						'Content-Type' : 'application/json',
					};
					fetch(url, { headers })
						.then(res => res.json())
						.then(data => context.courses.set(data.data))
				}
			})
		};

		fetchCourses();
	}, [context.categories.get()]);

	return <div className="flex gap-14 flex-wrap text-white">
		<div className="w-full lg:w-auto lg:min-w-[650px] border border-white py-5 px-5">
			{context.courses.get().map((course: any) => <CourseBox key={nanoid()} id={course.id} />)}
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
})

export default CourseContent