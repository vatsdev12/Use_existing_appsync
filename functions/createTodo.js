const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB();
const { AppSyncRealTime } = require("aws-sdk");

module.exports.handler = async (event) => {
  const id = event.arguments.id;
  const name = event.arguments.name;
  const description = event.arguments.description;

  const params = {
    Item: {
      id: {
        S: id,
      },
      name: {
        S: name,
      },
      description: {
        S: description,
      },
    },
    ReturnConsumedCapacity: "TOTAL",
    TableName: process.env.TODO_TABLE_NAME,
  };

  return dynamodb
    .putItem(params)
    .promise()
    .then((data) => {
      // return {
      //     id,
      //     name,
      //     description
      // }
      const Getparams = {
        TableName: process.env.TODO_TABLE_NAME,
      };
      return dynamodb
        .scan(Getparams)
        .promise()
        .then(async (data) => {
          const todoList = [];
          for (let i = 0; i < data.Items.length; i++) {
            todoList.push({ id: data.Items[i].id.S });
          }
          let message = {
            name: "hello",
          };
          const realtime = new AppSyncRealTime({ apiVersion: "2018-05-29" });

          await realtime
            .postToConnection({
              apiId: "jwbaa63swvfonlkp6uefvumsna",
              connectionId: "098",
              payload: JSON.stringify(message),
            })
            .promise();
          console.log("todoList", todoList);
          return todoList;
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};
