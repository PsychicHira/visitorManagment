<template>
  <div class="index">
    <el-card class="box-card">
      <!-- <h1>欢迎来到白白制作的来访者管理平台</h1> -->

      <!-- <el-divider class="el-divider"></el-divider> -->

      <h1>今天是：{{this.date}}</h1>

    </el-card>
  </div>

</template>

<script>
export default {
  name: 'index',
  data() {
    return {
      date:''
    }
  },
  methods: {
    //获取当前日期
    getDate() {
      let date = new Date();
      let year = date.getFullYear();//年
      let month = date.getMonth() + 1;//月
      let day = date.getDate();//日
      let week = date.getDay() //星期
      if (month < 10) {
        month = "0" + month;
      }
      if (day < 10) {
        day = "0" + day;
      }
      let weekStr = ' 星期'
      switch (week) {
        case 0:
          weekStr += "日";
          break;
        case 1:
          weekStr += "一";
          break;
        case 2:
          weekStr += "二";
          break;
        case 3:
          weekStr += "三";
          break;
        case 4:
          weekStr += "四";
          break;
        case 5:
          weekStr += "五";
          break;
        case 6:
          weekStr += "六";
          break;
      }
      this.date = year + "/" + month + "/" + day + weekStr
    }
  },
  mounted: function () {
    this.getDate()
  }
}
</script>

<style lang="scss" scoped>
</style>