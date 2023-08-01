import { FC } from "react";
import ReactPlayer from "react-player/lazy";
import { IVideo } from "./video";

interface IPlayer {
	playerRef: any,
	video: string
}

const VideoPlayer: FC<IPlayer> = ({ playerRef, video }) => {
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
			/>
		</div>
	);
}

export default VideoPlayer