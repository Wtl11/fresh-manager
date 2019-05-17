import API from '@api'
import app from '@src/main'

export const state = {
  // 今日爆款
  popularList: [],
  // 新人特惠
  preferenceList: [],
  // 拼团返现
  collageList: [],
  collagePage: {
    total: 1,
    per_page: 10,
    total_page: 1
  }
}

export const getters = {
  popularList: (state) => {
    return state.popularList
  },

  preferenceList: (state) => {
    return state.preferenceList
  },
  collageList: (state) => {
    return state.collageList
  },
  collagePage: (state) => {
    return state.collagePage
  },
}

export const mutations = {
  SET_POPULAR_LIST(state, list) {
    state.popularList = list
  },
  SET_PREFERENCE_LIST(state, list) {
    state.preferenceList = list
  },
  ADD_PREFERENCE_LIST(state, arr) {
    state.preferenceList = state.preferenceList.concat(arr)
  },
  SET_COLLAGE_LIST(state, list) {
    state.collageList = list
  },
  SET_COLLAGE_PAGE(state, page) {
    state.collagePage = page
  }

}

export const actions = {
  // 获取今日爆款列表
  getPopularList({commit}, loading) {
    return API.Activity.getPopularList(loading)
      .then((res) => {
        if (res.error !== app.$ERR_OK) {
          app.$toast.show(res.message)
          return
        }
        let list = res.data
        commit('SET_POPULAR_LIST', list)
        return true
      })
      .catch(() => {
        return false
      })
      .finally(() => {
        app.$loading.hide()
      })
  },
  // 获取新人特惠列表
  getPreferenceList({commit}, loading) {
    return API.Activity.getPreferenceGoods(loading)
      .then((res) => {
        if (res.error !== app.$ERR_OK) {
          app.$toast.show(res.message)
          return
        }
        let list = res.data
        commit('SET_PREFERENCE_LIST', list)
        return true
      })
      .catch(() => {
        return false
      })
      .finally(() => {
        app.$loading.hide()
      })
  },
  addPreferenceList({commit}, arr) {
    commit('ADD_PREFERENCE_LIST', arr)
  },
  // 获取拼团列表
  getCollageList({commit}, {page, startAt, endAt, loading}) {
    let data = {
      page,
      limit: 10,
      start_at: startAt,
      end_at: endAt
    }
    return API.Activity.getCollageList(data, loading)
      .then((res) => {
        if (res.error !== app.$ERR_OK) {
          app.$toast.show(res.message)
          return
        }
        let list = res.data
        let pages = res.meta
        let pageDetail = {
          total: pages.total,
          per_page: pages.per_page,
          total_page: pages.last_page
        }
        commit('SET_COLLAGE_PAGE', pageDetail)
        commit('SET_COLLAGE_LIST', list)
        return true
      })
      .catch(() => {
        return false
      })
      .finally(() => {
        app.$loading.hide()
      })
  }
}
