"""Import publisher-authorized full articles from downloaded source HTML.
Usage: Python with lxml and Pillow, scripts/import_authorized_articles.py SOURCE_DIRECTORY
Fetch the URLs in article-import-manifest.tsv into GROUP-LANGUAGE.html first.
The importer preserves article text and inline emphasis, excludes site chrome,
allows only safe article markup, and records hashes for reproduction checks.
"""
from pathlib import Path
from urllib.parse import urljoin, urlparse
from datetime import datetime, timezone
import hashlib, html as escaping, json, re, shutil, sys
from lxml import html
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SOURCE = Path(sys.argv[1])
rows = [line.split('\t') for line in (ROOT/'scripts/article-import-manifest.tsv').read_text().splitlines()]
LANG_NAMES = dict(de='Deutsch',en='English',es='Spanish',fr='French',it='Italian',pt='Portuguese',ru='Russian',uk='Ukrainian',ar='Arabic',tr='Turkish',zh='Chinese',ko='Korean',hi='Hindi',el='Greek',ja='Japanese',sv='Swedish',pl='Polish',cs='Czech')
UNNAMED = {'de':'unnamed (4).png','en':'unnamed (1).png','es':'unnamed (2).png','fr':'unnamed (3).png','it':'unnamed.png'}
ALLOWED = {'p','strong','em','b','i','a','br','h2','h3','h4','ul','ol','li','blockquote','sup','sub'}
def norm(text): return re.sub(r'\s+', ' ', text).strip()
def digest(value): return hashlib.sha256(value).hexdigest()
def safe(node, page_url):
    if node.tag in {'script','style','iframe','form','button','input'}: raise ValueError('Unexpected active element in source article')
    tag = node.tag if node.tag in ALLOWED else None
    inner = escaping.escape(node.text or '', quote=False)
    for child in node:
        inner += safe(child, page_url) + escaping.escape(child.tail or '', quote=False)
    attrs = ''
    if tag == 'a':
        href = urljoin(page_url,node.get('href',''))
        if urlparse(href).scheme not in {'https','http','mailto'}: tag = None
        else: attrs = ' href="'+escaping.escape(href,quote=True)+'" rel="noopener noreferrer"'
    if tag == 'p' and len(norm(node.text_content())) < 180 and len(node) == 1 and node[0].tag in {'strong','b'} and norm(node.text_content()) == norm(node[0].text_content()): tag = 'h2'
    if not tag: return inner
    if tag == 'br': return '<br>'
    return f'<{tag}{attrs}>{inner}</{tag}>'

current=json.loads((ROOT/'app/data/articles.generated.json').read_text())
full={}; evidence=[]
governance=json.loads((ROOT/'app/data/media-governance.json').read_text())
governance['firstPartyFamilies']=[f for f in governance['firstPartyFamilies'] if not f['id'].startswith('authorized-publications-')]
for group in ['political-bankruptcy','leadership-crisis']:
    governance['firstPartyFamilies'].append(dict(id='authorized-publications-'+group,files={},owner='User-confirmed newspaper owner',source='User-supplied article images; missing Czech image downloaded from its source publication',creator='Source publisher; image text and artwork preserved as supplied',creditLine='Publisher and byline on each article page',license='User confirms these newspapers are theirs and authorizes full-text and image republication in this request',rightsStatus='approved',purpose='Article illustration for authorized full-text republication',altPolicy='Article headline; decorative empty alt in cards',caption='Publisher illustration',focalPoint='center',language='Per article contentLocale or language',permittedTransformations=['copy unchanged'],sensitiveExifPolicy='Images copied unchanged from user-supplied files'))

for group,lang,publisher,url in rows:
    source_path=SOURCE/(group+'-'+lang+'.html'); raw=source_path.read_bytes(); tree=html.fromstring(raw)
    bodies=tree.xpath('//*[@itemprop="articleBody"]'); assert len(bodies)==1, (url,'body missing')
    body=bodies[0]; authors=body.xpath('.//*[contains(concat(" ",normalize-space(@class)," ")," article-editor ")]')
    author=norm(' '.join(a.text_content() for a in authors)) or publisher
    for a in authors: a.drop_tree()
    title=norm(tree.xpath('//*[@id="title"]')[0].text_content())
    intro=tree.xpath('//*[@id="introText"]')[0]
    description=norm(intro.text_content())
    published=tree.xpath('//meta[@itemprop="datePublished"]/@content')[0]
    dates=datetime.fromisoformat(published).replace(tzinfo=timezone.utc).isoformat(timespec='milliseconds').replace('+00:00','Z')
    image_url=urljoin(url,tree.xpath('//img[@itemprop="image"]/@src')[0])
    if group=='political-bankruptcy': image_path=ROOT/'datafolder2'/(LANG_NAMES[lang]+'-Politische-Bankrotterklaerung-Potsdam-950x533.png')
    else:
        name=UNNAMED.get(lang) or ('Traditional-Chinese' if lang=='zh' else LANG_NAMES[lang])+'-Noosha-Aubel-Skandal-Potsdam-07.09.2026.png'
        image_path=ROOT/'datafolder'/name
    assert image_path.exists(),image_path
    local_image='/media/articles/'+group+'-'+lang+'.png'
    shutil.copyfile(image_path,ROOT/('public'+local_image))
    width,height=Image.open(image_path).size
    slug=Path(urlparse(url).path).stem; article_id=lang+'-'+slug.split('-')[0]
    paragraphs=[norm(p.text_content()) for p in body if norm(p.text_content())]
    body_html=safe(body,url); lead_html=safe(intro,url)
    assert norm(html.fromstring('<div>'+body_html+'</div>').text_content())==norm(body.text_content()), (url,'body text changed')
    assert norm(html.fromstring('<div>'+lead_html+'</div>').text_content())==description
    content_locale='uk-UA' if group=='leadership-crisis' and lang=='ru' else 'zh-Hant' if lang=='zh' else None
    record=dict(id=article_id,language=lang,category='politics',slug=slug,title=title,description=description,content=[],image=local_image,imageWidth=width,imageHeight=height,sourceUrl=url,sourceName=publisher,author=author,publishedAt=dates,views=0,tags=['Noosha Aubel','Potsdam','CDU','SPD'] if group=='political-bankruptcy' else ['Noosha Aubel','Potsdam','Brandenburg'],featured=True,translationGroup='authorized-'+group+'-2026-09',publicationMode='full')
    if content_locale: record['contentLocale']=content_locale
    full[article_id]=dict(bodyHtml=body_html,leadHtml=lead_html,paragraphs=paragraphs)
    evidence.append(dict(articleId=article_id,sourceUrl=url,publisher=publisher,sourceImageUrl=image_url,suppliedImage=str(image_path.relative_to(ROOT)),localImage=local_image,sourceHtmlSha256=digest(raw),bodyTextSha256=digest(norm(body.text_content()).encode()),leadTextSha256=digest(description.encode()),paragraphs=len(paragraphs),textCharacters=len(norm(body.text_content())),authorization='User confirmed ownership of the listed newspapers and requested exact full-text and image republication',contentLocale=content_locale or lang))
    family=next(f for f in governance['firstPartyFamilies'] if f['id']=='authorized-publications-'+group)
    family['files'][local_image]=digest(image_path.read_bytes())
    current=[a for a in current if a['sourceUrl']!=url];current.append(record)
    print(article_id,lang,len(paragraphs),'blocks',len(norm(body.text_content())),'characters')
assert len(full)==35
current.sort(key=lambda a:a['publishedAt'],reverse=True)
for path,value in [('app/data/articles.generated.json',current),('app/data/articles.fulltext.json',full),('app/data/article-import-evidence.json',evidence),('app/data/media-governance.json',governance)]:
    (ROOT/path).write_text(json.dumps(value,ensure_ascii=False,indent=2)+'\n')
