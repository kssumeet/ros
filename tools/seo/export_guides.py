"""Export the two built guides (dist/) to publish-ready Markdown for the writer.
Prices become ₹[X]–[Y] placeholders per the SEO brief.   python3 tools/seo/export_guides.py"""
import os, re, html
from html.parser import HTMLParser
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))

class MD(HTMLParser):
    def __init__(s):
        super().__init__(); s.out = []; s.skip = 0; s.href = None; s.cell = None; s.row = None; s.rows = []; s.intable = False; s.list = []; s.buf = ''
    def handle_starttag(s, t, a):
        a = dict(a); c = a.get('class', '')
        if s.skip: s.skip += t == 'div'; return
        if t == 'div' and ('tool-inline' in c): s.skip = 1; s.out.append('\n> **[Embed interactive tool here, as on the prototype page]**\n'); return
        if t == 'span' and 'tbc' in c: s.skip_span = True
        if t in ('h2', 'h3'): s.flush(); s.buf = '#' * (2 if t == 'h2' else 3) + ' '
        elif t == 'p': s.flush()
        elif t in ('ul', 'ol'): s.flush(); s.list.append([t, 0])
        elif t == 'li': s.flush(); s.list[-1][1] += 1; s.buf = ('1. ' if s.list[-1][0] == 'ol' else '- ')
        elif t == 'a': s.href = a.get('href'); s.buf += '['
        elif t in ('strong', 'b'): s.buf += '**'
        elif t == 'table': s.flush(); s.intable = True; s.rows = []
        elif t == 'caption': s.cell = ''
        elif t == 'tr': s.row = []
        elif t in ('td', 'th'): s.cell = ''
    def handle_endtag(s, t):
        if s.skip:
            if t == 'div': s.skip -= 1
            return
        if t in ('h2', 'h3', 'p', 'li'): s.flush()
        elif t in ('ul', 'ol'): s.list.pop(); s.out.append('')
        elif t == 'a': s.buf += '](https://rosaudio.com' + (s.href or '') + ')' if (s.href or '').startswith('/') else '](' + (s.href or '') + ')'
        elif t in ('strong', 'b'): s.buf += '**'
        elif t == 'caption': s.out.append('*' + s.cell.strip() + '*\n'); s.cell = None
        elif t in ('td', 'th'): s.row.append(s.cell.strip()); s.cell = None
        elif t == 'tr': s.rows.append(s.row)
        elif t == 'table':
            s.intable = False
            if s.rows:
                s.out.append('| ' + ' | '.join(s.rows[0]) + ' |'); s.out.append('|' + '---|' * len(s.rows[0]))
                for r in s.rows[1:]: s.out.append('| ' + ' | '.join(r) + ' |')
                s.out.append('')
    def handle_data(s, d):
        if s.skip: return
        if s.cell is not None: s.cell += d
        else: s.buf += d
    def flush(s):
        b = re.sub(r'\s+', ' ', s.buf).strip()
        if b: s.out.append(b + ('\n' if not b.startswith(('- ', '1. ')) else ''))
        s.buf = ''

def convert(path, slug, title, meta, faq_id):
    h = open(path).read()
    art = re.search(r'<article class="prose">(.*?)</article>', h, re.S).group(1)
    art = re.sub(r'<span class="tbc">.*?</span>', '', art, flags=re.S)
    art = re.sub(r'<div class="notice"[^>]*>(.*?)</div>', r'<p><em>NOTE:</em> \1</p>', art, flags=re.S)
    p = MD(); p.feed(art); p.flush()
    body = '\n'.join(p.out)
    toc = re.findall(r'^## (.+)$', body, re.M)
    faq = ''
    m = re.search(r'aria-labelledby="' + faq_id + r'">(.*?)</section>', h, re.S)
    if m:
        qs = re.findall(r'class="faq-btn"[^>]*>(.*?)<span', m.group(1), re.S)
        ans = re.findall(r'<div class="inner">(.*?)</div>', m.group(1), re.S)
        faq = '\n## Frequently asked questions\n\n' + '\n'.join(f'### {html.unescape(q.strip())}\n\n{html.unescape(re.sub("<[^>]+>", "", a)).strip()}\n' for q, a in zip(qs, ans))
        toc.append('Frequently asked questions')
    h1 = html.unescape(re.sub('<[^>]+>', '', re.search(r'<h1[^>]*>(.*?)</h1>', h, re.S).group(1).replace('</span></span><span', ' </span></span><span'))).replace('  ', ' ').rstrip('.')
    lede = html.unescape(re.sub('<[^>]+>', '', re.search(r'<p class="lede">(.*?)</p>', h, re.S).group(1)))
    md = f"""<!-- URL: {slug}
Title: {title}
Meta: {meta}
Schema: Article + BreadcrumbList (+ FAQPage if the FAQ section is published) — see B-schema.md -->

# {h1}

*{lede}*

**Contents**
""" + '\n'.join(f'{i+1}. [{t}](#{re.sub(r"[^a-z0-9]+", "-", t.lower()).strip("-")})' for i, t in enumerate(toc)) + '\n\n' + html.unescape(body) + faq + """
---

**Hear the difference before you spend.** Book a free 30-minute demo in our Ranchi demo room, bring a film scene or a song you know well, and we'll show you what each budget level really sounds like.

👉 [Book a free demo](https://rosaudio.com/book-a-demo/) · Call +91 85802 39007 · [WhatsApp](https://wa.me/918580239007)
"""
    md = re.sub(r'\n{3,}', '\n\n', md)
    return md

import sys
sys.path.insert(0, os.path.dirname(__file__)); from onpage import PAGES
P = {p['id']: p for p in PAGES}
a = convert(os.path.join(ROOT, 'dist/guides/home-theatre-cost-india/index.html'), '/guides/home-theatre-cost-india/', P['guide-cost']['title'], P['guide-cost']['meta'], 'gc-faq')
# Prices: the brief requires placeholders where ROS's real bands are unknown.
a = a.replace('| Under ₹5 lakh |', '| Under ₹[X] lakh |').replace('| ₹5–10 lakh |', '| ₹[X]–[Y] lakh |').replace('| ₹10–25 lakh |', '| ₹[Y]–[Z] lakh |').replace('| ₹25 lakh and above |', '| ₹[Z] lakh and above |')
a = a.replace('Illustrative home theatre budget bands (India) — to be validated by ROS', 'Home theatre budget bands (India) — ROS to supply its real band edges')
a = a.replace('Is a ₹1–2 lakh home theatre worth it?', 'Is a ₹[X] lakh home theatre worth it?').replace('Is a ₹1–2 lakh home theatre worth it', 'Is a ₹[X] lakh home theatre worth it')
b = convert(os.path.join(ROOT, 'dist/guides/room-size-dolby-atmos/index.html'), '/guides/room-size-dolby-atmos/', P['guide-atmos']['title'], P['guide-atmos']['meta'], 'none')
out = os.path.join(ROOT, 'docs/seo')
open(os.path.join(out, 'H1-guide-home-theatre-cost-india.md'), 'w').write(a)
open(os.path.join(out, 'H2-guide-room-size-dolby-atmos.md'), 'w').write(b)
for n, t in (('cost', a), ('atmos', b)):
    words = len(re.sub(r'<!--.*?-->|\(https?://[^)]*\)|[#*|`-]', ' ', t, flags=re.S).split())
    print(n, 'words ~', words, '| ₹ digits left:', re.findall(r'₹\d[^ ]*', t))
