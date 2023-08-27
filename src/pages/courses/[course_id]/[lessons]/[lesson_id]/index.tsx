import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Breadcrumbs from "@/components/common/breadcrumbs";
import VideoBlock from "@/pages/writing/video";
import VocabularyBlock from "@/pages/writing/vocabulary";
import { ILesson } from "@/types/types";
import { useLessonsQuery } from "@/base/query";

const LessonContent = () => {
	const router = useRouter()
	const [content, setContent] = useState<ILesson | null>(null)

	const courseId = router.query.course_id as string
	const lessonsId = router.query.lesson_id as string
	const lessons = useLessonsQuery(+courseId).data as ILesson[]

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