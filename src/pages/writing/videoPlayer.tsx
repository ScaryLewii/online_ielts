import { postData } from "@/base/base";
import { useSubtitleQuery } from "@/base/query";
import { GlobalContext, SubtitleContext } from "@/context/context";
import { ISubtitle, IVideoProgessData } from "@/types/types";
import { observer } from "@legendapp/state/react";

import { useContext } from "react";
import ReactPlayer from "react-player/lazy";

interface IPlayer {
	playerRef: any,
	video: string,
	isPlaying: boolean,
	lessonId: number
}

const VideoPlayer = observer(({ playerRef, video, isPlaying, lessonId }: IPlayer) => {
	const context = useContext(GlobalContext)
	const subtitleContext = useContext(SubtitleContext)
	const subtitles = useSubtitleQuery(+lessonId, context.cookies.get()).data as ISubtitle[]

	const handleLessonStart = () => {
		postData("user/course", context.cookies.get(), {"lessonId": lessonId, "progress": 0}).then(res => console.log(res))
	}
	const handleLessonFinish = () => {
		postData("user/course", context.cookies.get(), {"lessonId": lessonId, "progress": 100}).then(res => console.log(res))
	}

	const handleShowSubtitles = (data: IVideoProgessData) => {
		if (!subtitles) {
			return
		}

		subtitles.map(s => {
			if (+data.playedSeconds.toFixed(0) >= s.startAt &&
				+data.playedSeconds.toFixed(0) <= s.endAt
			) {
				subtitleContext.set(s.content)
				return
			}

			subtitleContext.set("")
		})
		console.log(data.playedSeconds.toFixed(0))
	}

	const tempVideo = "//s3.envoy.rocks/bothrs/goud-design-sprint/goud/LhgEcS_GOUD+PROTOTYPE+SHOWCASE.mp4"
	return (
		<div className="relative pt-[56.25%]">
			<ReactPlayer
				ref={playerRef}
				url={video || tempVideo}
				className="react-player absolute top-0 left-0"
				controls
				width="100%"
				height="100%"
				playing={isPlaying}
				onProgress={data => handleShowSubtitles(data)}
				onStart={() => handleLessonStart()}
				onEnded={() => handleLessonFinish()}
			/>
		</div>
	);
})

export default VideoPlayer