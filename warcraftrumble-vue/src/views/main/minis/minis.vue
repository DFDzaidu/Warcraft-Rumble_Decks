<template>
  <div id="app">
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
                  <div class="ct-container">
                    <article>
                      <h1 class="page-title skills" title="">{{ data.name }}</h1>
                      <div id="rootOfProContent">
                        <div class="sc-fTNHwr kdYrfS">
                          <el-row :gutter="10">
                            <el-col :xs="{ span: 23 }" :sm="{ span: 7 }" :md="{ span: 7 }">
                              <!-- 第一个内容块 -->
                              <div class="sc-bTRMUJ jWnvhl">
                                <div class="sc-BXoKi bYHVeh">
                                  <div class="sc-tYqQR jWWsuQ">
                                    <div class="sc-ikPBrU bfXApa"><img
                                        src="https://static.dotgg.gg/rumble/generic/Family-Undead-Icon-White.svg"
                                        class="sc-iktFSN gelSeW">
                                      <img v-if="data.type"
                                        :src="'https://static.dotgg.gg/rumble/generic/Type-' + data.type + '-Icon.svg'"
                                        width="25" alt="Troop">
                                      <div class="sc-hzMNJk hJxsEa">
                                        {{ data.cost }}
                                      </div>
                                    </div>
                                    <div class="sc-XhViZ hrwoes">
                                      <el-image width="250" :src=data.image_statue lazy
                                        class="sc-biBryG bUpxYZ"></el-image>
                                      <div class="sc-eHfQwz gDWWxm">
                                        {{ data.name }}
                                      </div>
                                    </div>
                                  </div>
                                  <div class="sc-fTA-DbV fzqXgv">
                                    <div class="sc-ihmZjS cfbcUX">
                                      <div>等级</div>
                                      <div class="sc-fxNNzt fkSMvp"><input type="range" min="1" step="1" max="30"
                                          class="sc-cjHIxf rLsgE" value="1">
                                        <div class="sc-fXuNk iKpinV">1</div>
                                      </div>
                                    </div>
                                    <div class="sc-dcwpFa loPjBM" v-for="(item, index) in data.stats" :key="index">
                                      <img v-if="item.icon"
                                        :src="'https://static.dotgg.gg/rumble/generic/' + item.icon + '.webp'"
                                        class="sc-iktFSN bZylQj">
                                      <div class="sc-iumIrj buXJFo">
                                        <div class="sc-JooWZ cHSmnP">
                                          {{ item.stat }}
                                        </div>
                                        <div class="sc-gGTFJM eHTBHt">
                                          <div class="sc-hRxdHw hZcSot">
                                            {{ item.value }}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </el-col>
                            <el-col :xs="{ span: 23 }" :sm="{ span: 17 }" :md="{ span: 17 }">
                              <!-- 第一个内容块 -->
                              <div class="sc-gUUBNJ hoQeup">
                                <el-row :gutter="10">
                                  <el-col :xs="{ span: 24 }" :sm="{ span: 12 }" :md="{ span: 12 }">
                                    <div class="sc-cVktCt ghNbst">
                                      <div class="sc-BXoKi dhqWcg">
                                        <div class="sc-hgupYM YYbVS">关键信息
                                        </div>
                                        <div class="sc-kHNLVa iUqLPL">
                                          <div class="sc-ksXhSD bDmDHQ">
                                            <div class="sc-bGqOnq juejOS">
                                              类型
                                            </div>
                                            <div class="sc-gYhgZz jORpuU">
                                              <img width="25" v-if="data.type"
                                                :src="'https://static.dotgg.gg/rumble/generic/Type-' + data.type + '-Icon.svg'"
                                                title="Troop">{{ data.type }}
                                            </div>
                                          </div>
                                          <div class="sc-ksXhSD bDmDHQ">
                                            <div class="sc-bGqOnq juejOS">
                                              派系</div>
                                            <div class="sc-gYhgZz jORpuU">

                                              <img
                                                :src="'https://static.dotgg.gg/rumble/generic/Family-' + data.family + '-Icon-White.svg'"
                                                class="sc-iktFSN gelSeW">{{ data.family }}
                                            </div>
                                          </div>
                                          <div class="sc-ksXhSD bDmDHQ">
                                            <div class="sc-bGqOnq juejOS">
                                              成本
                                            </div>
                                            <div class="sc-gYhgZz jORpuU">
                                              {{ data.cost }}
                                              <img src="https://static.dotgg.gg/rumble/generic/Iconography_Gold.webp"
                                                class="sc-iktFSN gklukz">
                                            </div>
                                          </div>
                                          <div class="sc-ksXhSD bDmDHQ">
                                            <div class="sc-bGqOnq juejOS">
                                              描述
                                            </div>
                                            <div class="sc-gYhgZz jORpuU">
                                              {{ data.description }}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div class="sc-BXoKi dhqWcc">
                                        <div class="sc-hgupYM YYbVS">专长
                                        </div>
                                        <div class="sc-fiKTNH gwSAri" v-for="(item, index) in data.traits" :key="index">
                                          <div class="sc-licbtr lcIGWz">
                                            <div class="sc-dkIYMQ lcEuM">
                                              <div class="sc-dtTHgf jyOatO">
                                                <!--    v-if="data.name"
                                                      :src="'https://static.dotgg.gg/rumble/trait/' + item.name + '.webp'" -->
                                                <img v-if="data.name"
                                                  :src="'https://static.dotgg.gg/rumble/trait/' + item.name + '.webp'"
                                                  class="sc-iktFSN gFGKPn">
                                              </div>
                                              <div class="sc-euMqrB iDghiA">
                                                <div class="sc-fHuKJW gjjkyz">
                                                  <a href="/warcraft-rumble/traits/Tank">{{ item.name }}</a>
                                                </div>
                                                <div class="sc-gIntVs hZXagt">
                                                  {{ item.description }}
                                                </div>
                                                <div class="sc-dWdcNP dNzRzW">
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </el-col>
                                  <el-col :xs="{ span: 24 }" :sm="{ span: 12 }" :md="{ span: 12 }">
                                    <div class="sc-BXoKi bYHVeh">
                                      <div class="sc-hgupYM YYbVS">技能</div>
                                      <div class="sc-fiKTNH gwSAri">
                                        <div class="sc-hJxCvy dLwrwL" v-for="(item, index) in data.talents" :key="index">
                                          <div class="sc-dkIYMQ lcEuM">
                                            <div class="sc-dtTHgf jyOatO">
                                              <img :src="'https://static.dotgg.gg/rumble/talent/' + item.icon + '.webp'"
                                                class="sc-iktFSN gFGKPn">
                                            </div>
                                            <div class="sc-euMqrB iDghiA">
                                              <div class="sc-fHuKJW gjjkyz">
                                                {{ item.name }}
                                              </div>
                                              <div class="sc-gIntVs hZXagt">
                                                {{ item.description }}
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </el-col>
                                </el-row>
                              </div>
                            </el-col>
                          </el-row>


                        </div>
                      </div>
                    </article>
                  </div>
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
    </el-row>

  </div>
</template>
<script>
import 'element-ui/lib/theme-chalk/display.css';
// 引入 ChildComponent
import headerView from "./../../header/headerView";
import footerView from './../../footer/footerView.vue';
import leftView from './../../main/LeftView.vue';
import rightView from './../../main/RightView.vue';
export default {
  name: 'MinisView',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    'child-headerView': headerView,
    'child-footerView': footerView,
    // 'child-mainView': mainView,
    'child-leftView': leftView,
    'child-rightView': rightView
  },
  data() {
    return {
      data: {}
    }
  },
  methods: {
    //请求方法
    fetchData(paramName) {
      this.$axios.post('/getCard/' + paramName)
        .then(response => {
          // 将字符串形式的数组属性转换为真正的数组
          // 在每个属性进行检查并转换
          const newData = {
            ...response.data,
          };

          if (newData.stats) {
            newData.stats = JSON.parse(newData.stats);
          }

          if (newData.traits) {
            newData.traits = JSON.parse(newData.traits);
          }

          if (newData.talents) {
            newData.talents = JSON.parse(newData.talents);
          }

          if (newData.abilities) {
            newData.abilities = JSON.parse(newData.abilities);
          }

          if (newData.valor) {
            newData.valor = JSON.parse(newData.valor);
          }

          console.log(newData);
          this.data = newData;
          // console.log('POST request successful:', response.data);
          console.log(this.data);

          if (response.status === 200) {
            // 请求成功，执行你的逻辑
          } else {
            // 请求成功，但响应状态码不是200
            this.$router.push('/404'); // 跳转到错误页面
          }

        })
        .catch(error => {

          this.$router.push('/404'); // 跳转到错误页面

          console.error('POST request error:', error);
        });
    }
  },
  created() {
    // 在 created 钩子中访问路由参数并打印
    // 获取路由参数
    const paramName = this.$route.params.paramName;
    if (paramName) {
      this.fetchData(paramName);
    } else {
      console.error('请求页面错误');
    }
    // console.log('1'+this.$route.params.paramName);
  },
  mounted() {
    // 在 mounted 钩子中也可以访问路由参数

    console.log('1' + this.$route.params.paramName);
  }
}
</script>
<style scoped>
a {
  text-decoration: none;
  /* 移除下划线 */
  color: inherit;
  /* 使用父元素的颜色，保留继承的颜色 */
  cursor: pointer;
  /* 改变鼠标指针样式，可选 */
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
#app {
  background-color: #13171B;
  color: aliceblue;
  margin: 0;
  padding: 0;
}

.lcIGWz {
  display: flex;
  flex-flow: column wrap;
  gap: 5px;
  width: 100%;
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

.hZcSot {
  color: rgb(238, 238, 238);
  font-weight: bold;
  width: auto;
  line-height: 33px;
  height: 33px;
  text-align: center;
}

.eHTBHt {
  display: flex;
}

.cHSmnP {
  line-height: 1em;
}

.buXJFo {
  display: flex;
  flex-direction: column;
}

.bZylQj {
  height: auto;
  width: auto;
  object-fit: contain;
  max-height: 1.25rem;
  max-width: 1.25rem;
}

.iKpinV {
  color: var(--paletteColor1);
  font-weight: bold;
}

.rLsgE {
  appearance: none;
  width: 90%;
  height: 15px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 5px;
  outline: none;
}

.fkSMvp {
  display: flex;
  width: 100%;
  align-items: center;
  gap: 10px;
}

.loPjBM {
  flex-basis: 50%;
  display: flex;
  align-items: center;
  gap: 5px;
}

.cfbcUX {
  appearance: none;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.gDWWxm {
  color: rgb(238, 238, 238);
  text-align: center;
  line-height: 1em;
  display: flex;
  font-size: 1.5em;
  align-items: center;
  justify-content: center;
  text-shadow: rgba(19, 25, 43, 0.2) 0px 3px 6px, rgba(19, 25, 43, 0.12) 0px 3px 6px;
  font-weight: bold;
}

.gelSeW {
  height: auto;
  width: auto;
  object-fit: contain;
  max-height: 30px;
  max-width: 20px;
}

img {
  height: auto;
  max-width: 100%;
  vertical-align: middle;
}

.hrwoes {
  display: flex;
  flex-direction: column;
  margin-right: 25px;
}

.bfXApa {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.fzqXgv {
  width: 90%;
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
  font-size: .85rem;
  line-height: 1.5rem;
}

.jWWsuQ {
  width: 100%;
  background-color: rgb(56, 45, 81);
  height: auto;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 5px;
  border-radius: 5px;
}

.hZXagt {
  font-size: 0.8em;
}

.gjjkyz {
  color: rgb(238, 238, 238);
}

.gFGKPn {
  height: auto;
  width: auto;
  -o-object-fit: contain;
  object-fit: contain;
  max-height: 2.35rem;
  max-width: 2.35rem;
}

.iDghiA {
  display: flex;
  /* flex-basis: 61%; */
  flex-direction: column;
  flex-wrap: wrap;
}

.jyOatO {
  flex-basis: 15%;
  display: flex;
  align-items: center;
}

.lcEuM {
  background-color: #13171b;
  display: flex;
  width: 100%;
  padding: 5px;
  border-radius: 5px;
}

.dLwrwL {
  display: flex;
  flex-flow: column wrap;
  gap: 5px;
  width: 100%;
  margin: .2rem;
}

.gwSAri {
  display: flex;
  width: 90%;
  flex-wrap: wrap;
  margin-top: 5px;
  padding: 10px;
}


.bYHVeh {
  flex-basis: auto;
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  align-items: flex-start;
  border: solid 1px #434a56;
  background-color: #20252b;
  border-radius: 10px;
  padding: 0px;
}

.jORpuU {
  flex-basis: 80%;
  color: rgb(238, 238, 238);
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
}

.juejOS {
  flex-basis: 20%;
}

.bDmDHQ {
  display: flex;
  width: 95%;
}

.iUqLPL {
  display: flex;
  width: 100%;
  flex-flow: column wrap;
  margin-top: 5px;
  padding: 10px;
  justify-content: center;
}

.YYbVS {
  background-color: rgb(56, 45, 81);
  display: flex;
  width: 100%;
  /* padding: 10px; */
  border-radius: 10px 10px 0px 0px;
  justify-content: space-between;
  min-height: 60px;
  font-weight: bold;
  line-height: 60px;
}

.dhqWcc {
  flex-basis: 70%;
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  align-items: flex-start;
  border: solid 1px #434a56;
  background-color: #20252b;
  border-radius: 10px;
  padding: 0px;
}

.dhqWcg {
  flex-basis: 30%;
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  align-items: flex-start;
  border: solid 1px #434a56;
  background-color: #20252b;
  border-radius: 10px;
  padding: 0px;
}

.jORpuU .sc-iktFSN {
  width: 1.25rem;
  padding: 0 0 0 .25rem;
}

/* .bYHVeh {
  flex-basis: auto;
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  align-items: flex-start;
  border: solid 1px var(--border);
  background-color: var(--bg-darkest);
  border-radius: 10px;
  padding: 0px;
} */

.ghNbst {
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 100%;
}

.hoQeup {
  display: flex;
  gap: 10px;
}

.rootOfProContent {
  box-sizing: border-box;
}

.kdYrfS {
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
}

.jWnvhl {
  display: flex;
  border-radius: 5px;
  border: 1px solid #c0c4cc42;
}
</style>