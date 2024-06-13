const fs = require('fs')

// utf8 - UTF-8是一种针对Unicode的可变长度字符编码，将Unicode字符集的抽象代码位映射为8位长整数(即代码位)进行数据存储或传输的序列
fs.readFile('./files/starter.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
})

// exit on uncaught errors
process.on('uncaughtException', err => {
  console.error(`There was an uncaught error: ${err}`);
})