import { FC, useContext, useEffect, useState } from "react"
import chevron from "../../../public/images/chevron.svg"
import Image from "next/image"
import playIcon from "../../../public/images/play.svg"
import examIcon from "../../../public/images/exam-white.svg"
import Link from "next/link"
import { nanoid } from "nanoid"
import { StateContext } from "@/components/common/layout"
import { ILesson, IQuiz, IUnit } from "../../components/types/types"
interface IUnitBlock {
	unitId: number
}

const UnitBox: FC<IUnitBlock> = ({ unitId }): JSX.Element => {
	const context = useContext(StateContext)
	const [isExpanded, setIsExpanded] = useState(false)
	const [unit, setUnit] = useState<IUnit | null>(null)
	const [lessons, setLessons] = useState<ILesson[]>([])
	const [quizs, setQuizs] = useState<IQuiz[]>([])

	useEffect(() => {
		const units = Object.values(context.units.get()) as IUnit[]
		setUnit(units.filter((u: IUnit) => u.id === unitId)[0])

		const lessons = Object.values(context.lessons.get()) as ILesson[]
		setLessons(lessons.filter((l: ILesson) => l.chapterId === unitId))

		const quizs = Object.values(context.quizs.get()) as IQuiz[]
		setQuizs(quizs.filter((q: IQuiz) => q.chapterId === unitId))
	}, [context.lessons, context.quizs, context.units, unitId])
	
	return <>
		<div className={`flex justify-between items-center mb-5 lg:px-3
			${isExpanded && "py-3 bg-dark border border-white pr-3"}
		`}>
			<button data-id={unitId} className="flex gap-2 lg:gap-4" onClick={() => setIsExpanded(v => !v)}>
				<Image src={chevron} width={24} height={24} alt="chevron" />
				{unit?.name}
			</button>
		</div>
		{(lessons || quizs) &&
			<ul className={`${isExpanded ? "block mb-5" : "hidden"}`}>
				{lessons.map(l => 
					<li key={nanoid()} data-lesson-id={l.id} className="list-none flex items-center justify-between pl-10 pr-3">
						{l.chapterId === unitId &&
							<Link href={`/courses/lesson/${l.id}`}
								className="flex items-center gap-5 my-2">
									{l.type === "video" && <Image src={playIcon} width={24} height={24} alt="video" />}
									{l.name}
							</Link>
						}
					</li>
				)}
				{quizs.map(q => 
					<li key={nanoid()} data-quiz-id={q.id} className="list-none flex items-center justify-between pl-10 pr-3">
						{q.chapterId === unitId &&
							<Link href={`/courses/quiz/${q.id}`}
								className="flex items-center gap-5 my-2">
									<Image src={examIcon} width={24} height={24} alt="quiz" />
									{q.title}
							</Link>
						}
					</li>
				)}
			</ul>
		}
	</>
}

export default UnitBox