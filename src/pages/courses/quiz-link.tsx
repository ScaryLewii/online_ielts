import { useQuizsQuery } from "@/base/query"
import { ILesson, IQuiz } from "@/types/types"
import { nanoid } from "nanoid"
import Link from "next/link"
import examIcon from "../../../public/images/exam-white.svg"
import Image from "next/image"

interface IQuizLink {
	lessonId: number,
	courseId: number
}

const QuizLink = ({lessonId, courseId} : IQuizLink) => {
	const allQuizs = useQuizsQuery(lessonId).data as IQuiz[]
	const quiz = allQuizs ? allQuizs[0] : null
	
	return <>
		{quiz &&
			<li key={nanoid()} data-quiz-id={quiz.id} className="list-none flex items-center justify-between pl-10 pr-3">
				<Link href={`/courses/${courseId}/lessons/${lessonId}/quiz/${quiz.id}`}
					className="flex items-center gap-5 my-2">
						<Image src={examIcon} width={24} height={24} alt="quiz" />
						{quiz.title}
				</Link>
			</li>
		}
	</>
}

export default QuizLink