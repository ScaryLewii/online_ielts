import { FC } from "react";
import ReactPlayer from "react-player/lazy";

interface IPlayer {
	playerRef: any
}

const VideoPlayer: FC<IPlayer> = ({ playerRef }) => {
	return (
		<ReactPlayer
			ref={playerRef}
			url="//s3.envoy.rocks/bothrs/goud-design-sprint/goud/LhgEcS_GOUD+PROTOTYPE+SHOWCASE.mp4"
			className="react-player"
			controls
			width="100%"
			height="100%"
		/>
	);
}

export default VideoPlayer