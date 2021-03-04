<template>
  <div class="visitorSource" v-loading.fullscreen.lock="Loading">
    <el-card class="box-card">
      <h1 style="margin:10px 0">访客来源</h1>
      <el-divider class="el-divider"></el-divider>

      <el-form ref="form" :model="form" label-width="140px">
        <el-row>
          <el-col>
            <el-form-item label="访客来源：">
              <el-tag v-for="(item,index) in visitorSource" :key="index" closable @close="deleteVisitorSource(item.visitorSource)" type="">
                {{index+1}} {{item.visitorSource}}
              </el-tag>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="6">
            <el-form-item label="添加访客来源">
              <el-input type="text" v-model="form.visitorSource"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-button type="primary" @click="addVisitorSource()" style="margin-left:20px;">确认添加</el-button>
          </el-col>

        </el-row>
        <!-- <p style="margin:10px 0;font-size:14px">注：访客来源的划分以目标指向，咨询意愿的最终目的划分，如访客想咨询风水，目的是调整财运，那么便以财运为咨询类型</p> -->
      </el-form>
    </el-card>
  </div>

</template>

<script>
import {
  addVisitorSource as C_addVisitorSource,
  queryVisitorSource as C_queryVisitorSource,
  deleteVisitorSource as C_deleteVisitorSource,
} from '../../common/methods.js'
export default {
  name: 'visitorSource',
  data() {
    return {
      form: {
        visitorSource: ''
      },
      //访客来源options
      visitorSource: [],
      Loading: false

    };
  },
  methods: {
    //添加访客来源
    addVisitorSource() {
      let obj = {
        visitorSource: this.form.visitorSource
      }
      this.$confirm('确认添加?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.Loading = true;
        C_addVisitorSource(obj, res => {
          this.Loading = false
          if (res == 1) {
            //获取访客来源
            C_queryVisitorSource(res => {
              this.visitorSource = res
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

    //删除访客来源
    deleteVisitorSource(item) {
      let obj = {
        visitorSource: item
      }
      this.$confirm(`确认删除该访客来源：${item}。`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.Loading = true;
        C_deleteVisitorSource(obj, res => {
          this.Loading = false
          if (res == 1) {
            //获取访客来源
            C_queryVisitorSource(r => {
              this.visitorSource = r
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
    //获取访客来源
    C_queryVisitorSource(res => {
      this.visitorSource = res
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