<template>
  <div class="consultType" v-loading.fullscreen.lock="Loading">
    <el-card class="box-card">
      <h1 style="margin:10px 0">咨询类型</h1>
      <el-divider class="el-divider"></el-divider>

      <el-form ref="form" :model="form" label-width="140px">
        <el-row>
          <el-col>
            <el-form-item label="咨询类型：">
              <el-tag v-for="(item,index) in consultType" :key="index" closable @close="deleteConsultType(item.consultType)" type="">
                {{index+1}} {{item.consultType}}
              </el-tag>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="6">
            <el-form-item label="添加咨询类型">
              <el-input type="text" v-model="form.consultType"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-button type="primary" @click="addConsultType()" style="margin-left:20px;">确认添加</el-button>
          </el-col>

        </el-row>
        <p style="margin:10px 0;font-size:14px">注：咨询类型的划分以目标指向，咨询意愿的最终目的划分，如访客想咨询风水，目的是调整财运，那么便以财运为咨询类型</p>
      </el-form>
    </el-card>
  </div>

</template>

<script>
import {
  addConsultType as C_addConsultType,
  queryConsultType as C_queryConsultType,
  deleteConsultType as C_deleteConsultType,
} from '../../common/methods.js'
export default {
  name: 'consultType',
  data() {
    return {
      form: {
        consultType: ''
      },
      //咨询类型options
      consultType: [],
      Loading: false

    };
  },
  methods: {
    //添加咨询类型
    addConsultType() {
      let obj = {
        consultType: this.form.consultType
      }
      this.$confirm('确认添加?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.Loading = true;
        C_addConsultType(obj, res => {
          this.Loading = false
          if (res == 1) {
            //获取咨询类型
            C_queryConsultType(res => {
              this.consultType = res
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
    },

    //删除咨询类型
    deleteConsultType(item) {
      let obj = {
        consultType: item
      }
      this.$confirm(`确认删除该咨询类型：${item}。`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.Loading = true;
        C_deleteConsultType(obj, res => {
          this.Loading = false
          if (res == 1) {
            //获取咨询类型
            C_queryConsultType(r => {
              this.consultType = r
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
    }
  },
  mounted: function () {
    //获取咨询类型
    C_queryConsultType(res => {
      this.consultType = res
    })
  }
}
</script>

<style lang="scss" scoped>
.inline {
  display: inline-block;
}
.el-form-item__content {
  p {
    display: inline-block;
  }
}
span {
  font-size: 16px;
  margin-right: 10px;
}
</style>