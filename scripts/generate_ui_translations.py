"""Generate checked-in translations of certified public website copy.

Development utility only; the running website never contacts a translator.
The input excludes original article bodies, hidden state and project files.
"""
import concurrent.futures
import json
import pathlib
import re
import time
import urllib.parse
import urllib.request

ROOT = pathlib.Path(__file__).resolve().parents[1]
source = json.loads((ROOT / 'app/data/ui-source-strings.json').read_text())
evidence = json.loads((ROOT / 'app/data/ui-translation-public-evidence.json').read_text())['strings']
assert all(text in evidence for text in source), 'Only certified public text may be sent'
langs = ['de', 'en', 'zh', 'es', 'fr', 'it', 'pt', 'hi', 'pl', 'cs', 'ko', 'sv', 'ar', 'ja', 'el', 'ru', 'uk', 'tr']
out = ROOT / 'app/data/ui-translations.json'
dictionaries = json.loads(out.read_text()) if out.exists() else {lang: {} for lang in langs}

def retrieve(task):
    lang, batch = task
    query = urllib.parse.urlencode([('client', 'dict-chrome-ex'), ('sl', 'auto'), ('tl', 'zh-CN' if lang == 'zh' else lang)] + [('q', text) for text in batch])
    url = 'https://clients5.google.com/translate_a/t?' + query
    for attempt in range(4):
        try:
            request = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
            response = json.load(urllib.request.urlopen(request, timeout=35))
            assert len(response) == len(batch)
            results = {}
            for text, item in zip(batch, response):
                value = item[0] if isinstance(item, list) else item
                assert isinstance(value, str) and value.strip()
                assert sorted(re.findall(r'\{\d+\}', text)) == sorted(re.findall(r'\{\d+\}', value)), (text, value)
                results[text] = value
            return lang, results
        except Exception as error:
            if attempt == 3:
                return lang, {'__ERROR__': str(error)}
            time.sleep(attempt + 1)

tasks = []
for lang in langs:
    batch, encoded = [], 0
    for text in source:
        if text in dictionaries[lang]:
            continue
        length = len(urllib.parse.quote_plus(text)) + 3
        if batch and (encoded + length > 9500 or len(batch) >= 70):
            tasks.append((lang, batch))
            batch, encoded = [], 0
        batch.append(text)
        encoded += length
    if batch:
        tasks.append((lang, batch))
print('Translating', len(source), 'certified public strings in', len(tasks), 'batches', flush=True)
failures = []
with concurrent.futures.ThreadPoolExecutor(max_workers=6) as pool:
    for count, (lang, results) in enumerate(pool.map(retrieve, tasks), 1):
        if '__ERROR__' in results:
            failures.append((lang, results['__ERROR__']))
            print('Retry needed:', lang, results['__ERROR__'], flush=True)
        else:
            dictionaries[lang].update(results)
        out.write_text(json.dumps(dictionaries, ensure_ascii=False, indent=2) + '\n')
        if count % 6 == 0:
            print('Completed', count, '/', len(tasks), flush=True)
if failures:
    raise SystemExit(str(failures))
print('All 18 editions complete', flush=True)
