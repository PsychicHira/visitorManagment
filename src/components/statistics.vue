<template>
  <div class="Todo">
    <el-card class="box-card">
      <h3>统计</h3>

      <el-divider class="el-divider"></el-divider>



    </el-card>
  </div>

</template>

<script>
import {
  queryVisitor as C_queryVisitor,
} from '../common/methods.js'
export default {
  name: 'Todo',
  data() {
    return {

    };
  },
  methods: {


  },
  mounted: function () {


  }
}
</script>

<style lang="scss" scoped>
.inline {
  display: inline-block;
}
</style>