"use strict";
class SubArray {
  constructor(array) {
    this.array = array
  }
  fetch = (text)=>{
    let obj = this.array.find(i=>i.key==text)
    if (obj) {
      return obj.value
    } else {
      return null
    }
  }

  addExtra = (value)=>{
    let newArray = this.array.slice()
    newArray.unshift({key: value, value: '---请选择---'})
    return new SubArray(newArray)
  }

  removeSome = (value)=>{
    let newArray = []
    this.array.forEach(i=>{
      if (value.indexOf(i.key)<0) {
        newArray.push(i)
      }
    })
    return new SubArray(newArray)
  }

  toArray() {
    return this.array
  }

  fetchObj = (text)=> {
    let obj = this.array.find(i=>i.key==text)
    if (obj) {
      return obj
    } else {
      return null
    }
  }

  map = (func)=>{
    return this.array.map(func)
  }

}

const giftOrderStatus = new SubArray([
  {key: 1, value:'待审核' },
  {key: 2, value:'审核拒绝' },
  {key: 3, value:'审核通过待发货' },
  {key: 4, value:'已发货' }]
)

const opState = new SubArray([
  {key: -1, value:'已删除' },
  {key: 0, value:'未发布' },
  {key: 1, value:'已发布' },
  {key: 2, value:'已置顶' },
  {key: 3, value:'已推荐' }]
)

const expressCompany = new SubArray([
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
  {key: 'quanfengkuaidi', value: '全风快递'}]
)

const ReportedFeedState = new SubArray([
  {key: 50, value:'尚未处理的' },
  {key: 51, value:'按取消处理' },
  {key: 1, value:'按无价值的，混分处理' },
  {key: 2, value:'按重复处理' },
  {key: 3, value:'按骚扰处理' },
  {key: 4, value:'按广告处理' },
  {key: 5, value:'按不恰当的，影响社区氛围处理' }]

)

const userCategory = new SubArray([
  {key: 1, value: '备孕'},
  {key: 2, value: '孕期'},
  {key: 3, value: '辣妈'}]
)

const shakeTipState = new SubArray([
  {key: 0, value:'未发布' },
  {key: 1, value:'已发布' }]
)

const topicState = new SubArray([
  {key: 0, value:'未发布' },
  {key: 1, value:'已发布' }]
)

const advState = new SubArray([
  {key: 0, value:'未发布' },
  {key: 1, value:'已发布' }]
)

const egcTags = new SubArray([
  {key: '孕期', value: '孕期'},
  {key: '生啦', value: '生啦'}]
)

const feedType = new SubArray([
  {key: 1, value: '普通'},
  {key: 2, value: '外链'}]
)


const activityState = new SubArray([
  {key: 0, value: '未发布'},
  {key: 1, value: '已发布'}
  ]
)

const giftState = new SubArray([
    {key: 0, value: '未发布'},
    {key: 1, value: '已发布'}
  ]
)

const userFeedPrivateState = new SubArray([
  {key: 0, value: '公开'},
  {key: 1, value: '仅好友可见'},
  {key: 2, value: '仅自己可见'}
])
const blacklistKind = new SubArray([
  {key: 1, value: '普通黑名单'},
  {key: 2, value: '星星榜黑名单'}
])

const addScoreReason = new SubArray([
  { key: -1, value: '违规惩罚'},
  {key: 6, value: '参加活动' },
  { key: 8, value: '邀请用户'},
  { key: 10, value: '其他'}
])

const topicType = new SubArray([
  {key: 0, value: '普通话题'},
  {key: 1, value: '邀请用户话题（实时积分）'},
  {key: 2, value: '邀请用户话题（统计积分）'}
])

export {giftOrderStatus, expressCompany, opState, ReportedFeedState, userCategory, shakeTipState, egcTags, activityState, feedType, blacklistKind, giftState, topicState, userFeedPrivateState, advState, addScoreReason, topicType}
