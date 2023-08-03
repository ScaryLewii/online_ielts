import { IAnswer, IQuestion } from "@/components/types/types"
import { nanoid } from "nanoid"
import { FC } from "react"

interface IRadioGroup {
	questionContent: IQuestion
}

const RadioGroup: FC<IRadioGroup> = ({ questionContent }) => {
	return <div data-type="radio-group" className="text-white mb-5" style={{"--tw-border-opacity": 1} as React.CSSProperties}>
		<h4 className="mb-3 font-semibold">{questionContent?.title}</h4>
		{questionContent?.answers.map(a =>
			<div key={nanoid()} className="form-control mb-3">
				<label className="label cursor-pointer justify-start gap-3">
					<input type="radio" name="radio-10" className="radio radio-info border-2" />
					<span>{a.content}</span> 
				</label>
			</div> 
		)}
	</div>
}

export default RadioGroup