import { ObservableObject } from "@legendapp/state"
import { fetchData } from "./base"
import { IGlobalContext } from "@/types/types"

export const onSignOut = async (context: ObservableObject<IGlobalContext>) => {
	const request = await fetchData("signout", "POST", context.cookies.get())
	console.log(request)
	if (request) {
		alert('Bạn đã đăng xuất!')
	}
}