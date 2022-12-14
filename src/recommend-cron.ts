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
        ? "μλΉμμ"
        : list[Math.floor(Math.random() * list.length)].name;
    await axios.post(process.env.SLACK_WEBHOOK_URL as string, {
      text: `π₯μ€λ μΆμ² λ©λ΄λ ::${rtn}:: μλλ€.π₯`,
    });
    const response = {
      statusCode: 200,
      body: JSON.stringify({ text: "μ μ¬ μΆμ² μλ£" }),
    };
    return response;
  } catch (e) {
    console.log("error", e);
    const response = {
      statusCode: 404,
      body: JSON.stringify({ text: "μ μ¬ μΆμ² μ€λ₯" }),
    };
    return response;
  }
};

export { main };
