import { observer, useObservable } from "@legendapp/state/react"

import Image from "next/image"
import Link from "next/link";
import * as Scroll from 'react-scroll';
import logo from "../../../public/logo.svg"
import nav from "../../../public/nav.svg"

interface INav {
	title: string,
	href: string
}

const navData: INav[] = [
	{
		title: "VỀ CHÚNG TÔI",
		href: "about"
	},
	{
		title: "SỨ MỆNH",
		href: "mission"
	},
	{
		title: "PHƯƠNG PHÁP HỌC",
		href: "method"
	},
	{
		title: "GIẢNG VIÊN",
		href: "lecturer"
	},
	{
		title: "LIÊN HỆ",
		href: "contact"
	},
]

const HeaderSection = observer(function Component() {
	const state = useObservable({
		menuOpen: false,
	})

	const CustomLink = Scroll.Link

	return <header className="fixed top-0 left-0 w-full bg-sea bg-opacity-90 z-50">
		<nav className="flex items-center justify-between flex-wrap p-3 xl:p-6 text-white">
			<div className="flex items-center flex-shrink-0 mx-auto xl:mr-10">
				<CustomLink to="about" spy={true} smooth={true} offset={-100} duration={500}>
					<Image src={logo} width={73} height={63} alt="ielts video course logo" />
				</CustomLink>
			</div>
			<div className="block xl:hidden absolute top-5 left-0">
				<button className="flex items-center px-3 py-2" onClick={() => state.menuOpen.set(isOpen => !isOpen)}>
					<Image src={nav} width={23} height={23} alt="menu" />
				</button>
			</div>
			<div className={`w-full flex-grow xl:flex xl:items-center xl:w-auto p-5 xl:p-0 bg-slate-600 xl:bg-transparent ${state.menuOpen.get() ? "block" : "hidden"}`}>
				<div className="xl:flex-grow flex flex-col xl:flex-row gap-10 font-semibold">
					{navData.map((data, index) =>
						<CustomLink key={data.href} to={data.href} spy={true} smooth={true} offset={-100} duration={500}>
							{data.title}
						</CustomLink>
					)}
				</div>
				<div>
					<Link href="/login" className="inline-block px-[27px] py-[14px] leading-none mt-6 xl:mt-0 bg-cyan font-semibold hover:opacity-90">Đăng nhập</Link>
				</div>
			</div>
		</nav>
	</header>
})

export default HeaderSection