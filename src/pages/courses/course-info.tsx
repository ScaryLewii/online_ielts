import ReactPlayer from "react-player"
import Image from "next/image"
import pin2 from "../../../public/images/pin2.svg"
import hat from "../../../public/images/hat.svg"
import arrow from "../../../public/images/arrow-right.svg"
import { ReactSVG } from "react-svg"
import { useContext, useEffect } from "react"
import { CourseContext, GlobalContext } from "@/context/context"
import { observer, useObservable } from "@legendapp/state/react"
import { ICourse, ILesson, ILessonProgress } from "@/components/types/types"
import { useRouter } from "next/router"

const CourseInfo = observer(() => {
	const router = useRouter()
	const globalContext = useContext(GlobalContext)
	const courseContext = useContext(CourseContext)
	const state = useObservable({
		activeCourse: {},
		completeLessons: []
	} as unknown as {
		activeCourse: ICourse,
		completeLessons: ILessonProgress[]
	})

	useEffect(() => {
		state.activeCourse.set(courseContext?.activeCourse.get())
		state.completeLessons.set(globalContext?.lessonProgress.get())
	}, [])

	const handleContinueStudy = () => {
		const userCompleteLessons = globalContext.lessonProgress.get().filter((p: ILessonProgress) => p.userId === globalContext.user.id.get())
		const notCompleteLessons = globalContext.lessons.get().filter((l: ILesson) => !userCompleteLessons.some((p: ILessonProgress) => p.lessonId === l.id)) as ILesson[]
		notCompleteLessons.sort((a, b) => {
			return a.id - b.id
		})
		const nextLesson = notCompleteLessons[0]
		router.push("/courses/lesson/" + (nextLesson.id))
	}

	return <>
		<div className="relative pt-[56.25%]">
			<ReactPlayer
				url={state.activeCourse.introVideo.get()}
				className="react-player absolute top-0 left-0"
				controls
				width="100%"
				height="100%"
			/>
		</div>
		<h3 className="text-xl font-semibold my-5">Video hướng dẫn học</h3>
		<div dangerouslySetInnerHTML={{__html: courseContext?.activeCourse.description.get()}} />
		<div className="flex items-center gap-2 mt-10">
			<Image src={pin2} width={24} height={24} alt="start date" />
			<p>Start date: February 21, 2023</p>
		</div>
		<div className="flex items-center gap-2 mt-5">
			<Image src={hat} width={24} height={24} alt="start date" />
			<p>Estimated end date: August 9, 2023</p>
		</div>

		<button className="py-4 px-8 bg-cyan rounded-full mt-10 flex items-center gap-2 hover:opacity-90" onClick={() => handleContinueStudy()}>
			<span className="text-black font-semibold">Continue Your Study</span>
			<ReactSVG src={arrow["src"]} width={16} height={11} className="fill-black" />
		</button>
	</>
})

export default CourseInfo