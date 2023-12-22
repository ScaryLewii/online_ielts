import { ICategory, ICourse } from "@/types/types"
import { useQueries, useQuery } from "@tanstack/react-query"
import { fetchData } from "./base"

const getUserInfo = async (cookies: any) => {
	const user = await fetchData("user/info", "GET", cookies)
	return user.data
}
export const useUserInfoQuery = (cookies: any) => {
	return useQuery({
		queryKey: ['user', 'info'],
		queryFn: () => getUserInfo(cookies),
	})
}

const fetchCategories = async (cookies: any) => {
	const allCatgories = await fetchData("categories", "GET", cookies)
	return allCatgories.data.filter((cat: ICategory) => cat.level === 1)
}
export const useCategoriesQuery = (cookies: any) => {
	return useQuery({
		queryKey: ['categories', cookies],
		queryFn: () => fetchCategories(cookies),
		enabled: !!cookies,
		staleTime: Infinity
	})
}

const fetchCourses = async (cookies: any) => {
	const courses = await fetchData("courses?Page=1&PageSize=100", "GET", cookies)
	return courses?.data?.items
}
export const useCoursesQuery = (cookies: any) => {
	return useQuery({
		queryKey: ['courses', cookies],
		queryFn: () => fetchCourses(cookies),
		staleTime: Infinity
	})
}

export const fetchLessons = async (id: number, cookies: any) => {
	const lessonDatas = await fetchData(`courses/lessons/${id}`, "GET", cookies)
	return lessonDatas.data.lessons
}
export const useLessonsQuery = (id: number, cookies: any) => {
	return useQuery({
		queryKey: ['lessons', id],
		queryFn: () => fetchLessons(id, cookies),
		enabled: !!id && !!cookies,
		staleTime: Infinity
	})
}
export const useAllLessonsQuery = (courses: ICourse[], cookies: any) => {
	courses = courses || []
	return useQueries({
		queries: courses.map(c => {
			return {
				queryKey: ['lessons', c.id],
				queryFn: () => fetchLessons(c.id, cookies),
				enabled: !!c.id && !!cookies,
				staleTime: Infinity
			}
		})
	})
}

export const fetchLessonsProgress = async (id: number, cookies: any) => {
	const lessonDatas = await fetchData(`courses/lessons/${id}`, "GET", cookies)
	return lessonDatas.data.userLessons
}
export const useAllLessonsProgressQuery = (courses: ICourse[], cookies: any) => {
	courses = courses || []
	return useQueries({
		queries: courses.map(c => {
			return {
				queryKey: ['lessons', 'progress', c.id],
				queryFn: () => fetchLessonsProgress(c.id, cookies),
				enabled: !!c.id,
				staleTime: Infinity
			}
		})
	})
}

const fetchUnits = async (id: number, cookies: any) => {
	const unitDatas = await fetchData(`courses/lessons/${id}`, "GET", cookies)
	return unitDatas.data.chapters
}
export const useUnitsQuery = (id: number, cookies: any) => {
	return useQuery({
		queryKey: ['units', id],
		queryFn: () => fetchUnits(id, cookies),
		enabled: !!id && !!cookies,
		staleTime: Infinity
	})
}
export const useAllUnitsQuery = (courses: ICourse[], cookies: any) => {
	courses = courses || []
	return useQueries({
		queries: courses.map(c => {
			return {
				queryKey: ['units', c.id],
				queryFn: () => fetchUnits(c.id, cookies),
				enabled: !!c.id,
				staleTime: Infinity
			}
		})
	})
}

const fetchQuizs = async (id: number, cookies: any) => {
	const quizDatas = await fetchData(`lessons/${id}/quizzes`, "GET", cookies)
	return quizDatas.data
}
export const useQuizsQuery = (id: number, cookies: any) => {
	return useQuery({
		queryKey: ['quiz', 'lesson', id],
		queryFn: () => fetchQuizs(id, cookies),
		enabled: !!id && !!cookies,
		staleTime: Infinity
	})
}

const fetchQuizByID = async (id: string, cookies: any) => {
	const quizDatas = await fetchData(`quizzes/${id}`, "GET", cookies)
	return quizDatas.data
}
export const useQuizQueryByID = (id: string, cookies: any) => {
	return useQuery({
		queryKey: ['quiz', id],
		queryFn: () => fetchQuizByID(id, cookies),
		enabled: !!id && !!cookies,
		staleTime: Infinity
	})
}

const fetchVocabulary = async (id: number, cookies: any) => {
	const vocabularies = await fetchData(`vocabularies/lesson/${id}`, "GET", cookies)
	return vocabularies.data
}
export const useVocalbularyQuery = (id: number, cookies: any) => {
	return useQuery({
		queryKey: ['vocabulary', 'lesson', id],
		queryFn: () => fetchVocabulary(id, cookies),
		enabled: !!id && !!cookies,
		staleTime: Infinity
	})
}

const fetchSubtitles = async (id: number, cookies: any) => {
	const vocabularies = await fetchData(`subtitles/lesson/${id}`, "GET", cookies)
	return vocabularies.data
}
export const useSubtitleQuery = (id: number, cookies: any) => {
	return useQuery({
		queryKey: ['subtitles', 'lesson', id],
		queryFn: () => fetchSubtitles(id, cookies),
		enabled: !!id && !!cookies,
		staleTime: Infinity
	})
}

const fetchAllLives = async (cookies: any) => {
	const lives = await fetchData(`live-schedules`, "GET", cookies)
	return lives.data
}
export const useAllLivesQuery = (cookies: any) => {
	return useQuery({
		queryKey: ['lives'],
		queryFn: () => fetchAllLives(cookies),
		enabled: !!cookies,
		staleTime: Infinity
	})
}

const fetchMyLives = async (cookies: any) => {
	const lives = await fetchData(`live-schedules/my`, "GET", cookies)
	return lives.data
}
export const useMyLivesQuery = (cookies: any) => {
	return useQuery({
		queryKey: ['lives', 'my'],
		queryFn: () => fetchMyLives(cookies),
		enabled: !!cookies,
		staleTime: Infinity
	})
}

const fetchLive = async (id: number, cookies: any) => {
	const lives = await fetchData(`live-schedules/${id}`, "GET", cookies)
	return lives.data
}
export const useLiveQuery = (id: number, cookies: any) => {
	return useQuery({
		queryKey: ['lives', id],
		queryFn: () => fetchLive(id, cookies),
		enabled: !!cookies,
		staleTime: Infinity
	})
}

const fetchCoin = async (cookies: any) => {
	const coin = await fetchData(`coins/my-coins`, "GET", cookies)
	return coin.data
}
export const useCoinQuery = (cookies: any) => {
	return useQuery({
		queryKey: ['coin'],
		queryFn: () => fetchCoin(cookies),
		enabled: !!cookies,
		staleTime: Infinity
	})
}