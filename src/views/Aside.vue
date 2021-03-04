<template>
  <el-aside class="Aside">
    <!-- <h1 class="h1">标题</h1> -->
    <el-row class="H100 navKeepLeft">
      <el-col class="H100">
        <el-menu :unique-opened="true" :default-active="activePath" router class="el-menu-vertical-demo H100" background-color="#324157" text-color="#fff" active-text-color="#ffd04b">

          <el-menu-item index="/addVisitor">
            <i class="el-icon-s-custom"></i>
            <span slot="title">新增访客</span>
          </el-menu-item>

          <el-menu-item index="/inquirySymptem">
            <i class="el-icon-document"></i>
            <span slot="title">查诊</span>
          </el-menu-item>

          <el-menu-item index="/statistics">
            <i class="el-icon-s-data"></i>
            <span slot="title">统计</span>
          </el-menu-item>

          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-document-copy"></i>
              <span>选项管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/OptionsManagment/consultType">咨询类型</el-menu-item>
              <el-menu-item index="/OptionsManagment/visitorSource">访客来源</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

        </el-menu>
      </el-col>
    </el-row>
  </el-aside>
</template>

<script>
export default {
  name: "Aside",
  components: {},
  data() {
    return {
      msg: "Aside",
      activePath: ''
    };
  },
  methods: {},
  watch: {
    '$route.path': function (newVal, oldVal) {
      console.log(newVal + "---" + oldVal);
      if (newVal == '/inquirySymptem/inquiryDetail') {
        this.activePath = '/inquirySymptem'
      } else {
        this.activePath = newVal
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/style/common.scss";

.H100 {
  height: $height100;
}
.h1 {
  width: 180px;
  line-height: 70px;
  position: relative;
  color: #fff;
  float: left;
  z-index: 1;
}
.navKeepLeft {
  text-align: left;
}
//这是DIV中的ul
.el-menu {
  padding-top: 70px;
  margin-top: -70px;
  // z-index: 0;
}
//让二级菜单和一级菜单文字左侧对齐
.el-menu-item {
  // padding-left: 54px !important;
}
//默认aside宽度是200
.Aside {
  width: 150px !important;
  overflow: hidden;
  // margin-top: 70px;
}
//去除导航title凸出侧边栏
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 150px;
  min-height: 400px;
}
</style>