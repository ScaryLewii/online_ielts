import { useContext, useEffect, useState } from "react"
import chevron from "../../../public/images/chevron.svg"
import Image from "next/image"
import playIcon from "../../../public/images/play.svg"
import examIcon from "../../../public/images/exam-white.svg"
import Link from "next/link"
import { nanoid } from "nanoid"
import { ILesson, IQuiz, IUnit } from "../../types/types"
import { GlobalContext } from "@/context/context"
import { observer, useObservable } from "@legendapp/state/react"
import { fetchData } from "@/base/base"
import { useLessonsQuery, useQuizsQuery, useUnitsQuery } from "@/base/query"
interface IUnitBlock {
	unitId: number,
	courseId: number
}

interface IUnitBox {
	isExpanded: boolean,
	unit: IUnit,
	lessons: ILesson[],
	quiz: IQuiz
}

const UnitBox = observer(({ unitId, courseId }: IUnitBlock) => {
	const context = useContext(GlobalContext)
	const allUnits = useUnitsQuery().data as IUnit[]
	const allLessons = useLessonsQuery().data as ILesson[]
	const allQuizs = useQuizsQuery().data as IQuiz[]
	const [unit, setUnit] = useState<IUnit | null>(null)
	const [lessons, setLessons] = useState<ILesson[]>([])
	const [quiz, setQuiz] = useState<IQuiz | null>(null)

	const state = useObservable({
		isExpanded: false,
		unit: {},
		lessons: [],
		quiz: {}
	} as unknown as IUnitBox)

	useEffect(() => {
		const _unit = allUnits?.find((u: IUnit) => u.id === unitId)
		_unit && setUnit(_unit)

		const _lessons = allLessons?.filter((l: ILesson) => l.chapterId === unitId)
		_lessons && setLessons(_lessons)
	}, [allLessons, allUnits, context.lessons, context.quiz, context.quizs, context.units, lessons, state.lessons, state.quiz, state.unit, unitId])

	const handleUnitClick = () => {
		state.isExpanded.set(v => !v)
	}

	return <>
		<div className={`flex justify-between items-center mb-5 lg:px-3
			${state.isExpanded.get() && "py-3 bg-dark border border-white pr-3"}
		`}>
			<button data-id={unitId} className="flex gap-2 lg:gap-4" onClick={() => handleUnitClick()}>
				<Image src={chevron} width={24} height={24} alt="chevron" />
				{unit?.name}
			</button>
		</div>
		<ul className={`${state.isExpanded.get() ? "block mb-5" : "hidden"}`}>
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
			{state.quiz.get() &&
				<li key={nanoid()} data-quiz-id={state.quiz.get().id} className="list-none flex items-center justify-between pl-10 pr-3">
					<Link href={`/courses/quiz/${state.quiz.get().id}`}
						className="flex items-center gap-5 my-2">
							<Image src={examIcon} width={24} height={24} alt="quiz" />
							{state.quiz.get().title}
					</Link>
				</li>
			}
		</ul>
	</>
})

export default UnitBox