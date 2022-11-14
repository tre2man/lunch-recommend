import { Context, Handler } from "aws-lambda";
import { readData } from "./db";

const main: Handler = async (event: any, context: Context) => {
  try {
    const sp = new URLSearchParams(event.body);
    const text = sp.get("text") as string;
    const list = await readData(text);
    if (list.length <= 0) {
      console.log("식당없음");
    } else {
      list.sort((a, b) => (a.name > b.name ? 1 : -1));
    }
    let rtn = "🍘전체 식당 리스트입니다.🍘\n";
    list.forEach((item) => {
      rtn += `${item.name}\n`;
    });
    const response = {
      statusCode: 200,
      body: JSON.stringify({
        text: rtn,
      }),
    };
    return response;
  } catch (e) {
    console.log("error", e);
    const response = {
      statusCode: 404,
      body: JSON.stringify(e),
    };
    return response;
  }
};

export { main };
