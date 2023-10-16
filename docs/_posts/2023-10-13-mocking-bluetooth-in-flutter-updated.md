---
layout: post
title: "Mocking Bluetooth in Flutter: Updated"
categories: [flutter]
tags: [bluetooth, flutter, testing]
comments: true
---

Since [FlutterBluePlus](https://pub.dev/packages/flutter_blue_plus) version [1.10.0](https://pub.dev/packages/flutter_blue_plus/changelog#1100), there is no `FlutterBluePlus.instance`. All functions of FlutterBluePlus are now static. It is no longer possible to pass an instance of FlutterBluePlus to anything.

In fact, it is no longer easily mockable.

<div class="tenor-gif-embed" data-postid="6101246" data-share-method="host" data-aspect-ratio="1.47239" data-width="100%"><a href="https://tenor.com/view/horror-monkey-shocked-puppet-gif-6101246">Horror Monkey GIF</a>from <a href="https://tenor.com/search/horror-gifs">Horror GIFs</a></div> <script type="text/javascript" async src="https://tenor.com/embed.js"></script>

See how to solve it [here](https://medium.com/@dsavir-h/mocking-bluetooth-in-flutter-updated-cb3b9484ae02).
