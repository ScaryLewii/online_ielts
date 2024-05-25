'use client';

import { useTheme } from "next-themes";
import Image from "next/image";
import dashboardbg from "public/images/dashboard-bg.svg";
import dashboardbgMB from "public/images/bg-mobile.png";

const LayoutBg = () => {
	const { resolvedTheme } = useTheme();
	
	return <>
		{resolvedTheme === 'dark' &&
			<Image src={dashboardbg} alt="background" className="absolute top-0 left-0 z-0 max-h-full" />
		}
		{resolvedTheme === 'light' &&
			<Image src={dashboardbgMB} alt="background" className="md:hidden absolute bottom-0 left-0 z-0 max-h-full" />
		}
	</>
}

export default LayoutBg;