import { useUserInfoQuery } from "@/base/query"
import { GlobalContext } from "@/context/context"
import { observer } from "@legendapp/state/react"
import { useTheme } from "next-themes"
import Image from "next/image"
import bellIcon from "public/images/bell.svg"
import { useContext } from "react"
import MoonIcon from "../icons/moon"
import NavIcon from "../icons/nav"
import SunIcon from "../icons/sun"

const TopNav = observer(() => {
	const context = useContext(GlobalContext)
	const { setTheme, resolvedTheme } = useTheme();
	
	const { isFetched: isFinishFetchUserInfo, data: userInfo  } = useUserInfoQuery(context.cookies.get())

	const onGoToLoginPage = () => {
		const loginPage = `https://ant-edu.ai/auth/login?r=${location}`
		window.location.href = loginPage
	}

	return <div className={`sticky top-0 w-full min-h-[50px] p-4 flex justify-between items-center text-white z-10 
		${resolvedTheme === "light" ? "bg-blue-mb" : ""} dark:bg-gradient-to-t from-sea-30 to-cyan-60`}>
		<div>
			<button title="control" className={context?.isNavOpen.get() ? "hidden" : "block"}
				onClick={() => context?.isNavOpen.set((v: any) => !v)}>
				<NavIcon />
			</button>
		</div>
		<div className="flex gap-5 items-center">
			<button className="relative w-[40px] h-[40px] flex justify-center items-center rounded-full hover:bg-sea">
				<Image src={bellIcon} width={25} height={25} alt="notification" />
				{/* <span className="flex justify-center items-center text-xs font-semibold w-4 h-4 rounded-full bg-red absolute right-[5px] top-[5px]">3</span> */}
			</button>

			<span className="hidden lg:block h-8 w-[1px] bg-white"></span>
			{
				userInfo?.userName
					? (<button className="flex gap-5 items-center group">
						<h3 className="group-hover:underline">{userInfo?.displayName}</h3>
						{isFinishFetchUserInfo && userInfo &&
							<Image className="rounded-full h-[45px] w-[45px] border-2 border-white group-hover:border-cyan" src={userInfo.avatar ? `https://apitest.ant-edu.ai${userInfo.avatar}` : "https://placehold.co/45x45"} width={45} height={45} alt="profile image" unoptimized={true} />
						}
					</button>)
					: <button onClick={onGoToLoginPage}>Đăng nhập</button>
			}

			{resolvedTheme === "dark" &&
				<button onClick={() => setTheme('light')}><MoonIcon /></button>
			}

			{resolvedTheme === "light" &&
				<button onClick={() => setTheme('dark')}><SunIcon /></button>
			}
		</div>
	</div>
})

export default TopNav