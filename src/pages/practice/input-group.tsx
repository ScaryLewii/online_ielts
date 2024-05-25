import { QuizContext } from "@/context/context"
import { IAnswer, IQuestion } from "@/types/types"
import { observer, useObservable } from "@legendapp/state/react"
import { nanoid } from "nanoid"
import Image from "next/image"
import { useContext } from "react"
import falseIcon from "../../../public/images/false.svg"
import trueIcon from "../../../public/images/true.svg"

interface IInputGroup {
	questionContent: IQuestion
}

const InputGroup = observer(({ questionContent }: IInputGroup) => {
	const quizContext = useContext(QuizContext)
	const state = useObservable({
		answers: []
	} as unknown as {
		answers: IAnswer[]
	})

	const handleChange = (id: string, answer: IAnswer) => {
		state.answers.set(currentAnswers => [...currentAnswers.filter(a => a.id !== answer.id), answer])

		let userAnswers = quizContext.userAnswers.get() as IQuestion[]
		const postContent: IQuestion = {
			...questionContent,
			answers: state.answers.get()
		}

		if (userAnswers.some((a: IQuestion) => a.id === id)) {
			userAnswers = userAnswers.filter(a => a.id !== id)
		}

		userAnswers.push(postContent)
		quizContext.userAnswers.set(userAnswers)
	}

	return <div id={questionContent?.id} data-type="input-group" className="text-black-mb dark:text-white mb-5" style={{"--tw-border-opacity": 1} as React.CSSProperties}>
		<h3 className="mb-3 font-semibold">{questionContent?.title}</h3>
		<div className="mb-3 font-semibold" dangerouslySetInnerHTML={{__html: questionContent?.content}}></div>
		{questionContent?.answers.map((a, index) =>
			<div key={nanoid()} className="flex gap-20 items-center mb-3">
				<label className="label cursor-pointer justify-start gap-3">
					<span className="w-8">{index+1}. </span>
					<input id={questionContent.id} type="text" name={questionContent.id}
						placeholder={`answer for (${index+1})`}
						className="input input-bordered w-full max-w-xs bg-white text-black"
						onChange={() => handleChange(questionContent.id, a)}
						disabled={quizContext.isSubmit.get()}
					/>
				</label>

				{quizContext.isSubmit.get() && state.answers.get().includes(a) && (
					<Image src={state.answers.get() ? trueIcon : falseIcon} width={24} height={24} alt="correct icon" />
				)}
			</div>
		)}
	</div>
})

export default InputGroup