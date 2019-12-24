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

    <div class="xh-container">
      <div class="xh-content-title">
        <ul class="xh-content-title-ul">
          <template v-for="item in titleList">
            <li :key="item" @click="seleTitle = item"
            :class="[seleTitle == item ? 'selection-litle' : '']">{{item}}</li>
          </template>
        </ul>
        <i class="xh-icon xh-icon-shezhi"></i>
      </div>

      <div class="xh-content-itme">

      </div>

      <div class="xh-content-Journalism">
        <div class="xh-content-title">
          <span>实时热点</span>
          <span class="xh-shuaxin" @click.stop="getJournalism">
            <i class="xh-icon xh-icon-shuaxin"></i> 换一换
          </span>
        </div>

        <ul>
          <template v-for="item in Journalism">
            <li class="xh-content-Journalism-item"> {{item}} </li>
          </template>
        </ul>
      </div>
    </div>

    <!-- <div class="xh-container">
      <div class="xh-content-itme"></div>
      <div class="xh-content-itme margin-left"></div>
    </div> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'home',
  data() {
    return {
      list: [
        {icon: 'xh-icon-layer',  name: '订单数', num: '#523', bg_coloe: '#19be6b' },
        {icon: 'xh-icon-zhifu1',  name: '支付数', num: '#234', bg_coloe: '#2db7f5' },
        {icon: 'xh-icon-quxiaodingdan',  name: '取消订单', num: '#43', bg_coloe: '#ff9900' },
        {icon: 'xh-icon-tuihuo',  name: '退货', num: '#23', bg_coloe: '#ed4014' }
      ],
      seleTitle: '推荐',
      titleList: ['推荐', '话题', '分享', '专区'],
      labelList: ['热点', '娱乐', '直播', '视频'],
      Journalism: []
    }
  },
  methods: {
    ...mapGetters(['getJList']),
    getJournalism () {
      // console.log(this.$store.getters.getJList(), 123)
      // console.log(this.getJList(), 123)
      this.Journalism = this.getJList()();
    }
  },
  mounted () {
    this.getJournalism();
    // console.log(, 123)
    // console.log(this.$store.state)
  }
}
</script>

<style lang="less" scoped>
.container {
  flex-direction: column;

  .xh-hema {
    width: calc(100% - 20px);
    height: 80px;
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
      height: 80px;
      width: 80px;
      display: block;
      text-align: center;
      line-height: 80px;
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


  .xh-container {
    width: 100%;
    margin-top: 20px;
    font-size: 14px;
    background: #ffffff;
    overflow: auto;

    .xh-content-title {
      width: 100%;
      height: 30px;
      margin-bottom: 20px;
      border-bottom: 1px solid #bbb;
      position: relative;

      .xh-icon {
        width: 30px;
        height: 30px;
        text-align: center;
        vertical-align: middle;
        display: inline-block;
        line-height: 30px;
         color: #808080;
      }

      .xh-content-title-ul {
        width: calc(100% - 33px);
        overflow: hidden;
        display: inline-block;
        vertical-align: middle;
        li {
          height: 29px;
          line-height: 30px;
          font-size: 14px;
          color: #808080;
          padding: 0 20px;
          display: inline-block;
          text-align: center;
          border-bottom: 2px solid transparent;
        }
        li.selection-litle {
          border-color: #57a3f3;
        }
      }
    }


    .xh-content-itme {
      width: 70%;
      height: 20px;
      display: inline-block;
    }

    .xh-content-Journalism {
      width: 30%;
      display: inline-block;

      .xh-content-title {
        width: calc(100% - 30px);
        height: 30px;
        display: flex;
        border: none;
        margin: 0;
        padding: 0 15px;
        justify-content: space-between;

        .xh-icon {
          width: 20px;
          font-size: 20px;
          color: #000;
          font-weight: 800;
        }
        .xh-shuaxin:hover,
        .xh-shuaxin:hover .xh-icon {
          color: #57a3f3;
        }
      }
      .xh-content-Journalism-item {
        width: 50%;
        margin-bottom: 10px;
        display: inline-block;
      }
    }
    .xh-content-border {
      border: 1px solid #bbb;
    }

    .margin {
      margin: 0 20px;
    }
    .margin-left {
      margin-left: 20px;
    }

    // .xh-content-title {
    //   width: 100%;
    //   height: 30px;
    //   border-bottom: 1px solid #bbb;

  
      
    //   }

      
    // }
  }
}

  
</style>

