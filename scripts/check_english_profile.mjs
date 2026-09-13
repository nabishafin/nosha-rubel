import assert from 'node:assert/strict';
import { createServer } from 'node:net';
import { spawn } from 'node:child_process';
const port = await new Promise(resolve => {
  const listener = createServer();
  listener.listen(0, '127.0.0.1', () => {
    const port = listener.address().port;
    listener.close(() => resolve(port));
  });
});
const base = `http://127.0.0.1:${port}`;
const server = spawn(process.execPath, ['node_modules/@react-router/serve/bin.cjs', 'build/server/index.js'], { env: { ...process.env, PORT: String(port) }, stdio: 'ignore' });
const visible = html => html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '').replace(/<style\b[^>]*>[\s\S]*?<\/style>/g, '');
try {
  let ready = false;
  for (let attempt = 0; attempt < 80; attempt++) {
    try { if ((await fetch(`${base}/robots.txt`)).ok) { ready = true; break; } } catch {}
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  assert.ok(ready);
  for (const path of ['/en', '/en/noosha-aubel']) {
    const response = await fetch(base + path);
    assert.equal(response.status, 200);
    const html = visible(await response.text());
    assert.match(html, /Biography &amp; topics/);
    assert.doesNotMatch(html, /Biografie|Oberbürgermeisterin|Amtsantritt|Stichwahl|Quellenstand/);
    assert.match(html, /24 October 2025/);
    assert.match(html, /72\.9/);
    if (path === '/en') {
      assert.match(html, /Person, office and sources/);
      assert.match(html, /Full biography, topics and primary sources/);
      assert.match(html, /href="\/en\/noosha-aubel"/);
    } else {
      assert.match(html, /Career timeline/);
      assert.match(html, /Frequently asked questions about Noosha Aubel/);
      assert.match(html, /Independent, sourced overview/);
    }
  }
  const german = visible(await (await fetch(base + '/de')).text());
  assert.match(german, /Person, Amt und Quellen/);
  assert.match(german, /Biografie &amp; Themen/);
  console.log('English homepage and biography translations passed; German copy preserved.');
} finally { server.kill(); }
