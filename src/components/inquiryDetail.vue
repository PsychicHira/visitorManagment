<template>
  <div class="inquiryDetail" v-loading.fullscreen.lock="Loading">
    <el-card class="box-card">
      <h3>诊历详情</h3>

      <el-divider class="el-divider"></el-divider>

      <el-row>
        <el-col :span="4">
          <p class="weightFont">姓名：</p>
          <p>{{profile.name}}</p>
        </el-col>
        <el-col :span="4">
          <p class="weightFont">出生：</p>
          <p>{{profile.bornDate}}</p>
        </el-col>
      </el-row>

      <el-button style="margin:0 0 20px 0" type="success" @click="dialogVisible = true">添加诊断</el-button>

      <el-card v-if="VDetail.length > 0" class="card" v-for="(item,index) in VDetail" :key="index">

        <el-tag class="del" closable @close="deleteInquiryDetail(item)" type=""></el-tag>

        <el-row>
          <el-col :span="6">
            <p class="weightFont">咨询主题：</p>
            <p>{{item.title}}</p>
          </el-col>

          <el-col :span="6">
            <p class="weightFont">咨询类型：</p>
            <p>{{item.consultType}}</p>
          </el-col>

          <el-col :span="6">
            <p class="weightFont">咨询时间：</p>
            <p>{{item.inquiryDate}}</p>
          </el-col>

          <el-col :span="5">
            <p class="weightFont">咨询费用：</p>
            <p>{{item.price}}</p>
          </el-col>
        </el-row>

        <el-row>
          <el-col>
            <!-- <img class="photo" :src="baseUrl+item.photoPath" alt=""> -->
            <div class="demo-image__preview" v-if="item.photoPath">
              <el-image style="width: 100px" :src="baseUrl+item.photoPath" :preview-src-list="srcList(index)">
              </el-image>
            </div>
          </el-col>
        </el-row>

        <el-row>
          <el-col>
            <p class="weightFont">症状描述：</p>
            <p>{{item.desc}}</p>
          </el-col>
        </el-row>

        <el-row>
          <el-col>
            <p class="weightFont">诊断结果：</p>
            <p>{{item.result}}</p>
          </el-col>
        </el-row>

        <el-row>
          <el-col>
            <p class="weightFont">处理方案：</p>
            <p>{{item.solution}}</p>
          </el-col>
        </el-row>

        <el-row>
          <el-col>
            <p class="weightFont">结果反馈：</p>
            <p>{{item.feedbak}}</p>
          </el-col>
        </el-row>

        <el-row>
          <el-col>
            <p class="weightFont">备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：</p>
            <p>{{item.remark}}</p>
          </el-col>
        </el-row>

      </el-card>

      <el-card v-if="VDetail.length == 0">
        <p>暂无诊断信息，请添加</p>
      </el-card>

    </el-card>

    <!-- 弹窗 -->
    <el-dialog title="诊断详情" :visible.sync="dialogVisible" center width="1200px">

      <el-form ref="form" :model="form" label-width="100px" :rules="rules">
        <el-row>
          <el-col :span="12">
            <el-form-item label="咨询主题" prop="title">
              <el-input v-model="form.title"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="咨询类型" prop="consultType">
              <el-select v-model="form.consultType" placeholder="请选择类型" class="w100" @change="selectConsultType">
                <el-option v-for="item in consultType" :key="item.value" :label="item.label" :value="item.label"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

        </el-row>

        <el-row>
          <el-col>
            <el-form-item label="简要描述" prop="desc">
              <el-input type="textarea" v-model="form.desc" :rows="2"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col>
            <el-form-item label="相关照片">
              <el-upload class="upload-demo" ref="upload" action="https://jsonplaceholder.typicode.com/posts/" :limit="1" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList" :auto-upload="false" :on-change="changeFile">
                <el-button slot="trigger" size="" type="primary">选取文件</el-button>
                <el-button style="margin-left: 10px;" size="" type="success" @click="submitUpload($event)">上传到服务器</el-button>
                <!-- <div slot="tip" class="el-upload__tip">多文件请打包成压缩包</div> -->
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col>
            <el-form-item label="诊断结果" prop="result">
              <el-input type="textarea" v-model="form.result" :rows="2"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col>
            <el-form-item label="处理方式" prop="solution">
              <el-input type="textarea" v-model="form.solution" :rows="2"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col>
            <el-form-item label="结果反馈">
              <el-input type="textarea" v-model="form.feedback" :rows="2"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col>
            <el-form-item label="备注">
              <el-input type="textarea" v-model="form.remark" :rows="2"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>

          <el-col :span="6">
            <el-form-item label="咨询费用" prop="price">
              <el-input v-model="form.price" placeholder="单位：元"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="5">
            <el-form-item label="咨询时间">
              <el-date-picker v-model="visitDate" type="datetime" placeholder="选择日期时间" style="width: 100%;" @change="getInquiryDate"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="commit('form')">确 定</el-button>
        <el-button @click="clear">重置</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </div>
    </el-dialog>

  </div>

</template>

<script>
import {
  queryConsultType as C_queryConsultType,
  submitUpload,
  addInquiryDetail as C_addInquiryDetail,
  queryInquiryDetailByVId as C_queryInquiryDetailByVId,
  deleteInquiryDetail as C_deleteInquiryDetail,


} from '../common/methods.js'
export default {
  name: 'inquiryDetail',
  data() {
    return {
      dialogVisible: false,
      form: {
        title: '',
        consultType: '',
        price: '',
        desc: '',
        photoPath: ''
      },
      profile: {
        name: ''
      },
      fileList: [],
      consultType: [],
      VDetail: [],
      visitDate: '',
      baseUrl: '',
      photoArr: [],
      Loading: false,
      //表单验证项
      rules: {
        title: [
          { required: true, message: '请填写咨询主题', trigger: 'blur' },
        ],
        consultType: [
          { required: true, message: '请填写咨询主题', trigger: 'blur' },
        ],
        price: [
          { required: true, message: '请填写咨询费用', trigger: 'blur' },
        ],
        desc: [
          { required: true, message: '请填写简要描述', trigger: 'blur' },
        ],
        result: [
          { required: true, message: '请填写诊断结果', trigger: 'blur' },
        ],
        solution: [
          { required: true, message: '请填写处理方式', trigger: 'blur' },
        ],
        feedback: [
          { required: true, message: '请填写结果反馈', trigger: 'blur' },
        ],
        remark: [
          { required: true, message: '请填写备注', trigger: 'blur' },
        ],
      }
    };
  },
  methods: {

    //删除诊断详情
    deleteInquiryDetail(item) {
      console.log(item)
      let obj = {
        id: item.id
      }


      this.$confirm(`确认删除?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.Loading = true;
        C_deleteInquiryDetail(obj, res => {
          this.Loading = false
          if (res == 1) {
            //获取访客诊断详情
            C_queryInquiryDetailByVId(this.form.vid, res => {
              console.log(res)
              console.log(typeof res)
              console.log(res[0])

              this.VDetail = res
              res.forEach(ele => {
                this.photoArr.push(ele.photoPath)
                console.log(ele)
              })
              this.clear()
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

    //添加诊断详情
    commit(form) {

      //设置一个变量，用来终止提交，不然下面一个验证函数return无效，只是终止它自己，不终止这个提交功能
      //1表示继续，0表示终止
      let go = 1
      // console.log(this.form);
      //验证必填项是否填了，没填就弹出红色提醒
      this.$refs[form].validate((valid) => {
        if (valid) {
          // alert('submit!');
        } else {
          console.log('error submit!!');
          go = 0
        }
      });
      if (go == 0) return


      this.$confirm(`确认提交?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.Loading = true;

        //如果上传了文件
        if (this.fileList[0]) {
          console.log(this.form)
          //把上传文件函数改为同步，因为里面有上传文件的axios请求
          submitUpload(this.fileList[0], (res) => {
            this.form.photoPath = res
          }).then(res => {
            C_addInquiryDetail(this.form, res => {
              this.Loading = false
              if (res == 1) {
                //获取访客诊断详情
                C_queryInquiryDetailByVId(this.form.vid, res => {
                  console.log(res)
                  console.log(typeof res)
                  console.log(res[0])

                  this.VDetail = res
                  res.forEach(ele => {
                    this.photoArr.push(ele.photoPath)
                    console.log(ele)
                  })
                  this.clear()
                })
              }
            })
          })
        } else {
          console.log(this.form)
          C_addInquiryDetail(this.form, res => {
            this.Loading = false
            if (res == 1) {
              //获取访客诊断详情
              C_queryInquiryDetailByVId(this.form.vid, res => {
                console.log(res)
                console.log(typeof res)
                console.log(res[0])

                this.VDetail = res
                res.forEach(ele => {
                  this.photoArr.push(ele.photoPath)
                  console.log(ele)
                })
                this.clear()
              })
            }
          })
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
    },

    //选择咨询时间
    getInquiryDate(val) {
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
      this.form.inquiryDate = date + ' ' + h + ':' + m + ':' + s
      // console.log(this.form.bornDate)
    },

    //清空表单
    clear() {
      this.form = {}
      this.consultType = []
      this.visitDate = ''
      this.fileList = []
      this.dialogVisible = false
    },

    //图片放大
    srcList(index) {
      // console.log(this.photoArr[index])
      let img = this.photoArr[index]
      return [img]
    },

    //选择咨询类型
    selectConsultType(val) {
      this.form.consultType = val
    },

    //文件上传
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
      //删除文件就把值给空
      this.fileList = []
    },
    handlePreview(file) {
      console.log(file);
    },
    changeFile(file, fileList) {
      // file是最新选择的文件，fileList是已经选择过的文件，包含第一个file，也就是当前file
      console.log(file)
      console.log(fileList)
      this.fileList = fileList
    },
  },
  mounted: function () {

    //获取路由传参
    console.log(this.$route.params)
    this.profile = this.$route.params
    this.form.vid = this.$route.params.id

    //获取咨询类型
    C_queryConsultType(res => {
      res.forEach((element, index) => {
        this.consultType.push({
          value: index + 1,
          label: element.consultType
        })
      })
    })

    //获取访客诊断详情
    C_queryInquiryDetailByVId(this.form.vid, res => {
      console.log(res)
      console.log(typeof res)
      console.log(res[0])

      this.VDetail = res
      res.forEach(ele => {
        this.photoArr.push(ele.photoPath)
        console.log(ele)
      })
    })

  },

}
</script>

<style lang="scss" scoped>
.inline {
  display: inline-block;
}
p {
  display: inline-block;
  font-size: 16px;
  margin: 20px 0;
}
.weightFont {
  font-weight: bold;
}
.photo {
  width: 500px;
}
.card {
  margin: 20px 0;
}

//
.inquiryDetail {
  & >>> .el-tag {
    background-color: transparent !important;
    border-style: none !important;
  }
  & >>> .el-icon-close {
    top: none !important;
    right: none !important;
    color: black !important;
    width: 26px;
    height: 26px;
    line-height: 26px;
    font-size: 26px;
    margin-top: 20px;
  }
  & >>> .el-tag__close {
    color: black !important;
  }
  & >>> .el-card__body {
    // position: absolute;
  }
}

.del {
  float: right;
  z-index: 99;
  position: relative;
  right: 0;
  // right: 100px;
}
</style>