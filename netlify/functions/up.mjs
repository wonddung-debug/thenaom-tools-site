// 올리기 페이지(/up/) 목록 보관: 영상 통합 작업실(PC 프로그램)이 등록하고, 휴대폰에서 지울 수 있어요.
import { getStore } from "@netlify/blobs";
import { createHash } from "node:crypto";
const KEY_HASH = "d62bd3ccdaa75347dc42b4f7105d64ab9a0526bec30374eff6bda6287d14017a"; // 등록 열쇠의 지문 (열쇠 자체는 PC 프로그램에만 있어요)
const json = (o, s = 200) => new Response(JSON.stringify(o), { status: s, headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" } });
export default async (req) => {
  const store = getStore("up");
  const list = (await store.get("list", { type: "json" })) || [];
  if (req.method === "GET") return json({ items: list });
  if (req.method !== "POST") return json({ error: "method" }, 405);
  let b = {}; try { b = await req.json(); } catch { return json({ error: "json" }, 400); }
  if (b.action === "del") { const next = list.filter((x) => x.id !== String(b.id || "")); await store.setJSON("list", next); return json({ ok: true, items: next }); }
  if (b.action === "put") {
    if (createHash("sha256").update(String(b.key || "")).digest("hex") !== KEY_HASH) return json({ error: "key" }, 403);
    const it = b.item; if (!it || !it.id || !it.title) return json({ error: "item" }, 400);
    if (JSON.stringify(it).length > 60000) return json({ error: "too big" }, 413);
    it.at = new Date().toISOString(); const next = [it, ...list.filter((x) => x.id !== it.id)].slice(0, 200); await store.setJSON("list", next); return json({ ok: true, items: next });
  }
  return json({ error: "action" }, 400);
};
