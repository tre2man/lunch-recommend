import { Context, Handler } from "aws-lambda";
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
    const response = {
      statusCode: 200,
      body: JSON.stringify({
        text: `π₯μ€λ μ νλ λ©λ΄λ ::${rtn}:: μλλ€.π₯`,
      }),
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
