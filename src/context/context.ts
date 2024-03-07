import { createContext } from "react";
import { signal } from "@preact/signals-react";
import { IGlobalContext } from "@/types/types";
import { ObservableObject, observable  } from "@legendapp/state";

const defaultGlobalContext: ObservableObject<IGlobalContext> = observable({
    userInfo: undefined,
		cookies: {},
		isSessonValid: true,
		isNavOpen: true,
		categories: [],
		courses: [],
		units: [],
		lessons: [],
		quizs: [],
		lessonProgress: [],
    isQrScanning: false,
    isLostPasswordPage: false,
})

export const GlobalContext = createContext<ObservableObject<IGlobalContext>>(defaultGlobalContext)
export const CourseContext = createContext<any>(null)
export const QuizContext = createContext<any>({})
export const SubtitleContext = createContext<any>({})
export const tokenAPI = signal("")