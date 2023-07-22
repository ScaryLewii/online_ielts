import Link from "next/link"
import Image from "next/image"
import logo from "../../../public/logo.svg"
import course from "../../../public/images/course.svg"
import live from "../../../public/images/live.svg"
import interactive from "../../../public/images/interactive.svg"
import review from "../../../public/images/review.svg"
import exam from "../../../public/images/exam.svg"
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

	return <div className="bg-sea-light min-h-screen text-white pt-6 px-6 relative min-w-[300px]">
		<div className="sticky top-0">
			<Link href="/" className="mb-8 block">
				<Image src={logo} width={80} height={75} alt={logo} />
			</Link>

			<h2 className="font-semibold mb-5">Danh mục</h2>
			<nav className="sidenav">
				<ul>
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
									sidenav__link mb-2 relative cursor-default
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
		</div>
	</div>
}

export default SideNav