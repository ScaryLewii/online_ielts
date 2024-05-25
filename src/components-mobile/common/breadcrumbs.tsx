import MoonIcon from "@/components/icons/moon"
import SunIcon from "@/components/icons/sun"
import { useTheme } from "next-themes"
import Link from "next/link"
import { useRouter } from "next/router"
import back from "public/images/back.svg"
import backBlack from "public/images/back-black.svg"
import { ReactSVG } from "react-svg"

interface IBreadcrumbsMobile {
	title: string,
	isSubMenu?: boolean,
	parentPage?: string
}

const MobileBreadcrumbs = ({title, isSubMenu, parentPage}: IBreadcrumbsMobile) => {
	const router = useRouter()
	const { setTheme, resolvedTheme } = useTheme();

	return (
		<div className="flex items-center px-5 py-3 sticky z-[15] top-0 bg-white-mb bg-opacity-10 dark:bg-sea dark:bg-opacity-100 border-b border-gray-500
			justify-between"
		>
			{!isSubMenu && !parentPage && 
				<div className="w-8"></div>
			}
			{isSubMenu &&
				<button className="w-8 h-8 bg-black-mb bg-opacity-5 dark:bg-dark inline-flex items-center justify-center rounded hover:opacity-90"
					onClick={() => router.back()}
				>
					{resolvedTheme === "dark" &&
						<ReactSVG src={back['src']} />
					}

					{resolvedTheme === "light" &&
						<ReactSVG src={backBlack['src']} />
					}
				</button>
			}
			{parentPage &&
				<Link className="w-8 h-8 bg-black-mb bg-opacity-5 dark:bg-dark inline-flex items-center justify-center rounded hover:opacity-90"
					href={parentPage}>
					{resolvedTheme === "dark" &&
						<ReactSVG src={back['src']} />
					}

					{resolvedTheme === "light" &&
						<ReactSVG src={backBlack['src']} />
					}
				</Link>
			}
			<span className="text-black-mb dark:text-white text-lg font-bold">{title}</span>

			{resolvedTheme === "dark" &&
				<button onClick={() => setTheme('light')}><MoonIcon /></button>
			}

			{resolvedTheme === "light" &&
				<button onClick={() => setTheme('dark')}><SunIcon /></button>
			}
		</div>
	)
}

export default MobileBreadcrumbs