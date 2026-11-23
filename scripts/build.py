#!/usr/bin/env python3
"""Build the committed, self-contained reading pages from content/*.md.

Install requirements-build.txt, then run this script from any directory.
GitHub Pages serves the generated HTML directly; there is no browser math
dependency, framework, server, or build step at publication time.
"""
from pathlib import Path
import html
import json
import re
import xml.etree.ElementTree as ET

import markdown
from latex2mathml.converter import convert

ROOT = Path(__file__).resolve().parent.parent
GUIDE_TITLE = "Intro to quantum computation and the Gottesman-Knill theorem"
BASE = "https://l6zw32.github.io/quantum-computation/"
CHAPTERS = json.loads((ROOT / "content/guide.json").read_text())
DEMO_PATTERN = re.compile(r"<!--\s*interactive:([a-z-]+)\s*-->")
DEMO_NAMES = {"phase", "bell", "constraints", "syndrome"}


def include_interactives(source):
    """Insert authored demo markup while retaining the editable text sources."""
    def include(match):
        name = match.group(1)
        if name not in DEMO_NAMES:
            raise ValueError(f"Unknown interactive example: {name}")
        return (ROOT / "content/interactives" / f"{name}.html").read_text()
    return DEMO_PATTERN.sub(include, source)


def render_body(source):
    """Protect math before Markdown parses table separators and underscores."""
    equations = {}

    def protect(tex, display):
        tex = tex.strip()
        markup = convert(tex, display="block" if display else "inline")
        # Validate all emitted MathML before using it in a page.
        ET.fromstring(markup)
        # Preserve the source notation for assistive tools that consume it.
        start = markup.index(">") + 1
        markup = (markup[:start] + "<semantics>" + markup[start:-7]
                  + '<annotation encoding="application/x-tex">'
                  + html.escape(tex) + "</annotation></semantics></math>")
        key = f"QUANTUMMATHPLACEHOLDER{len(equations)}TOKEN"
        equations[key] = ('<div class="equation">' + markup + "</div>"
                          if display else markup)
        return "\n\n" + key + "\n\n" if display else key

    source = re.sub(r"\$\$(.*?)\$\$|\\\[(.*?)\\\]",
                    lambda m: protect(m.group(1) if m.group(1) is not None else m.group(2), True),
                    source, flags=re.S)
    source = re.sub(r"(?<!\\)\$(?!\$)(.*?)(?<!\\)\$(?!\$)",
                    lambda m: protect(m.group(1), False), source, flags=re.S)
    source = re.sub(r"(?<!\\)\\\((.*?)\\\)",
                    lambda m: protect(m.group(1), False), source, flags=re.S)

    def references(match):
        numbers = re.findall(r"\d+", match.group(1))
        return " ".join(f'<a class="reference-link" href="#ref-{n}" aria-label="Reference {n}">[{n}]</a>' for n in numbers)

    source = re.sub(r"(?<!\])\[(\d+(?:,\s*\d+)*)\](?!\()", references, source)
    md = markdown.Markdown(
        extensions=["tables", "attr_list", "md_in_html", "toc", "sane_lists"],
        extension_configs={"toc": {"toc_depth": "2-2"}},
        output_format="html",
    )
    body = md.convert(source)
    toc = md.toc
    for key, value in equations.items():
        if value.startswith("<div"):
            body = body.replace(f"<p>{key}</p>", value)
        body = body.replace(key, value)

    # Reference numbers are stable link targets within each reading page.
    ref_heading = re.search(r'<h2 id="references">.*?</h2>', body)
    if ref_heading:
        first, refs = body[:ref_heading.end()], body[ref_heading.end():]
        index = 0
        def ref_id(match):
            nonlocal index
            index += 1
            return f'<li id="ref-{index}">'
        refs = re.sub(r"<li>", ref_id, refs)
        body = first + refs
    body = body.replace("<table>", '<table class="comparison-table">')
    body = body.replace("<th>", '<th scope="col">')
    if "quantummathplaceholder" in (body + toc).lower():
        raise ValueError("Unrendered math placeholder; use plain text in headings")
    return body, toc, len(equations)


def build_chapter(index, chapter):
    source = (ROOT / "content" / chapter["source"]).read_text()
    demo_names = set(DEMO_PATTERN.findall(source))
    interactive_assets = ('\n  <link rel="stylesheet" href="./interactives.css">'
                          '\n  <script src="./interactives.js" defer></script>'
                          if demo_names & {"phase", "constraints", "syndrome"} else "")
    if "bell" in demo_names:
        interactive_assets += '\n  <script src="./app.js" defer></script>'
    body, toc, equation_count = render_body(include_interactives(source))
    intro_match = re.match(r"<p>.*?</p>", body, flags=re.S)
    intro = intro_match.group(0) if intro_match else ""
    if intro_match:
        body = body[intro_match.end():]
    title = html.escape(chapter["title"])
    group = ("Quantum states and compact descriptions" if index < 4
             else "Efficient classical simulation" if index < 7
             else "Applications and significance")
    outline = "\n".join(
        f'<li><a href="./{item["file"]}"' + (' aria-current="page"' if i == index else '')
        + f'>{html.escape(item["title"])}</a></li>' for i, item in enumerate(CHAPTERS)
    )
    previous = (f'<a href="./{CHAPTERS[index-1]["file"]}">← Previous: {html.escape(CHAPTERS[index-1]["title"])}</a>'
                if index else '<a href="./#outline">← Learning outline</a>')
    following = (f'<a href="./{CHAPTERS[index+1]["file"]}">Next: {html.escape(CHAPTERS[index+1]["title"])} →</a>'
                 if index+1 < len(CHAPTERS) else '<a href="./#outline">Return to the learning outline →</a>')
    output = f'''<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#ffffff">
  <meta name="description" content="{html.escape(chapter['description'], quote=True)}">
  <meta property="og:title" content="{title}">
  <meta property="og:description" content="{html.escape(chapter['description'], quote=True)}">
  <meta property="og:type" content="article">
  <meta property="og:url" content="{BASE + chapter['file']}">
  <link rel="canonical" href="{BASE + chapter['file']}">
  <link rel="icon" href="./favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="./styles.css">
  <link rel="stylesheet" href="./lesson.css">{interactive_assets}
  <title>{title} | {GUIDE_TITLE}</title>
</head>
<body id="top">
  <a class="skip-link" href="#main">Skip to content</a>
  <div class="page lesson-page">
    <header class="site-header">
      <p class="guide-title"><a href="./">{GUIDE_TITLE}</a></p>
      <p class="course-label">Section {index+1} · {group}</p>
      <h1>{title}</h1>
      <p class="page-subtitle">{html.escape(chapter['subtitle'])}</p>
      <nav class="main-nav" aria-label="Guide navigation">
        <a href="./#outline">Learning outline</a>
        <a href="#contents">On this page</a>
        <a href="#practice">Check your understanding</a>
        <a href="#references">References</a>
      </nav>
      <details class="guide-sections">
        <summary>All sections</summary>
        <nav aria-label="All guide sections"><ol>{outline}</ol></nav>
      </details>
    </header>
    <main id="main">
      <div class="lesson-intro">{intro}</div>
      <nav class="lesson-contents" id="contents" aria-labelledby="contents-title">
        <h2 id="contents-title">On this page</h2>
        {toc}
      </nav>
      <article class="lesson-content" aria-label="Section {index+1}: {title}">
        {body}
      </article>
      <nav class="chapter-nav" aria-label="Previous and next sections">
        {previous}
        {following}
      </nav>
    </main>
    <footer class="site-footer">
      <span>15-455 · Quantum computation learning guide</span>
      <a href="#top">Back to top</a>
    </footer>
  </div>
</body>
</html>
'''
    (ROOT / chapter["file"]).write_text(output)
    print(f'{chapter["file"]}: {equation_count} math expressions')


if __name__ == "__main__":
    for index, chapter in enumerate(CHAPTERS):
        build_chapter(index, chapter)
