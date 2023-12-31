import { postData } from '@/base/base';
import { GlobalContext, QuizContext } from '@/context/context';
import { IQuestion } from '@/types/types';
import { observer, useObservable } from '@legendapp/state/react';
import { nanoid } from 'nanoid';
import Image from 'next/image';
import { useContext } from 'react';
import * as Scroll from 'react-scroll';
import plane from "../../../public/images/plane.svg";
import repeatIcon from "../../../public/images/repeat.svg";

interface QuizNavContent {
	id: string
	content: IQuestion[]
}

const QuizNav = observer(({id, content}: QuizNavContent) => {
	const context = useContext(GlobalContext)
	const quizContext = useContext(QuizContext)
	
	const state = useObservable({
		warning: false,
		userAnswer: []
	})

	if (quizContext.userAnswers?.get()) {
		state.userAnswer.set(quizContext.userAnswers?.get())
	}

	const handleSubmit = () => {
		// debug
		// quizContext.isSubmit.set(true)
		if (quizContext.answers.get().length === quizContext.userAnswers.get().length) {
			quizContext.isSubmit.set(true)

			postData("quizzes/submit", context.cookies.get(), {
				id: id,
				quizId: id,
				content: JSON.stringify(quizContext.userAnswers.get()),
				timeDone: 0
			})
			return
		}

		state.warning.set(true)
	}

	const handleReset = () => {
		quizContext.isSubmit.set(false)
	}

	const handleCloseToast = () => {
		state.warning.set(false)
		quizContext.isSubmit.set(false)
	}

	const CustomLink = Scroll.Link

	return <div className="sticky bottom-0 -left-14 -right-14 z-[2]">
		<div className="p-5 xl:px-10 bg-gray-600">
			{/* <div className="flex gap-[10px] items-center mb-10">
				<Image src={clock} width={24} height={24} alt="clock" />
				<p>07 : 12 : 00</p>
			</div> */}

			<div className="flex flex-wrap gap-2 mb-5">
				{content?.map((item: IQuestion, index) => 
					<CustomLink to={item.id} key={nanoid()}
						smooth={true} offset={-100} duration={500}
						className={`
							inline-flex w-7 h-7 rounded-full border-2 border-white font-semibold text-sm justify-center items-center hover:bg-cyan hover:text-sea
							${state.userAnswer.get().some((a: IQuestion) => a.id === item.id) ? "bg-cyan text-black" : ""}
						`}>
								{++index}
					</CustomLink>
				)}
			</div>

			{!quizContext.isSubmit?.get() &&
				<button className={`
						flex gap-[10px] py-2 px-5 border border-white font-semibold text-white rounded-md items-center hover:bg-sea cursor-pointer
					`}
					data-sumit={id}
					onClick={() => handleSubmit()}
					disabled={quizContext.isSubmit?.get() ? true : false}
				>
					<Image src={plane} width={17} height={14} alt="submit" />
					Submit
				</button>
			}

			{quizContext.isSubmit?.get() &&
				<button className={`
						flex gap-[10px] py-2 px-5 border border-white font-semibold text-white rounded-md items-center hover:bg-sea cursor-pointer
					`}
					onClick={() => handleReset()}
					disabled={!quizContext.isSubmit?.get() ? true : false}
				>
					<Image src={repeatIcon} width={24} height={24} alt="repeat" />
					Làm lại
				</button>
			}
		</div>

		{state.warning.get() && (
			<div className="toast toast-bottom toast-end cursor-pointer">
				<div className="alert alert-error relative">
					<span>Chưa hoàn thành hết các câu hỏi</span>
					<button className="absolute -top-[10px] -left-[10px] bg-white w-6 h-6 rounded-full flex items-center justify-center font-semibold"
						onClick={() => handleCloseToast()}>
							x
					</button>
				</div>
			</div>
		)}
	</div>
})

export default QuizNav
