import { getSession } from "next-auth/react"
import route from "../../../public/images/route.svg"
import { ReactSVG } from "react-svg"
import icon1 from "../../../public/dump/icon-1.svg"
import icon2 from "../../../public/dump/icon-2.svg"
import icon3 from "../../../public/dump/icon-3.svg"
import icon4 from "../../../public/dump/icon-4.svg"

const Route = () => {
	return <div className="relative">
		<ReactSVG src={route['src']} />
		<div className="absolute cursor-pointer group top-[45px] left-[250px]">
			<h3 className="text-light font-semibold text-[22px] group-hover:text-cyan">Kick-off (0 - 2.0)</h3>
			<div className="flex items-center gap-2 mt-5 opacity-0 group-hover:opacity-100">
				<button className="px-5 py-2 border border-[#51C84E] rounded-full inline-flex gap-2 items-center">
					<ReactSVG src={icon1["src"]} width={24} height={24} />
					Lý thuyết
				</button>
				<button className="px-5 py-2 border border-[#51C84E] rounded-full inline-flex gap-2 items-center">
					<ReactSVG src={icon2["src"]} width={24} height={24} />
					Luyện tập
				</button>
				<button className="px-5 py-2 border border-[#51C84E] rounded-full inline-flex gap-2 items-center">
					<ReactSVG src={icon3["src"]} width={24} height={24} />
					Ứng dụng
				</button>
			</div>
		</div>

		<div className="absolute cursor-pointer group top-[285px] left-[100px] flex flex-col items-end">
			<h3 className="text-[#53CBED] font-semibold text-[22px] group-hover:text-cyan">Speed-up (2.0 - 3.5)</h3>
			<div className="flex items-center gap-2 mt-5 opacity-0 group-hover:opacity-100">
				<button className="px-5 py-2 border border-[#51C84E] rounded-full inline-flex gap-2 items-center">
					<ReactSVG src={icon1["src"]} width={24} height={24} />
					Lý thuyết
				</button>
				<button className="px-5 py-2 border border-[#51C84E] rounded-full inline-flex gap-2 items-center">
					<ReactSVG src={icon2["src"]} width={24} height={24} />
					Luyện tập
				</button>
				<button className="px-5 py-2 border border-[#51C84E] rounded-full inline-flex gap-2 items-center">
					<ReactSVG src={icon3["src"]} width={24} height={24} />
					Ứng dụng
				</button>
			</div>
		</div>

		<div className="absolute cursor-pointer group top-[520px] left-[200px]">
			<h3 className="text-[#FF64AE] font-semibold text-[22px] group-hover:text-cyan">Modest (3.5 - 5.0)</h3>
			<div className="flex items-center gap-2 mt-5 opacity-0 group-hover:opacity-100">
				<button className="px-5 py-2 border border-[#51C84E] rounded-full inline-flex gap-2 items-center">
					<ReactSVG src={icon1["src"]} width={24} height={24} />
					Lý thuyết
				</button>
				<button className="px-5 py-2 border border-[#51C84E] rounded-full inline-flex gap-2 items-center">
					<ReactSVG src={icon2["src"]} width={24} height={24} />
					Luyện tập
				</button>
				<button className="px-5 py-2 border border-[#51C84E] rounded-full inline-flex gap-2 items-center">
					<ReactSVG src={icon3["src"]} width={24} height={24} />
					Ứng dụng
				</button>
			</div>
		</div>

		<div className="absolute cursor-pointer group top-[765px] left-[80px] flex flex-col items-end">
			<h3 className="text-[#AFCD58] font-semibold text-[22px] group-hover:text-cyan">Fluent (5.0 - 6.5)</h3>
			<div className="flex items-center gap-2 mt-5 opacity-0 group-hover:opacity-100">
				<button className="px-5 py-2 border border-[#51C84E] rounded-full inline-flex gap-2 items-center">
					<ReactSVG src={icon1["src"]} width={24} height={24} />
					Lý thuyết
				</button>
				<button className="px-5 py-2 border border-[#51C84E] rounded-full inline-flex gap-2 items-center">
					<ReactSVG src={icon2["src"]} width={24} height={24} />
					Luyện tập
				</button>
				<button className="px-5 py-2 border border-[#51C84E] rounded-full inline-flex gap-2 items-center">
					<ReactSVG src={icon3["src"]} width={24} height={24} />
					Ứng dụng
				</button>
			</div>
		</div>

		<div className="absolute cursor-pointer group top-[1030px] left-[420px]">
			<h3 className="text-[#AE59F0] font-semibold text-[22px] group-hover:text-cyan">Fluent (5.0 - 6.5)</h3>
			<div className="flex items-center gap-2 mt-5 opacity-0 group-hover:opacity-100">
				<button className="px-5 py-2 border border-[#51C84E] rounded-full inline-flex gap-2 items-center">
					<ReactSVG src={icon1["src"]} width={24} height={24} />
					Lý thuyết
				</button>
				<button className="px-5 py-2 border border-[#51C84E] rounded-full inline-flex gap-2 items-center">
					<ReactSVG src={icon2["src"]} width={24} height={24} />
					Luyện tập
				</button>
			</div>
		</div>
	</div>
}

export default Route