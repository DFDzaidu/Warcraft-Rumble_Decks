<template>
  <div class="header">
    <el-row :gutter="10">
      <el-col :xs="{ span: 1 }" :sm="{ span: 3 }" :md="{ span: 3 }"><span></span>
        <!-- 左边 -->
      </el-col>
      <el-col :xs="{ span: 16 }" :sm="{ span: 18 }" :md="{ span: 16 }">
        <div class="line">
          <div class="logo">
            <img style="width:100%"
              src=" https://dotgg.gg/warcraft-rumble/wp-content/uploads/sites/26/2023/10/Warcraft-Rumble-scaled.webp"
              alt="" srcset="">
          </div>
          <!-- <div class="maneu">
            <el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" @select="handleSelect"
          background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
          <el-menu-item index="1">
            <h3>首页</h3>
          </el-menu-item>
          <el-menu-item index="2">
            <h3>首页</h3>
          </el-menu-item>
          <el-menu-item index="3">
            <h3>首页</h3>
          </el-menu-item>
        </el-menu>
          </div> -->

        </div>
      </el-col>
      <el-col :xs="{ span: 7 }" :sm="{ span: 3 }" :md="{ span: 5 }">
        <span>
          <el-button @click="clickCard" type="primary">
            发布
          </el-button>
        </span>
      </el-col>
    </el-row>

    <el-drawer title="发布卡组" size="70%" :visible.sync="drawer" :direction="direction">
      <!-- 卡牌布局 -->
      <div class="Drawer_div">
        <el-row :gutter="10">


          <el-col :xs="{ span: 6 }" :sm="{ span: 3 }" :md="{ span: 3 }">
            <!-- <el-card class="box-card">
              <div @click="clickCard_Leader" class="Drawer_div_z">
                <i class="el-icon-plus"></i>
              </div>
            </el-card>
             -->
            <!-- 当 currentCommander 有数据时显示第二个 el-card -->
            <el-card v-if="currentCommander" class="image_portrait Lenimage"
              :style="{ backgroundImage: 'url(' + currentCommander.image_portrait + ')', backgroundPosition: '0 0', backgroundSize: '100%', margin: ' 0 auto', position: 'relative' }">
              <div class="Drawer_div_f" @click.prevent="clickCard_Leader">
                <div class="Drawer_div_f Card_div">
                  <img src="https://static.dotgg.gg/rumble/generic/Gold-Icon.webp"
                    class="sc-iktFSN sc-clsGLE gelSdM khOJDi">
                  <div class="sc-gGmKOd coeJmc">{{ currentCommander.cost }}</div>
                </div>
                <div class="sc-ehSCEj koHsKd">{{ currentCommander.name }}</div>
              </div>
            </el-card>

            <!-- 当 currentCommander 没有数据时显示第一个 el-card -->
            <el-card v-else class="box-card">
              <div @click="clickCard_Leader" class="Drawer_div_z">
                <i class="el-icon-plus"></i>
              </div>
            </el-card>

          </el-col>

          <el-col :xs="{ span: 18 }" :sm="{ span: 21 }" :md="{ span: 21 }">
            <!-- <div> -->
            <!-- 添加 v-if 条件，只有在 currentViceCardData 不为空时才进行渲染 -->
            <div v-if="currentViceCardData.length <= 0" class="Drawer_f">
              <div class="Drawer_if">
                <div class="Drawer_f_m">
                  <el-card class="box-card box_Leader">
                    <div @click="clickCard_Troop" class="Drawer_div_f">
                      <i class="el-icon-plus"></i>
                    </div>
                  </el-card>
                  <el-card class="box-card box_Leader">
                    <div @click="clickCard_Troop" class="Drawer_div_f">
                      <i class="el-icon-plus"></i>
                    </div>
                  </el-card>
                  <el-card class="box-card box_Leader">
                    <div @click="clickCard_Troop" class="Drawer_div_f">
                      <i class="el-icon-plus"></i>
                    </div>
                  </el-card>
                </div>
              </div>
              <div class="Drawer_if">
                <div class="Drawer_f_p">
                  <el-card class="box-card">
                    <div @click="clickCard_Troop = true" class="Drawer_div_f">
                      <i class="el-icon-plus"></i>
                    </div>
                  </el-card>
                  <el-card class="box-card">
                    <div @click="clickCard_Troop = true" class="Drawer_div_f">
                      <i class="el-icon-plus"></i>
                    </div>
                  </el-card>
                  <el-card class="box-card">
                    <div @click="clickCard_Troop = true" class="Drawer_div_f">
                      <i class="el-icon-plus"></i>
                    </div>
                  </el-card>
                </div>
              </div>
            </div>
            <!-- 如果 currentViceCardData 为空，可以添加一个提示或者其他内容 -->
            <div class="Drawer_f" v-else>
              <div class="Drawer_if">
                <div v-for="(card) in currentViceCardData.slice(0, 3)" :key="card.id" class="Drawer_f_m">
                  <el-card class="box-card"
                    :style="{ backgroundImage: 'url(' + card.image_background + ')', backgroundPosition: '0 0', backgroundSize: '100%', position: 'relative' }">
                    <div class="Drawer_div_f Card_div" @click.prevent="clickCard_Troop">
                      <img :src="card.image_statue" class="sc-higXfs gCUACl">
                      <div class="sc-lcuiaG jkQopx ">
                        <img src="https://static.dotgg.gg/rumble/generic/Gold-Icon.webp"
                          class="sc-iktFSN sc-clsGLE gelSdM khOJDi">
                        <div class="sc-gGmKOd coeJmc">{{ card.cost }}</div>
                      </div>
                      <div class="sc-ehSCEj koHsKd">{{ card.name }}</div>
                    </div>
                  </el-card>
                </div>
              </div>
              <div class="Drawer_if">
                <div v-for="(card) in currentViceCardData.slice(3, 6)" :key="card.id" class="Drawer_f_p">
                  <el-card class="box-card"
                    :style="{ backgroundImage: 'url(' + card.image_background + ')', backgroundPosition: '0 0', backgroundSize: '100%', position: 'relative' }">
                    <div class="Drawer_div_f Card_div" @click.prevent="clickCard_Troop">
                      <img :src="card.image_statue" class="sc-higXfs gCUACl">
                      <div class="sc-lcuiaG jkQopx ">
                        <img src="https://static.dotgg.gg/rumble/generic/Gold-Icon.webp"
                          class="sc-iktFSN sc-clsGLE gelSdM khOJDi">
                        <div class="sc-gGmKOd coeJmc">{{ card.cost }}</div>
                      </div>
                      <div class="sc-ehSCEj koHsKd">{{ card.name }}</div>
                    </div>
                  </el-card>
                </div>
              </div>
            </div>
            <!-- </div> -->
          </el-col>
        </el-row>
      </div>

      <div class="send_add">
        <el-button type="primary" @click="send_add">发布</el-button>
      </div>




      <!-- 弹窗内容 -->
      <el-dialog title="选择你要出场的主将" width="90%" :visible.sync="dialogFormVisible" :modal="false">
        <!-- 开始列表 -->
        <el-row :gutter="10" class="Leader_box">

          <el-col :span="6" v-for="(item, index) in typeCardData" :key="index" class="box">
            <el-card shadow="never" class="Leader_card">
              <!-- 卡牌 -->
              <a href="javascript:void(0);" @click.stop="($event) => selectCommander(item, $event)"
                :style="{ backgroundImage: 'url(' + item.image_background + ')' }" class="sc-nFrIV bWAaml">
                <img :src="item.image_statue" class="sc-higXfs gCUACl">
                <div class="sc-lcuiaG jkQopx">
                  <img src="https://static.dotgg.gg/rumble/generic/Gold-Icon.webp"
                    class="sc-iktFSN sc-clsGLE gelSdM khOJDi">
                  <div class="sc-gGmKOd coeJmc">{{ item.cost }}</div>
                </div>
                <div class="sc-ehSCEj koHsKd">{{ item.name }}</div>
              </a>
            </el-card>
          </el-col>


        </el-row>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
      </el-dialog>




      <!-- 弹窗内容 -->
      <el-dialog title="选择你要出场的卡牌" width="90%" :visible.sync="TroopVisible" :modal="false">
        <!-- 开始列表 -->
        <el-row :gutter="10">
          <el-col :span="6" v-for="(item, index) in typeCardData" :key="index" class="box">
            <el-card shadow="never" class="Leader_card">

              <el-row :gutter="10">

                <a href="javascript:void(0);" :style="{ backgroundImage: 'url(' + item.image_background + ')' }"
                  class="sc-nFrIV bWAaml" @click.stop="($event) => selectViceCard(item, $event)">

                  <el-col :span="24">
                    <img :src="item.image_statue" class="sc-higXfs gCUACl">
                  </el-col>
                  <el-col :span="24">
                    <div class="sc-lcuiaG jkQopx">
                      <img src="https://static.dotgg.gg/rumble/generic/Gold-Icon.webp"
                        class="sc-iktFSN sc-clsGLE gelSdM khOJDi">
                      <div class="sc-gGmKOd coeJmc">{{ item.cost }}</div>
                    </div>
                  </el-col>
                  <el-col :span="24">
                    <div class="sc-ehSCEj koHsKd">{{ item.name }}</div>
                  </el-col>
                </a>

              </el-row>

            </el-card>
          </el-col>
        </el-row>
        <div slot="footer" class="dialog-footer">
          <el-button @click="TroopVisible = false">取 消</el-button>
          <el-button type="primary" @click="TroopVisible = false">确 定</el-button>
        </div>
      </el-dialog>




    </el-drawer>


  </div>
</template>
<script>
export default {
  name: 'headerView',
  data() {
    return {
      activeIndex: '1',
      activeIndex2: '1',
      drawer: false,
      direction: 'btt',
      dialogFormVisible: false,//选择主将卡牌状态
      TroopVisible: false,//选择副卡牌状态
      checkboxGroup1: [],
      CardData: [],//所有卡牌
      typeCardData: [],//所有卡牌
      currentCommander: '',//当前主将
      currentViceCardData: [],//当前副卡
      selectedDeckData: [],//选择卡组数据
    };
  },
  methods: {
    handleClose() {
      return this.$confirm('确认关闭？');
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    fetchDatas() {// 获取卡牌信息
      this.$axios.get('/getAllCards')
        .then(response => {
          // 将获取的数据存储到组件的数据中
          // console.error('data', response.data);
          this.CardData = response.data;

        })
        .catch(error => {
          console.error('Error fetching data', error);
        });
    },
    clickCard() {//主弹窗按钮
      // console.log(this.CardData);
      this.drawer = true;//弹窗
      this.fetchDatas();
    },
    clickCard_Troop() {//副将弹窗按钮
      this.TroopVisible = true;//弹窗
      this.getTypeById("Troop")
      // console.log(this.typeCardData);
    },
    clickCard_Leader() {//主将弹窗按钮
      if (this.CardData.length == 0) {
        this.fetchDatas();
      }

      // console.log('data' + this.CardData);
      this.dialogFormVisible = true;//弹窗
      this.getTypeById("Leader")
      // console.log(this.typeCardData);
    },
    selectCommander(item, event) {
      event.stopPropagation()
      const grandParentElement = event.target.parentNode.parentNode;

      // 检查是否已经选择了相同的主将
      if (this.currentCommander.id === item.id) {
        // 取消选择
        this.currentCommander = {};
        grandParentElement.classList.remove('selectedCard');
      } else {
        // 检查是否已选择了其他主将
        if (Object.keys(this.currentCommander).length > 0) {
          alert("已选择了主将，无法继续选择！");
          this.dialogFormVisible = false;
          return;
        }

        // 选择主将
        this.currentCommander = item;
        grandParentElement.classList.add('selectedCard');
      }

      // console.log(this.currentCommander);
      console.log(event);
    },
    selectViceCard(item, event) {
      event.stopPropagation()
      const grandParentElement = event.target.parentNode.parentNode;

      const cardIndex = this.currentViceCardData.findIndex(card => card.id === item.id);

      if (cardIndex !== -1) {
        // 如果该卡牌已经在数组中，移除它
        this.currentViceCardData.splice(cardIndex, 1);
        grandParentElement.classList.remove('selectedCard');
      } else {
        if (this.currentViceCardData.length >= 6) {
          alert("已选择了6个卡牌，无法继续选择！");
          return;
        }
        // 将卡牌添加到数组中
        this.currentViceCardData.push(item);
        grandParentElement.classList.add('selectedCard');
      }

      console.log(this.currentViceCardData);
      console.log(event);
    },
    getTypeById(type) {//筛选类型
      const data = this.CardData;
      const itemType = data.find(item => item.type === type);
      if (itemType) {
        const type = itemType.type;
        // return data.filter(item => item.type === type);
        this.typeCardData = data.filter(item => item.type === type);
      } else {
        return [];
      }
    },
    send_add() {
      console.log(this.currentViceCardData);
      // 使用 map 函数提取每个对象中的 id 字段
      const ids = this.currentViceCardData.map(i => i.id);

      // 输出新的数组
      console.log(ids);

      console.log(this.currentCommander.id);
      if (this.currentViceCardData.length === 0) {
        alert("请选择卡牌！");
        return;
      }
      if (this.currentCommander.length === 0) {
        alert("请选择卡牌！");
        return;
      }

      function generateRandomString(length) {
        const characters = '0123456789abcdefghijklmnopqrstuvwxyz';
        let result = '';

        for (let i = 0; i < length; i++) {
          const randomIndex = Math.floor(Math.random() * characters.length);
          result += characters.charAt(randomIndex);
        }

        return result;
      }

      // 生成长度为 32 的随机字符串
      const randomString = generateRandomString(32);
      console.log(randomString);
      // 获取当前时间戳，单位是毫秒
      const currentTimestamp = Math.floor(Date.now() / 1000);
console.log(currentTimestamp);
      // 定义数据
      let data = {
        "name": "不知名网友" + generateRandomString(2),
        "author": "0",
        "authornick": null,
        "date": currentTimestamp,
        "date_edited": currentTimestamp,
        "slug": "cairne-bloodhoof-deck-xeci7",
        "humanname": "分享了一个卡组~",
        "youtube": "",
        "fingerprint": randomString,
        "views": Math.floor(Math.random() * 100),// 生成0到99之间的随机数
        "deck": {
          "leader": this.currentCommander.id,
          "0": ids[0],
          "1": ids[1],
          "2": ids[2],
          "3": ids[3],
          "4": ids[4],
          "5": ids[5]
        },
        "talents": {
          "leader": "",
          "0": "",
          "1": "",
          "2": "",
          "3": "",
          "4": "",
          "5": ""
        }
      }
      console.log(data);
      // 发送请求
      // this.$axios.post('http://127.0.0.1:8000/api/v1/decks/', data)
      this.$axios.post('/adddecks', data)
        .then(response => {

          console.log(response);
          //成功后
          this.currentCommander = ''
          this.currentViceCardData = ''
          //关闭弹窗
          this.drawer = false
          window.location.reload();// 跳转到首页


        })
        .catch(error => {

          // this.$router.push('/404'); // 跳转到错误页面

          console.error('POST request error:', error);
        });


    }

  }
}
</script>
<style>
@media (max-width: 414px) {
  .box {
    width: 6rem !important;
    height: auto;
  }

  .bWAaml {
    max-width: 8rem;
    max-height: 11rem;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background: url(https://static.dotgg.gg/rumble/generic/mini_bg_Undead.webp) center center / contain no-repeat;
    justify-content: flex-end;
    align-items: center;
    cursor: pointer;
    position: relative;
  }

  .gCUACl {
    height: auto;
    max-height: 70%;
    max-width: 85%;
    -o-object-fit: contain;
    object-fit: contain;
    width: 100%;
    width: 6rem;
    height: 6rem;
  }

  .image_portrait {
    height: 15rem;
  }

  .Drawer_div_z {

    height: 12rem !important;

  }

  .koHsKd {
    font-size: .77rem;
  }

  .Drawer_f_m>.el-card,
  .Drawer_f_p>.el-card {
    width: 4.4rem !important;
    height: 5.9rem !important;
    margin: 0 0 0 .2rem !important;
  }

  .Lenimage {
    max-width: 6rem !important;
    height: 15rem !important;
    min-width: 4.5rem !important;
  }

  .Drawer_f_m>.el-card,
  .Drawer_f_p>.el-card {
    width: 6rem;
    height: 9rem;
    margin: 0 0 0 .61rem;
    text-align: center;
    justify-content: center;
    display: flex;
    align-items: center;
  }

  .Drawer_div>.el-row>.el-col {
    padding: 0 !important;
  }

}

/* / */
.Card_div .koHsKd {
  margin: 1rem 0 0 0 !important;
  width: 100%;
}

.Lenimage {
  background-size: 7rem;
  max-width: 7rem;
  height: 22rem;
  min-width: 6rem;
}

.send_add {
  text-align: right;
  margin: 0 1rem;
}

.send_add button {
  background: #222f50;
  border: 1px solid #dcdfe645;
  width: 5rem;
}

/* .Drawer_f_m>.el-card>.el-card__body {
  padding: 1rem 0 0 0 !important;
  margin: 1rem 0 0 0 !important;
} */
/* .Drawer_div_f {
  margin: 0 auto;
  position: absolute;
  bottom: 0;
  width: 71%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
  align-content: center;
} */
.image_portrait {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-content: center;
  align-items: center;
}

.image_portrait .Drawer_div_f {
  margin: 0 auto;
  text-align: center;

}

.image_portrait .Drawer_div_f .sc-gGmKOd {
  position: absolute;
  top: auto;
  left: 50%;
  bottom: 15%;
  transform: translate(-50%, -50%);
  margin: 0 auto;
  color: aliceblue;

}

.image_portrait .Drawer_div_f .koHsKd {
  color: rgb(238, 238, 238);
  width: 98%;
}

/* .Drawer_div_f .coeJmc{
  color: cornsilk;
    margin-top: -1rem;
    padding: 0 0 10px;
} */

.Drawer_f_m>.image_portrait {
  height: 22rem;

}

.box {
  width: 8rem !important;
  height: auto;
}

.Drawer_if,
.Drawer_f_p {
  display: flex;
  /* width: 99%; */
}

.selectedCard {
  box-shadow: inset 2px -5px 20px 9px #ff1919 !important;
}

.coeJmc {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.khOJDi {
  position: relative;
  top: -25px;
}

.gelSdM {
  height: auto;
  width: auto;
  object-fit: contain;
  max-height: 1rem;
  max-width: 1rem;
}

.koHsKd {
  color: rgb(238, 238, 238);
  width: 48%;
  text-shadow: rgba(19, 25, 43, 0.2) 0px 3px 6px, rgba(19, 25, 43, 0.12) 0px 3px 6px;
  font-weight: bold;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font-size: .68rem;
  text-align: center;
  margin: 0 auto;
  padding: 0 0 .51rem 0;
}

.jkQopx {
  color: rgb(238, 238, 238);
  line-height: 48px;
  height: 4px;
  text-shadow: rgb(0, 0, 0) 0px 3px 6px, rgb(0, 0, 0) 0px 3px 6px;
  font-weight: bold;
  text-align: center;
  position: relative;
  margin-top: 7rem;
}

.gCUACl {
  max-height: 70%;
  max-width: 70%;
  -o-object-fit: contain;
  object-fit: contain;
  margin: 0 auto;
  display: block;
  position: absolute;
  top: 47%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.bWAaml {
  max-width: 8rem;
  max-height: 11rem;
  width: 100%;
  height: 100%;
  min-width: 8rem;
  min-height: 11rem;
  display: flex;
  flex-direction: column;
  background: url(https://static.dotgg.gg/rumble/generic/mini_bg_Undead.webp) center center / contain no-repeat;
  justify-content: flex-end;
  align-items: center;
  cursor: pointer;
  position: relative;
}

.Leader_card>.el-card__body {
  padding: 0;
  display: flex;
  justify-content: center;

}

/* 主将卡牌选择 */
.Drawer_f_m {
  padding: 0 0 1rem 0;
  display: flex;
}

.Drawer_f_m>.el-card,
.Drawer_f_p>.el-card {

  width: 7rem;
  height: 10rem;
  margin: 0 0 0 1rem;
  text-align: center;
  justify-content: center;
  display: flex;
  align-items: center;
}

a {
  text-decoration: none;
  /* 去除下划线 */
  color: inherit;
  /* 继承父元素的颜色 */
}

.Drawer_f {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: flex-start;
  align-content: center;
}


.Drawer_div_z {
  width: 100%;
  max-width: 9rem;
  height: 20rem;
  text-align: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

.el-drawer__header {
  align-items: center;
  color: #f19e23 !important;
  display: flex;
  font-weight: 900;
  padding: 1.2rem 1.3rem;
  background: #222f50;
}

.el-drawer.btt {
  background: #333;
  width: 95% !important;
  border-radius: 5px;
  margin: 0 auto;
  border: 1px solid #303133;
  color: #fff;
}


.Drawer_div {
  margin: 0 auto;
  width: 97.333%;
  color: #303246;
}

/* 卡牌 */

.el-menu.el-menu--horizontal {
  border-bottom: 0;
  margin: 0 0 0 1rem;
}

.logo {
  display: flex;
  flex-direction: row;
  align-content: center;
  align-items: center;
  width: 6rem;
  margin: 0 0 0 1rem;
}

.line {
  display: flex;
  flex-direction: row;
  align-content: space-between;
  justify-content: flex-start;
  align-items: center;

}

.header>.el-row {
  margin-left: 0 !important;
  margin-right: 0 !important;
  display: flex;
  justify-content: flex-start;
  flex-wrap: nowrap;
  align-items: center;
  padding: 1rem 0;
  border-radius: 5px;
}

h3 {
  line-height: normal;
}

.header {
  /* background-color: #20252B; */
  background-color: #303246;
  padding: 0;

}

.el-menu {
  border-right: solid 1px #e6e6e6;
  list-style: none;
  position: relative;
  margin: 0;
  padding-left: 0;
  /* background-color: #FFF; */
}

.el-menu-demo,
.el-menu--horizontal,
.el-menu,
.el-menu-item {
  background-color: #303246 !important
}

.el-menu.el-menu--horizontal {
  border-bottom: 0
}
</style>