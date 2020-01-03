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
    // value: {},
    defaultValue: {
      type: String,
      default: ''
    },
    editable: {
      type: Boolean,
      default: true
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
  // computed: {
  //   handleValue () {
  //     return this.dateValue
  //   }
  // },
  methods: {
    onSelection (ele) {
      this.isShowDate = true
    },
    showDate () {
      this.isShowDate = true;
      this.initDate();
    },
    initDate (y, m, d) {
      let date;
      this.listDate = [];
      if (this.dateValue == '' ) {
        date = new Date()
        this.Year = y = date.getFullYear();
        this.Month = m = date.getMonth() + 1;
        this.Day = d = date.getDate();
      } else {
        y = y || this.Year;
        m = m || this.Month;
        d = d || this.Day;
        date = new Date(y, m - 1, d); // Date 函数月份从零开始计数，故减一
      }
      this.getDate(y, m, d);
    },
    getDate (y, m, d) {
      let Day = (new Date(y, m - 1, 0)).getDate(); // 上个月最后一天也即每月多少天
      let firstDay = (new Date(y, m - 1, 1)).getDate(); // 每月第一天
      let lastDay  = (new Date(y, m, 0)).getDate(); // 每月最后一天也即每月多少天
      let firstDayisWhat = (new Date(y, m - 1, 1)).getDay(); // 第一天星期几0-6（星期日到星期六）

      for (var i = -firstDayisWhat; i < 42 - firstDayisWhat; i++) {
        if (i < 0) { // 上一个月
          this.listDate.push({
            day: Day + i + 1,
            class: 'xl-date-pastTimes'
          })
        } else if (i < lastDay) { // 这个月
          this.listDate.push({
            day: i + 1,
            class: i + 1 == d ? 'xl-date-selection' : ''
          })
        } else { // 下一个月
          this.listDate.push({
            day: i + 1 - lastDay,
            class: 'xl-date-future'
          })
        }
      }
    },
    pastTimes(val) {
      val = val || this.Day;
      let str = this.Month - 1 < 1
                ? `${this.Year - 1 }-12-${val}`
                : `${this.Year}-${this.Month - 1}-${val}`;

      this.setValue(str);
    },
    future (val) {
      val = val || this.Day;
      let str = this.Month + 1 > 12
                ? `${this.Year + 1 }-1-${val}`
                : `${this.Year}-${this.Month + 1}-${val}`;

      this.setValue(str);
    },
    selection (val) {
      if (val.class == 'xl-date-pastTimes' ) {
        this.pastTimes(val.day)
      } else if (val.class == 'xl-date-future' ) {
        this.future(val.day);
      } else {
        this.setValue(`${this.Year}-${this.Month}-${val.day}`);
      }
      this.isShowDate = false;
    },
    initValue () {
      const date = new Date(this.defaultValue);
      let y = this.Year = date.getFullYear();
      let m = this.Month = date.getMonth() + 1;
      let d = this.Day = date.getDate();
      let str1 = `${y}-${m}-${d}`;

      let str2 = `${y}-${m*1 < 10 ? '0' + m : m}-${d < 10 ? '0' + d : d}`;

      str1 == this.defaultValue || this.defaultValue == str2
      ? this.setValue(this.defaultValue)
      : this.dateValue = '';
    },
    setValue (val) {
      if (val == '') return;
      var dateArr = val.split('-').map(num => {
        if (num.length >= 2) return num;
        return num * 1 >= 10  ? + num : ('0' + num)
      })

      this.Year = dateArr[0];
      this.Month = dateArr[1];
      this.Day = dateArr[2];

      this.dateValue = dateArr.join('-');
    },
    handleYear (ber) {
      ber ? this.Year -= 1 : this.Year += 1;
      this.getDate(this.Year) 
    },
    handleMonth (ber) {
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
      this.getDate(this.Year, this.Month) 
    }
  },
  mounted () {
    this.initValue();
    this.initDate();
  },
  watch: {
    dateValue (val) {
      this.$emit('input', val)
    }
  }
}
</script>

<style lang="less" scoped>
@import url(../../assets/datePilcker/index.less);
</style>