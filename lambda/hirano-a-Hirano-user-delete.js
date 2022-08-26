const AWS = require("aws-sdk");
const dynamo = new AWS.DynamoDB.DocumentClient();
const tableName = "Post";

exports.handler = (event, context, callback) => {
  const response = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({ message: "" }),
  };

  const body = JSON.parse(event.body);
  const userId = body.userId;
  const timestamp = Date.now();
  const category = body.category;
  const text = body.text;
  
  //TODO: 削除対象のテーブル名と削除したいデータのkeyをparamに設定
  const param = {
    TableName:tableName,
    Item:{
      userId:userId,
      timestamp:timestamp,
      category:category,
      text:text
    }
  };
  
  if(event.headers.authorization !=="mtiToken"){
    response.statusCode = 401;
    response.body = JSON.stringify({ message:"トークンが違います。" });
    callback(null,response);
    return;
　}

  //dynamo.delete()を用いてデータを削除
  dynamo.delete(param, function (err, data) {
    if (err) {
      console.log(err);
      response.statusCode = 500;
      response.body = JSON.stringify({
        message: "予期せぬエラーが発生しました",
        err: err
      });
      callback(null, response);
      return;
    } else {
      //TODO: 削除に成功した場合の処理を記述
      response.body = JSON.stringify({
        message:"ok"
      });
      callback(null,response);
      return;
    }
  });
};
