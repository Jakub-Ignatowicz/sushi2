import Error from "next/error";

export async function GET(href: string) {
  const url = `http://127.0.0.1:5152${href}`;
  const res = await fetch(url);
  if (res.ok) {
    return res.json();
  }
  throw new Error({ statusCode: res.status });
}
