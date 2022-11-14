/**
 * dynamoDB 사용하기
 */

import AWS, { Credentials } from "aws-sdk";
import { MenuInfo } from "./types";

AWS.config.update({
  region: "ap-northeast-2",
  credentials: new Credentials({
    accessKeyId: process.env.MY_AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY as string,
  }),
});

const dynamo = new AWS.DynamoDB.DocumentClient();

/**
 * 데이터 조회
 * @param name 탐색할 key
 */
export const readData = async (name?: string): Promise<MenuInfo[]> => {
  try {
    if (!!name) {
      return new Promise((resolve) => {
        dynamo.get(
          {
            TableName: "lunch-list",
            Key: {
              name,
            },
          },
          (err, data) => {
            if (!!data.Item) {
              resolve([data.Item] as MenuInfo[]);
            }
            resolve([]);
          }
        );
      });
    } else {
      return new Promise((resolve) => {
        dynamo.scan(
          {
            TableName: "lunch-list",
          },
          (err, data) => {
            resolve(data.Items as MenuInfo[]);
          }
        );
      });
    }
  } catch (e) {
    return [];
  }
};

/**
 * 데이터 생성 OR 업데이트
 * @param input: MenuInfo
 */
export const createUpdateData = async (input: MenuInfo): Promise<boolean> => {
  try {
    return new Promise((resolve) => {
      dynamo.put(
        {
          TableName: "lunch-list",
          Item: {
            name: input.name,
          },
        },
        (err, data) => {
          resolve(true);
        }
      );
    });
  } catch (e) {
    console.log(e);
    return false;
  }
};

/**
 * 데이터 삭제
 * @param name 삭제할 key
 * @returns 
 */
export const deleteData = async (name: string): Promise<boolean> => {
  try {
    return new Promise((resolve) => {
      dynamo.delete(
        {
          TableName: "lunch-list",
          Key: {
            name,
          },
        },
        (err, data) => {
          resolve(true);
        }
      );
    });
  } catch (e) {
    console.log(e);
    return false;
  }
};
