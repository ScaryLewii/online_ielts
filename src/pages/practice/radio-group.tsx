import { IAnswer, IQuestion, IUserAnswer } from "@/types/types"
import { observer, useObservable } from "@legendapp/state/react"
import { nanoid } from "nanoid"
import { FC, useContext } from "react"
import Image from "next/image"
import trueIcon from "../../../public/images/true.svg"
import falseIcon from "../../../public/images/false.svg"
import { QuizContext } from "@/context/context"

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

		answer.right ? state.isCorrect.set(answer.right) : state.isCorrect.set(false)
		
		let userAnswers = context.userAnswers.get() as IQuestion[]
		const _userAnswer: IAnswer = { id: answer.id, content: answer.content, isChecked: true }
		const postAnswer: IAnswer[] = []
		questionContent?.answers.map(a => {
			if (a.id === _userAnswer.id) {
				postAnswer.push(_userAnswer)
				return
			}

			const remainingChoice = { id: a.id, content: a.content, isChecked: false }

			postAnswer.push(remainingChoice)
		})

		const postContent: IQuestion = {
			...questionContent,
			answers: postAnswer
		}

		if (userAnswers.some((a: IQuestion) => a.id === id)) {
			userAnswers = userAnswers.filter(a => a.id !== id)
		}

		userAnswers.push(postContent)
		context.userAnswers.set(userAnswers)
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