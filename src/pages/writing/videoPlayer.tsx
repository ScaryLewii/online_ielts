import { FC } from "react";
import ReactPlayer from "react-player/lazy";

interface IPlayer {
	playerRef: any,
	video: string | undefined
}

const VideoPlayer: FC<IPlayer> = ({ playerRef, video }) => {
	const tempVideo = "//s3.envoy.rocks/bothrs/goud-design-sprint/goud/LhgEcS_GOUD+PROTOTYPE+SHOWCASE.mp4"
	return (
		<ReactPlayer
			ref={playerRef}
			url={video || tempVideo}
			className="react-player"
			controls
			width="100%"
			height="100%"
		/>
	);
}

export default VideoPlayer