import { Context, Handler } from "aws-lambda";
import { deleteData } from "./db";

const main: Handler = async (event: any, context: Context) => {
  try {
    const sp = new URLSearchParams(event.body);
    const text = sp.get("text") as string;
    await deleteData(text);
    const response = {
      statusCode: 200,
      body: JSON.stringify({ text: "식당 삭제 완료" }),
    };
    return response;
  } catch (e) {
    console.log("error", e);
    const response = {
      statusCode: 404,
      body: JSON.stringify({ text: "식당 삭제 오류" }),
    };
    return response;
  }
};

export { main };
