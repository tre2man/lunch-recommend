import { createUpdateData } from "./db";
import { Context, Handler } from "aws-lambda";

const main: Handler = async (event: any, context: Context) => {
  try {
    const sp = new URLSearchParams(event.body);
    const text = sp.get("text") as string;
    await createUpdateData({ name: text });
    const response = {
      statusCode: 200,
      body: JSON.stringify({ text: "식당 추가 완료" }),
    };
    return response;
  } catch (e) {
    console.log("error", e);
    const response = {
      statusCode: 404,
      body: JSON.stringify({ text: "식당 추가 오류" }),
    };
    return response;
  }
};

export { main };
