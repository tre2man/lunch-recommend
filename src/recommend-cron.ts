import { Context, Handler } from "aws-lambda";
import axios from "axios";
import { readData } from "./db";

const main: Handler = async (event: any, context: Context) => {
  try {
    const sp = new URLSearchParams(event.body);
    const text = sp.get("text") as string;
    const list = await readData(text);
    const rtn =
      list.length <= 0
        ? "식당없음"
        : list[Math.floor(Math.random() * list.length)].name;
    await axios.post(process.env.SLACK_WEBHOOK_URL as string, {
      text: `🥘오늘 추천 메뉴는 ::${rtn}:: 입니다.🥘`,
    });
    const response = {
      statusCode: 200,
      body: JSON.stringify({ text: "점심 추천 완료" }),
    };
    return response;
  } catch (e) {
    console.log("error", e);
    const response = {
      statusCode: 404,
      body: JSON.stringify({ text: "점심 추천 오류" }),
    };
    return response;
  }
};

export { main };
