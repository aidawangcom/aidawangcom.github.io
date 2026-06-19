export async function onRequest({ request, env }) {
  let count = await env.COUNTER.get("visits");
  count = count ? parseInt(count) + 1 : 1;
  await env.COUNTER.put("visits", count.toString());
  return new Response(JSON.stringify({ visits: count }), {
    headers: { "Content-Type": "application/json" }
  });
}
