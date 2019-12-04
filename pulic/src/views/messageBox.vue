<template>
  <div class="container">
    <xl-button type="primary" @click="success">提示框</xl-button>
    <xl-button type="warning" @click="warning">对话框</xl-button>
    <xl-button type="success" @click="prompt()" round plain>提交信息</xl-button>
  </div>
</template>

<script>
export default {
  name: 'messageBox',
  data () {
    return {}
  },
  methods: {
    success () {
      this.$alert('测试', '提示', {
        type: 'success',
        confirm: '确认消息',
        showClose: true
      }).then(req=> {
        console.log(req)
      })
    },
    warning () {
      this.$confirm('是否删除信息？', '对话信息', {
        confirm: '确认',
        cancel: '取消'
      }).then(req=> {
        this.$message.success('确认删除'); 
      }).catch(()=> {
        this.$message.info('已放弃删除');
      })
    },
    prompt () {
      console.log(123456)
      this.$prompt('请输入邮箱！', '提示', {
        confirm: '确认',
        cancel: '取消',
        inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        inputErrorMessage: '邮箱格式不正确'
      }).then((value)=> {
        this.$message.success(`你的邮箱是： ${value}`); 
      }).catch(()=> {
         this.$message.info('已放弃操作');
      })
    },
    info () {
      console.log(this)
    },
  },
  mounted () {}
}
</script>
<style lang="less" scoped>
  .container {
    display: block;
  }
</style>