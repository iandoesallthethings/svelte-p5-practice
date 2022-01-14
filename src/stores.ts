import localStore from './localStore'

export const cheat = localStore('cheat', false)
export const darkMode = localStore('dark-mode', false)
export const stats = localStore('stats', { wins: 0, losses: 0, streak: 0 })
