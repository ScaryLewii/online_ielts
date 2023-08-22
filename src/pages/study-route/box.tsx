import Image from "next/image"
import certificate from "../../../public/images/certificate.svg"
import conquer from "../../../public/images/conquer.svg"
import contract from "../../../public/images/contract.svg"
import { useContext, useEffect } from "react"
import { GlobalContext } from "@/context/context"
import { ICourse, ILesson, ILessonProgress, IUnit } from "@/types/types"
import { observer, useObservable } from "@legendapp/state/react"
import { useCoursesQuery } from "@/base/query"

const RouteBox = observer(() => {
	const context = useContext(GlobalContext)
	const allCourses = useCoursesQuery().data as ICourse[]
	const state = useObservable(0)
	
	const units = context.units.get()
	const userLessons = context.lessonProgress.get()
	const lessons = context.lessons.get()

	const completeCourses = allCourses?.filter(course => course.isComplete === true)

	useEffect(() => {
		units.map((u: IUnit) => {
			const lessonCount = lessons.filter((l: ILesson) => l.courseId === u.courseId)
			lessons.map((l: ILesson) => {
				const lessonCompletes = userLessons.filter((ul: ILessonProgress) => ul.lessonId === l.id)
				if (lessonCompletes.length === lessonCount.length) {
					state.set(v => v+1)
				}
			})
		})
	}, [lessons, state, units, userLessons])

	return <div className="border border-white bg-dark rounded-lg p-8">
		<div className="flex gap-4 mb-10 items-start">
			<Image src={contract} width={35} height={35} alt="course" />

			<div className="font-semibold mb-14">
				<h4 className="text-cyan text-[36px] mb-2 leading-7">{allCourses?.length}</h4>
				<p>Khóa học đã đăng kí</p>
			</div>
		</div>

		<div className="flex gap-4 mb-10 items-start">
			<Image src={certificate} width={35} height={35} alt="course" />

			<div className="font-semibold mb-14">
				<h4 className="text-cyan text-[36px] mb-2 leading-7">
					{completeCourses?.length}
				</h4>
				<p>Khóa học đã hoàn thành</p>
			</div>
		</div>

		<div className="flex gap-4 mb-10 items-start">
			<Image src={conquer} width={35} height={35} alt="course" />

			<div className="font-semibold">
				<h4 className="text-cyan text-[36px] mb-2 leading-7">
					{context.lessonProgress.get().length}/{context.lessons.get().length}
				</h4>
				<p>Hoạt động đã hoàn thành</p>
			</div>
		</div>
	</div>
})

export default RouteBox