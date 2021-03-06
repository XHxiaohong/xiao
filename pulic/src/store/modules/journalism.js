// @ts-nocheck


// 配置菜单数据
const list = [
  '腾讯新闻哥致歉',
  '腾讯新闻哥致歉',
  '青岛中能宣布主帅',
  '卡舒吉遇害案进展',
  '泫雅李佳琦同框',
  '林书豪32分',
  '26日上演金环日食',
  '智能助手劝人自杀',
  '波音CEO辞职',
  '世俱杯利物浦夺',
  '冠詹姆斯胸肌拉伤',
  '漠河千人泼水成冰',
  '澳珠烟花汇演',
  '林宗虎逝世',
  '冬至饺子',
  'SOHO成立新公司',
  '农村小伙模仿刘雯',
  '湖人三连败',
  '刘鑫微博被封',
  'CBA冬至大战',
  '张瀞仁离世',
  '哈登47分',
  '长沙万家丽路坍塌',
  '易烊千玺演唱会',
  '伊朗西南部地震',
  '星际客机首飞失利',
  'BBS发明人去世',
  '北京第三场雪',
  '复垦地偷埋固废',
  '澳门成功密码',
  '天津3.3级地震',
  '高校免费派发蛋糕',
  'VG 夺冠'
]

const homeContent = [{
  title: '日本政府决定向中东派遣自卫队',
  author: '观察者网',
  time: '12-27 09:15',
  imgUrl: ['/images/1.jpeg']
}, {
  title: '独家｜第二个被终身监禁的银行董事长：姜喜运的恒丰银行往事',
  author: '第一财经',
  time: '12-26 21:40',
  imgUrl: []
}, {
  title: '猛然放宽城市落户限制，农民拔根成“伪中产”？',
  author: '观察者网',
  time: '12-27 08:33',
  imgUrl: ['/images/2.jpeg']
}, {
  title: '还有4天过年！这十件大事你还没看懂吗？',
  author: '中国经营报',
  time: '12-27 09:41',
  imgUrl: ['/images/3.jpeg', '/images/4.jpeg', '/images/5.jpeg']
}]

const state = {
  j_index: 0,
  journalism: list,
  homeContent
}

const getters = {
	getJList: (state)=> ()=> {
    let index = [];
    for (let i = 0; i < 16; i++) {
      let t = Math.floor(Math.random() * 32);
      if (index.indexOf(t) == -1) {
        index.push(t);
      } else {
        i--
      }
    }
    
    index.forEach((key, i)=> {
      index.splice(i, 1, state.journalism[key])
    })

    return index
  }
}

export default {
	state,
	getters
}