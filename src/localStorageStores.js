import { writable } from 'svelte/store'

export function stringStore(key, initial) {
	const store = writable(localStorage.getItem(key) || initial)
	store.subscribe((value) => (localStorage[key] = value))
}

export function booleanStore(key, initial) {
	const store = writable(initial)

	store.set(localStorage.getItem(key) === 'true')
	store.subscribe((value) => (localStorage[key] = String(value)))

	return store
}

export function jsonStore(key, initial) {
	const store = writable(JSON.parse(localStorage.getItem(key)) || initial)

	store.subscribe((value) => (localStorage[key] = JSON.stringify(value)))

	return store
}
