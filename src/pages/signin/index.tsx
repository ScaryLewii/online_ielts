import SigninForm from "./form"
import QRBlock from "@/components/gate/scanning-qr"
import GateCta from "@/components/gate/gate-cta"

const LoginPage = () => {
	return (
		<>
			<SigninForm />
			<GateCta />
			<QRBlock />
		</>
	)
}

export default LoginPage