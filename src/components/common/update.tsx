import PageNotFoundBackGround from "../../../public/images/404.svg"
import Image from "next/image"

const UpdateBlock = () => {
	return <>
		<h3 className="text-center text-white font-semibold mb-5">TÍNH NĂNG ĐANG CẬP NHẬT</h3>
		<Image src={PageNotFoundBackGround} width={450} height={450} alt="page not found" className="mx-auto mt-10" />
	</>
}

export default UpdateBlock