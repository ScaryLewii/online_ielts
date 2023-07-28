import TopNav from "./topnav"
import SideNav from "./sidenav"
import Image from "next/image";
import dashboardbg from "../../../public/images/dashboard-bg.svg"
import React, { PropsWithChildren, createContext } from "react";
import { useRouter } from 'next/router'
import { observer, useObservable } from "@legendapp/state/react"

export const StateContext = createContext<any>(null)

const Layout = observer(({ children }: PropsWithChildren) => {
	const router = useRouter()

	const state = useObservable({
		isNavOpen: true
	})

	if (router.asPath === "/" || router.asPath === '/login') {
		return <>{children}</>
	}

	return (
		<StateContext.Provider value={state}>
			<div className="dashboard-wrapper flex">
				<SideNav />
				<main className="bg-sea w-full min-h-screen overflow-hidden relative pt-14" style={{gridArea: "dashboard"}}>
					<Image src={dashboardbg} width={1920} height={1080} alt="background" loading="lazy" className="absolute top-0 left-0 z-0" />
					<TopNav />
					<section className="relative z-[1] p-5 xl:p-14">
						{children}
					</section>
				</main>
			</div>
		</StateContext.Provider>
	)
})

export default Layout