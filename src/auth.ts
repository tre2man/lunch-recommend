import { Context, Handler } from "aws-lambda";

const main: Handler = async (event: any, context: Context) => {
  try {
    const challenge = JSON.parse(event.body) as string;
    const response = {
      statusCode: 200,
      body: JSON.stringify({ challenge }),
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
