---
title: p5.js Sketches
layout: page
permalink: /sketches/
collection: sketches
---
<link rel="stylesheet" href="../css/custom.css">

Here are all my sketches, with their URL parameters. You can embed them in an [iFrame](utilities/2022/12/20/embed-iframe.html) and use in your own websites. 
All are free for personal and commercial use with attribution.

{% for entry in site.sketches %}
  <article class="entry h-entry">
  <header class="entry-header">
    <h2 class="entry-title p-name">
        <a href="{{ entry.url | relative_url }}?fullscreen=true" rel="bookmark">{{ entry.title }}</a>
    </h2>
  </header>
    <div class="entry-excerpt p-summary">
     <iframe scrolling="no" src="{{entry.url}}" width="401" height="401" style="border:1px solid black;"></iframe>
    </div>
    <footer class="entry-meta" style="margin-bottom:1em">
        <div class="sketch-subtitle">URL parameters: </div>
        {% for parameter in entry.parameters %}
           <div class="parameter">
                <b> {{ parameter.name }}</b>: {{ parameter.description }}
            </div>
        {% endfor %}
    </footer>
</article>
{% endfor %}