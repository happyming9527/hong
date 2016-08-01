"use strict";

const giftOrderStatus = new Array(
  {key: 1, value:'待审核' },
  {key: 2, value:'审核拒绝' },
  {key: 3, value:'审核通过待发货' },
  {key: 4, value:'已发货' }
)

const opState = new Array(
  {key: 0, value:'未发布' },
  {key: 1, value:'已发布' },
  {key: 2, value:'已置顶' },
  {key: 3, value:'已推荐' }
)

const expressCompany = new Array(
  {key: 'shentong', value: '申通快递'},
  {key: 'debangwuliu', value: '德邦物流'},
  {key: 'youzhengguonei', value: '邮政国内'},
  {key: 'ems', value: 'EMS'},
  {key: 'yuantong', value: '圆通快递'},
  {key: 'huitongkuaidi', value: '汇通快递'},
  {key: 'zhongtong', value: '中通快递'},
  {key: 'yunda', value: '韵达快递'},
  {key: 'shunfeng', value: '顺丰快递'},
  {key: 'tiantian', value: '天天快递'},
  {key: 'quanfengkuaidi', value: '全风快递'}
)

export {giftOrderStatus, expressCompany, opState}

const obj = {
  giftOrderStatus,
  opState,
  expressCompany
}

export default obj