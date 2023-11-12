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

	const lessonId = parseInt(router.asPath.split("/").pop() || "0")
	const lessons = useLessonsQuery(lessonId, context.cookies.get())

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