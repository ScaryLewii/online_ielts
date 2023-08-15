import { useContext } from "react"
import chevron from "../../../public/images/chevron.svg"
import Image from "next/image"
import playIcon from "../../../public/images/play.svg"
import examIcon from "../../../public/images/exam-white.svg"
import Link from "next/link"
import { nanoid } from "nanoid"
import { ILesson, IQuiz, IUnit } from "../../components/types/types"
import { GlobalContext } from "@/context/context"
import { observer, useObservable } from "@legendapp/state/react"
interface IUnitBlock {
	unitId: number
}

interface IUnitBox {
	isExpanded: boolean,
	unit: IUnit,
	lessons: ILesson[],
	quizs: IQuiz[]
}

const UnitBox = observer(({ unitId }: IUnitBlock) => {
	const context = useContext(GlobalContext)

	const state = useObservable({
		isExpanded: false,
		unit: {},
		lessons: [],
		quizs: []
	} as unknown as IUnitBox)

	state.unit.set(context.units.get().filter((u: IUnit) => u.id === unitId)[0])
	state.lessons.set(context.lessons.get().filter((l: ILesson) => l.chapterId === unitId))
	state.quizs.set(context.quizs.get().filter((q: IQuiz) => q.chapterId === unitId))

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
		{(state.lessons.get() || state.quizs.get()) &&
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
				{state.quizs.get().map(q => 
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
})

export default UnitBox