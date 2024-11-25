<template>
  <div class="home">
   
    <el-row :gutter="10">
      <el-container>
        <!-- 头部 -->
        <el-header>
          <child-headerView />
        </el-header> 
        <el-col :xs="{ span: 24 }" :sm="{ span: 24 }" :md="{ span: 24 }">
        <el-container>
          <!-- 页面左边 -->
          <el-col :xs="{ span: 0 }" :sm="{ span: 1 }" :md="{ span: 2 }">
            <el-aside class="hidden-xs-only" width="auto">
              <child-leftView>
              </child-leftView>
            </el-aside>
          </el-col>
         
          <el-col :xs="{ span: 24 }" :sm="{ span: 22 }" :md="{ span: 20 }">
            <el-container>
              <el-main>
                <!-- 主要内容 -->
                <child-mainView></child-mainView>
                <!-- 自适应显示 -->
                <div class="hidden-sm-and-up"><child-leftView></child-leftView></div>
                <div class="hidden-sm-and-up"><child-rightView></child-rightView></div>
              </el-main>
            </el-container>
          </el-col>
            
          <!-- 页面右边 -->
          <el-col :xs="{ span: 0 }" :sm="{ span: 1 }" :md="{ span: 2 }">
            <el-aside class="hidden-xs-only" width="auto"><child-rightView></child-rightView></el-aside>
          </el-col>
          
        </el-container>
      </el-col>
        <!-- 底部内容 -->
        <el-footer>
          <child-footerView></child-footerView>
        </el-footer>
      </el-container>
      
     
      <!-- <el-col :xs="{ span: 3 }" :sm="{ span: 1 }" :md="{ span: 3 }">
        测试内容111
      </el-col> -->
    </el-row>
  </div>
</template>

<script>
import 'element-ui/lib/theme-chalk/display.css';
// 引入 ChildComponent
import headerView from './header/headerView.vue';
import footerView from './footer/footerView.vue';
import mainView from './main/mainView.vue';
import leftView from './main/LeftView.vue';
import rightView from './main/RightView.vue';
export default {
  name: 'HomeView',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    'child-headerView': headerView,
    'child-footerView': footerView,
    'child-mainView': mainView,
    'child-leftView': leftView,
    'child-rightView': rightView
  }
}
</script>
<style scoped>
.el-row{
  margin: 0 !important;
}
.el-main {
    display: block;
    flex: 1;
    flex-basis: auto;
    overflow: auto;
    box-sizing: border-box;
    max-width: 62rem;
    margin: 0 auto;
}
body,
.home {
  background-color: #13171B;
  color: aliceblue;
  margin: 0;
  padding: 0;
}

.el-header {
  padding: 0;
  height: auto !important;
}

.el-footer {
  padding: 0;
  box-sizing: border-box;
  flex-shrink: 0;
}
</style>
