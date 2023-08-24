import { useQuery } from "@tanstack/react-query"
import { fetchData } from "./base"
import { ICourse, ICourseCat, ILesson, IQuiz, IUnit } from "@/types/types"

export const useValidToken = () => {
	return useQuery(
		['token'],
		() => localStorage.getItem("token")
	)
}

const authUser = async (token: string) => {
	if (localStorage.getItem("user") !== null) {
		return localStorage.getItem("user") as string
	}

	const user = await fetchData("user/sso-support", "POST", token)
	const userData = {
		id: user.data.id,
		displayName: user.data.displayName,
		email: user.data.email,
		avatar: user.data.avatar || ""
	}
	localStorage.setItem("userID", JSON.stringify(userData))
	return JSON.stringify(userData)
}
export const useUserQuery = () => {
	const token = useValidToken().data as string
	return useQuery({
		queryKey: ['user', token],
		queryFn: () => authUser(token),
		enabled: !!token
	})
}

export const fetchCategories = async () => {
	const allCatgories = await fetchData("categories", "GET")
	return allCatgories.data.filter((cat: ICourseCat) => cat.level === 1)
}
export const useCategoriesQuery = () => {
	const token = useValidToken().data as string
	return useQuery({
		queryKey: ['categories', token],
		queryFn: () => fetchCategories(),
		enabled: !!token
	})
}

export const fetchCourses = async () => {
	const _coursesArray: any = []
	const courses = await fetchData("user/courses", "GET")
	courses.data && courses.data.map((c: any) => {
		const data = {
			...c.course,
			isComplete: c.userCourse.completed
		}
		_coursesArray.push(data)
	})

	return _coursesArray
}
export const useCoursesQuery = () => {
	const token = useValidToken().data as string
	return useQuery({
		queryKey: ['courses'],
		queryFn: () => fetchCourses(),
		enabled: !!token
	})
}

export const fetchLessons = async (id: number) => {
	const lessonDatas = await fetchData(`courses/lessons/${id}`, "GET")
	return lessonDatas.data.lessons
}
export const useLessonsQuery = (id: number) => {
	const token = useValidToken().data as string
	return useQuery({
		queryKey: ['lessons-of-course', id],
		queryFn: () => fetchLessons(id),
		enabled: !!id && !!token
	})
}

// const fetchAllLessons = (ids: number[]) => {
// 	const lessons: ILesson[] = []
// 	ids.map(id => {
// 		console.log(id)
// 		const lessonDatas = useLessonsQuery(id).data as ILesson[]
// 		lessons.push(...lessonDatas)
// 	})
	
// 	return lessons
// }
// export const useAllLessonsQuery = (ids: number[]) => {
// 	return useQuery({
// 		queryKey: ['allLessons'],
// 		queryFn: () => fetchAllLessons(ids),
// 		enabled: !!ids
// 	})
// }

export const fetchUnits = async (id: number) => {
	const unitDatas = await fetchData(`courses/lessons/${id}`, "GET")
	return unitDatas.data.chapters
}
export const useUnitsQuery = (id: number) => {
	const token = useValidToken().data as string
	return useQuery({
		queryKey: ['units', token],
		queryFn: () => fetchUnits(id),
		enabled: !!id && !!token
	})
}

export const fetchQuizs = async (id: number) => {
	const quizDatas = await fetchData(`lessons/${id}/quizzes`, "GET")
	return quizDatas.data
}
export const useQuizsQuery = (id: number) => {
	const token = useValidToken().data as string
	return useQuery({
		queryKey: ['quizs', id],
		queryFn: () => fetchQuizs(id),
		enabled: !!id && !!token
	})
}