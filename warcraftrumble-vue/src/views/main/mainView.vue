<template>
  <div class="mainView">
    <div>

      <div class="wp-block-group" style="border-width:1px;border-radius:5px">
        <span aria-hidden="true"
          class="wp-block-cover__background has-palette-color-8-background-color has-background-dim-70 has-background-dim"></span>
        <div class="headerText">
          <div class="headerTextDiv">
            <h1>魔兽大作战卡牌WIKI</h1>
            <span>欢迎来到 DotGG 的 Warcraft Rumble！我们是《魔兽争霸》Rumble指南、数据库、构建版本、等级列表、新闻等的最终来源。</span>
          </div>
          <div class="Url_div">
            <ul>
              <li><a href="javascript:void(0)" onclick="alert('开发中')">礼包合集</a></li>
              <li><a href="javascript:void(0)" onclick="alert('开发中')">游戏充值</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="t">
        <el-row :gutter="10">
          <el-col :xs="{ span: 24 }" :sm="{ span: 12 }" :md="{ span: 12 }" v-for="(item, index) in data" :key="index">
            <!-- 第一个内容块 -->
            <div class="box-card-div">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <el-row :gutter="10">
                    <el-col :span="16">
                      <div class="hot_name">
                        <span class="hot_name_span">{{ item.humanname }}</span>
                        <div class="hot"><span>{{ formatTimestamp(item.date, 'Asia/Shanghai') }}</span><i
                            class="el-icon-view"></i>
                          <span>{{ item.views }}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="8" class="column-with-button">
                      <div class="button-container">
                        <el-button size="medium" type="text"><i class="el-icon-share"></i></el-button>
                      </div>
                    </el-col>
                  </el-row>
                </div>
                <div class="text item card_item">
                  <el-row :gutter="10">
                    <el-col :span="5">
                      <div class="left_z" :style="{
                        background: item.deck_json && item.deck_json.leader ?
                          'url(\'https://static.dotgg.gg/rumble/portrait/' + item.deck_json.leader + '.webp\') center top / cover no-repeat'
                          : ''
                      }">
                        <el-image v-if="item.talents_json && item.talents_json.leader" class="left_z_img"
                          :src="'https://static.dotgg.gg/rumble/talent/' + item.talents_json.leader + '.webp'" lazy
                          :fit="cover"></el-image>
                        <span v-if="item.talents_json && item.talents_json.leader">{{ item.talents_json.leader }}</span>
                        <span v-if="item.deck_json && item.deck_json.leader">{{ item.deck_json.leader }}</span>
                      </div>
                    </el-col>
                    <el-col :span="19">
                      <div class="right_z">

                        <div class="sc-gIRiTr kXLcNS">

                          <div class="sc-fybvms hxwczm" v-for="(value, key, index) in item.deck_json" :key="key">
                            <a :href="'/minis/' + key" class="sc-cKZHtR klICPf" v-if="index < 6">
                              <!-- Your existing code for the first six items -->
                              <div class="sc-kiYrGK sApfk">
                                <img
                                  :src="'https://static.dotgg.gg/rumble/generic/Family-' + getTypeById(value) + '-Icon-White.svg'"
                                  class="sc-iktFSN gelSeW" />
                                <div class="sc-aKXii klsOAY">{{ getTypeBycost(value) }}</div>
                                <el-image v-if="item.talents_json[key]"
                                  :src="'https://static.dotgg.gg/rumble/talent/' + item.talents_json[key] + '.webp'" lazy
                                  :fit="cover" class="sc-iktFSN gelSjr"></el-image>
                              </div>
                              <div class="sc-eltaTX flvlo">
                                <el-image :src="'https://static.dotgg.gg/rumble/portrait/' + value + '.webp'" lazy
                                  :fit="cover" class="sc-iIEYgE cDlrMv"></el-image>
                                <div class="sc-gsBpUr cAMGP">{{ value }}</div>
                              </div>
                            </a>
                            <p style="display: none;" v-else> 1 </p>
                          </div>

                        </div>

                      </div>
                    </el-col>

                  </el-row>
                </div>
              </el-card>
            </div>
          </el-col>


        </el-row>
      </div>

    </div>

  </div>
</template>
<script>
// import axios from 'axios';
export default {
  name: 'mainView',
  data() {
    return {
      cover: 'cover',
      CardData: [],//卡组
      data: [
        {
          "name": "guvcy62w12",
          "author": "0",
          "authornick": null,
          "date": "1701794502",
          "date_edited": "1701794909",
          "slug": "tirion-fordring-deck-ndgke",
          "humanname": "Tirion Fordring Deck",
          "youtube": "",
          "fingerprint": "92c16c7a111746ed5460c45ed2ed3349",
          "views": "3",
          "deck": {
            "0": "gryphon-rider",
            "1": "worgen",
            "2": "quilboar",
            "3": "safe-pilot",
            "4": "whelp-eggs",
            "5": "prowler",
            "leader": "tirion-fordring"
          },
          "talents": {
            "0": "odyns-fury",
            "1": "lone-wolf",
            "2": "tunnel-vision",
            "3": "gnomish-cloaking-device",
            "4": "flame-burst",
            "5": "on-the-prowl",
            "leader": "divine-shield"
          }
        }
      ]
    };
  },
  created() {
    this.fetchData(); // 在实例创建后立即执行的异步方法
    this.fetchDatas()
  },
  methods: {
    fetchData() {// 获取卡组信息

      this.$axios.post('/decks')
        .then(response => {
          // console.log("ok")
          console.log(response.data)
          // 寻找所有 class 为 kXLcNS 的元素
          let elements = document.getElementsByClassName('kXLcNS');

          // 遍历找到的元素
          for (let i = 0; i < elements.length; i++) {
            let children = elements[i].getElementsByClassName('hxwczm');
            if (children.length > 0) {
              // 隐藏最后一个 class 为 hxwczm 的元素
              children[children.length - 1].style.display = 'none';
            }
          }



        })
        .catch(error => {
          console.error('Error fetching data', error);
        });


      this.$axios.get('/decks' + "?page=1")
        .then(response => {
          // this.cardData = response.data; // 将获取的数据存储到组件的数据中
          console.error('data', response.data);
          this.data = response.data;



        })
        .catch(error => {
          console.error('Error fetching data', error);
        });


    },
    getTypeById(id) {//查询类型
      const data = this.CardData;
      const item = data.find(item => item.id === id);
      return item ? item.family : "Undead";
    },
    getTypeBycost(id) {//查询类型
      const data = this.CardData;
      const item = data.find(item => item.id === id);
      return item ? item.cost : "0";
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
    formatTimestamp(timestamp, timeZone = 'Asia/Shanghai') {
      if (isNaN(timestamp)) {
        return 'Invalid timestamp';
      }
      const timestampString = timestamp.toString().padStart(10, '0'); // 补齐到10位，以秒为单位
      const date = new Date(parseInt(timestampString) * 1000); // 乘以1000将时间戳转为毫秒
      const options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
      const formattedDate = date.toLocaleString('zh-CN', { timeZone, ...options });
      return formattedDate;
    }
  }
};

</script>
<style scoped>
/* 在等于或小于375px时应用的样式 */
@media (max-width: 414px) {
  .cDlrMv {
    height: auto;
    max-height: 5rem;
    max-width: 5rem;
    -o-object-fit: contain;
    object-fit: contain;
    width: 3rem !important;
  }

  .sApfk {
    display: flex;
    flex-direction: column;
    gap: 0 !important;

  }


  .gelSeW {
    height: auto;
    width: .95rem !important;
    margin: 0 auto;
  }

  .klsOAY {
    width: .95rem !important;
    margin: 0 auto;
  }

  .sApfk {
    display: flex !important;
    flex-direction: row !important;
    /* gap: 5px; */
  }

  .klICPf {
    width: 100% !important;
    height: 130px !important;
    display: flex !important;
    border-radius: 5px !important;
    gap: 5px !important;
    flex-direction: column !important;
    align-items: center !important;
    justify-content: center !important;
    align-content: center !important;
  }

  .flvlo {
    align-items: center;
  }
}

.sc-kiYrGK {
  min-width: 1rem
}

.kXLcNS {
  display: flex;
  gap: .325rem;
  flex-basis: 80%;
  flex-wrap: wrap;
  padding: 1rem 1rem .8rem .5rem;
  place-content: flex-start flex-end;
  justify-content: flex-start;
  align-content: center;
  align-items: center;
}

.hxwczm {
  display: flex;
  flex-direction: column;
  background-color: var(--bg-color);
  width: 31%;
  height: 6.5rem;
  cursor: pointer;
  border-radius: 5px;
  justify-content: space-between;
}

.klICPf {
  width: 100%;
  height: 130px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  border-radius: 5px;
  gap: 5px;
}

.sApfk {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.flvlo {
  display: flex;
  flex-direction: column;
}

.gelSeW {
  height: auto;
  width: auto;
  object-fit: contain;
  max-height: 30px;
  max-width: 20px;
}

.klsOAY {
  color: gold;
  line-height: 22px;
  max-height: 1.25rem;
  max-width: 1.25rem;
  text-shadow: rgb(0, 0, 0) 0px 3px 6px, rgb(0, 0, 0) 0px 3px 6px;
  font-weight: bold;
  text-align: center;
}

.flvlo {
  display: flex;
  flex-direction: column;
}

.cDlrMv {
  height: auto;
  max-height: 5rem;
  max-width: 5rem;
  object-fit: contain;
  width: 100%;
  border: 1px solid rgb(178, 120, 22);
  background-color: rgb(64, 52, 30);
}

.cAMGP {
  color: rgb(238, 238, 238);
  text-align: center;
  line-height: 1em;
  display: flex;
  height: 30px;
  font-size: 0.8em;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  width: 95%;
  text-shadow: rgba(19, 25, 43, 0.2) 0px 3px 6px, rgba(19, 25, 43, 0.12) 0px 3px 6px;
  font-weight: bold;
}

.gelSjr {
  height: auto;
  width: auto;
  object-fit: contain;
  max-height: 1.25rem;
  max-width: 1.25rem;
}

.item {
  margin-bottom: 0 !important;
}

.left_z_img {
  width: 2.5rem
}

.left_z_name {
  color: rgb(238, 238, 238);
  text-align: center;
  line-height: 1em;
  display: flex;
  height: 30px;
  font-size: 0.8em;
  align-items: center;
  justify-content: center;
  width: 95%;
  overflow: hidden;
  text-shadow: rgba(19, 25, 43, 0.2) 0px 3px 6px, rgba(19, 25, 43, 0.12) 0px 3px 6px;
  font-weight: bold;
}

.left_z {
  background: url(https://static.dotgg.gg/rumble/portrait/charlga-razorflank.webp) center top / cover no-repeat;
  width: 100%;
  height: 15rem;
  border-radius: 5px;
  display: flex;
  align-items: flex-end;
  place-content: flex-end center;
  flex-flow: wrap;

}

.left_z,
.right_z {
  position: relative;
  background-color: #555555;
  /* height: 10rem; */
  border-radius: 5px;
}

.el-card ::v-deep .el-card__body {
  padding: .5rem 0 0 0.5rem;
  border-radius: 5px;
  /* background-color: powderblue; */
}

.el-button--medium {
  font-size: 1.35rem;
  /* 设置图标大小 */
}

.column-with-button {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.button-container {
  padding: 3px 0;
}

.hot_name_span {
  color: #ffcd05;

}

.hot {
  margin: 0.35rem 0 0;
  font-size: 0.7rem;
  color: #B0BAC5;
}

.el-card {
  border-radius: 4px;
  border: 1px solid #434a56;
  background-color: #20252b;
  overflow: hidden;
  color: #eeeeee;
  transition: .3s;
}

.el-card ::v-deep .el-card__header {
  padding: 2px 10px;
  background-color: rgb(34, 47, 80);
  border-bottom: none;
}

.hot_name {
  padding: 5px 0 0 5px;
  white-space: nowrap;
  /* 禁止文本换行 */
  overflow: hidden;
  /* 隐藏溢出的部分 */
  text-overflow: ellipsis;
  /* 显示省略号 */
  max-width: 100%;
}

.el-row {
  box-sizing: border-box;
  /* display: flex; */
  align-items: center;
  flex-wrap: nowrap;
}

.el-col {
  padding-left: 0 !important;
  /* padding-right: 0px!important; */
  padding-bottom: 5px !important;
  /* margin: 0 1px 0 0px; */
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}

a {
  text-decoration: none;
  /* 去除下划线 */
  color: inherit;
  /* 继承父元素的文本颜色 */
}

.Url_div ul {
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0 0 1rem 0;

}

.Url_div li {
  list-style: none;
  display: inline-block;
  padding: 0.5rem;
  /* border: 1px solid; */
  background: #dd8500;
  margin: 0 .5rem;
  border-radius: 5px;

}

.headerTextDiv {
  text-align: center;
  padding: 1rem;
}

.headerTextDiv h1 {
  font-size: 2rem;
  padding: 0 0 .85rem 0;
  margin: 0;
}

.headerTextDiv span {
  font-size: 0.95rem;
  width: 95%;
  display: block;
  text-align: center;
  margin: 0 auto;
}

.headerText {
  z-index: 5;
  position: relative;
}

.wp-block-group {
  background-image: url("https://dotgg.gg/warcraft-rumble/wp-content/uploads/sites/26/2023/10/Warcraft-Rumble-Key-Art.webp");
  background-size: cover;
  /* 可选，控制背景图片的尺寸 */
  background-position: center;
  /* 可选，控制背景图片的位置 */
  position: relative;
  box-shadow: 0 0 1px 1px #555555;
  /* 设置白光阴影效果 */
  margin: 0 0 1rem 0;
  border-radius: 5px;
}

.wp-block-cover__background {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.75);
}
</style>