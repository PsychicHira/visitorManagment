<template>
  <div class="inquirySymptem">
    <el-card class="box-card">
      <h3>查诊</h3>

      <el-divider class="el-divider"></el-divider>

      <el-table :data="tableData">
        <el-table-column label="序号" width="60">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.$index+1 }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="name" label="姓名" width="100">
        </el-table-column>

        <el-table-column prop="sex" label="性别" width="80">
        </el-table-column>

        <el-table-column label="年龄" width="80">
          <template slot-scope="scope">
            {{getAge(scope.row.bornDate)}}
          </template>
        </el-table-column>

        <el-table-column prop="province" label="省份" width="80">
        </el-table-column>

        <el-table-column prop="city" label="城市" width="80">
        </el-table-column>

        <el-table-column prop="bornDate" label="出生日期">
        </el-table-column>

        <el-table-column prop="visitDate" label="来访时间">
        </el-table-column>

        <el-table-column label="操作" width="400">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="toInquiryDetail(scope.$index, scope.row)">查诊</el-button>
            <el-button type="success" size="mini" @click="edit(scope.$index, scope.row)">编辑</el-button>
            <el-button type="danger" size="mini" @click="edit(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>

      </el-table>

    </el-card>

    <!-- 弹窗 -->
    <el-dialog title="修改访客信息" :visible.sync="dialogVisible" center width="1200px">

      <el-form ref="form" :model="form" label-width="80px">
        <el-row>
          <el-col :span="6">
            <el-form-item label="姓名">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="性别">
              <el-select v-model="form.sex" placeholder="请选择性别" class="w100" @change="selectSex">
                <el-option v-for="item in sex" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="咨询类型">
              <el-select v-model="form.consultType" placeholder="请选择类型" class="w100" @change="selectConsultType">
                <el-option v-for="item in consultType" :key="item.value" :label="item.label" :value="item.label"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="访客来源">
              <el-select v-model="form.visitorSource" placeholder="请选择来源" class="w100" @change="selectVisitorSource">
                <el-option v-for="item in visitorSource" :key="item.value" :label="item.label" :value="item.label"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

        </el-row>

        <el-row>

          <el-col :span="6">
            <el-form-item label="出生时间">
              <el-date-picker v-model="form.bornDate" type="datetime" placeholder="选择出生时间" style="width: 100%;" @change="getBornDate"></el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="出生省">
              <el-input v-model="form.province"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="市">
              <el-input v-model="form.city"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="来访时间">
              <el-date-picker v-model="form.visitDate" type="datetime" placeholder="选择日期时间" style="width: 100%;" @change="getVisitDate"></el-date-picker>
            </el-form-item>
          </el-col>

          <!-- <el-col :span="5">
            <el-form-item label="挂号费">
              <el-input v-model="form.price"></el-input>
            </el-form-item>
          </el-col> -->

        </el-row>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
import {
  queryVisitor as C_queryVisitor,
  queryConsultType as C_queryConsultType,
  queryVisitorSource as C_queryVisitorSource,
} from '../common/methods.js'
export default {
  name: 'inquirySymptem',
  data() {
    return {
      tableData: [],
      dialogVisible: false,
      form: {
        name: '',
        bornDate: '',
        consultType: '',
        visitorSource: ''
      },
      //页面性别option选项
      sex: [{
        value: 1,
        label: '男'
      }, {
        value: 0,
        label: '女'
      }],
      consultType: [],
      visitorSource: [],
    };
  },
  methods: {
    getNowTime(date) {
      let now = new Date(date);
      let year = now.getFullYear(date); //得到年份
      let month = now.getMonth(date); //得到月份
      let day = now.getDate(date); //得到日期
      let time = now.getHours() + ':' + now.getMinutes(date) + ':' + now.getSeconds(date)

      month = month + 1;
      month = month.toString().padStart(2, "0");
      day = day.toString().padStart(2, "0");
      let defaultDate = `${year}-${month}-${day} ${time}`;
      // console.log(defaultDate)
      return defaultDate;
    },

    //计算年龄
    getAge(bornDate) {
      return new Date().getFullYear() - bornDate.substring(0, 4)
    },
    //编辑
    edit(index, row) {
      this.dialogVisible = true
      console.log(index)
      console.log(row)

      this.form.name = row.name
      this.form.sex = row.sex
      this.form.consultType = row.consultType
      this.form.visitorSource = row.visitorSource
      this.form.bornDate = this.getNowTime(row.bornDate)
      this.form.province = row.province
      this.form.city = row.city
      this.form.visitDate = this.getNowTime(row.visitDate)
    },
    //性别iptions
    selectSex() {

    },

    toInquiryDetail(index,row){
      console.log(row)
      this.$router.push({
        name:'inquiryDetail',
        params:row
      })
    },
    //
    selectConsultType() {

    },
    //
    selectVisitorSource() {

    },
    //
    getBornDate() {

    },

    //
    getVisitDate() {

    },


  },
  mounted: function () {
    //获取人员列表
    C_queryVisitor(res => {
      console.log(res)
      this.tableData = res
    })

    //获取咨询类型
    C_queryConsultType(res => {
      res.forEach((element, index) => {
        this.consultType.push({
          value: index + 1,
          label: element.consultType
        })
      })
    })

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