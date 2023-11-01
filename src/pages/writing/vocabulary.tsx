import { IWord } from "@/types/types"
import { observer } from "@legendapp/state/react"
import { nanoid } from "nanoid"
import { useValidToken, useVocalbularyQuery } from "@/base/query"

interface IVocabulary {
	lessonId: number
}

const VocabularyBlock = observer(({lessonId}: IVocabulary) => {
	const token = useValidToken().data as string
	const vocabulary = useVocalbularyQuery(lessonId, token).data as IWord[]

	return <div className="bg-dark p-5">
		<h3 className="text-lg text-light font-semibold flex items-center gap-3 mb-5">
			<span className="block h-7 w-2 bg-light"></span>
			Video vocabulary
		</h3>

		{vocabulary?.map(word => 
			<div key={nanoid()} className="flex justify-between items-start px-5 py-10 border-t border-white first-of-type:border-0 text-white">
				<div>
					<h5 className="flex items-center gap-8 mb-5">
						<span className="text-cyan font-semibold text-[22px]">{word.word}</span>
						<span>{word.phonemes}</span>
					</h5>
					{word.vocabularyDefinitions.map(def => 
						<div key={nanoid()}>
							<p className="underline">{def.typeOfSpeech}</p>
							<ul>
								<li>{def.definition}</li>
							</ul>

							<p className="underline mt-5">Example sentence</p>
							<ul>
								<li>{def.exampleSentence}</li>
							</ul>
						</div>
					)}
				</div>
				{/* <span className="py-1 px-3 border border-cyan text-cyan rounded-md">{word.level}</span> */}
			</div>
		)}
	</div>
})

export default VocabularyBlock