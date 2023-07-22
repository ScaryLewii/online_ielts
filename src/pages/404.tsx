import PageNotFoundBackGround from "../../public/images/404.svg"
import Image from "next/image"

const PageNotFound = () => {
	return <>
		<h1 className="text-center text-white font-semibold mb-5">
			XIN CHÀO, <br/>
			CHÚNG MÌNH ĐANG CẬP NHẬT TÍNH NĂNG NÀY!
		</h1>
		<p className="text-white block max-w-[840px] mx-auto text-center">Bạn rất quan trọng với Ant Edu chúng mình, vậy nên đội ngũ Ant Edu đã và đang nhanh chóng cập nhật phiên bản mới nhất của tính năng này đến bạn.Hãy tiếp tục luyện tập chăm chỉ nhé, thông báo cập nhật thành công sẽ sớm được gửi đến bạn!</p>
	
		<Image src={PageNotFoundBackGround} width={450} height={450} alt="page not found" className="mx-auto mt-10" />
	</>
}

export default PageNotFound