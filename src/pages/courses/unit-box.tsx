import { useContext, useEffect } from "react"
import chevron from "../../../public/images/chevron.svg"
import Image from "next/image"
import playIcon from "../../../public/images/play.svg"
import examIcon from "../../../public/images/exam-white.svg"
import Link from "next/link"
import { nanoid } from "nanoid"
import { ILesson, IQuiz, IUnit } from "../../components/types/types"
import { GlobalContext } from "@/context/context"
import { observer, useObservable } from "@legendapp/state/react"
import { fetchData } from "@/base/base"
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

	const state = useObservable({
		isExpanded: false,
		unit: {},
		lessons: [],
		quiz: {}
	} as unknown as IUnitBox)

	useEffect(() => {
		state.unit.set(context.units.get().find((u: IUnit) => u.id === unitId))
		state.lessons.set(context.lessons.get().filter((l: ILesson) => l.chapterId === unitId))

		const fetchQuiz = async () => {
			const token = localStorage.getItem("token")
			if (!token) {
				return
			}
			const _quizArray: any = []
			state.lessons.get().map(async (l: ILesson) => {
				await fetchData("lessons/" + l.id + "/quizzes", token, "GET")
					.then(quiz => {
						if (quiz.data.length) {
							let _quiz = Object.values(quiz.data)[0] as IQuiz
							_quiz.chapterId = l.chapterId
							state.quiz.set(_quiz)
						}
					})
			})
		}

		if (context.quizs.get().length) {
			state.quiz.set(context.quizs.get().find((q: IQuiz) => q.chapterId === unitId))
		}

		if (!context.quizs.get().length) {
			fetchQuiz()
		}
	}, [context.lessons, context.quiz, context.quizs, context.units, state.lessons, state.quiz, state.unit, unitId])

	const handleUnitClick = () => {
		state.isExpanded.set(v => !v)
	}

	return <>
		<div className={`flex justify-between items-center mb-5 lg:px-3
			${state.isExpanded.get() && "py-3 bg-dark border border-white pr-3"}
		`}>
			<button data-id={unitId} className="flex gap-2 lg:gap-4" onClick={() => handleUnitClick()}>
				<Image src={chevron} width={24} height={24} alt="chevron" />
				{state.unit.name.get()}
			</button>
		</div>
		{(state.lessons.get() || state.quiz.get()) &&
			<ul className={`${state.isExpanded.get() ? "block mb-5" : "hidden"}`}>
				{state.lessons.get().map(l => 
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
		}
	</>
})

export default UnitBox