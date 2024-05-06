import { Fragment, ReactNode, useState } from "react";

interface ITab {
	label: string;
	panel: ReactNode;
}

const Tabs = ({data}: {
	data: ITab[]
}) => {
	const [activeIndex, setActiveIndex] = useState(0);

	return (
		<>
		<div className="flex items-center px-5 mt-3 border-b border-gray-600">
			{data.map((item: ITab, index) => 
				<button
					key={index}
					className={`
						py-[6px] px-3 border-b text-white
						${index === activeIndex ? 'border-white' : 'border-transparent opacity-50'}
					`}
					onClick={() => setActiveIndex(index)}
				>
						{item.label}
				</button>
			)}
		</div>

		<div className="px-5 mt-10">
			{data.map((item: ITab, index) => <Fragment key={index}>{index === activeIndex && item.panel}</Fragment>)}
		</div>
		</>
	)
}

export default Tabs;