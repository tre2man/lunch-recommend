import { Context, Handler } from "aws-lambda";
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
    const response = {
      statusCode: 200,
      body: JSON.stringify({
        text: `🥘오늘 선택된 메뉴는 ::${rtn}:: 입니다.🥘`,
      }),
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
