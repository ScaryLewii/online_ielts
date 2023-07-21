import TopNav from "./topnav"
import SideNav from "./sidenav"
import Image from "next/image";
import dashboardbg from "../../../public/images/dashboard-bg.svg"
import React, { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
	return (
		<div className="dashboard-wrapper">
			<TopNav />
			<SideNav />
			<main className="bg-sea w-full min-h-screen overflow-hidden relative pt-14" style={{gridArea: "dashboard"}}>
				<Image src={dashboardbg} width={1920} height={1080} alt="background" loading="lazy" className="absolute top-0 left-0 z-0" />
				<section className="relative z-[1]">
					{children}
				</section>
			</main>
		</div>
	)
}