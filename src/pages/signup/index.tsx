import SignupForm from "./form"
import GateCta from "@/components/gate/gate-cta"
import QRBlock from "@/components/gate/scanning-qr"

const SignupPage = () => {
	return <>
		<SignupForm />
		<GateCta />
		<QRBlock />
	</>
}

export default SignupPage