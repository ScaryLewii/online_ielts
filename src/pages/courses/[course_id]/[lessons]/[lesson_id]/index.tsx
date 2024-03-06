import { useLessonDetailQuery } from "@/base/query";
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

	const courseId = router.query.course_id as string
	const lessonsId = router.query.lesson_id as string

	const lesson = useLessonDetailQuery(+lessonsId, context.cookies.get()).data as ILesson

	return <>
		{lesson?.name && <Breadcrumbs title={lesson.name} />}
		<div className="p-5 pt-0 xl:px-10 xl:pb-5">
			{lesson?.videoUrl && <VideoBlock url={lesson.videoUrl} /> }
			{lesson?.id && <VocabularyBlock lessonId={lesson.id} />}
		</div>
	</>
}

export default LessonContent