import Image from "next/image"
import { useContext, useEffect, useState } from "react"
import playIcon from "public/images/play.svg"
import lock from "public/images/lock-icon.svg"

import { useLessonsQuery } from "@/base/query"
import { GlobalContext } from "@/context/context"
import { nanoid } from "nanoid"
import Link from "next/link"
import { ILesson, IUnit } from "../../types/types"
import QuizLink from "./quiz-link"
import { ReactSVG } from "react-svg"
import ChevronIcon from "@/components/icons/chevron"
import PlayIcon from "@/components/icons/play"
import MobileBreadcrumbs from "@/components-mobile/common/breadcrumbs"
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
			${isExpanded && "py-3 border border-black-mb dark:bg-dark dark:border-white pr-3"}
		`}>
			<button data-id={unit?.id} className="flex gap-2 lg:gap-4 text-left text-black-mb dark:text-white" onClick={() => handleUnitClick()}>
				<span className="flex-grow-[24px]">
					<ChevronIcon />
				</span>
				{unit?.name}
			</button>
		</div>
		<ul className={`${isExpanded ? "block mb-5" : "hidden"}`}>
			{lessons?.map(l => 
				<li key={nanoid()} data-lesson-id={l.id} data-video={l.videoUrl} className="list-none flex items-center justify-between pl-10 pr-3 text-black-mb dark:text-white">
					{!l.isLocked &&
						<Link href={`/courses/${l.courseId}/lessons/${l.id}`}
							className="flex items-center gap-5 my-2">
								{l.type === "video" && <PlayIcon />}
								{l.name}
						</Link>
					}
					{l.isLocked &&
						<div className="flex items-center gap-5 my-2 relative">
							{l.type === "video" && <PlayIcon />}
							{l.name}
							<span className="absolute -right-10 top-1/2 -translate-y-1/2 opacity-40">
								<ReactSVG src={lock["src"]} />
							</span>
						</div>
					}
				</li>
			)}

			{lessons?.map(l => <QuizLink key={nanoid()} courseId={l.courseId} lessonId={l.id} />)}
		</ul>
	</>
}

export default UnitBox