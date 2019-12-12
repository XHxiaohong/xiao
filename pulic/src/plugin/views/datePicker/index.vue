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
      v-show="dateValue" 
      @click="dateValue = ''" 
      class="xl-icon xl-icon-reeor-fill"></i>
    </div>

    <div v-show="isShowDate"
    class="xl-date-conent"
    @click="onSelection" id="xl-date-conent"> 
      <div class="xl-date-title">
        <i class="xl-icon xl-icon-double-arrow-left" @click="handleYear(true)"></i>
        <i class="xl-icon xl-icon-arrow-lift" @click="handleMonth(true)"></i>
        <section class="xl-date-title-section">
          <span> {{Year}} </span>
          <span> 年 </span> 
          <span> {{Month}} </span>  
          <span> 月 </span>
        </section>
        <i class="xl-icon xl-icon-arrow-right1" @click="handleMonth(false)"></i>
        <i class="xl-icon xl-icon-double-arro-right" @click="handleYear(false)"></i>
      </div>

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
    value: {},
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
    return {
      dateValue: '',
      isShowDate: false,
      Year: '',
      Month: '',
      Day: '',
      listDate: []
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
      
      let Day = (new Date(y, m - 1, 0)).getDate(); // 上个月最后一天也即每月多少天
      let firstDay = (new Date(y, m - 1, 1)).getDate(); // 每月第一天
      let lastDay  = (new Date(y, m, 0)).getDate(); // 每月最后一天也即每月多少天
      let firstDayisWhat = (new Date(y, m - 1, 1)).getDay(); // 第一天星期几0-6（星期日到星期六）

      for (var i = -firstDayisWhat; i < 42 - firstDayisWhat; i++) {
        if (i < 0) {
          this.listDate.push({
            day: Day + i + 1,
            class: 'xl-date-pastTimes'
          })
        } else if (i < lastDay) {
          this.listDate.push({
            day: i + 1,
            class: i + 1 == d ? 'xl-date-selection' : ''
          })
        } else {
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
      let str2 = `${y}-${m < 10 ? '0' + m : m}-${d < 10 ? '0' + d : d}`;

      str1 == this.defaultValue || this.defaultValue == str2
      ? this.setValue(this.defaultValue)
      : this.dateValue = '';
    },
    setValue (val) {
      if (val == '') return;
      this.dateValue = val.split('-').map(num => {
        return num >= 10 ? + num : ('0' + num)
      }).join('-');
    },
    handleYear (ber) {
       ber ? 
       this.initDate(--this.Year)
       : this.initDate(++this.Year) 
    },
    handleMonth (ber) {
      if (ber) {
        if (--this.Month < 1) {
          this.Month = 12;
          this.Year -= 1;
        }
        this.initDate() 
      } else {
        if (++this.Month > 12) {
          this.Month = 1;
          this.Year += 1;
        }
        this.initDate() 
      }
    }
  },
  mounted () {
    this.initValue();
    this.initDate();
    // console.log(this.valueFormat)
  },
  watch: {
    value (val) {
      this.setValue(val)
    },
    dateValue (val) {
      this.$emit('input', val)
    }
  }
}
</script>

<style lang="less" scoped>
.xl-date-pilcker {
  width: 180px;
  height: 25px;
  position: relative;
  border: 1px solid #888;
  border-radius: 5px; 
  display: inline-block;
}

.xl-date-pilcker-input__box {
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: start;
  .xl-date-pilcker-input {
    width: 100%;
    border: none;
    outline: none;
    background: transparent;
  }
  .xl-icon {
    display: block;
    margin: 0 5px;
    color: #808080;
  }
  .xl-icon-reeor-fill {
    display: none
  }
}
.xl-date-pilcker-input__box:hover {
  .xl-icon-reeor-fill {
    display: block;
  }
}
.xl-date-conent {
  width: 280px;;
  position: absolute;
  top: 100%;
  left: 0;
  border: 1px solid rgba(136, 136, 136, 0.33);
  padding: 8px 10px;
  margin-top: 10px;
  box-shadow: 1.5px 1px 1.5px 1.5px #afacac47;
}
.xl-date-title {
  display: flex;
  font-weight: 800;
  justify-content: space-between;
}
.xl-date-title-section {
  width: 100%;
  text-align: center;
}
.xl-date__week {
  margin: 5px 0;
  font-weight: 600
} 

.xl-date-list__box {
  color: #202020;
  list-style-type: none;
}
.xl-date__week span,
.xl-date-list__box li{
  width: 40px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  display: inline-block;
}
.xl-date-selection,
.xl-date-list__box li:hover {
  color: #409EFF;
}

.xl-date-future,
.xl-date-pastTimes {
  color: #aaa;
}
</style>