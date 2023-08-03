import Breadcrumbs from "@/components/common/breadcrumbs"
import CheckboxGroup from "./checkbox-group"
import RadioGroup from "./radio-group"
import TextAreaBox from "./textarea"
import Footer from "./footer"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { getSession } from "next-auth/react"

const PracticePage = () => {
	return <>
		<div className="pb-[150px]">
			{/* <Breadcrumbs />
			<RadioGroup />
			<CheckboxGroup />
			<TextAreaBox /> */}
		</div>
		<Footer />
	</>
}

export default PracticePage