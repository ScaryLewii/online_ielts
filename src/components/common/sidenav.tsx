import Link from "next/link"
import Image from "next/image"
import logo from "../../../public/logo.svg"
import course from "../../../public/images/course.svg"
import live from "../../../public/images/live.svg"
import interactive from "../../../public/images/interactive.svg"
import review from "../../../public/images/review.svg"
import exam from "../../../public/images/exam.svg"
import userIcon from "../../../public/images/user.svg"
import settingIcon from "../../../public/images/setting.svg"
import supportIcon from "../../../public/images/support.svg"
import { ReactSVG } from "react-svg"
import { useRouter } from 'next/router'

const mainNav = [
	{
		label: "Khóa học của tôi",
		icon: course,
		children: [
			{
				label: "Lộ trình học",
				url: "/study-route",
			},
			{
				label: "Level 1: Kick-off",
				url: "/kick-off",
			},
			{
				label: "Level 2: Speed-up",
				url: "/speed-up",
			},
			{
				label: "Level 3: Modest",
				url: "/modest",
			},
			{
				label: "Level 4: Fluent",
				url: "/fluent",
			},
			{
				label: "Level 5: Advanced",
				url: "/advanced",
			}
		]
	},
	{
		label: "Live",
		url: "/live",
		icon: live,
	},
	{
		label: "Interactive",
		url: "/interactive",
		icon: interactive,
	},
	{
		label: "Review",
		url: "/review",
		icon: review,
	},
	{
		label: "Exam",
		url: "/exam",
		icon: exam,
	}
]

const SideNav = () => {
	const router = useRouter()

	const getActiveClass = (url: string) => {
		if (router.asPath == url) return "is-active"
		return ""
	}

	return <div className="bg-sea-light text-white relative min-w-[275px]">
		<div className="sidenav-wrapper sticky top-0 pt-6">
			<Link href="/" className="mb-8 block px-6">
				<Image src={logo} width={80} height={75} alt={logo} />
			</Link>

			<nav className="sidenav px-6">
				<h2 className="font-semibold mb-5">Danh mục</h2>
				<ul className="sidenav">
					{mainNav.map(nav =>
						<li key={nav.url || nav.label} className="sidenav__item">
							{nav.url && 
								<Link href={nav.url} className={`sidenav__link relative ${getActiveClass(nav.url)}`}>
									<ReactSVG src={nav.icon["src"]} className="fill-white absolute -left-[35px]" />
									{nav.label}
								</Link>
							}

							{!nav.url && 
								<button className={`
									sidenav__link mb-2 relative
									${nav.children && nav.children.some(n => n.url === router.asPath) && "is-active"}
								`}>
									<ReactSVG src={nav.icon["src"]} className="fill-white absolute -left-[35px]" />
									{nav.label}
								</button>
							}

							{nav.children &&
								<ul>
									{nav.children.map(navChild =>
										<li key={navChild.url} className="sidenav-child__item">
											<Link href={navChild.url} className={`sidenav-child__link hover:text-cyan ${getActiveClass(navChild.url)}`}>{navChild.label}</Link>
										</li>
									)}
								</ul>
							}
						</li>
					)}
				</ul>
			</nav>

			<nav className="mt-[200px] pt-7 px-6 border-t border-[rgba(255, 255, 255, 0.50)]">
				<h2 className="font-semibold mb-5">Quản trị</h2>
				<ul className="bottom-nav">
					<li className="bottom-nav__item">
						<Link href="#" className="bottom-nav__link is-active">
							<div className="relative z-[1] flex gap-3 items-center py-3">
								<ReactSVG src={userIcon["src"]} className="fill-white" />
								Tài khoản của tôi
							</div>
						</Link>
					</li>
					<li className="bottom-nav__item">
						<Link href="#" className="bottom-nav__link">
							<div className="relative z-[1] flex gap-3 items-center py-3">
								<ReactSVG src={settingIcon["src"]} className="fill-white" />
								Cài đặt
							</div>
						</Link>
					</li>
					<li className="bottom-nav__item">
						<Link href="#" className="bottom-nav__link">
							<div className="relative z-[1] flex gap-3 items-center py-3">
								<ReactSVG src={supportIcon["src"]} className="fill-white" />
								Hỗ trợ
							</div>
						</Link>
					</li>
				</ul>
			</nav>
		</div>
	</div>
}

export default SideNav