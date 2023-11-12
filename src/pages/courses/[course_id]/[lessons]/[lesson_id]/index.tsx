import { useLessonsQuery } from "@/base/query";
import Breadcrumbs from "@/components/common/breadcrumbs";
import { GlobalContext } from "@/context/context";
import VideoBlock from "@/pages/writing/video";
import VocabularyBlock from "@/pages/writing/vocabulary";
import { ILesson } from "@/types/types";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

const LessonContent = () => {
	const router = useRouter()
	const context = useContext(GlobalContext)
	const [content, setContent] = useState<ILesson | null>(null)

	const courseId = router.query.course_id as string
	const lessonsId = router.query.lesson_id as string
	const lessons = useLessonsQuery(+courseId, context.cookies.get()).data as ILesson[]

	useEffect(() => {
		lessons?.map((lesson: ILesson) => {
			if (lesson?.id === +lessonsId) {
				setContent(lesson)
			}
		})
	}, [lessons, lessonsId])

	return <>
		{content?.name && <Breadcrumbs title={content.name} />}
		<div className="p-5 pt-0 xl:px-10 xl:pb-5">
			{content?.videoUrl && <VideoBlock url={content.videoUrl} /> }
			{content?.id && <VocabularyBlock lessonId={content.id} />}
		</div>
	</>
}

export default LessonContent