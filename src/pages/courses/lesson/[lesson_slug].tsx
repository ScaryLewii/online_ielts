import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import Breadcrumbs from "@/components/common/breadcrumbs";
import VideoBlock from "@/pages/writing/video";
import VocabularyBlock from "@/pages/writing/vocabulary";
import { ILesson } from "@/types/types";
import { GlobalContext, tokenAPI } from "@/context/context";
import { useLessonsQuery, useValidToken } from "@/base/query";

const LessonContent = () => {
	const router = useRouter()
	const context = useContext(GlobalContext)
    
	const [content, setContent] = useState<ILesson | null>(null)
	const saveToken = useValidToken().data as string

	const lessonId = parseInt(router.asPath.split("/").pop() || "0")
	const lessons = useLessonsQuery(lessonId, saveToken)

	useEffect(() => {
		const getLessonContent = () => {
			context.lessons.get().map((lesson: ILesson) => {
				if (lesson?.id === lessonId) {
					setContent(lesson)
				}
			})
		}

		if (context.lessons.get().length) {
			getLessonContent();
			return
		}

		if (!context.lessons.get().length) {
			router.push("/study-route");
		}
	}, [context.lessons, lessonId, lessons.data, router])

	return <>
		{content?.name && <Breadcrumbs title={content.name} />}
		<div className="p-5 pt-0 xl:px-10 xl:pb-5">
			{content?.videoUrl && <VideoBlock url={content.videoUrl} /> }
			{content?.id && <VocabularyBlock lessonId={content.id} />}
		</div>
	</>
}

export default LessonContent