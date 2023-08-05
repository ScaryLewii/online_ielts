import { IAnswer, IQuestion, IUserAnswer } from "@/components/types/types"
import { observer, useObservable } from "@legendapp/state/react"
import { nanoid } from "nanoid"
import { FC, useContext } from "react"
import { QuizContext } from "../courses/quiz/[quiz_id]"
import Image from "next/image"
import trueIcon from "../../../public/images/true.svg"
import falseIcon from "../../../public/images/false.svg"

interface IRadioGroup {
	questionContent: IQuestion
}

const RadioGroup = observer(({ questionContent }: IRadioGroup) => {
	const context = useContext(QuizContext)
	const state = useObservable({
		isCorrect: false,
		chosen: ""
	})

	const handleChange = (id: string, answer: IAnswer) => {
		state.chosen.set(answer.id)
		
		const userAnswers = context.userAnswers.get()
		if (context.answers.get().some((_a: IAnswer) => _a.id === answer.id)) {
			state.isCorrect.set(true)
			const _userAnswer = { id: id, correct: true }
			if (userAnswers.some((a: IUserAnswer) => a.id === id)) {
				userAnswers.forEach((a: IUserAnswer) => {
					if (a.id === id) {
						a.correct = true
					}
				})

				context.userAnswers.set([...new Set([...userAnswers])])

				return
			}

			context.userAnswers.set(
				[...new Set(
					[...context.userAnswers.get(), _userAnswer]
				)].filter(id => id))
			return
		}

		context.userAnswers.set([...new Set([...context.userAnswers.get(), {
			id: id,
			correct: false
		}])])
		state.isCorrect.set(false)
		return 
	}

	return <div id={questionContent?.id} data-type="radio-group" className="text-white mb-5" style={{"--tw-border-opacity": 1} as React.CSSProperties}>
		<h4 className="mb-3 font-semibold">{questionContent?.title}</h4>
		{questionContent?.answers.map(a =>
			<div key={nanoid()} className="flex gap-20 items-center mb-3">
				<label className="label cursor-pointer justify-start gap-3">
					<input id={questionContent.id} type="radio" name={questionContent.id}
						className="radio radio-info border-2"
						value={a.id}
						checked={a.id === state.chosen.get()}
						onChange={() => handleChange(questionContent.id, a)}
						disabled={context.isSubmit.get()}
					/>
					<span className={`
							${context.isSubmit.get() && context.answers.get().some((_a: IAnswer) => _a.id === a.id) ? "text-green font-semibold underline" : ""}
							${context.isSubmit.get() && state.chosen.get() === a.id && !state.isCorrect.get() ? "text-red font-semibold underline" : ""}
						`}
					>
						{a.content}
					</span> 
				</label>

				{context.isSubmit.get() && state.chosen.get() === a.id && (
					<Image src={state.isCorrect.get() ? trueIcon : falseIcon} width={24} height={24} alt="correct icon" />
				)}
			</div>
		)}
	</div>
})

export default RadioGroup