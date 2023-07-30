import NextAuth from "next-auth"

declare module "next-auth" {
	interface User {
		displayName?: string
	}

	interface CourseCategory {
		id: number,
		name: string,
		slug: string,
		description: string,
		level: number,
		parent: number,
		active: boolean
	}

	interface Session {
		user: User,
		courseCategories: CourseCategory[]
	}
}