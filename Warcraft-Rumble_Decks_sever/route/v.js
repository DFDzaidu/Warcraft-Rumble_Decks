//引入express框架
const { json } = require('body-parser');
const express = require('express');
//导入处理form对象的模块
const formidable = require('formidable')
//导入路径拼接path
const path = require('path')
//向其他服务器请求数据的模块
const request = require('request');
const mysql = require('mysql2/promise');
const { pool } = require('../model/mysql'); // 导入Mysql数据库
//创建路由对象
const v = express.Router();
const axios = require('axios');
v.use((req, res, next) => {
  // 允许哪些客户端访问我
  res.header('Access-Control-Allow-Origin', '*') //允许所有客户端访问我
  // 允许客户端使用哪些请求方法访问我
  res.header('Access-Control-Allow-Methods', 'get,post')
  next()
})

// 获取原始站点卡牌数据
v.get('/getNew', async (req, res) => {
  const apiUrl = 'https://api.dotgg.gg/rumble/do.php';
  const currentTimestamp = new Date().getTime(); // 获取当前时间戳
  const timestampWithZeros = currentTimestamp + "000"; // 在时间戳后面添加三个零
  const cache = timestampWithZeros;
  const cmd = 'getminis';

  try {
    const response = await axios.get(apiUrl, {
      params: { cache, cmd },
      headers: {
        'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36 Edg/120.0.0.0',
      },
    });

    console.log(JSON.stringify(response.data));
    res.json(response.data); // 将响应发送到客户端
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' }); // 发送错误响应
  }
});
//获取原始站点卡牌数据进行加工处理
v.get('/getMini', async (req, res) => {
  let data = []

  axios.get('http://127.0.0.1:9529/v/getNew')
    .then(response => {
      data = response.data;
      console.log("获取原始数据成功！");
    })
    .catch(error => {
      console.error(error);
    });
  // 将整个data数据转换为字符串
  // let dataString = JSON.stringify(data);

  dataString = JSON.stringify(data, (key, value) => {
    if (typeof value === 'string') {
      return escapeHTML(value);
    }
    return value;
  });
  function escapeHTML(text) {
    return text.replace(/</g, '').replace(/>/g, '').replace(/\"/g, '');
  }

  // 配置替换规则的对象
  const replacementConfig = {
    // "Tank":"坦克",
    // "Melee":"近战",
    // "AoE":"范围攻击",
    // "Hook":"钩拽",
    "Abomination": "憎恶",
    "Angry Chickens": "愤怒的小鸡",
    "Health": "生命",
    "DPS": "秒伤",
    "Area Damage": "范围伤害",
    "Attack Speed": "攻击速度",
    "Speed": "速度",
    "This style=KeywordTanky/style mass of flesh and steel will style=KeywordHook/style ranged enemies, drawing them into his style=KeywordCleave/style attack.": "这个由各种材料组合而成的坦克会钩拽远处的敌人，拖至身前并进行顺劈攻击。",
    "High health unit.brGood at soaking bTower/b damage.": "高生命值单位。善于吸收防御塔所造成的伤害。",
    "Hooks ranged enemies.": "钩拽远处的敌人。",
    "Strong vs bRanged/b units.": "有效克制远程单位。",
    "Strong vs bSquad/b units.": "有效克制小队单位。",
    "Noxious Presence": "有害污染",
    "sprite=Iconography_traits name=Poisons tint=1Poison nearby enemies every 3 seconds.": "每三秒使附近的敌人中毒一次。",
    "Cannonball": "炮弹来袭",
    "On deploy and at 50% health, stun nearby enemies for 5 seconds.": "部署时或生命值到50%时，会使附近敌人昏迷5秒",
    "Fresh Meat": "新鲜的肉",
    "After hooking a target, deal double damage on the next attack.": "勾到目标后，下一次攻击会造成双倍伤害。",
    "Fresh Meats": "新鲜的肉",
    "A flock of feathered fowlbrthat can overwhelm even thebrheartiest of style=KeywordTanks/style and Towers.": "飞羽猛禽，只要数量够多，两最坚强的坦克和防御塔都能被淹没。",
    // 添加其他替换规则，按需添加
  };

  Object.keys(replacementConfig).forEach(fieldName => {
    const regex = new RegExp(`"${fieldName}"`, 'g');
    dataString = dataString.replace(regex, `"${replacementConfig[fieldName]}"`);
  });

  // 将替换后的字符串转换回对象
  const newData = JSON.parse(dataString);
  // res.status(200).json(newData);
  res.send("完成！");

  //  try {
  //    // 从连接池获取连接
  //    connection = await pool.getConnection();

  //    // 创建表的 SQL 查询
  //    const createTableQuery = `
  //      CREATE TABLE IF NOT EXISTS cards (
  //       id VARCHAR(255) PRIMARY KEY,
  //       name VARCHAR(255),
  //       cost INT,
  //       type VARCHAR(255),
  //       family VARCHAR(255),
  //       leaderAbility TEXT,
  //       description TEXT,
  //       summary TEXT,
  //       stats TEXT,     -- Change JSON to TEXT
  //       traits TEXT,    -- Change JSON to TEXT
  //       talents TEXT,   -- Change JSON to TEXT
  //       abilities TEXT, -- Change JSON to TEXT
  //       valor TEXT,     -- Change JSON to TEXT
  //       Damage INT,
  //       HitPoints INT,
  //       DamageSec INT,
  //       AttackSec FLOAT,
  //       image_statue VARCHAR(255),
  //       image_background VARCHAR(255),
  //       image_portrait VARCHAR(255)
  //      );
  //    `;

  //    // 插入数据的 SQL 查询
  //    const insertQuery = `
  // INSERT INTO cards (
  //     id, name, cost, type, family, leaderAbility, description, summary, 
  //     stats, traits, talents, abilities, valor, Damage, HitPoints, DamageSec, 
  //     AttackSec, image_statue, image_background, image_portrait
  // ) VALUES ? 
  // ON DUPLICATE KEY UPDATE 
  //     name = VALUES(name),
  //     cost = VALUES(cost),
  //     type = VALUES(type),
  //     family = VALUES(family),
  //     leaderAbility = VALUES(leaderAbility),
  //     description = VALUES(description),
  //     summary = VALUES(summary),
  //     stats = VALUES(stats),
  //     traits = VALUES(traits),
  //     talents = VALUES(talents),
  //     abilities = VALUES(abilities),
  //     valor = VALUES(valor),
  //     Damage = VALUES(Damage),
  //     HitPoints = VALUES(HitPoints),
  //     DamageSec = VALUES(DamageSec),
  //     AttackSec = VALUES(AttackSec),
  //     image_statue = VALUES(image_statue),
  //     image_background = VALUES(image_background),
  //     image_portrait = VALUES(image_portrait)
  // `;
  //    // 转换数据中的 'valor' 字段为 JSON 字符串
  //    const dataValues = newData.map(item => {
  //     item.stats = JSON.stringify(item.stats);
  //     item.traits = JSON.stringify(item.traits);
  //     item.talents = JSON.stringify(item.talents);
  //     item.abilities = JSON.stringify(item.abilities);
  //     item.valor = JSON.stringify(item.valor);
  //     return Object.values(item);
  // });

  //    // 创建表
  //    await connection.query(createTableQuery);

  //    // 执行插入数据的查询
  //    const results = await connection.query(insertQuery, [dataValues]);

  //    // 打印成功信息
  //    console.log('Data inserted/updated successfully:', results);

  //    res.status(200).json({ success: '成功' });
  //  } catch (error) {
  //    console.error('获取卡牌出错:', error);
  //    res.status(500).json({ error: '获取卡牌出错' });
  //  } finally {
  //    if (connection) {
  //      // 释放连接到连接池
  //      connection.release();
  //    }
  //  }


})
// 获取原始站点卡组数据
v.get('/getNewDecks', async (req, res) => {
  const currentTimestamp = new Date().getTime(); // 获取当前时间戳
  const timestampWithZeros = currentTimestamp + "000"; // 在时间戳后面添加三个零
  console.log(timestampWithZeros); // 输出新的时间戳\
  const apiUrl = 'https://api.dotgg.gg/rumble/do.php?rq={%22page%22:1,%22limit%22:30,%22srt%22:%22date%22,%22direct%22:%22desc%22,%22type%22:%22%22,%22my%22:0,%22myarchive%22:0,%22fav%22:0,%22getdecks%22:{%22hascrd%22:[],%22nothascrd%22:[],%22youtube%22:0,%22smartsrch%22:%22%22,%22date%22:%22%22,%22leader%22:%22%22}}';
  const cache = timestampWithZeros;
  const cmd = 'getdecks';

  try {
    const response = await axios.get(apiUrl, {
      params: { cache, cmd },
      headers: {
        'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36 Edg/120.0.0.0',
      },
    });

    console.log(JSON.stringify(response.data));
    res.json(response.data); // 将响应发送到客户端
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' }); // 发送错误响应
  }
});


// 将公共内容开放出去
module.exports = v;
