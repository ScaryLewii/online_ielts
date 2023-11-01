import { createContext } from "react";
import { signal } from "@preact/signals-react";

export const GlobalContext = createContext<any>(null)
export const CourseContext = createContext<any>(null)
export const QuizContext = createContext<any>({})
export const SubtitleContext = createContext<any>({})
export const tokenAPI = signal("")