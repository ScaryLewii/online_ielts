"use client"

import { useUserInfoQuery } from "@/base/query"
import { CourseContext, GlobalContext } from "@/context/context"
import { ICourse, ILesson, ILessonProgress, IUser } from "@/types/types"
import { useObservable } from "@legendapp/state/react"
import Image from "next/image"
import { useRouter } from "next/router"
import { useContext, useEffect } from "react"
import ReactPlayer from "react-player/lazy"
import { ReactSVG } from "react-svg"
import arrow from "../../../public/images/arrow-right.svg"
import hat from "../../../public/images/hat.svg"
import pin2 from "../../../public/images/pin2.svg"
import PinIcon from "@/components/icons/pin"
import HaatIcon from "@/components/icons/hat"

const CourseInfo = ({videoUrl}: {videoUrl?: string}) => {
	const router = useRouter()
	const globalContext = useContext(GlobalContext)
	const courseContext = useContext(CourseContext)
	const user = useUserInfoQuery(globalContext.cookies.get()).data as IUser

	const state = useObservable({
		activeCourse: {},
		completeLessons: [],
		hasWindow: false
	} as unknown as {
		activeCourse: ICourse,
		completeLessons: ILessonProgress[],
		hasWindow: boolean
	})

	state.activeCourse.set(courseContext?.activeCourse.get())
	state.completeLessons.set(globalContext?.lessonProgress.get())

	useEffect(() => {
		if (typeof window !== "undefined") {
			state.hasWindow.set(true);
		}
	})

	const handleContinueStudy = () => {
		const firstCategoryId = globalContext.categories.get().sort()[0].id
		const userCompleteLessons = globalContext.lessonProgress.get().filter((p: ILessonProgress) => p.userId === user.id)
		userCompleteLessons.sort()
		const firstCategoryCourses = globalContext.courses.get().filter((c: ICourse) => c.categoryId === +firstCategoryId) as ICourse[]
		const firstCategoryLessons: ILesson[] = []
		firstCategoryCourses.map(c => {
			globalContext.lessons.get().filter((l: ILesson) => l.courseId === c.id && firstCategoryLessons.push(l))
		})

		if (globalContext.lessonProgress.get().length) {
			const nextLessonId = userCompleteLessons[userCompleteLessons.length - 1]?.lessonId + 1
			const nextLesson = globalContext.lessons.get().find((l: ILesson) => l.id === nextLessonId) as ILesson
			if (nextLesson) {
				router.push(`/courses/${nextLesson.courseId}/lessons/${nextLesson.id}`)
			} else {
				router.push("/study-route")
			}
			return
		}
		
		if (!globalContext.lessonProgress.get().length) {
			router.push(`/courses/${firstCategoryLessons[0].courseId}/lessons/${firstCategoryLessons[0].id}`)
		}
	}

	return <>
		<div className="relative pt-[56.25%]" data-video={courseContext?.activeCourse.introVideo.get()}>
			{state.hasWindow.get() &&
				<ReactPlayer
					url={courseContext?.activeCourse.introVideo.get()}
					className="react-player absolute top-0 left-0"
					controls
					width="100%"
					height="100%"
				/>
			}
			{videoUrl &&
				<ReactPlayer
					url={videoUrl}
					className="react-player absolute top-0 left-0"
					controls
					width="100%"
					height="100%"
				/>
			}
		</div>
		<div className="text-black-mb dark:text-white">
			<h3 className="text-xl font-semibold my-5">Video hướng dẫn học</h3>
			<div dangerouslySetInnerHTML={{__html: courseContext?.activeCourse.description.get()}} />
			<div className="flex items-center gap-2 mt-10">
				<PinIcon />
				<p>Start date: February 21, 2023</p>
			</div>
			<div className="flex items-center gap-2 mt-5">
				<HaatIcon />
				<p>Estimated end date: August 9, 2023</p>
			</div>
		</div>

		<button className="py-4 px-8 bg-cyan rounded-full mt-10 flex items-center gap-2 hover:opacity-90" onClick={() => handleContinueStudy()}>
			<span className="text-black font-semibold">
				{globalContext.lessonProgress.get().length ? "Continue Your Study" : "Start Studying"}
			</span>
			<ReactSVG src={arrow["src"]} width={16} height={11} className="fill-black" />
		</button>
	</>
}

export default CourseInfo