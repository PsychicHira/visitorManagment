<template>
  <div class="header-container">
    <el-container direction="vertical">
      <el-header class="header">
        <!-- <div class="header-left"> -->
          <!-- <h1>行务综合服务平台</h1> -->
          <!-- <BreadCrumb></BreadCrumb> -->
        <!-- </div> -->

        <!-- <div class="header-middle">
          <img src="../assets/logo.png" alt="">
          <h1>行务综合服务平台</h1>
        </div> -->

        <div class="col">
          <h1 style="font-size:24px">VisitorConsult MS —— 查卦看事管理系统</h1>
        </div>

        <!-- <div class="header-right">
          <i class="el-icon-user-solid"></i>

          <el-dropdown trigger="click" @command="handleCommand">
            <span class="el-dropdown-link">
              {{name}}<a href="javascript:void(0)" class="el-icon-caret-bottom el-icon--right"></a>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>退出登陆</el-dropdown-item>
              <el-dropdown-item command="密码修改">密码修改</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

        </div> -->
      </el-header>
    </el-container>
  </div>
</template>

<script>
import BreadCrumb from "@/components/BreadCrumb.vue";

export default {
  name: "Header",
  components: {
    BreadCrumb
  },
  data() {
    return {
      name: this.$store.name+'('+this.$store.department+')'
    };
  },
  methods: {
    //动态获取视口高度，让浏览器撑开
    // getViewWidth() {
    //   //设置h1Div宽度
    //   let viewWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    //   let h1Div = document.getElementsByClassName("h1Div");
    //   let h1DivWidth = viewWidth - 160;
    //   h1Div[0].setAttribute("style", "width:" + h1DivWidth + "px");
    // },

    // toChangePassword:function(){
    //   console.log(123)
    //   this.$route.push('/RoutineWork/ChangePassword')
    // },

    handleCommand(command) {
      // this.$message('click on item ' + command);
      if (command == '密码修改') {
        this.$router.push('/RoutineWork/ChangePassword')
      }


    }
  },
  mounted: function () {
    // this.getViewWidth()
    // console.log('header')
    // console.log(this.$store.name)
    // console.log(this.$store.department)


    // if (JSON.parse(localStorage.getItem("login")).userName != 'admin') {
    //   this.name = '张三'
    // } else {
    //   this.name = '小明（信息技术部)'
    // }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.header {
  padding: 0;
  // background-color: #000;
  // color: #000;
  height: 70px !important;
  margin: 0 auto;
  .header-left {
    // text-align: left;
    // position: relative;
    float: left;
    height: 70px;
    padding-left: 20px;
    h1 {
      line-height: 50px;
    }
  }
  & >>> .header-middle {
    display: inline;
    width: 500px;
    height: 70px;
    // margin: 0 auto;
    padding-left: 20%;
    // position: absolute;
    float: left;
    h1 {
      // line-height: 70px;
      // text-align: center;
      // font-size: 20px;
    }
    img {
      margin-top: 5px;
      height: 60px;
      display: inline;
      float: left;
    }
  }
  .header-right {
    position: absolute;
    top: 20px;
    color: #fff;
    float: right;
    right: 50px;
    i {
      color: #000;
    }
  }
}
.header-container >>> .el-container {
  height: 70px;
}

//改变 .el-dropdown 自带文字颜色
.el-dropdown {
  color: #000;
}

.col {
  // position: relative;
  // width: 410px;
  height: 70px;
  // margin: 0 auto;
  img {
    height: 60px;
    // position: absolute;
    margin-top: 5px;
    // margin-left: 14%;
    display: block;
    float: left;
    margin-right: 15px;
  }
  h1,
  h2 {
    display: inline-block;
    margin: 0;
    color: #000;
  }
  h1 {
    position: absolute;
    // top: -4px;
    // letter-spacing: 5px;
    font-size: 30px;
    height: 70px;
    line-height: 70px;
    transform: translateX(-50%);
  }
  h2 {
    position: absolute;
    bottom: -4px;
    // letter-spacing: 4px;
  }
}
</style>