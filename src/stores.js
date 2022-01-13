import { booleanStore, jsonStore } from './localStorageStores'

export const cheat = booleanStore('cheat', false)
export const darkMode = booleanStore('dark-mode', false)
export const stats = jsonStore('stats', { wins: 0, losses: 0, streak: 0 })
