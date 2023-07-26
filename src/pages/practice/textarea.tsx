const TextAreaBox = () => {
	return <div data-type="textarea" className="text-white">
		<label htmlFor="textarea">
			<b>Question 20: Write about the following topic:</b>
			<p>Some people think that a sense of competition in children should be encouraged. Others believe that children who are taught to co-operate rather than compete become more useful adults.</p>
		</label>
		<textarea name="textarea" placeholder="Write your answer here..." className="textarea textarea-bordered textarea-lg w-full bg-transparent text-base border border-white mt-5 h-[200px]" ></textarea>
	</div>
}

export default TextAreaBox