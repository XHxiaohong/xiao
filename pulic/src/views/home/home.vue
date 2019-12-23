<template>
  <div id="home" class="container">
    <ul class="xh-hema">
      <template v-for="itme in list">
        <li :key="itme.icon" :style="{background: itme.bg_coloe}">
          <i :class="['xh-icon', itme.icon]"></i>
          <div>
            <span>{{ itme.name }}</span>
            <span>{{ itme.num }}</span>
          </div>
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      list: [
        {icon: 'xh-icon-layer',  name: '订单数', num: '#523', bg_coloe: '#19be6b' },
        {icon: 'xh-icon-zhifu1',  name: '支付数', num: '#234', bg_coloe: '#2db7f5' },
        {icon: 'xh-icon-quxiaodingdan',  name: '取消订单', num: '#43', bg_coloe: '#ff9900' },
        {icon: 'xh-icon-tuihuo',  name: '退货', num: '#23', bg_coloe: '#ed4014' }
      ]
    }
  },
  methods: {},
  mounted () {
    // console.log(this.router)
  }
}
</script>

<style lang="less" scoped>
.container {
  .xh-hema {
    width: 100%;
    height: 100px;
    padding: 20px 10px;
    background: #fff;
    display: flex;
    justify-content: space-between;
    li {
      flex: 1;
      border-radius: 5px;
      margin: 0 10px;
      display: flex;
    }
    .xh-icon {
      height: 100px;
      width: 100px;
      display: block;
      text-align: center;
      line-height: 100px;
      color: #eee;
      font-size: 30px;
      border-right: 1px solid #fff;
    }
    div {
      flex: 1;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      color: #eee;
      span:nth-child(2) {
        font-size: 14px;
        margin-top: 5px;
        color: #ccc;
      }
    }
  }
}

  
</style>