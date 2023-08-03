import { IAnswer, IQuestion } from "@/components/types/types"
import { nanoid } from "nanoid"
import { FC } from "react"

interface ICheckboxGroup {
	questionContent: IQuestion
}

const CheckboxGroup: FC<ICheckboxGroup> = ({ questionContent }) => {
	return <div data-type="radio-group" className="text-white mb-5" style={{"--tw-border-opacity": 1} as React.CSSProperties}>
		<h4 className="mb-3 font-semibold">{questionContent?.title}</h4>
		{questionContent?.answers.map(a =>
			<div key={nanoid()} className="form-control mb-3">
				<label className="label cursor-pointer justify-start gap-3">
					<input type="checkbox" data-correct={a.right} className="checkbox checkbox-info border-2" />
					<span>{a.content}</span> 
				</label>
			</div> 
		)}
	</div>
}

export default CheckboxGroup