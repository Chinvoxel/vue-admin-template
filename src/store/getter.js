import { defineStore, mapState } from 'pinia'
import useUserStore from './user'

export const useGetters = defineStore('getters', {
  getters: {
    ...mapState(useUserStore, ['token'])
  }
})
