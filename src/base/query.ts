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

const fetchLessons = async (token: string, ids: number[]) => {
	const _lessonsArray: ILesson[] = []
	ids.map(async id => {
		const lessonDatas = await fetchData(`courses/lessons/${id}`, token, "GET")
		_lessonsArray.push(lessonDatas.data.lessons)
	})
	return _lessonsArray
}
export const useLessonsQuery = () => {
	const token = useValidToken().data as string
	const courseIds = useCoursesQuery().data.map((course: ICourse) => course.id)
	return useQuery({
		queryKey: ['lessons', token],
		queryFn: () => fetchLessons(token, courseIds),
		enabled: !!courseIds
	})
}

const fetchUnits = async (token: string, ids: number[]) => {
	const _unitArray: IUnit[] = []
	ids.map(async id => {
		const unitDatas = await fetchData(`courses/lessons/${id}`, token, "GET")
		_unitArray.push(unitDatas.data.chapters)
	})
	return _unitArray
}
export const useUnitsQuery = () => {
	const token = useValidToken().data as string
	const lessonIds = useLessonsQuery().data?.map((l: ILesson) => l.id)
	return useQuery({
		queryKey: ['units', token],
		queryFn: () => lessonIds && fetchUnits(token, lessonIds),
		enabled: !!lessonIds
	})
}

const fetchQuizs = async (token: string, ids: number[]) => {
	const _quizArray: IQuiz[] = []
	ids.map(async id => {
		const quizDatas = await fetchData(`lessons/${id}/quizzes`, token, "GET")
		_quizArray.push(quizDatas.data.chapters)
	})
	return _quizArray
}
export const useQuizsQuery = () => {
	const token = useValidToken().data as string
	const lessonIds = useLessonsQuery().data?.map((lesson: ILesson) => lesson.id)
	return useQuery({
		queryKey: ['units', token],
		queryFn: () => lessonIds && fetchQuizs(token, lessonIds),
		enabled: !!lessonIds
	})
}