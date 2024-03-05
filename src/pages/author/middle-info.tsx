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
			<div className="flex gap-10 mt-[90px] text-white">
				<div className="w-[150px]">
					<ReactSVG src={info['src']} />
					<span>THÔNG TIN</span>
				</div>

				<div dangerouslySetInnerHTML={{__html: description}}></div>
			</div>

			<div className="flex gap-10 mt-[40px] text-white">
				<div className="w-[150px]">
					<ReactSVG src={quoteIcon['src']} />
					<span>CHÂM NGÔN</span>
				</div>

				<div dangerouslySetInnerHTML={{__html: quote}}></div>
			</div>
		</>
	)
}

export default MiddleInfo