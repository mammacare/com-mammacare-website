import client from "./client";
import { groq } from "next-sanity";

export async function getPages() {
  return client.fetch(groq`*[_type=="page"]`);
}

export async function getPosts() {
  return client.fetch(groq`*[_type=="post"]`);
}
