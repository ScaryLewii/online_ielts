import TopNav from "../navigation/topnav"
import SideNav from "../navigation/sidenav"
import Image from "next/image";
import dashboardbg from "../../../public/images/dashboard-bg.svg"
import React, { PropsWithChildren, createContext, useEffect } from "react";
import { useRouter } from 'next/router'
import { observer, useObservable } from "@legendapp/state/react"
import GateWrapper from "../gate/gate-wrapper";

export const StateContext = createContext<any>(null)

const Layout = observer(({ children }: PropsWithChildren) => {
	const router = useRouter()

	const state = useObservable({
		nav: {
			isOpen: true
		},
		gate: {
			isQrScanning: false,
			isLostPasswordPage: false,
		}
	})

	useEffect(() => {
		// do nothing
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state.nav.isOpen.get()])

	if (router.asPath === "/") {
		return <>{children}</>
	}

	if (router.asPath === "/signup" || router.asPath === "/signin") {
		return <StateContext.Provider value={state.gate}>
			<GateWrapper>
				{children}
			</GateWrapper>
		</StateContext.Provider>
	}

	return (
		<StateContext.Provider value={state.nav}>
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