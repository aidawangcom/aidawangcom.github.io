export async function onRequest({ request, env }) {
    try {
        // 尝试读取 visits，如果取不到或者格式不对，就初始化它为 0
        let count = await  env.COUNTER.get("visits");
        
        // 如果读出来不是数字，或者压根没读到，就把它重置成 0
        if (isNaN(parseInt(count))) {
            count = 0;
        } else {
            count = parseInt(count);
        }

        // 增加访问次数
        count = count + 1;

        // 保存回去（注意要转成字符串）
        await env.COUNTER.put("visits", count.toString());

        // 返回结果
        return new Response(JSON.stringify({ visits: count }), {
            headers: { "Content-Type": "application/json" }
        });
    } catch (err) {
        // 如果上面哪一步出错了，返回这个错误信息，方便我们排查
        return new Response(JSON.stringify({ error: err.message }), {
            headers: { "Content-Type": "application/json" }
        });
    }
}
