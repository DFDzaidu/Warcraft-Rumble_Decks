// 引入express框架
const express = require('express');
// 导入处理form对象的模块
const formidable = require('formidable');
// 导入路径拼接path
const path = require('path');
// 向其他服务器请求数据的模块
const request = require('request');
const { pool } = require('../../model/mysql'); // 导入Mysql数据库
const axios = require('axios');
// 创建路由对象
const api = express.Router();

api.use((req, res, next) => {
  // 允许哪些客户端访问我
  res.header('Access-Control-Allow-Origin', '*'); // 允许所有客户端访问我
  // 允许客户端使用哪些请求方法访问我
  res.header('Access-Control-Allow-Methods', 'get,post');
  next();
});


api.get('/test', (req, res) => {
  res.send({
    data: {
      a: 0,
      b: 1,
      c: 2
    }
  });
})

// 添加新卡牌
api.post('/addCard/:id', async (req, res) => {
  res.send({
    data: {
      a: 0,
      b: 1,
      c: 2
    }
  })

});

// 获取所有卡牌
api.get('/getAllCards', async (req, res) => {
  const selectQuery = 'SELECT * FROM cards';

  try {
    const connection = await pool.getConnection();
    const [results] = await connection.query(selectQuery);
    connection.release();
    res.status(200).json(results);
  } catch (error) {
    console.error('获取卡牌出错:', error);
    res.status(500).json({ error: '获取卡牌出错' });
  }
});

// 通过名称获取特定卡牌
api.post('/getCard/:id', async (req, res) => {
  try {
    const connection = await pool.getConnection();

    const cardId = req.params.id;

    // Query by card id
    const query = 'SELECT * FROM cards WHERE id = ?';
    const [results] = await connection.query(query, [cardId]);

    // Check if a card with the specified id was found
    if (results.length > 0) {
      res.status(200).json(results[0]);
    } else {
      res.status(404).json({ error: 'Card not found' });
    }

    // Release the database connection
    connection.release();
  } catch (error) {
    console.error('Error querying card by id:', error);
    res.status(500).json({ error: 'Error querying card by id' });
  }
});
api.get('/getCard/:id', async (req, res) => {
  try {
    const connection = await pool.getConnection();

    const cardId = req.params.id;

    // Query by card id
    const query = 'SELECT * FROM cards WHERE id = ?';
    const [results] = await connection.query(query, [cardId]);

    // Check if a card with the specified id was found
    if (results.length > 0) {
      res.status(200).json(results[0]);
    } else {
      res.status(404).json({ error: 'Card not found' });
    }

    // Release the database connection
    connection.release();
  } catch (error) {
    console.error('Error querying card by id:', error);
    res.status(500).json({ error: 'Error querying card by id' });
  }
});
// 通过类型获取特定卡牌
api.get('/TypeCards', async (req, res) => {
  const connection = await pool.getConnection();

  try {
    const type = req.query.type; // 从请求参数中获取 type

    if (!type) {
      return res.status(400).json({ error: 'Type parameter is required' });
    }

    // 使用参数 type 查询对应的数据
    const [cards] = await connection.query('SELECT * FROM cards WHERE type = ?', [type]);

    res.status(200).json(cards);
  } catch (error) {
    console.error(error);

    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    connection.release();
  }
});



// 获取原始站点卡组数据
api.get('/getNewDecks', async (req, res) => {
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

    // console.log(JSON.stringify(response.data));
    res.json(response.data); // 将响应发送到客户端
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' }); // 发送错误响应
  }
});

//将获取的原始卡组数据存在数据库
api.post('/decks', async (req, res) => {
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

    // console.log(JSON.stringify(response.data));
    // res.status(200).json(response.data);
    // return

    const connection = await pool.getConnection();

    try {
      const decks = response.data;
    
      if (!connection._beginTransactionCalled) {
        await connection.beginTransaction();
      }
    
      await connection.query(`
        CREATE TABLE IF NOT EXISTS decks (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          author VARCHAR(255) NOT NULL,
          authornick VARCHAR(255),
          date VARCHAR(255) NOT NULL,
          date_edited VARCHAR(255) NOT NULL,
          slug VARCHAR(255) NOT NULL,
          humanname VARCHAR(255) NOT NULL,
          youtube VARCHAR(255),
          fingerprint VARCHAR(255) NOT NULL,
          views INT NOT NULL,
          deck_json TEXT NOT NULL,
          talents_json TEXT NOT NULL,
          UNIQUE KEY unique_fingerprint (fingerprint)
        )
      `);
    
      await Promise.all(decks.map(async (deck) => {
        try {
          // 查询是否存在相同的 fingerprint
          const [existingDeck] = await connection.query(`
            SELECT * FROM decks WHERE fingerprint = ?
          `, [deck.fingerprint]);
    
          if (existingDeck.length > 0) {
            // 如果存在，则执行更新操作
            await connection.query(`
              UPDATE decks 
              SET 
                name = ?,
                author = ?,
                authornick = ?,
                date = ?,
                date_edited = ?,
                slug = ?,
                humanname = ?,
                youtube = ?,
                views = ?,
                deck_json = ?,
                talents_json = ?
              WHERE fingerprint = ?
            `, [
              deck.name,
              deck.author,
              deck.authornick,
              deck.date,
              deck.date_edited,
              deck.slug,
              deck.humanname,
              deck.youtube,
              deck.views,
              JSON.stringify(deck.deck),
              JSON.stringify(deck.talents),
              deck.fingerprint,
            ]);
    
            console.log(`Deck with fingerprint ${deck.fingerprint} 更新保存完成.`);
          } else {
            // 如果不存在，则执行插入操作
            await connection.query(`
              INSERT INTO decks 
                SET ? 
            `, {
              name: deck.name,
              author: deck.author,
              authornick: deck.authornick,
              date: deck.date,
              date_edited: deck.date_edited,
              slug: deck.slug,
              humanname: deck.humanname,
              youtube: deck.youtube,
              fingerprint: deck.fingerprint,
              views: deck.views,
              deck_json: JSON.stringify(deck.deck),
              talents_json: JSON.stringify(deck.talents),
            });
    
            console.log(`Deck ${deck.name} 插入成功`);
          }
        } catch (error) {
          console.error(error);
          throw error; // Rethrow the error to maintain error propagation
        }
      }));
    
      await connection.commit();
    
      res.status(201).json({ message: 'Data saved or updated successfully' });
    } catch (error) {
      console.error(error);
    
      if (connection._beginTransactionCalled) {
        await connection.rollback();
      }
    
      res.status(500).json({ error: 'Internal Server Error' });
    } finally {
      connection.release();
    }
    




    // res.json(response.data); // 将响应发送到客户端
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' }); // 发送错误响应
  }



});
//获取卡组数据 数据库
api.get('/decks', async (req, res) => {
  const connection = await pool.getConnection();

  try {
    const page = req.query.page || 1; // 从请求参数中获取页码，默认为第一页
    const pageSize = req.query.pageSize || 30; // 指定每页的数据量，默认为 10 条

    const offset = (page - 1) * pageSize;

    // 查询指定范围内的数据
    const [decks] = await connection.query('SELECT * FROM decks ORDER BY id DESC LIMIT ? OFFSET ?', [pageSize, offset]);
    const decksWithParsedJSON = decks.map(deck => {
      const parsedDeckJSON = JSON.parse(deck.deck_json);
      const parsedTalentsJSON = JSON.parse(deck.talents_json);
    
      return {
        ...deck,
        deck_json: parsedDeckJSON,
        talents_json: parsedTalentsJSON,
      };
    });

    res.status(200).json(decksWithParsedJSON);
  } catch (error) {
    console.error(error);

    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    connection.release();
  }
});
api.post('/adddecks', async (req, res) => {
  const connection = await pool.getConnection();

  try {
    const deckData = req.body;

    // 验证请求体中是否包含必要的字段
    const requiredFields = ['name', 'author', 'date', 'date_edited', 'slug', 'humanname', 'fingerprint', 'views', 'deck', 'talents'];
    const missingFields = requiredFields.filter(field => !(field in deckData));

    if (missingFields.length > 0) {
      return res.status(400).json({ error: `Missing required fields: ${missingFields.join(', ')}` });
    }

    // 将数据插入 MySQL 数据库
    await connection.query('INSERT INTO decks SET ?', {
      name: deckData.name,
      author: deckData.author,
      authornick: deckData.authornick,
      date: deckData.date,
      date_edited: deckData.date_edited,
      slug: deckData.slug,
      humanname: deckData.humanname,
      youtube: deckData.youtube || '', // 可选字段
      fingerprint: deckData.fingerprint,
      views: deckData.views,
      deck_json: JSON.stringify(deckData.deck),
      talents_json: JSON.stringify(deckData.talents),
    });

    console.log(`Deck ${deckData.name} saved successfully`);

    res.status(201).json({ message: 'Data saved successfully' });
  } catch (error) {
    console.error(error);

    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    connection.release();
  }
});


// 将公共内容开放出去
module.exports = api;
