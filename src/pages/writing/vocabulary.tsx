const data = [
	{
		text: "alternative",
		spelling: "US /ɔlˈtɚnətɪv, æl-/・UK /ɔ:lˈtɜ:nətɪv/",
		level: "C1",
		definition: [
			{
				objective: "Noun",
				description: "Something different you can choose"
			},
			{
				objective: "Adjecitve",
				description: "A different choice"
			},
		]
	},
	{
		text: "alternative",
		spelling: "US /ɔlˈtɚnətɪv, æl-/・UK /ɔ:lˈtɜ:nətɪv/",
		level: "C1",
		definition: [
			{
				objective: "Noun",
				description: "Something different you can choose"
			},
			{
				objective: "Adjecitve",
				description: "A different choice"
			},
		]
	}
]

const VocabularyBlock = () => {
	return <div className="bg-dark p-5">
		<h3 className="text-lg text-light font-semibold flex items-center gap-3 mb-5">
			<span className="block h-7 w-2 bg-light"></span>
			Video vocabulary
		</h3>
		{data.map((word, index) => 
			<div key={`voc-${index}`} className="flex justify-between items-start px-5 py-10 border-t border-white first-of-type:border-0 text-white">
				<div>
					<h5 className="flex items-center gap-8 mb-10">
						<span className="text-cyan font-semibold text-[22px]">{word.text}</span>
						<span>{word.spelling}</span>
					</h5>
					<div>
						{word.definition.map((def, index) => 
							<div key={`def-${def.objective}-${index}`}>
								<p className="underline">{def.objective}</p>
								<ul>
									<li>{def.description}</li>
								</ul>
							</div>
						)}
					</div>
				</div>
				<span className="py-1 px-3 border border-cyan text-cyan rounded-md">{word.level}</span>
			</div>
		)}
	</div>
}

export default VocabularyBlock