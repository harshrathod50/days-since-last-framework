import { getDb } from "../db";

export async function getAll() {
  const allFrameWorks = await getDb().framework.findMany({
    orderBy: {
      date: "desc", // Order the results by date in descending order
    },
  });
  return allFrameWorks;
}

export async function getLatest() {
  const mostCurrent = await getDb().framework.findFirst({
    orderBy: {
      date: "desc", // Order the results by date in descending order
    },
  });

  if (!mostCurrent) {
    throw new Error("No framework data found");
  }

  return mostCurrent;
}
