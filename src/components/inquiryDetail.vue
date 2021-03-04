<template>
  <div class="inquiryDetail">
    <el-card class="box-card">
      <h3>诊历详情</h3>

      <el-divider class="el-divider"></el-divider>

      <el-row>
        <el-col :span="6">
          <p>姓名：</p>
          <p>{{profile.name}}</p>
        </el-col>
      </el-row>

      <el-button type="success" @click="dialogVisible = true">添加诊断</el-button>

    </el-card>

    <!-- 弹窗 -->
    <el-dialog title="诊断详情" :visible.sync="dialogVisible" center width="1200px">

      <el-form ref="form" :model="form" label-width="80px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="咨询主题">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="咨询费用">
              <el-input v-model="form.name" placeholder="单位：元"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col>
            <el-form-item label="简要描述" prop="content">
              <el-input type="textarea" v-model="form.content" :rows="2"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col>
            <el-form-item label="相关照片">
              <el-upload class="upload-demo" ref="upload" action="https://jsonplaceholder.typicode.com/posts/" :limit="1" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList" :auto-upload="false" :on-change="changeFile">
                <el-button slot="trigger" size="" type="primary">选取文件</el-button>
                <el-button style="margin-left: 10px;" size="" type="success" @click="submitUpload($event)">上传到服务器</el-button>
                <div slot="tip" class="el-upload__tip">多文件请打包成压缩包</div>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col>
            <el-form-item label="诊断结果" prop="content">
              <el-input type="textarea" v-model="form.content" :rows="2"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col>
            <el-form-item label="处理方式" prop="content">
              <el-input type="textarea" v-model="form.content" :rows="2"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col>
            <el-form-item label="结果反馈" prop="content">
              <el-input type="textarea" v-model="form.content" :rows="2"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col>
            <el-form-item label="备注" prop="content">
              <el-input type="textarea" v-model="form.content" :rows="2"></el-input>
            </el-form-item>
          </el-col>
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
} from '../common/methods.js'
export default {
  name: 'inquiryDetail',
  data() {
    return {
      dialogVisible: false,
      form: {},
      profile: {
        name: ''
      },
      fileList:[]
    };
  },
  methods: {

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


    console.log(this.$route.params)
    this.profile = this.$route.params

  },

}
</script>

<style lang="scss" scoped>
.inline {
  display: inline-block;
}
p {
  display: inline-block;
  font-size: 18px;
  margin: 20px 0;
}
</style>