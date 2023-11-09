import { Storage } from '@/utils/storage'
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    sidebar: {
      collapsed: Storage.get('collapsed') || false
    }
  }),
  actions: {
    TOGGLE_SIDEBAR() {
      const { sidebar } = this
      sidebar.collapsed = !sidebar.collapsed
      Storage.set('collapsed', sidebar.collapsed)
    }
  }
})
