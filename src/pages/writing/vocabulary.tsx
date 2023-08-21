import { getHeaderAuth } from "@/base/base"
import UpdateBlock from "@/components/common/update"
import { IWord } from "@/types/types"
import { observer, useObservable } from "@legendapp/state/react"
import { fetchData } from "@/base/base"
import { nanoid } from "nanoid"

interface IVocabulary {
	lessonId: number
}

const VocabularyBlock = observer(({lessonId}: IVocabulary) => {
	const state = useObservable({
		data: [],
		token: ""
	} as unknown as {
		data: IWord[],
		token: string
	})

	state.token.set((typeof window !== "undefined" && localStorage.getItem("token")) || "0")
	fetchData(`vocabularies/lesson/${lessonId}`, state.token.get(), "GET")
		.then(words => state.data.set(words ? words.data : {}))

	return <div className="bg-dark p-5">
		<h3 className="text-lg text-light font-semibold flex items-center gap-3 mb-5">
			<span className="block h-7 w-2 bg-light"></span>
			Video vocabulary
		</h3>

		{state.data.get().map(word => 
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
						</div>
					)}
				</div>
				{/* <span className="py-1 px-3 border border-cyan text-cyan rounded-md">{word.level}</span> */}
			</div>
		)}
	</div>
})

export default VocabularyBlock