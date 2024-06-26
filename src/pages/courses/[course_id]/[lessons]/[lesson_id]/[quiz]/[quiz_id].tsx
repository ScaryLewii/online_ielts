import { useQuizQueryByID } from "@/base/query";
import Breadcrumbs from "@/components/common/breadcrumbs";
import { GlobalContext, QuizContext } from "@/context/context";
import CheckboxGroup from "@/pages/practice/checkbox-group";
import InputGroup from "@/pages/practice/input-group";
import RadioGroup from "@/pages/practice/radio-group";
import { IAnswer, IQuestion, IQuiz } from "@/types/types";
import { observer, useObservable } from "@legendapp/state/react";
import { nanoid } from "nanoid";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import QuizNav from "../../../../../quiz/quiz-nav";
import { BrowserView, MobileView } from "react-device-detect";
import MobileBreadcrumbs from "@/components-mobile/common/breadcrumbs";

interface IQuizContent {
	id: string,
	title: string
	questions: IQuestion[]
	answers: IAnswer[]
	userAnswers: IQuestion[]
	isSubmit: boolean
}

const QuizContent = observer(function Component() {
	const router = useRouter();
	const context = useContext(GlobalContext)
	const quizId = router.query.quiz_id as string
	const quiz = useQuizQueryByID(quizId, context.cookies.get()).data as IQuiz

	const state = useObservable({	
		id: "",
		title: "",
		questions: [],
		answers: [],
		userAnswers: [],
		isSubmit: false
	} as unknown as IQuizContent)

	useEffect(() => {
		if (!quiz) {
			return
		}

		const content = JSON.parse(quiz?.content)
		state.questions.set(content)
		state.title.set(quiz.title)
	
		const answers: any = []
		content.map((c: IQuestion) => {
			const _answers = c.answers.filter(a => a.right)
			answers.push({
				id: c.id,
				content: _answers
			})
		})
		state.answers.set(answers)
	}, [quiz, router, state.answers, state.questions, state.title])

	return <>
		<BrowserView>
			<Breadcrumbs title="" />
		</BrowserView>
		<MobileView>
			<MobileBreadcrumbs title="Quay lại" isSubMenu />
		</MobileView>
		
		<div className="p-5 lg:pt-0 xl:px-10 xl:pb-5">
			<h1 className="text-black-mb dark:text-white font-semibold text-2xl" data-id={quizId}>{state.title.get()}</h1>
		</div>
		<QuizContext.Provider value={state}>
			<div className="p-5 xl:p-10 xl:pt-0 relative z-[1]">
				{state.questions.get().map((c: IQuestion, index) =>
					<div key={index}>
						{c.type === "SingleChoice" && <RadioGroup key={nanoid()} questionContent={c} />}
						{c.type === "MutipleChoice" && <CheckboxGroup key={nanoid()} questionContent={c} />}
						{c.type === "FillTheBlank" && <InputGroup key={nanoid()} questionContent={c} />}
					</div>
				)}
			</div>
			<QuizNav id={quizId} content={state.questions.get()} />
		</QuizContext.Provider>
	</>
})

export default QuizContent