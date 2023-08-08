import { observer, useObservable } from "@legendapp/state/react";
import ReactPlayer from "react-player/lazy";

interface IPlayer {
	playerRef: any,
	video: string,
	isPlaying: boolean
}

const VideoPlayer = observer(({ playerRef, video, isPlaying }: IPlayer) => {
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
			/>
		</div>
	);
})

export default VideoPlayer