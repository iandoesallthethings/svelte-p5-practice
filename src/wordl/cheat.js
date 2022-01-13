import { writable } from 'svelte/store'

const cheat = writable(false)

cheat.set(localStorage.cheat === 'true')
cheat.subscribe((value) => (localStorage.cheat = String(value)))

export default cheat
