import { ReactSVG } from "react-svg"
import info from "public/images/info.svg"
import quoteIcon from "public/images/quote.svg"

const MiddleInfo = ({
	description,
	quote
}: {
	description: string | TrustedHTML
	quote: string
}) => {
	return (
		<>
			<div className="flex gap-5 lg:gap-10 mt-10 lg:mt-[90px] text-black-mb dark:text-white">
				<div className="w-[150px]">
					<ReactSVG src={info['src']} />
					<span>Thông tin</span>
				</div>

				<div dangerouslySetInnerHTML={{__html: description}}></div>
			</div>

			<div className="flex gap-5 lg:gap-10 mt-10 text-black-mb dark:text-white">
				<div className="w-[150px]">
					<ReactSVG src={quoteIcon['src']} />
					<span>Châm ngôn</span>
				</div>

				<div dangerouslySetInnerHTML={{__html: quote}}></div>
			</div>
		</>
	)
}

export default MiddleInfo