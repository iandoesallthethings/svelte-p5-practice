import { writable } from 'svelte/store'

// type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue }

export default function localStore(key, initial) {
	const store = writable(initial)

	store.set(JSON.parse(localStorage.getItem(key)) || initial)
	store.subscribe((value) => (localStorage[key] = JSON.stringify(value)))

	return store
}
