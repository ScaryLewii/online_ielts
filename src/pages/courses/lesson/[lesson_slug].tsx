import { StateContext } from "@/components/common/layout";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import Breadcrumbs from "@/components/common/breadcrumbs";
import VideoBlock from "@/pages/writing/video";
import VocabularyBlock from "@/pages/writing/vocabulary";
import { ILesson } from "../../../components/types/types";

const LessonContent = () => {
	const router = useRouter()
	const context = useContext(StateContext)
    
	const [content, setContent] = useState<ILesson | null>(null)
	
	useEffect(() => {
		if (!context.lessons.get().length) {
			router.push("/study-route")
		}

        const lessonId = parseInt(router.asPath.split("/").pop() || "0")
		const fetchLessonContent = () => {
			context.lessons.get().map((lesson: ILesson) => {
				if (lesson.id === lessonId) {
					setContent(lesson)
				}
			})
		};

		fetchLessonContent();
	}, [content, context.lessons, router, router.asPath]);

	return <>
		{content?.name && <Breadcrumbs title={content.name} />}
		{content?.videoUrl && <VideoBlock url={content.videoUrl} /> }
		{content?.id && <VocabularyBlock lessonId={content.id} />}
	</>
}

export default LessonContent