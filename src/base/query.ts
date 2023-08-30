import { ICategory, ICourse } from "@/types/types"
import { useQueries, useQuery } from "@tanstack/react-query"
import { fetchData } from "./base"

export const useValidToken = () => {
	return useQuery(
		['token'],
		() => localStorage.getItem("token") || ""
	)
}

const authUser = async (token: string) => {
	const user = await fetchData("user/sso-support", "POST", token)
	return user.data
}
export const useUserQuery = (token: string = "") => {
	return useQuery({
		queryKey: ['user'],
		queryFn: () => authUser(token),
		enabled: !!token
	})
}

const fetchCategories = async (token: string) => {
	const allCatgories = await fetchData("categories", "GET", token)
	return allCatgories.data.filter((cat: ICategory) => cat.level === 1)
}
export const useCategoriesQuery = () => {
	const token = useValidToken().data as string
	return useQuery({
		queryKey: ['categories', token],
		queryFn: () => fetchCategories(token),
		staleTime: Infinity
	})
}

const fetchCourses = async (token: string) => {
	const _coursesArray: any = []
	const courses = await fetchData("user/courses", "GET", token)
	courses && courses.data && courses.data.map((c: any) => {
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
		enabled: !!token,
		staleTime: Infinity
	})
}

export const fetchLessons = async (id: number, token: string) => {
	const lessonDatas = await fetchData(`courses/lessons/${id}`, "GET", token)
	return lessonDatas.data.lessons
}
export const useLessonsQuery = (id: number) => {
	const token = useValidToken().data as string
	return useQuery({
		queryKey: ['lessons', id],
		queryFn: () => fetchLessons(id, token),
		enabled: !!id && !!token,
		staleTime: Infinity
	})
}
export const useAllLessonsQuery = (courses: ICourse[]) => {
	const token = useValidToken().data as string
	courses = courses || []
	return useQueries({
		queries: courses.map(c => {
			return {
				queryKey: ['lessons', c.id],
				queryFn: () => fetchLessons(c.id, token),
				enabled: !!c.id && !!token,
				staleTime: Infinity
			}
		})
	})
}

export const fetchLessonsProgress = async (id: number, token: string) => {
	const lessonDatas = await fetchData(`courses/lessons/${id}`, "GET", token)
	return lessonDatas.data.userLessons
}
export const useAllLessonsProgressQuery = (courses: ICourse[]) => {
	const token = useValidToken().data as string
	courses = courses || []
	return useQueries({
		queries: courses.map(c => {
			return {
				queryKey: ['lessons', 'progress', c.id],
				queryFn: () => fetchLessonsProgress(c.id, token),
				enabled: !!c.id,
				staleTime: Infinity
			}
		})
	})
}

const fetchUnits = async (id: number, token: string) => {
	const unitDatas = await fetchData(`courses/lessons/${id}`, "GET", token)
	return unitDatas.data.chapters
}
export const useUnitsQuery = (id: number) => {
	const token = useValidToken().data as string
	return useQuery({
		queryKey: ['units', id],
		queryFn: () => fetchUnits(id, token),
		enabled: !!id && !!token,
		staleTime: Infinity
	})
}
export const useAllUnitsQuery = (courses: ICourse[]) => {
	const token = useValidToken().data as string
	courses = courses || []
	return useQueries({
		queries: courses.map(c => {
			return {
				queryKey: ['units', c.id],
				queryFn: () => fetchUnits(c.id, token),
				enabled: !!c.id,
				staleTime: Infinity
			}
		})
	})
}

const fetchQuizs = async (id: number, token: string) => {
	const quizDatas = await fetchData(`lessons/${id}/quizzes`, "GET", token)
	return quizDatas.data
}
export const useQuizsQuery = (id: number) => {
	const token = useValidToken().data as string
	return useQuery({
		queryKey: ['quiz', 'lesson', id],
		queryFn: () => fetchQuizs(id, token),
		enabled: !!id && !!token,
		staleTime: Infinity
	})
}

const fetchVocabulary = async (id: number, token: string) => {
	const vocabularies = await fetchData(`vocabularies/lesson/${id}`, "GET", token)
	return vocabularies.data
}
export const useVocalbularyQuery = (id: number) => {
	const token = useValidToken().data as string
	return useQuery({
		queryKey: ['vocabulary', 'lesson', id],
		queryFn: () => fetchVocabulary(id, token),
		enabled: !!id && !!token,
		staleTime: Infinity
	})
}

const fetchSubtitles = async (id: number, token: string) => {
	const vocabularies = await fetchData(`subtitles/lesson/${id}`, "GET", token)
	return vocabularies.data
}
export const useSubtitleQuery = (id: number) => {
	const token = useValidToken().data as string
	return useQuery({
		queryKey: ['subtitles', 'lesson', id],
		queryFn: () => fetchSubtitles(id, token),
		enabled: !!id && !!token,
		staleTime: Infinity
	})
}

