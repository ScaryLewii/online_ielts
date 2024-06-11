import { useAllLessonsProgressQuery, useAllLessonsQuery, useCoursesQuery } from "@/base/query"
import { GlobalContext } from "@/context/context"
import { ICourse, ILesson, ILessonProgress, IUnit } from "@/types/types"
import { useObservable } from "@legendapp/state/react"
import Image from "next/image"
import { useContext, useEffect } from "react"
import location from "public/images/location.svg"
import elearning from "public/images/elearning.svg"
import diploma from "public/images/diploma.svg"

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

	return <div className="border border-black-mb dark:border-white dark:bg-dark rounded-lg p-8 text-black-mb dark:text-white">
		<div className="flex gap-4 mb-10 items-start">
			<Image src={location} width={35} height={35} alt="course" />

			<div className="font-semibold mb-14">
				<h4 className="text-black-mb dark:text-cyan text-[36px] mb-2 leading-7">{allCourses?.length}</h4>
				<p>Khóa học đã đăng kí</p>
			</div>
		</div>

		<div className="flex gap-4 mb-10 items-start">
			<Image src={elearning} width={35} height={35} alt="course" />

			<div className="font-semibold mb-14">
				<h4 className="text-black-mb dark:text-cyan text-[36px] mb-2 leading-7">
					{completeCourses?.length}
				</h4>
				<p>Khóa học đã hoàn thành</p>
			</div>
		</div>

		<div className="flex gap-4 mb-10 items-start">
			<Image src={diploma} width={35} height={35} alt="course" />

			<div className="font-semibold">
				<h4 className="text-black-mb dark:text-cyan text-[36px] mb-2 leading-7">
					{context.lessonProgress.get().length}/{context.lessons.get().length}
				</h4>
				<p>Hoạt động đã hoàn thành</p>
			</div>
		</div>
	</div>
}

export default RouteBox