import { IChapterDetail, ICourseDetail, ILessonDetail, IQuizDetail, IUser } from '@/types/types'
import Image from 'next/image'
import { MouseEventHandler, useContext, useState } from 'react'
import Link from 'next/link'
import { ReactSVG } from 'react-svg'
import lock from "public/images/lock-icon.svg"
import playIcon from "public/images/play.svg"
import examIcon from "public/images/exam-white.svg"
import exam from "public/images/contract.svg"
import { GlobalContext } from '@/context/context'
import AlertModal from '../common/alert-modal'
import ChevronIcon from '../icons/chevron'
import PlayIcon from '../icons/play'
import ExamIcon from '../icons/exam'

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
    <div className="text-black-mb dark:text-white" data-video={item?.introVideo}>
      <button className="mb-5 cursor-pointer">
        <h3 className="font-semibold text-black-mb dark:text-cyan">{item?.name}</h3>
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
			${isExpanded && "border-black-mb dark:bg-dark dark:border-white border pr-3"}
		`}>
        <button data-id={item.id} className="flex gap-2 lg:gap-4 text-left" onClick={onToggleChapter}>
          <span className="flex-grow-[24px]">
            <ChevronIcon />
          </span>
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
  const context = useContext(GlobalContext)
  const userInfo = context.userInfo?.get()
  const [errorMessage, setErrorMessage] = useState<string>()

  const clearError = () => {
    setErrorMessage(undefined)
  }

  const onLessonClick: MouseEventHandler<HTMLAnchorElement> = (e) => {
    if(!userInfo?.id){
      setErrorMessage("Bạn cần phải đăng nhập để tiếp tục sử dụng tính năng này")
      e.preventDefault()
      return
    }
    if(item.isLocked){
      setErrorMessage("Bạn cần nâng cấp tài khoản để tiếp tục sử dụng tính năng này")
      e.preventDefault()
      return
    }
  }
  return (
    <>
      <li data-lesson-id={item.id} data-video={item.videoUrl} className="list-none flex items-center justify-between pl-10 pr-3">
        <Link href={`/courses/${item.courseId}/lessons/${item.id}`}
          onClick={onLessonClick}
          className="flex items-center gap-5 my-2 text-black-mb dark:text-white">
          {item.type === 'video' ?
            <PlayIcon /> : <ExamIcon />
          }
          {item.name}
          {item.isLocked && <ReactSVG src={lock["src"]} />}
        </Link>
        {errorMessage && <AlertModal type="ROOM_FULL" message={errorMessage} onClose={clearError} />}
      </li>
      {item?.quizzes?.map(q => <QuizDetail key={q.id} item={q} courseId={item.courseId} />)}
    </>
  )
}

const QuizDetail = ({ item, courseId, }: IQuizDetailProps) => {
  return (
    <li data-quiz-id={item.id} className="list-none flex items-center justify-between pl-10 pr-3">
				<Link href={`/courses/${courseId}/lessons/${item.lessonId}/quiz/${item.id}`}
					className="flex items-center gap-5 my-2 text-black-mb dark:text-white">
						<ExamIcon />
						{item.title}
				</Link>
			</li>
  )
}

export default CourseDetail
