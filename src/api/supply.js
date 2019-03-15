import request from '@utils/request'

export default {
  /**
   * 采购单列表
   * @param data
   * @param loading
   * @returns {*}
   */
  purchaseOrder(data, loading = true) {
    let url = '/scm/api/backend/purchase/purchase-order'
    return request.get(url, data, loading)
  },
  /**
   * 查询采购单详情
   * @param data
   * @param loading
   * @returns {*}
   */
  purchaseDetail(id, loading = true) {
    let url = `/scm/api/backend/purchase/purchase-order/${id}`
    return request.get(url, null, loading)
  },
  /**
   * 查询采购单详情
   * @param data
   * @param loading
   * @returns {*}
   */
  purchaseOrderExport(id, loading = true) {
    let url = `/scm/api/backend/purchase/purchase-order-export/${id}`
    return request.get(url, null, loading)
  },
  /**
   * 采购任务列表
   * @param data
   * @param loading
   * @returns {*}
   */
  purchaseTask(data, loading = true) {
    let url = `/scm/api/backend/purchase/purchase-task`
    return request.get(url, data, loading)
  },
  /**
   * 发布采购任务
   * @param data
   * @param loading
   * @returns {*}
   */
  purchaseTaskPublish(data, loading = true) {
    let url = `/scm/api/backend/purchase/purchase-task-publish`
    return request.post(url, data, loading)
  },
  /**
   * 新增采购任务
   * @param data
   * @param loading
   * @returns {*}
   */
  storePurchaseTask(data, loading = true) {
    let url = `/scm/api/backend/purchase/purchase-task`
    return request.post(url, data, loading)
  },
  /**
   * 采购任务选择商品列表
   * @param data
   * @param loading
   * @returns {*}
   */
  purchaseTaskGoodsList(data, loading = false) {
    let url = `/scm/api/backend/purchase/purchase-task-goods-list`
    return request.get(url, data, loading)
  }
}
