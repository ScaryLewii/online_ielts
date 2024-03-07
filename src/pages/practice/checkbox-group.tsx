import { IAnswer, IQuestion } from "@/types/types"
import { nanoid } from "nanoid"
import { FC, useContext } from "react"
import { observer, useObservable } from "@legendapp/state/react"
import { QuizContext } from "@/context/context"
import Image from "next/image"
import trueIcon from "../../../public/images/true.svg"
import falseIcon from "../../../public/images/false.svg"

interface ICheckboxGroup {
	questionContent: IQuestion
}

const CheckboxGroup = observer(({ questionContent }: ICheckboxGroup) => {
	const quizContext = useContext(QuizContext)
	const state = useObservable({
		answers: []
	} as unknown as {
		answers: IAnswer[]
	})

	const handleChange = (id: string, answer: IAnswer) => {
		state.answers.set(currentAnswers => [...currentAnswers.filter(a => a.id !== answer.id), answer])

		let userAnswers = quizContext.userAnswers.get() as IQuestion[]
		const _userAnswer: IAnswer = { id: answer.id, content: answer.content }
		const postAnswer: IAnswer[] = []
		questionContent?.answers.map(a => {
			if (a.id === _userAnswer.id) {
				postAnswer.push(_userAnswer)
				return
			}

			const remainingChoice = a

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
		quizContext.userAnswers.set(userAnswers)
	}

	return <div id={questionContent?.id} data-type="checkbox-group" className="text-white mb-5" style={{"--tw-border-opacity": 1} as React.CSSProperties}>
		<h3 className="mb-3 font-semibold">{questionContent?.title}</h3>
		<div className="mb-3 font-semibold" dangerouslySetInnerHTML={{__html: questionContent?.content}}></div>
		{questionContent?.answers.map(a =>
			<div key={nanoid()} className="flex gap-20 items-center mb-3">
				<label className="label cursor-pointer justify-start gap-3">
					<input type="checkbox" data-correct={a.right}
						className="checkbox checkbox-info border-2"
						value={a.id}
						checked={state.answers.get().includes(a)}
						onChange={() => handleChange(questionContent.id, a)}
						disabled={quizContext.isSubmit.get()}
					/>
					<span>{a.content}</span> 
				</label>

				{quizContext.isSubmit.get() && state.answers.get().includes(a) && (
					<Image src={state.answers.get() ? trueIcon : falseIcon} width={24} height={24} alt="correct icon" />
				)}
			</div>
		)}
	</div>
})

export default CheckboxGroup