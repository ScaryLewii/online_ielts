const RadioGroup = () => {
	return <div data-type="radio-group" className="text-white mb-5" style={{"--tw-border-opacity": 1} as React.CSSProperties}>
		<h4 className="mb-3"><b>Question 1:</b> If it is your first time seeing a counsellor</h4>
		<div className="form-control mb-3">
			<label className="label cursor-pointer justify-start gap-3">
				<span>A.</span>
				<input type="radio" name="radio-10" className="radio radio-info checked:bg-cyan border-2" checked />
				<span>Red pill</span> 
			</label>
		</div>
		<div className="form-control mb-3">
			<label className="label cursor-pointer justify-start gap-3">
				<span>B.</span>
				<input type="radio" name="radio-10" className="radio radio-info checked:bg-cyan border-2" checked />
				<span>Blue pill</span> 
			</label>
		</div>
	</div>
}

export default RadioGroup