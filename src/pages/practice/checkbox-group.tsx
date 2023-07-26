const CheckboxGroup = () => {
	return <div data-type="radio-group" className="text-white mb-5" style={{"--tw-border-opacity": 1} as React.CSSProperties}>
		<h4 className="mb-3"><b>Question 1:</b> If it is your first time seeing a counsellor</h4>
		<div className="form-control mb-3">
			<label className="label cursor-pointer justify-start gap-3">
				<span>A.</span>
				<input type="checkbox" className="checkbox checkbox-info border-2" />
				<span>Red pill</span> 
			</label>
		</div>
		<div className="form-control mb-3">
			<label className="label cursor-pointer justify-start gap-3">
				<span>B.</span>
				<input type="checkbox" className="checkbox checkbox-info border-2" />
				<span>Blue pill</span> 
			</label>
		</div>
	</div>
}

export default CheckboxGroup