import { defineStore, mapState } from 'pinia'
import { useUserStore } from './user'
import { useAppStore } from './app'

export const useGetters = defineStore('getters', {
  getters: {
    ...mapState(useUserStore, ['token']),
    ...mapState(useAppStore, ['sidebar'])
  }
})
