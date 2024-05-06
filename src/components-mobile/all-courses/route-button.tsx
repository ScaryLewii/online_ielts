import Link from "next/link";
import nextArrow from "public/images/next-2.svg";
import { ReactSVG } from "react-svg";

interface IRouteButtun {
	label: string;
	description: string;
	href: string;
	iconSrc: string;
	color: string;
}

const RouteButton = ({label, description, href, iconSrc, color}: IRouteButtun) => {
	return (
		<Link className="flex items-center justify-between w-full rounded-[16px] p-[20px] bg-white"
			href={href}
		>
			<div className="flex items-center">
				<div className={`w-[60px] h-[60px] rounded-[16px] flex items-center justify-center bg-[${color}] fill-white`}>
					<ReactSVG src={iconSrc} />
				</div>
				<div className="flex flex-col text-left items-start ml-[20px] text-sea">
					<span className="font-semibold">{label}</span>
					<span className="italic">{description}</span>
				</div>
			</div>
			<ReactSVG src={nextArrow["src"]} />
		</Link>
	)
}

export default RouteButton;