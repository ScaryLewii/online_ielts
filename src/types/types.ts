export interface ICategory {
	active: boolean,
	description: string,
	id: number,
	level: number,
	name: string,
	parent: number,
	slug: string,
}
export interface IContext {
	user: IUser,
	categories: ICategory[],
	courses: ICourse[],
	units: IUnit[],
	lessons: ILesson[],
	quizs: IQuiz[]
}

export interface IUser {
	id: number,
	displayName: string,
	email: string,
	avatar: string
}

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
	isLocked: boolean
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
	isChecked?: boolean
	right?: boolean
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
	slug: string,
	introVideo: string,
	description: string,
	isComplete: boolean,
	isLocked: boolean,
	isOwned: boolean,
	totalLessons: number,
}

export interface ICourseDetail {
	id: number,
	categoryId: number,
	name: string,
	slug: string,
	introVideo: string,
	description: string,
	totalLessons: number,
	chapters: IChapterDetail[]
}

export interface IChapterDetail {
	id: number,
	active: boolean,
	courseId: number,
	description: string,
	displayOrder: number,
	name: string,
	lessons: ILessonDetail []
}

export interface ILessonDetail {
	id: number,
	chapterId: number,
	courseId: number,
	description: string,
	displayOrder: number,
	freeFor: string[],
	isLocked: boolean,
	name: string,
	slug: string,
	timeLength: number,
	type: string,
	videoUrl: string,
	quizzes: IQuizDetail[]
}

export interface IQuizDetail {
	id: string,
	description: string,
	displayOrder: number,
	lessonId: number,
	time: number,
	title: string,
	type: string,
}

export interface IUserAnswer {
	id: string,
	content: string,
	isChecked: boolean
}

export interface IDefinition {
	id: string,
	vocabularyId: string,
	definition: string,
	typeOfSpeech: string,
	exampleSentence: string
}

export interface IWord {
	id: string,
	lessonId: number,
	word: string,
	phonemes: string,
	vocabularyDefinitions: IDefinition[]
}

export interface ILessonProgress {
	userId: number,
	lessonId: number,
	progress: number,
	completed: boolean
}

export interface IQuizProgress {
	id: string,
	quizId: string,
	lessonId: number,
	content: string
}

export interface ISubtitle {
	id: string,
	content: string,
	lessonId: number,
	startAt: number,
	endAt: number
}

export interface IVideoProgessData {
	loaded: number,
	loadedSeconds: number,
	played: number,
	playedSeconds: number,
}

export interface IEvent {
	id: number,
	title: string,
	description: string,
	summary: string,
	presenter: string,
	startTime: string,
	endTime: string,
	duration: number,
	restrictionCourseId: number,
	categoryId: number,
	status: "SCHEDULED",
	thumbnail: string,
	platform: "ZOOM",
	maxParticipants: number,
	joinRoomLink: string,
	facebookEventLink: string,
	registeredCount: number,
	createdAt: string,
	agenda: [
		{
			content: string
		}
	],
	liveScheduleConditions: ILiveScheduleCondition[],
	liveScheduleRegisters: [],
	course: null,
	infographic: string,
	decoration: {
		defaultColor: string,
		titleColor: string,
	}
}

export interface ILiveScheduleCondition {
  id: string
  liveScheduleId: number
  conditionType: "" | "FinishSurvey" | "PayCoin"
  content?: IContent
  amount?: number
}

export interface IContent {
  title: string
  description: string
  questions: IQuestion[]
}

export interface IQuestion {
  id: string
  questionType: string
  title: string
  content: string
  answers: IAnswer[]
}

export interface IAnswer {
  id: string
  content: string
}

export interface IAuthor {
	id: number
	name: string
	slug: string
	description: string
	introduce: string
	introVideo: string
	email: string
	phoneNumber: string
	address: string
	avatar: string
	facebook: string
	instagram: string
	twitter: string
	featured: boolean
}