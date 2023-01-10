---
title: p5.js Sketches
layout: page
permalink: /sketches/
collection: sketches
---
<link rel="stylesheet" href="../css/custom.css">

Here are all my sketches, with their URL parameters. You can embed them in an [iFrame](utilities/2022/12/20/embed-iframe.html) and use in your own websites.

{% for entry in site.sketches %}
  <article class="entry h-entry">
  <header class="entry-header">
    <h2 class="entry-title p-name">
        <a href="{{ entry.url | relative_url }}?fullscreen=true" rel="bookmark">{{ entry.title }}</a>
    </h2>
  </header>
  {% unless page.show_excerpts == false %}
    <div class="entry-excerpt p-summary">
      {% if entry.excerpt %}
        {{ entry.excerpt | markdownify }}
      {% endif %}
    </div>
  {% endunless %}
    <footer class="entry-meta">
        <div class="sketch-subtitle">URL parameters: </div>
        {% for parameter in entry.parameters %}
           <div class="parameter">
                <b> {{ parameter.name }}</b>: {{ parameter.description }}
            </div>
        {% endfor %}
    </footer>
</article>
{% endfor %}