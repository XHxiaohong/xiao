<template>
  <div :class="['xl-date-pilcker']" v-colse>
    <div class="xl-date-pilcker-input__box">
      <i class="xl-icon xl-icon-rili"></i>
      <input type="text"
       v-model="dateValue"
       @focus="showDate"
       :maxlength="!editable ? 0 : 10"
       class="xl-date-pilcker-input"
       :placeholder="placeholder"
      >
      <i v-if="clearable"
      v-show="dateValue !== ''" 
      @click="dateValue = ''" 
      class="xl-icon xl-icon-reeor-fill"></i>
    </div>

    <div v-show="isShowDate" class="xl-date-conent" @click="onSelection" id="xl-date-conent"> 
      <div class="xl-date-title">
        <section  v-show="isListDate">
          <i class="xl-icon xl-icon-double-arrow-left" @click="handleYear(true)"></i>
          <i class="xl-icon xl-icon-arrow-lift" @click="handleMonth(true)"></i>
        </section>

        <section class="xl-date-title-section" @click="isListDate = !isListDate">
          <span> {{Year}}  年 </span> 
          <span> {{Month}} 月 </span>
        </section>

        <section v-show="isListDate">
          <i class="xl-icon xl-icon-arrow-right1" @click="handleMonth(false)"></i>
          <i class="xl-icon xl-icon-double-arro-right" @click="handleYear(false)"></i>
        </section>
      </div>

      <div class="xl-date__box"  v-show="isListDate">
        <div class="xl-date__week">
          <span>日</span>
          <span>一</span>
          <span>二</span>
          <span>三</span>
          <span>四</span>
          <span>五</span>
          <span>六</span>
        </div>

        <ul class="xl-date-list__box">
          <template v-for="item in listDate">
            <li :class="item.class" @click.stop="selection(item)"> {{item.day}}</li>
          </template>
        </ul>
      </div>

      <div v-show="!isListDate">
        <div class="xl-year__box">
          <i class="xl-icon xl-icon-double-arrow-left" @click="handleYear(true)"></i>
          <input type="text" v-model="Year" class="xl-year-input">
          <i class="xl-icon xl-icon-double-arro-right" @click="handleYear(false)"></i>
        </div>

        <ul class="xl-month-list__box" @click="isListDate = true">
          <template v-for="(item, i) in listMonth"> 
            <li :class="[i == Month - 1 ? 'xl-month-section' : '']" 
            @click="Month = i + 1"
            :key="'xl-month-' + i">{{item}}</li>
          </template>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'XlDatePilcker',
  props: {
    placeholder: {
      type: String,
      default: '请选择日期'
    },
    clearable:{
      type: Boolean,
      default: true
    },
    value: String,
    defaultValue: {
      type: String,
      default: ''
    },
    editable: {
      type: Boolean,
      default: true
    },
    format: {
      type: String,
      default: 'yyyy-mm-dd'
    }
  },
  directives: {
    colse: {
      inserted: (el, binding, vnode) => {
        let ber = false;
        el.onclick = ()=> {  ber = true;}
        document.onclick = ()=> {
          if (!ber) vnode.context.isShowDate = false;
          ber = false
        }
      }
    }
  },
  data () {
    let listMonth = [], i = 1;
    while (i <= 12) {
      listMonth.push(i + '月');
      i++
    }
    return {
      dateValue: '',
      isListDate: true,
      isShowDate: false,
      Year: '',
      Month: '',
      Day: '',
      listDate: [],
      listMonth
    }
  },
  computed: {
    isFormat () {
      let reg1 = /^y{4}-m{1,2}-d{1,2}$/;
      let reg2 = /^Y{4}-M{1,2}-D{1,2}$/;
      if (reg2.test(this.format) || reg1.test(this.format)) {
        let format = this.format.split('-').map(key=> {
          return key.length
        })
        return format;
      } else {
        return [4,2,2]
      }
    }
  },
  methods: {
    onSelection (ele) {
      this.isShowDate = true
    },
    showDate () {
      this.isShowDate = true;
      this.initDate()
    },
    initValue (date) {
      let srtArr = [];
      date.split('-').forEach((val, i) => {
        if (val * 1 > 10) {
          srtArr.push(val)
        } else if (val.length == this.isFormat[i]) {
          srtArr.push(val)
        } else if (val.length > this.isFormat[i]) {
          srtArr.push(parseInt(val))
        } else {
          srtArr.push('0' + val)
        }
      });
      this.dateValue = srtArr.join('-');
    },
    initDate () { // 初始化时间下拉 年、月、日
      let date = this.dateValue ? new Date(this.dateValue) :new Date();
      this.Year = date.getFullYear();
      this.Month = date.getMonth() + 1; // Date 函数月份从零开始计数，故加一
      this.Day = date.getDate();
      this.initListDate();
    },
    initListDate (y = this.Year, m = this.Month, d = this.Day) { // 初始化时间下拉选择列表
      let Day = (new Date(y, m - 1, 0)).getDate(); // 上个月最后一天
      let firstDay = (new Date(y, m - 1, 1)).getDate(); // 每月第一天
      let lastDay = (new Date(y, m, 0)).getDate(); // 每月最后一天, 即每月多少天
      let firstDayisWhat = (new Date(y, m - 1, 1)).getDay(); // 第一天星期几

      this.listDate = []
      for (var i = -firstDayisWhat; i < 42 - firstDayisWhat; i++) {
        let obj = {}
        if (i < 0) { // 上一个月
          obj.day = Day + i
          obj.class = 'xl-date-pastTimes'
        } else if (i < lastDay) { // 这个月
          obj.day = i + 1,
          obj.class = i + 1 == d ? 'xl-date-selection' : ''
        } else { // 下一个月
          obj.day = i + 1 - lastDay
          obj.class = 'xl-date-future'
        }
        this.listDate.push(obj)
      }
    },
     handleYear (ber) { // 加减年
      ber ? --this.Year : ++this.Year;
      this.initListDate();
    },
    handleMonth (ber) { // 加减月
      if (ber) {
        if (--this.Month < 1) {
          this.Month = 12;
          this.Year -= 1;
        }
      } else {
        if (++this.Month > 12) {
          this.Month = 1;
          this.Year += 1;
        }
      }
      this.initListDate() 
    },
    selection (val) { // 选中日期
      let str = '';
      if (val.class == 'xl-date-pastTimes' ) { // 上个月
        pastTimes(val.day)
      } else if (val.class == 'xl-date-future' ) { // 下个月
        future(val.day)
      } else {
        this.initValue(`${this.Year}-${this.Month}-${val.day}`);
      }
     
      this.isShowDate = false;
    },
    pastTimes(val = this.Day) {
      let str = this.Month - 1 < 1
                ? `${this.Year - 1 }-12-${val}`
                : `${this.Year}-${this.Month - 1}-${val}`;

      this.initValue(str);
    },
    future (val = this.Day) {
      let str = this.Month + 1 > 12
                ? `${this.Year + 1 }-1-${val}`
                : `${this.Year}-${this.Month + 1}-${val}`;

      this.initValue(str);
    }
  },
  watch: {
    dateValue (val) {
      this.$emit('input', val)
    },
    value (val) {
      if (new Date(val) == 'Invalid Date') {
        console.error('请输入正确的时间！');
      } else {
        this.initValue(val)
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import url(../../assets/datePilcker/index.less);
</style>