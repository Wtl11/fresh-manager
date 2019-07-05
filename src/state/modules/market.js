import API from '@api'
import app from '@src/main'

export const state = {
  marketList: [],
  marketPageDetail: {
    total: 1,
    per_page: 10,
    total_page: 1
  },
  marketDetail: {},
  marketStaPageDetail: {
    total: 1,
    per_page: 12,
    total_page: 1
  },
  inviteCount: 0,
  marketStaLists: [],
  defaultIndex: 0,
  requestData: {
    page: 1,
    status: ''
  }
}

export const getters = {
  marketList(state) {
    return state.marketList
  },
  marketPageDetail(state) {
    return state.marketPageDetail
  },
  marketDetail(state) {
    return state.marketDetail
  },
  marketStaPageDetail(state) {
    return state.marketStaPageDetail
  },
  marketStaLists(state) {
    return state.marketStaLists
  },
  inviteCount(state) {
    return state.inviteCount
  },
  defaultIndex(state) {
    return state.defaultIndex
  },
  requestData(state) {
    return state.requestData
  }
}

export const mutations = {
  SET_MARKET_LIST(state, marketList) {
    state.marketList = marketList
  },
  SET_MARKET_PAGE(state, marketPageDetail) {
    state.marketPageDetail = marketPageDetail
  },
  SET_MARKET_DETAIL(state, detail) {
    state.marketDetail = detail
  },
  SET_MARKET_STA_PAGE_DETAIL(state, detail) {
    state.marketStaPageDetail = detail
  },
  SET_MARKET_STA_LIST(state, marketStaLists) {
    state.marketStaLists = marketStaLists
  },
  SET_INVITE_COUNT(state, inviteCount) {
    state.inviteCount = inviteCount
  },
  SET_REQUEST_DATA(state, data) {
    state.requestData = Object.assign({}, state.requestData, data)
  },
  SET_DEFAULT_INDEX(state, index) {
    state.defaultIndex = index
  },
  RESET_DATA(state) {
    state.requestData = {
      page: 1,
      status: ''
    }
  }
}

export const actions = {
  getMarketList({commit, state}, loading = false) {
    return API.Market.getMarketList(state.requestData, loading)
      .then((res) => {
        if (res.error !== app.$ERR_OK) {
          app.$toast.show(res.message)
          return
        }
        let marketList = res.data
        let pages = res.meta
        let pageDetail = {
          total: pages.total,
          per_page: pages.per_page,
          total_page: pages.last_page
        }
        commit('SET_MARKET_PAGE', pageDetail)
        commit('SET_MARKET_LIST', marketList)
        return marketList
      })
      .catch(() => {
        return false
      })
      .finally(() => {
        app.$loading.hide()
      })
  },
  getMarketingStatisticsList({commit, state}, msg) {
    let {id, page, loading} = msg
    return API.Market.getMarketStatistic(id, {page, limit: 12}, loading)
      .then((res) => {
        if (res.error !== app.$ERR_OK) {
          app.$toast.show(res.message)
          return
        }
        let marketList = res.data
        let pages = res.meta
        let pageDetail = {
          total: pages.total,
          per_page: pages.per_page,
          total_page: pages.last_page
        }
        commit('SET_MARKET_STA_PAGE_DETAIL', pageDetail)
        commit('SET_MARKET_STA_LIST', marketList)
        commit('SET_INVITE_COUNT', res.invite_count)
        return marketList
      })
      .catch(() => {
        return false
      })
      .finally(() => {
        app.$loading.hide()
      })
  },
  getMarketDetail({commit}, id) {
    return API.Market.getMarketDetail(id)
      .then((res) => {
        if (res.error !== app.$ERR_OK) {
          app.$toast.show(res.message)
          return
        }
        commit('SET_MARKET_DETAIL', res.data)
        return res.data
      })
      .catch(() => {
        return false
      })
      .finally(() => {
        app.$loading.hide()
      })
  },
  resetData({commit}) {
    commit('RESET_DATA')
    commit('SET_DEFAULT_INDEX', 0)
  },
  setRequestData({commit, dispatch}, data) {
    commit('SET_REQUEST_DATA', data)
    dispatch('getMarketList')
  },
  setDefaultIndex({commit, dispatch}, data) {
    commit('SET_DEFAULT_INDEX', data.index)
    commit('SET_REQUEST_DATA', {status: data.status})
    dispatch('getMarketList')
  }
}
