const mysql = require('mysql2/promise');


// 创建MySQL连接池
const pool = mysql.createPool({
	//   host: 'localhost', // 数据库主机名
	host: '154.12.55.19',
	user: 'Warcraft', // 用户名
	password: 'Warcraft', // 密码
	database: 'warcraft', // 数据库名
	connectionLimit: 10 // 连接池最大连接数
});

// 分页查询接口
async function getGameContent(page, pageSize) {
	try {
	  // 从连接池获取连接
	  const connection = await pool.getConnection();
  
	  // 查询总记录数
	  const countQuery = 'SELECT COUNT(*) as total FROM GP_Game_Content';
	  const [countResult] = await connection.execute(countQuery);
	  const total = countResult[0].total;
  
	  // 计算偏移量
	  const offset = (page - 1) * pageSize;
  
	  // 分页查询数据
	  const query = 'SELECT * FROM GP_Game_Content LIMIT ? OFFSET ?';
	  const params = [pageSize, offset];
	  const [rows] = await connection.execute(query, params);
  
	  // 释放数据库连接
	  connection.release();
  
	  return {
		total,
		data: rows
	  };
	} catch (error) {
	  console.error('Error:', error);
	}
  }
module.exports = {
	pool,
	getGameContent
};