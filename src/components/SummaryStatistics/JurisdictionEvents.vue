<template>
  <div class="JurisdictionEvents">
    <el-card class="box-card">
      <h3>公告查询</h3>
      <el-divider class="el-divider"></el-divider>
      <el-form ref="form" :model="form" label-width="100px">
        <el-row>
          <el-col :span="6">
            <el-form-item label="查询关键字">
              <el-input v-model="form.words"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="根据ID查询">
              <el-input v-model="form.ID"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="按状态查询">
              <el-select v-model="form.status" placeholder="请选择">
                <el-option label="所有" value="status1"></el-option>
                <el-option label="等待接受" value="status2"></el-option>
                <el-option label="完成" value="status3"></el-option>
                <el-option label="正在处理" value="status4"></el-option>
                <el-option label="督办" value="status5"></el-option>
                <el-option label="等待审批" value="status6"></el-option>
                <el-option label="等待审批关闭" value="status7"></el-option>
                <el-option label="重新办理" value="status8"></el-option>
                <el-option label="审批" value="status9"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="6">
            <el-form-item label="开始时间">
              <el-date-picker type="date" placeholder="选择日期" v-model="form.start" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="结束时间">
              <el-date-picker type="date" placeholder="选择日期" v-model="form.end" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>

        </el-row>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button>重置</el-button>
        </el-form-item>
      </el-form>

      <el-table :data="tableData" stripe style="width: 100%">

        <el-table-column prop="id" label="ID">
        </el-table-column>

        <el-table-column prop="title" label="标题">
        </el-table-column>

        <el-table-column prop="now" label="当前环节" width="180">
        </el-table-column>

        <el-table-column prop="date" label="创建时间" width="180">
        </el-table-column>

        <el-table-column prop="sponsor" label="发起人" width="180">
        </el-table-column>

        <el-table-column prop="status" label="状态">
        </el-table-column>

      </el-table>
    </el-card>
  </div>

</template>

<script>
export default {
  name: 'Todo',
  data() {
    return {
      tableData: [
        {
          date: '2016-05-02',
          now: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          id: 2131231324255,
          title: '事件标题1',
          sponsor:'小明',
          department:'信息技术部',
          status:'等待接受'
        }, {
          date: '2016-05-04',
          now: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄',
          id: 56756765,
          title: '事件标题2',
          sponsor:'小明',
          department:'信息技术部',
          status:'等待接受'
        }, {
          date: '2016-05-01',
          now: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
          id: 435435,
          title: '事件标题3',
          sponsor:'小明',
          department:'信息技术部',
          status:'等待接受'
        }, {
          date: '2016-05-03',
          now: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
          id: 567567567,
          title: '事件标题4',
          sponsor:'小明',
          department:'信息技术部',
          status:'等待接受'
        }
      ],
      form: []
    };
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
</style>