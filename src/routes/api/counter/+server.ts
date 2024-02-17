import { getCounterData } from "$lib/server/query/counter";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ url }) => {
  const counterData = await getCounterData();
  return new Response(JSON.stringify(counterData));
};
