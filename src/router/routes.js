import store from '@state/store'

export default [
  // 模板
  {
    path: '/demo',
    name: 'demo',
    component: () => lazyLoadView(import('@pages/demo/demo'))
  },
  // 登录界面
  {
    path: '/login',
    name: 'login',
    component: () => lazyLoadView(import('@pages/login/login')),
    meta: {
      beforeResolve(routeTo, routeFrom, next) {
        // 判断用户是否已经登录
        if (store.getters['auth/loggedIn']) {
          next({name: 'product-list'})
        } else {
          next()
        }
      }
    }
  },
  {
    path: '/home',
    name: 'home',
    component: () => lazyLoadView(import('@pages/home/home')),
    meta: {
      authRequired: true
    },
    redirect: 'home/product-list',
    children: [
      /**
       * 商品
       */
      // 商品列表
      {
        path: 'product-list',
        name: 'product-list',
        component: () => lazyLoadView(import('@pages/product-list/product-list')),
        meta: {
          titles: ['商城', '商品', '商品列表'],
          beforeResolve(routeTo, routeFrom, next) {
            //  团长列表
            store
              .dispatch('editgoods/getGoodsData', 1)
              .then((res) => {
                if (!res) {
                  return next({name: '404'})
                }
                return next()
              })
              .catch(() => {
                return next({name: '404'})
              })
          }
        }
      },
      // 商品分类
      {
        path: 'product-categories',
        name: 'product-categories',
        component: () => lazyLoadView(import('@pages/product-categories/product-categories')),
        meta: {
          titles: ['商城', '商品', '商品分类'],
          beforeResolve(routeTo, routeFrom, next) {
            //  商品分类
            store
              .dispatch('categories/getCategoryList', -1)
              .then((res) => {
                if (!res) {
                  return next({name: '404'})
                }
                return next()
              })
              .catch(() => {
                return next({name: '404'})
              })
          }
        }
      },
      // 辅助资料
      {
        path: 'auxiliary-information',
        name: 'auxiliary-information',
        component: () => lazyLoadView(import('@pages/auxiliary-information/auxiliary-information')),
        meta: {
          titles: ['商城', '商品', '辅助资料'],
          beforeResolve(routeTo, routeFrom, next) {
            //  辅助资料
            store
              .dispatch('auxiliary/getAuxiliaryList', 1)
              .then((res) => {
                if (!res) {
                  return next({name: '404'})
                }
                return next()
              })
              .catch(() => {
                return next({name: '404'})
              })
          }
        }
      },
      // 编辑商品
      {
        path: 'product-list/edit-goods',
        name: 'edit-goods',
        component: () => lazyLoadView(import('@pages/edit-goods/edit-goods')),
        meta: {
          titles: ['商城', '商品', '商品列表', '新建商品'],
          marginBottom: 80,
          beforeResolve(routeTo, routeFrom, next) {
            if (!routeTo.query.id) {
              return next()
            }
            store
              .dispatch('editgoods/getGoodsDetailData', routeTo.query.id)
              .then((response) => {
                if (!response) {
                  return next({name: '404'})
                }
                routeTo.params.detail = response
                next()
              })
              .catch(() => {
                next({name: '404'})
              })
          }
        },
        props: (route) => ({detail: route.params.detail})
      },
      /**
       * 商品
       *
       * ------------------------------------------------------------------------------------------
       *
       * 商城
       */
      // 轮播广告
      {
        path: 'advertisement',
        name: 'advertisement',
        component: () => lazyLoadView(import('@pages/advertisement/advertisement')),
        meta: {
          titles: ['商城', '内容', '内容管理'],
          marginBottom: 80,
          beforeResolve(routeTo, routeFrom, next) {
            //  团长列表
            store
              .dispatch('advertisement/getInfoBannerList')
              .then((res) => {
                if (!res) {
                  return next({name: '404'})
                }
                return next()
              })
              .catch(() => {
                return next({name: '404'})
              })
          }
        }
      },
      // 今日抢购
      {
        path: 'rush-purchase',
        name: 'rush-purchase',
        component: () => lazyLoadView(import('@pages/rush-purchase/rush-purchase')),
        meta: {
          titles: ['商城', '活动', '今日抢购'],
          beforeResolve(routeTo, routeFrom, next) {
            //  团长列表
            store
              .dispatch('rush/getRushList', {page: 1})
              .then((res) => {
                if (!res) {
                  return next({name: '404'})
                }
                return next()
              })
              .catch(() => {
                return next({name: '404'})
              })
          }
        }
      },
      // 新建编辑今日抢购
      {
        path: 'rush-purchase/edit-rush',
        name: 'edit-rush',
        component: () => lazyLoadView(import('@pages/edit-rush/edit-rush')),
        meta: {
          titles: ['商城', '活动', '今日抢购', '新建活动'],
          marginBottom: 80,
          beforeResolve(routeTo, routeFrom, next) {
            let id = routeTo.query.id
            //  团长列表
            if (id) {
              store
                .dispatch('rush/getRushDetail', {id})
                .then((res) => {
                  if (!res) {
                    return next({name: '404'})
                  }
                  return next()
                })
                .catch(() => {
                  return next({name: '404'})
                })
            }
            return next()
          }
        }
      },
      // 拓展活动
      {
        path: 'outreach-activity',
        name: 'outreach-activity',
        component: () => lazyLoadView(import('@pages/outreach-activity/outreach-activity')),
        meta: {
          titles: ['商城', '活动', '拓展活动'],
          beforeResolve(routeTo, routeFrom, next) {
            // 活动列表
            store
              .dispatch('outreach/getOutreachList', {page: 1})
              .then((res) => {
                if (!res) {
                  return next({name: '404'})
                }
                return next()
              })
              .catch(() => {
                return next({name: '404'})
              })
          }
        }
      },
      // 新建查看拓展活动
      {
        path: 'outreach-activity/edit-outreach',
        name: 'edit-outreach',
        component: () => lazyLoadView(import('@pages/edit-outreach/edit-outreach')),
        meta: {
          titles: ['商城', '活动', '拓展活动', '新建活动'],
          marginBottom: 80,
          beforeResolve(routeTo, routeFrom, next) {
            let id = routeTo.query.id
            // 活动详情
            if (id) {
              store
                .dispatch('outreach/getOutreachDetail', {id})
                .then((res) => {
                  if (!res) {
                    return next({name: '404'})
                  }
                  return next()
                })
                .catch(() => {
                  return next({name: '404'})
                })
            }
            return next()
          }
        }
      },
      /**
       * 商城
       *
       * ------------------------------------------------------------------------------------------
       *
       * 订单
       */
      // 订单列表
      {
        path: 'order-list',
        name: 'order-list',
        component: () => lazyLoadView(import('@pages/order-list/order-list')),
        meta: {
          titles: ['商城', '订单', '订单列表'],
          beforeResolve(routeTo, routeFrom, next) {
            //  订单列表
            store
              .dispatch('order/getOrderList')
              .then((res) => {
                if (!res) {
                  return next({name: '404'})
                }
                return next()
              })
              .catch(() => {
                return next({name: '404'})
              })
          }
        }
      },
      // 退货
      {
        path: 'returns-management',
        name: 'returns-management',
        component: () => lazyLoadView(import('@pages/returns-management/returns-management')),
        meta: {
          titles: ['商城', '订单', '退货管理'],
          beforeResolve(routeTo, routeFrom, next) {
            //  订单列表
            store
              .dispatch('returns/getReturnsList')
              .then((res) => {
                if (!res) {
                  return next({name: '404'})
                }
                return next()
              })
              .catch(() => {
                return next({name: '404'})
              })
          }
        }
      },
      // 退款详情
      {
        path: 'returns-management/refund-detail/:id',
        name: 'refund-detail',
        component: () => lazyLoadView(import('@pages/refund-detail/refund-detail')),
        meta: {
          titles: ['商城', '订单', '退货管理', '退款详情'],
          beforeResolve(routeTo, routeFrom, next) {
            store
              .dispatch('returns/getReturnsDetail', routeTo.params.id)
              .then((res) => {
                if (!res) {
                  return next({name: '404'})
                }
                return next()
              })
              .catch(() => {
                return next({name: '404'})
              })
          }
        }
      },
      {
        path: 'order-list/order-detail/:id',
        name: 'order-detail',
        component: () => lazyLoadView(import('@pages/order-detail/order-detail')),
        meta: {
          titles: ['商城', '订单', '订单列表', '订单详情'],
          beforeResolve(routeTo, routeFrom, next) {
            store
              .dispatch('order/getOrderDetail', routeTo.params.id)
              .then((res) => {
                if (!res) {
                  return next({name: '404'})
                }
                return next()
              })
              .catch(() => {
                return next({name: '404'})
              })
          }
        }
      },
      /**
       * 订单
       *
       * ------------------------------------------------------------------------------------------
       *
       * 采购
       */
      {
        path: 'purchase-management',
        name: 'purchase-management',
        component: () => lazyLoadView(import('@pages/purchase-management/purchase-management')),
        meta: {
          titles: ['商城', '采购', '采购管理'],
          beforeResolve(routeTo, routeFrom, next) {
            store
              .dispatch('purchase/getPurchaseList', {page: 1, orderSn: ''})
              .then((res) => {
                if (!res) {
                  return next({name: '404'})
                }
                routeTo.params.detail = res
                next()
              })
              .catch(() => {
                next({name: '404'})
              })
          }
        }
      },
      // 采购详情
      {
        path: 'purchase-management/purchase-detail',
        name: 'purchase-detail',
        component: () => lazyLoadView(import('@pages/purchase-detail/purchase-detail')),
        meta: {
          titles: ['商城', '采购', '采购管理', '采购详情'],
          marginBottom: 80,
          beforeResolve(routeTo, routeFrom, next) {
            if (!routeTo.query.id) {
              return next()
            }
            store
              .dispatch('purchase/getPurchaseDetail', routeTo.query.id)
              .then((res) => {
                if (!res) {
                  return next({name: '404'})
                }
                routeTo.params.detail = res
                next()
              })
              .catch(() => {
                next({name: '404'})
              })
          }
        },
        props: (route) => ({detail: route.params.detail})
      },
      /**
       * 采购
       *
       * ------------------------------------------------------------------------------------------
       *
       * 客户
       */
      // 客户
      {
        path: 'customer-management',
        name: 'customer-management',
        component: () => lazyLoadView(import('@pages/customer-management/customer-management')),
        meta: {
          titles: ['商城', '客户', '客户管理'],
          beforeResolve(routeTo, routeFrom, next) {
            store
              .dispatch('customer/getCustomerList', {page: 1, startTime: '', endTime: '', keyword: '', sortType: 0})
              .then((res) => {
                if (!res) {
                  return next({name: '404'})
                }
                routeTo.params.detail = res
                next()
              })
              .catch(() => {
                next({name: '404'})
              })
          }
        }
      },
      /**
       * 客户
       *
       * ------------------------------------------------------------------------------------------
       *
       * 团长
       */
      // 团长列表
      {
        path: 'leader-list',
        name: 'leader-list',
        component: () => lazyLoadView(import('@pages/leader-list/leader-list')),
        meta: {
          titles: ['商城', '团长', '团长列表'],
          beforeResolve(routeTo, routeFrom, next) {
            //  团长列表
            store
              .dispatch('leader/getLeaderList', 1)
              .then((res) => {
                if (!res) {
                  return next({name: '404'})
                }
                return next()
              })
              .catch(() => {
                return next({name: '404'})
              })
          }
        }
      },
      // 配送单
      {
        path: 'dispatching-list',
        name: 'dispatching-list',
        component: () => lazyLoadView(import('@pages/dispatching-list/dispatching-list')),
        meta: {
          titles: ['商城', '团长', '团长配送单'],
          beforeResolve(routeTo, routeFrom, next) {
            //  团长列表
            store
              .dispatch('leader/getDeliveryOrder', {page: 1, shopId: ''})
              .then((res) => {
                if (!res) {
                  return next({name: '404'})
                }
                return next()
              })
              .catch(() => {
                return next({name: '404'})
              })
          }
        }
      },
      // 团长配送单详情
      {
        path: 'dispatching-list/dispatching-detail',
        name: 'dispatching-detail',
        component: () => lazyLoadView(import('@pages/dispatching-detail/dispatching-detail')),
        meta: {
          titles: ['商城', '团长', '团长配送单', '配送单详情'],
          marginBottom: 80,
          beforeResolve(routeTo, routeFrom, next) {
            if (!routeTo.query.id) {
              return next()
            }
            store
              .dispatch('leader/getDeliveryDetail', routeTo.query.id)
              .then((res) => {
                if (!res) {
                  return next({name: '404'})
                }
                routeTo.params.detail = res
                next()
              })
              .catch(() => {
                next({name: '404'})
              })
          }
        },
        props: (route) => ({detail: route.params.detail})
      },
      // 新建团长
      {
        path: 'leader-list/edit-leader',
        name: 'edit-leader',
        component: () => lazyLoadView(import('@pages/edit-leader/edit-leader')),
        meta: {
          titles: ['商城', '团长', '团长配送单', '新建团长'],
          marginBottom: 80,
          beforeResolve(routeTo, routeFrom, next) {
            if (!routeTo.query.id) {
              return next()
            }
            store
              .dispatch('leader/getLeaderDetail', routeTo.query.id)
              .then((response) => {
                if (!response) {
                  return next({name: '404'})
                }
                routeTo.params.detail = response
                next()
              })
              .catch(() => {
                next({name: '404'})
              })
          }
        },
        props: (route) => ({detail: route.params.detail})
      },
      // 团长结算
      {
        path: 'head-settlement',
        name: 'head-settlement',
        component: () => lazyLoadView(import('@pages/head-settlement/head-settlement')),
        meta: {
          titles: ['商城', '团长', '团长结算'],
          beforeResolve(routeTo, routeFrom, next) {
            store
              .dispatch('leader/getSettlementList', {page: 1, keyword: ''})
              .then((response) => {
                if (!response) {
                  return next({name: '404'})
                }
                routeTo.params.detail = response
                next()
              })
              .catch(() => {
                next({name: '404'})
              })
          }
        }
      },
      // 团长结算详情
      {
        path: 'head-settlement/settlement-detail/:id/:name',
        name: 'settlement-detail',
        component: () => lazyLoadView(import('@pages/settlement-detail/settlement-detail')),
        meta: {
          titles: ['商城', '团长', '团长结算', '团长结算详情'],
          beforeResolve(routeTo, routeFrom, next) {
            let data = {page: 1, shopId: routeTo.params.id, orderSn: '', status: '', settlementType: ''}
            store
              .dispatch('leader/getSettlementDetail', data)
              .then((response) => {
                if (!response) {
                  return next({name: '404'})
                }
                routeTo.params.detail = response
                next()
              })
              .catch(() => {
                next({name: '404'})
              })
          }
        }
      },
      // 团长提现
      {
        path: 'leader-withdrawal',
        name: 'leader-withdrawal',
        component: () => lazyLoadView(import('@pages/leader-withdrawal/leader-withdrawal')),
        meta: {
          titles: ['商城', '团长', '团长提现'],
          beforeResolve(routeTo, routeFrom, next) {
            //  订单列表
            store
              .dispatch('leader/getWithdrawalList')
              .then((res) => {
                if (!res) {
                  return next({name: '404'})
                }
                return next()
              })
              .catch(() => {
                return next({name: '404'})
              })
          }
        }
      },
      // 收支明细
      {
        path: 'leader-withdrawal/budget-detail/:id/:name',
        name: 'budget-detail',
        component: () => lazyLoadView(import('@pages/budget-detail/budget-detail')),
        meta: {
          titles: ['商城', '团长', '团长提现', '收支明细', ''],
          beforeResolve(routeTo, routeFrom, next) {
            store
              .dispatch('leader/getBillList', routeTo.params.id)
              .then((res) => {
                if (!res) {
                  return next({name: '404'})
                }
                return next()
              })
              .catch(() => {
                return next({name: '404'})
              })
          }
        }
      },
      /**
       * 客户
       *
       * ------------------------------------------------------------------------------------------
       *
       * 财务
       */
      // 交易记录
      {
        path: 'transaction-record',
        name: 'transaction-record',
        component: () => lazyLoadView(import('@pages/transaction-record/transaction-record')),
        meta: {
          titles: ['财务', '交易记录'],
          beforeResolve(routeTo, routeFrom, next) {
            store
              .dispatch('trade/getTradeList')
              .then((res) => {
                if (!res) {
                  return next({name: '404'})
                }
                return next()
              })
              .catch(() => {
                return next({name: '404'})
              })
          }
        }
      },
      // 营业概况
      {
        path: 'business-overview',
        name: 'business-overview',
        component: () => lazyLoadView(import('@pages/business-overview/business-overview')),
        meta: {
          titles: ['财务', '营业概况']
        }
      },
      // 营业成本
      {
        path: 'business-overview/operating-cost',
        name: 'operating-cost',
        component: () => lazyLoadView(import('@pages/operating-cost/operating-cost')),
        meta: {
          titles: ['财务', '营收概况', '营业成本']
        }
      },
      /**
       * 财务
       *
       * ------------------------------------------------------------------------------------------
       *
       * 数据
       */
      // 数据统计
      {
        path: 'data-survey',
        name: 'data-survey',
        component: () => lazyLoadView(import('@pages/data-survey/data-survey')),
        meta: {
          titles: ['统计', '数据统计'],
          beforeResolve(routeTo, routeFrom, next) {
            store
              .dispatch('data/getOrderDetail', {startTime: '', endTime: '', time: 'today', loading: true})
              .then((res) => {
                if (!res) {
                  return next({name: '404'})
                }
                routeTo.params.detail = res
                next()
              })
              .catch(() => {
                next({name: '404'})
              })
          }
        }
      },
      /**
       *
       * ------------------------------------------------------------------------------------------
       *
       * 供应链
       */
      // 采购任务
      {
        path: 'procurement-task',
        name: 'procurement-task',
        component: () => lazyLoadView(import('@pages/procurement-task/procurement-task')),
        meta: {
          titles: ['供应链', '采购', '采购任务'],
          beforeResolve(routeTo, routeFrom, next) {
            let time = new Date()
            time = time.toLocaleDateString().replace(/\//g, '-')
            store
              .dispatch('proTask/getPurchaseTaskList', {
                time: '',
                startTime: time,
                endTime: time,
                keyword: '',
                page: 1,
                status: '',
                loading: true
              })
              .then((res) => {
                if (!res) {
                  return next({name: '404'})
                }
                routeTo.params.detail = res
                next()
              })
              .catch(() => {
                next({name: '404'})
              })
          }
        }
      },
      // 采购员
      {
        path: 'buyer',
        name: 'buyer',
        component: () => lazyLoadView(import('@pages/buyer/buyer')),
        meta: {
          titles: ['供应链', '采购', '采购员列表'],
          beforeResolve(routeTo, routeFrom, next) {
            next()
          }
        }
      },
      // 新建采购员
      {
        path: 'buyer/edit-procurement',
        name: 'edit-procurement',
        component: () => lazyLoadView(import('@pages/edit-procurement/edit-procurement')),
        meta: {
          marginBottom: 80,
          titles: ['供应链', '采购', '采购员', '新建采购员'],
          beforeResolve(routeTo, routeFrom, next) {
            next()
          }
        }
      },
      // 采购单列表
      {
        path: 'purchase-order',
        name: 'purchase-order',
        component: () => lazyLoadView(import('@pages/purchase-order/purchase-order')),
        meta: {
          titles: ['供应链', '采购', '采购单'],
          beforeResolve(routeTo, routeFrom, next) {
            let time = new Date()
            time = time.toLocaleDateString().replace(/\//g, '-')
            store
              .dispatch('supply/getPurchaseList', {
                time: '',
                startTime: time,
                endTime: time,
                keyword: '',
                page: 1,
                loading: true
              })
              .then((res) => {
                if (!res) {
                  return next({name: '404'})
                }
                routeTo.params.detail = res
                next()
              })
              .catch(() => {
                next({name: '404'})
              })
          }
        }
      },
      // 采购单详情
      {
        path: 'purchase-order/purchase-order-detail/:id',
        name: 'purchase-order-detail',
        component: () => lazyLoadView(import('@pages/purchase-order-detail/purchase-order-detail')),
        meta: {
          titles: ['供应链', '采购', '采购单', '采购单详情'],
          beforeResolve(routeTo, routeFrom, next) {
            store
              .dispatch('supply/getPurchaseDetail', routeTo.params.id)
              .then((res) => {
                if (!res) {
                  return next({name: '404'})
                }
                routeTo.params.detail = res
                next()
              })
              .catch(() => {
                next({name: '404'})
              })
            next()
          }
        }
      },
      // 供应商
      {
        path: 'supplier',
        name: 'supplier',
        component: () => lazyLoadView(import('@pages/supplier/supplier')),
        meta: {
          titles: ['供应链', '采购', '供应商'],
          beforeResolve(routeTo, routeFrom, next) {
            next()
          }
        }
      },
      // 新建供应商
      {
        path: 'supplier/edit-supplier',
        name: 'edit-supplier',
        component: () => lazyLoadView(import('@pages/edit-supplier/edit-supplier')),
        meta: {
          titles: ['供应链', '采购', '供应商', '新建供应商'],
          beforeResolve(routeTo, routeFrom, next) {
            next()
          }
        }
      },
      // 成品入库
      {
        path: 'product-enter',
        name: 'product-enter',
        component: () => lazyLoadView(import('@pages/product-enter/product-enter')),
        meta: {
          titles: ['供应链', '仓库', '成品入库'],
          beforeResolve(routeTo, routeFrom, next) {
            store
              .dispatch('product/getEnterData', 1)
              .then((res) => {
                if (!res) {
                  return next({name: '404'})
                }
                return next()
              }).catch(() => {
              return next({name: '404'})
            })
          }
        }
      },
      // 成品入库明细
      {
        path: 'product-enter/enter-detail/:id',
        name: 'enter-detail',
        component: () => lazyLoadView(import('@pages/enter-detail/enter-detail')),
        meta: {
          titles: ['供应链', '仓库', '成品入库', '商品明细'],
          beforeResolve(routeTo, routeFrom, next) {
            store
              .dispatch('product/getEnterDetailData', routeTo.params.id)
              .then((res) => {
                if (!res) {
                  return next({name: '404'})
                }
                return next()
              })
              .catch(() => {
                return next({name: '404'})
              })
          }
        }
      },
      // 成品入库明细
      {
        path: 'product-out',
        name: 'product-out',
        component: () => lazyLoadView(import('@pages/product-out/product-out')),
        meta: {
          titles: ['供应链', '仓库', '成品出库'],
          beforeResolve(routeTo, routeFrom, next) {
            store
              .dispatch('product/getOutData', 1)
              .then((res) => {
                if (!res) {
                  return next({name: '404'})
                }
                return next()
              }).catch(() => {
              return next({name: '404'})
            })
          }
        }
      },
      // 成品入库明细
      {
        path: 'product-out/out-detail/:id',
        name: 'out-detail',
        component: () => lazyLoadView(import('@pages/out-detail/out-detail')),
        meta: {
          titles: ['供应链', '仓库', '成品出库', '商品明细'],
          beforeResolve(routeTo, routeFrom, next) {
            store
              .dispatch('product/getOutDetailData', routeTo.params.id)
              .then((res) => {
                if (!res) {
                  return next({name: '404'})
                }
                return next()
              })
              .catch(() => {
                return next({name: '404'})
              })
          }
        }
      },
      // 成品入库明细
      {
        path: 'product-out/edit-store',
        name: 'edit-store',
        component: () => lazyLoadView(import('@pages/edit-store/edit-store')),
        meta: {
          titles: ['供应链', '仓库', '成品出库', '新建出库单'],
          beforeResolve(routeTo, routeFrom, next) {
            next()
          }
        }
      },
      // 库位管理
      {
        path: 'store-manage',
        name: 'store-manage',
        component: () => lazyLoadView(import('@pages/store-manage/store-manage')),
        meta: {
          titles: ['供应链', '仓库', '库位管理'],
          beforeResolve(routeTo, routeFrom, next) {
            store
              .dispatch('product/getStore')
              .then((res) => {
                if (!res) {
                  return next({name: '404'})
                }
                return next()
              }).catch(() => {
              return next({name: '404'})
            })
          }
        }
      },
      // 配送任务
      {
        path: 'distribution-task',
        name: 'distribution-task',
        component: () => lazyLoadView(import('@pages/distribution-task/distribution-task')),
        meta: {
          titles: ['供应链', '配送', '配送任务'],
          beforeResolve(routeTo, routeFrom, next) {
            store
              .dispatch('delivery/getDriverList')
              .then((res) => {
                if (!res) {
                  return next({name: '404'})
                }
                return next()
              }).catch(() => {
              return next({name: '404'})
            })
          }
        }
      },
      // 调度管理
      {
        path: 'dispatching-management',
        name: 'dispatching-management',
        component: () => lazyLoadView(import('@pages/dispatching-management/dispatching-management')),
        meta: {
          titles: ['供应链', '配送', '调度管理'],
          beforeResolve(routeTo, routeFrom, next) {
            store
              .dispatch('delivery/getDriverList')
              .then((res) => {
                if (!res) {
                  return next({name: '404'})
                }
                return next()
              }).catch(() => {
                return next({name: '404'})
            })
          }
        }
      },
      // 调度管理
      {
        path: 'supply-list',
        name: 'supply-list',
        component: () => lazyLoadView(import('@pages/supply-list/supply-list')),
        meta: {
          titles: ['供应链', '订单', '订单列表'],
          beforeResolve(routeTo, routeFrom, next) {
            store
              .dispatch('oms/getOmsOrders')
              .then((res) => {
                if (!res) {
                  return next({name: '404'})
                }
                return next()
              })
              .catch(() => {
                return next({name: '404'})
              })
          }
        }
      },
      // 调度管理
      {
        path: 'supply-list/supply-detail/:id',
        name: 'supply-detail',
        component: () => lazyLoadView(import('@pages/supply-detail/supply-detail')),
        meta: {
          titles: ['供应链', '订单', '订单列表', '订单详情'],
          beforeResolve(routeTo, routeFrom, next) {
            if (!routeTo.params.id) {
              return next()
            }
            store
              .dispatch('oms/getOmsOrderDetail', routeTo.params.id)
              .then((res) => {
                if (!res) {
                  return next({name: '404'})
                }
                next()
              })
              .catch(() => {
                next({name: '404'})
              })
          }
        }
      }
    ]
  },
  {
    path: '/404',
    name: '404',
    component: require('@pages/_404/_404').default,
    props: true
  },
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '*',
    redirect: '404'
  }
]

function lazyLoadView(AsyncView) {
  const AsyncHandler = () => ({
    component: AsyncView,
    loading: require('@pages/_loading/_loading').default,
    delay: 400,
    error: require('@pages/_timeout/_timeout').default,
    timeout: 10000
  })

  return Promise.resolve({
    functional: true,
    render(h, {data, children}) {
      // 将属性和方法传递给所有展示组件
      return h(AsyncHandler, data, children)
    }
  })
}
