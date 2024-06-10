'use client';

import { useTheme } from "next-themes";
import Image from "next/image";
import dashboardbg from "public/images/dashboard-bg.svg";
import dashboardbgMB from "public/images/bg-mobile.png";
import dashboardbgLight from "public/images/bg-light.svg";
import { BrowserView, MobileView } from "react-device-detect";

const LayoutBg = () => {
	const { resolvedTheme } = useTheme();
	
	return <>
		{resolvedTheme === 'dark' &&
			<Image src={dashboardbg} alt="background" className="absolute top-0 left-0 z-0 max-h-full" />
		}
		{resolvedTheme === 'light' &&
			<>
			<MobileView>
				<Image src={dashboardbgMB} alt="background" className="md:hidden absolute bottom-0 left-0 z-0 max-h-full" />
			</MobileView>

			<BrowserView>
				<Image src={dashboardbgLight} alt="background" className="fixed bottom-0 right-0 z-0 max-h-full" />
			</BrowserView>
			</>
		}
	</>
}

export default LayoutBg;