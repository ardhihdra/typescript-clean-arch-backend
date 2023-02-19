export interface Cache<T> {
	set(key: string, value: T): void
	get(key: string): Promise<T | null>
}
