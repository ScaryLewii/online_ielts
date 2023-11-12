import Image from "next/image"
import { useContext, useEffect, useState } from "react"
import chevron from "../../../public/images/chevron.svg"
import playIcon from "../../../public/images/play.svg"

import { useLessonsQuery } from "@/base/query"
import { GlobalContext } from "@/context/context"
import { nanoid } from "nanoid"
import Link from "next/link"
import { ILesson, IUnit } from "../../types/types"
import QuizLink from "./quiz-link"
interface IUnitBlock {
	unit: IUnit,
	courseId: number
}

const UnitBox = ({ unit, courseId }: IUnitBlock) => {
	const context = useContext(GlobalContext)
	const allLessons = useLessonsQuery(courseId, context.cookies.get()).data as ILesson[]
	const [isExpanded, setIsExpanded] = useState(false)
	const [lessons, setLessons] = useState<ILesson[]>([])

	useEffect(() => {
		const _lessons = allLessons?.filter(l => l.chapterId === unit?.id)
		_lessons && setLessons(_lessons)
	}, [allLessons, unit?.id])

	const handleUnitClick = () => {
		setIsExpanded(v => !v)
	}

	return <>
		<div className={`flex justify-between items-center mb-5 lg:px-3
			${isExpanded && "py-3 bg-dark border border-white pr-3"}
		`}>
			<button data-id={unit?.id} className="flex gap-2 lg:gap-4" onClick={() => handleUnitClick()}>
				<Image src={chevron} width={24} height={24} alt="chevron" />
				{unit?.name}
			</button>
		</div>
		<ul className={`${isExpanded ? "block mb-5" : "hidden"}`}>
			{lessons?.map(l => 
				<li key={nanoid()} data-lesson-id={l.id} data-video={l.videoUrl} className="list-none flex items-center justify-between pl-10 pr-3">
					<Link href={`/courses/${l.courseId}/lessons/${l.id}`}
						className="flex items-center gap-5 my-2">
							{l.type === "video" && <Image src={playIcon} width={24} height={24} alt="video" />}
							{l.name}
					</Link>
				</li>
			)}

			{lessons?.map(l => <QuizLink key={nanoid()} courseId={l.courseId} lessonId={l.id} />)}
		</ul>
	</>
}

export default UnitBox