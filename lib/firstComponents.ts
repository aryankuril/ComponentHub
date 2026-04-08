import dbConnect from "./mongodb";
import Component from "./schemas/Component";

export async function getFirstComponents() {
  await dbConnect();

  const components = await Component.find({})
    .lean();

  return components;
}