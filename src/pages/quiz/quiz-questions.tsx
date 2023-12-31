import { QuizContext } from '@/context/context';
import { IQuestion } from '@/types/types';
import { observer, useObservable } from '@legendapp/state/react';
import { nanoid } from 'nanoid';
import { useContext } from 'react';
import * as Scroll from 'react-scroll';
import CheckboxGroup from '../practice/checkbox-group';
import InputGroup from '../practice/input-group';
import RadioGroup from '../practice/radio-group';

interface QuizQuestionsContent {
	content: IQuestion[]
}

const QuizQuestions = observer(({content}: QuizQuestionsContent) => {
	const quizContext = useContext(QuizContext)
	
	const state = useObservable({
		warning: false,
		userAnswer: []
	})

	if (quizContext.userAnswers?.get()) {
		state.userAnswer.set(quizContext.userAnswers?.get())
	}

	const CustomLink = Scroll.Link

	return <div className="p-5 xl:p-10 xl:pt-0 relative z-[1]">
		<div className="flex flex-wrap gap-2 mb-5">
			{content?.map((c: IQuestion, index) => 
				<div key={index}>
					{c.type === "SingleChoice" && <RadioGroup key={nanoid()} questionContent={c} />}
					{c.type === "MutipleChoice" && <CheckboxGroup key={nanoid()} questionContent={c} />}
					{c.type === "FillTheBlank" && <InputGroup key={nanoid()} questionContent={c} />}
				</div>
			)}
		</div>
	</div>
})

export default QuizQuestions
