import { fetchData, postData } from "@/base/base";
import { useValidToken } from "@/base/query";
import { GlobalContext } from "@/context/context";
import { observer, useObservable } from "@legendapp/state/react";

import { useContext } from "react";
import ReactPlayer from "react-player/lazy";

interface IPlayer {
	playerRef: any,
	video: string,
	isPlaying: boolean,
	lessonId: number
}

const VideoPlayer = observer(({ playerRef, video, isPlaying, lessonId }: IPlayer) => {
	const token = useValidToken().data as string
	const handleLessonStart = () => {
		postData("user/course", token, {"lessonId": lessonId, "progress": 0}).then(res => console.log(res))
	}
	const handleLessonFinish = () => {
		postData("user/course", token, {"lessonId": lessonId, "progress": 100}).then(res => console.log(res))
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
				onStart={() => handleLessonStart()}
				onEnded={() => handleLessonFinish()}
			/>
		</div>
	);
})

export default VideoPlayer