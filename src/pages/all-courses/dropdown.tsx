import arrow3 from "public/images/arrow-3.svg"
import nextArrow from "public/images/next-2.svg"
import { CSSProperties, useEffect, useState } from "react"
import { ReactSVG } from "react-svg"

const CourseDropdown = ({number, activeColor, handleClick, handleItemClick, text1, text2, iconSrc} : 
	{
		number?: number,
		activeColor: string,
		handleClick?: any,
		handleItemClick?: any,
		text1: string,
		text2: string,
		iconSrc: string
}) => {
	const [isActive, setIsActive] = useState(false)
	const [activeStyles, setActiveStyles] = useState<CSSProperties>({
		background: "#fff",
		color: activeColor
	})

	const [activeSVGStyles, setActiveSVGStyles] = useState<CSSProperties>({
		background: activeColor,
		fill: "#fff"
	})

	useEffect(() => {
		if(isActive) {
			setActiveStyles({
				background: activeColor,
				color: "#fff",
			})

			setActiveSVGStyles({
				background: "#fff",
				fill: activeColor
			})
		}
	}, [activeColor, handleItemClick, isActive])

	return (
		<>
		<button className="flex items-center justify-between w-full rounded-[16px] p-[20px]"
			style={activeStyles}
			onClick={() => {setIsActive(true);}}
		>
			<div className="flex items-center">
				<div className="w-[60px] h-[60px] rounded-[16px] flex items-center justify-center"
					style={activeSVGStyles}
				>
					<ReactSVG src={iconSrc} />
				</div>
				<div className="flex flex-col gap-[10px] text-left items-start ml-[20px] text-sea">
					<span className="font-semibold">{text1}</span>
					<span className="italic">{number} {text2}</span>
				</div>
			</div>
			<ReactSVG src={nextArrow["src"]} className={`${isActive && "rotate-90"}`} />
		</button>

		{isActive && !!handleItemClick && (
			<button onClick={() => handleItemClick?.()} className="flex justify-between items-center p-[20px] text-[16px] font-bold rounded-[16px] border border-[#F4754C]">
				<span>Real IELTS on video</span>
				<ReactSVG src={arrow3["src"]} className="fill-none" />
			</button>
		)}
		</>
	)
}

export default CourseDropdown