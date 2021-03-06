<template>
  <div class="addVisitor" v-loading.fullscreen.lock="Loading">
    <el-card class="box-card">
      <h1 style="margin:10px 0">新增访客</h1>
      <el-divider class="el-divider"></el-divider>

      <el-form ref="form" :model="form" label-width="80px">
        <el-row>
          <el-col :span="5">
            <el-form-item label="姓名">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="5">
            <el-form-item label="性别">
              <el-select v-model="form.sex" placeholder="请选择性别" class="w100" @change="selectSex">
                <el-option v-for="item in sex" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="5">
            <el-form-item label="访客来源">
              <el-select v-model="form.visitorSource" placeholder="请选择来源" class="w100" @change="selectVisitorSource">
                <el-option v-for="item in visitorSource" :key="item.value" :label="item.label" :value="item.label"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

        </el-row>

        <el-row>

          <el-col :span="5">
            <el-form-item label="出生时间">
              <el-date-picker v-model="bornDate" type="datetime" placeholder="选择出生时间" style="width: 100%;" @change="getBornDate"></el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="5">
            <el-form-item label="出生省">
              <el-input v-model="form.province"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="5">
            <el-form-item label="市">
              <el-input v-model="form.city"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="5">
            <el-form-item label="来访时间">
              <el-date-picker v-model="visitDate" type="datetime" placeholder="选择日期时间" style="width: 100%;" @change="getVisitDate"></el-date-picker>
            </el-form-item>
          </el-col>

        </el-row>

        <el-form-item>
          <el-button type="primary" @click="commitVisitor()">提交</el-button>
          <el-button @click="clear">重置</el-button>
        </el-form-item>

      </el-form>

    </el-card>
  </div>

</template>

<script>
import {
  addVisitor as C_addVisitor,
  queryVisitorSource as C_queryVisitorSource,
} from '../common/methods.js'
export default {
  name: 'Todo',
  data() {
    return {
      form: {
        name: '',
        sex: '',
        bornDate: '',
        visitDate: '',
        visitorSource: '',
        province: '',
        city: ''
      },
      //页面性别option选项
      sex: [{
        value: 1,
        label: '男'
      }, {
        value: 0,
        label: '女'
      }],

      //访客来源options
      visitorSource: [],
      bornDate: '',
      visitDate: '',
      Loading: false
    };
  },
  methods: {

    //提交
    commitVisitor() {

      let obj = {
        consultType: this.form.consultType
      }
      this.$confirm('确认提交?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.Loading = true;
        C_addVisitor(this.form, res => {
          this.Loading = false
          console.log(res)
          if (res == 1) {
            this.clear()
            this.bornDate = ''
            this.visitDate = ''
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
    },

    clear() {
      this.form = {}
      this.bornDate = ''
      this.visitDate = ''
    },
    //选择性别
    selectSex(val) {
      console.log(val)
      //val打印出来sex其中元素的编号，根据编号做个判断性别，再把性别给到form提交表单中
      if (val == 0) {
        this.form.sex = '女'
      } else {
        this.form.sex = '男'
      }
    },
    //选择咨询类型
    selectConsultType(val) {
      this.form.consultType = val
    },

    //选择访客来源
    selectVisitorSource(val) {
      this.form.visitorSource = val
    },

    //选择出生时间
    getBornDate(val) {
      // console.log(val)
      let date = new Date(val).getFullYear() + '-' + (new Date(val).getMonth() + 1) + '-' + new Date(val).getDate()
      // new Date(val).getHours() + ':' + new Date(val).getMinutes() + ':' + new Date(val).getSeconds();
      let h = new Date(val).getHours().toString()
      let m = new Date(val).getMinutes().toString()
      let s = new Date(val).getSeconds().toString()
      if (h.length < 2) {
        h = h + '0'
      }
      if (m.length < 2) {
        m = '0' + m.toString()
      }
      if (s.length < 2) {
        s = '0' + s.toString()
      }
      this.form.bornDate = date + ' ' + h + ':' + m + ':' + s
      // console.log(this.form.bornDate)
    },

    //选择访问时间
    getVisitDate(val) {
      // console.log(val)
      let date = new Date(val).getFullYear() + '-' + (new Date(val).getMonth() + 1) + '-' + new Date(val).getDate()
      let h = new Date(val).getHours().toString()
      let m = new Date(val).getMinutes().toString()
      let s = new Date(val).getSeconds().toString()
      if (h.length < 2) {
        h = h + '0'
      }
      if (m.length < 2) {
        m = '0' + m.toString()
      }
      if (s.length < 2) {
        s = '0' + s.toString()
      }
      this.form.visitDate = date + ' ' + h + ':' + m + ':' + s
      // console.log(this.form.bornDate)
    },
  },
  mounted: function () {

    //获取访客来源
    C_queryVisitorSource(res => {
      res.forEach((element, index) => {
        this.visitorSource.push({
          value: index + 1,
          label: element.visitorSource
        })
      })
    })
  }
}
</script>

<style lang="scss" scoped>
.inline {
  display: inline-block;
}
</style>