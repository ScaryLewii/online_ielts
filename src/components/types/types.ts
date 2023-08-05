export interface ILesson {
	active: boolean
	chapterId: number
	checkpoint:boolean
	courseId: number
	description: string
	displayOrder: number
	id: number
	name: string
	requirePoint: number
	slug: string
	timeLength: number
	type: string
	videoUrl: string
}

export interface IQuiz {
	id: string,
    title: string
    description: string
    content: string,
	type: string,
	lessonId: number,
	active: boolean
	time: number
	chapterId: number
}

export interface IAnswer {
	id: string
	content: string
	right: boolean
}

export interface IQuestion {
	id: string
	title: string
	content: string
	type: string
	answers: IAnswer[]
}

export interface IUnit {
	active: boolean,
	id: number,
	courseId: number,
	lessonsCount: number,
	name: string,
}

export interface ICourse {
	id: number,
	categoryId: number,
	name: string,
	slug: string
}


export interface IUserAnswer {
	id: string,
	correct: boolean
}