---
layout: post
title: "Animating Widgets in Flutter Grids: Part III - Flow"
categories: [flutter]
tags: [animation, flutter, grid, how-to]
comments: true
---

Sometimes, you need to transition between two different kinds of grids in your app. For example, you have a grid of images and the user wants to see only the user’s favorites. Some widgets may stay the same, while others change. How can you animate this transition, making existing widgets smoothly move and resize within the grid?

In the [first article](https://medium.com/@dsavir-h/animating-widgets-in-flutter-grids-69fecd17ad68) of the series, we explored transitioning between different pages using the Hero widget. However, Hero widget is only triggered by push and pop actions, so it isn’t suitable using another method e.g. a TabBar.

In the [second article](https://medium.com/@dsavir-h/animating-widgets-in-flutter-grids-d401409f1971), we transitioned between tabs using AnimatedPositioned widget. It is more complex to use, but works with TabBars and allows more fine-tuning in the animation parameters.

In this article, we will explore the Flow widget:

<iframe width="95%" src="https://www.youtube.com/embed/NG6pvXpnIso" title="Flow (Flutter Widget of the Week)" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

Read more [here](https://medium.com/@dsavir-h/animating-widgets-in-flutter-grids-2a7385015bf8).
