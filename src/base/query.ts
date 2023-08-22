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
	const user = await fetchData("user/sso-support", token, "POST")
	return user.data
}
export const useUserQuery = () => {
	const token = useValidToken().data as string
	return useQuery({
		queryKey: ['user', token],
		queryFn: () => authUser(token),
		enabled: !!token
	})
}

const fetchCategories = async (token: string) => {
	const allCatgories = await fetchData("categories", token, "GET")
	return allCatgories.data.filter((cat: ICourseCat) => cat.level === 1)
}
export const useCategoriesQuery = () => {
	const token = useValidToken().data as string
	return useQuery({
		queryKey: ['categories', token],
		queryFn: () => fetchCategories(token),
		enabled: !!token
	})
}

const fetchCourses = async (token: string) => {
	const _coursesArray: any = []
	const courses = await fetchData("user/courses", token, "GET")
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
		queryKey: ['courses', token],
		queryFn: () => fetchCourses(token),
		enabled: !!token
	})
}

export const fetchLessons = async (token: string, id: number) => {
	const lessonDatas = await fetchData(`courses/lessons/${id}`, token, "GET")
	return lessonDatas.data.lessons
}
export const useLessonsQuery = (id: number) => {
	const token = useValidToken().data as string
	return useQuery({
		queryKey: [`lessons-of-course-${id}`, token],
		queryFn: () => fetchLessons(token, id),
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

const fetchUnits = async (token: string, id: number) => {
	const unitDatas = await fetchData(`courses/lessons/${id}`, token, "GET")
	return unitDatas.data.chapters
}
export const useUnitsQuery = (id: number) => {
	const token = useValidToken().data as string
	return useQuery({
		queryKey: ['units', token],
		queryFn: () => fetchUnits(token, id),
		enabled: !!id && !!token
	})
}

const fetchQuizs = async (token: string, id: number) => {
	const quizDatas = await fetchData(`lessons/${id}/quizzes`, token, "GET")
	return quizDatas.data
}
export const useQuizsQuery = (id: number) => {
	const token = useValidToken().data as string
	return useQuery({
		queryKey: [`quizs${id}`, token],
		queryFn: () => fetchQuizs(token, id),
		enabled: !!id && !!token
	})
}