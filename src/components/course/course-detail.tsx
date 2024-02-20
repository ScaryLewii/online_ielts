import { IChapterDetail, ICourseDetail, ILessonDetail, IQuizDetail } from '@/types/types'
import Image from 'next/image'
import { MouseEventHandler, useState } from 'react'
import Link from 'next/link'
import { ReactSVG } from 'react-svg'
import chevron from "../../../public/images/chevron.svg"
import lock from "public/images/lock-icon.svg"
import playIcon from "../../../public/images/play.svg"
import examIcon from "../../../public/images/exam-white.svg"
import exam from "../../../public/images/contract.svg"

interface ICourseDetailProps {
  item?: ICourseDetail
}

interface IChapterDetailProps {
  item: IChapterDetail
}

interface ILessonDetailProps {
  item: ILessonDetail
}

interface IQuizDetailProps {
  item: IQuizDetail
  courseId: number
}

const CourseDetail = ({ item }: ICourseDetailProps) => {
  return (
    <div className="text-white" data-video={item?.introVideo}>
      <button className="mb-5 cursor-pointer">
        <h3 className={`font-semibold text-cyan`}>{item?.name}</h3>
      </button>
      {item?.chapters?.map(chapter => <ChapterDetail key={chapter.id} item={chapter} />)}
    </div>
  )
}



const ChapterDetail = ({ item }: IChapterDetailProps) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false)

  const onToggleChapter = () => {
    setIsExpanded(!isExpanded)
  }
  return (
    <>
      <div className={`flex justify-between items-center mb-5 lg:px-3
			${isExpanded && "bg-dark border border-white pr-3"}
		`}>
        <button data-id={item.id} className="flex gap-2 lg:gap-4" onClick={onToggleChapter}>
          <Image src={chevron} width={24} height={24} alt="chevron" />
          {item.name}
        </button>
      </div>
      <ul className={`${isExpanded ? "block mb-5" : "hidden"}`}>
        {item?.lessons?.map(l =>
          <LessonDetail key={l.id} item={l} />
        )}
      </ul>
    </>)
}

const LessonDetail = ({ item }: ILessonDetailProps) => {
  const onLessonClick: MouseEventHandler<HTMLAnchorElement> = (e) => {
    if(item.isLocked){
      e.preventDefault()
    }
  }
  return (
    <>
      <li data-lesson-id={item.id} data-video={item.videoUrl} className="list-none flex items-center justify-between pl-10 pr-3">
          <Link href={`/courses/${item.courseId}/lessons/${item.id}`}
            onClick={onLessonClick}
            className="flex items-center gap-5 my-2">
            <Image src={item.type === "video" ? playIcon: exam} width={24} height={24} alt="video" />
            {item.name}
            {item.isLocked && <ReactSVG src={lock["src"]} />}
          </Link>
      </li>
      {item?.quizzes?.map(q => <QuizDetail key={q.id} item={q} courseId={item.courseId}/>)}
    </>
  )
}

const QuizDetail = ({ item, courseId, }: IQuizDetailProps) => {
  return (
    <li  data-quiz-id={item.id} className="list-none flex items-center justify-between pl-10 pr-3">
				<Link href={`/courses/${courseId}/lessons/${item.lessonId}/quiz/${item.id}`}
					className="flex items-center gap-5 my-2">
						<Image src={examIcon} width={24} height={24} alt="quiz" />
						{item.title}
				</Link>
			</li>
  )
}

export default CourseDetail
