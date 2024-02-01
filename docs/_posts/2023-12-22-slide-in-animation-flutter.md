---
layout: post
title: "Slide-in animation in a column in Flutter"
categories: [flutter, animation]
tags: [flutter, animation, column, listview]
description: how to create a graduated slide in animation in a column in Flutter
comments: true
---

As we all know, a functional app is great…but it’s not enough. It needs to be easy to use; it needs to be intuitive; and it needs to be cool.

<div class="tenor-gif-embed" data-postid="26044853" data-share-method="host" data-aspect-ratio="1.33333" data-width="100%"><a href="https://tenor.com/view/otto-otto-simpsons-otto-mann-simpsons-cool-gif-26044853">Otto Otto Simpsons GIF</a>from <a href="https://tenor.com/search/otto-gifs">Otto GIFs</a></div> <script type="text/javascript" async src="https://tenor.com/embed.js"></script>

So it’s not enough to show the data in a column. It would be so much cooler to have it slide in:

![Alt text](/assets/images/slide-in-animation-flutter/each-different-trim.gif){: .align-center}

But… how to do that?

Like this :)

<!--more-->

<hr>

_This code was inspired by the super-cool [Best Flutter UI Templates](https://github.com/mitesh77/Best-Flutter-UI-Templates), specifically the [hotel booking template](https://github.com/mitesh77/Best-Flutter-UI-Templates/tree/master/best_flutter_ui_templates/lib/hotel_booking)._

_If you prefer to watch your tutorials, check it out here:_
{% include responsive-embed url="https://www.youtube.com/embed/bcdVxweFhzI?si=B6-M26BrmtQ_Ng6F" ratio="16:9" %}

<hr>

## Un-Animated code

We’ll start with the regular code, that shows a title, a quote, and the source of the quote. At the bottom is a button that we don’t want to animate (you can animate it if you want to).

```dart
class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key, required this.title});

  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
        title: Text(widget.title),
      ),
      body: Center(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            //title
            Text(
              'Inspiring quote',
              style: Theme.of(context).textTheme.headlineLarge,
              textAlign: TextAlign.center,
            ),
            //inspiring quote
            Expanded(
              child: Padding(
                padding: const EdgeInsets.all(16.0),
                child: Center(
                  child: Text(
                    "... repeating and repeating the fine and golden words,... as they would be repeated every winter for all the white winters in time. Saying them over and over on the lips, like a smile, like a sudden patch of sunlight in the dark. Dandelion wine. Dandelion wine. Dandelion wine.",
                    style: Theme.of(context).textTheme.headlineMedium,
                    textAlign: TextAlign.justify,
                  ),
                ),
              ),
            ),
            //source of the quote
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: Text(
                'Dandelion Wine - Ray Bradbury',
                style: Theme.of(context)
                    .textTheme
                    .headlineSmall!
                    .copyWith(fontStyle: FontStyle.italic),
                textAlign: TextAlign.center,
              ),
            ),
            //button that won't be animated
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: ElevatedButton(
                  onPressed: () {}, child: const Text("not animated")),
            )
          ],
        ),
      ),
    );
  }
}
```

It looks like this:

![slide-in-animation](/assets/images/slide-in-animation-flutter/image.png){: .align-center}

<h6 style="text-align: center;">Inspiring.</h6>

We want the text to slide from below and “slot” into place. There are many, many options for this:

- [AnimatedPositioned](https://api.flutter.dev/flutter/widgets/AnimatedPositioned-class.html): This will position automatically — but as we want it to be triggered on screen load, we would have to do [un-fluttery stuff](https://stackoverflow.com/questions/64322711/trigger-animations-on-widget-load-flutter) to make it work.
- [PositionedTransition](https://api.flutter.dev/flutter/widgets/PositionedTransition-class.html): We would need to know that start and end rects for each widget. Possible, but not really what we want to spend our time on, y’know?
- [Transform](https://api.flutter.dev/flutter/widgets/Transform-class.html): This moves the widget relative to its original position, so we don’t need to calculate anything. I think **we have a winner!**  
  However, as it doesn’t have “animated” or “transition” in its name, it doesn’t actually animate this movement. Which is why **we need an [AnimatedBuilder](https://api.flutter.dev/flutter/widgets/AnimatedBuilder-class.html) widget**.

## Animating one widget

Let’s see how this would work for the title only:

```dart
class _MyHomePageState extends State<MyHomePage> with TickerProviderStateMixin {
  //animation
  late AnimationController animationController;
  late Animation<double> animation;
  int slide = 30;//by how much to slide?

  @override
  void initState() {
    //animation controller - this sets the timing
    animationController = AnimationController(
        duration: const Duration(milliseconds: 1000), vsync: this);
    //let's give the movement some style, not linear
    animation = CurvedAnimation(
        parent: animationController, curve: Curves.fastOutSlowIn);

    startAnimation();

    super.initState();
  }

  void startAnimation() {
    //if you want to call it again, e.g. after pushing and popping
    //a screen, you will need to reset to 0. Otherwise won't work.
    animationController.value = 0;
    animationController.forward();
  }

  @override
  void dispose() {
    animationController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
        title: Text(widget.title),
      ),
      body: Center(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            //the animatedBuilder
            AnimatedBuilder(
                //When this changes, the animatedBuilder rebuilds
                animation: animation,
                //and this is what it builds
                builder: (context, child) {
                  return Transform(
                    //don't move in x, slide in from below in y,
                    //don't move in z
                    transform: Matrix4.translationValues(
                        0, (1.0 - animation.value) * slide, 0),
                    //same child as before
                    child: Padding(
                      padding: const EdgeInsets.all(8.0),
                      child: Text(
                        'Inspiring quote',
                        style: Theme.of(context).textTheme.headlineLarge,
                        textAlign: TextAlign.center,
                      ),
                    ),
                  );
                }),
            //...
          ],
        ),
      ),
    );
  }
}
```

Let’s break down the code:

- `animationController`: that sets the duration and allows you to start the animation when you want.
- `animation`: For linear movement, we could have skipped this. But as I wanted something smoother, we take the `animationController` value and change its numbers to the `fastOutSlowIn` curve. The values of the animation are [0…1].
- `initState`: We need to initialize the animation, and also start it, as we want it to work on startup.
- `startAnimation`: For this app, it isn’t really necessary. We could have just used `animationController.forward()`. However, if you want to restart the animation at any point — on a button press, or when returning from a pushed page — you’ll need to reset the animation to 0 before forwarding it again. So this is just more convenient for me to remember.
- `dispose`: Don't forget to dispose of the controller.
- `AnimatedBuilder`: needs the `animation`, it will rebuild every time the value changes. You can also use `animationController`.
- `Transform`: you can use transform to rotate, or translate, or zoom. As we want only to move, we use `Matrix4.translationValues`. `x` doesn’t change; `z` doesn’t change. `y` goes from `-slide` to 0, that is -30 to 0, relative to the regular position of the widget.

And this is the result:

![title-slides](/assets/images/slide-in-animation-flutter/only-one-trim.gif){: .align-center}

<h6 style="text-align: center;">Getting there…</h6>

## Animating all the widgets

To make it easier to animate the widgets, let's create an `AnimatedTile` (I checked first that this widget doesn’t already exist)

```dart
import 'package:flutter/material.dart';

// Wraps the child in a Transform with the given slide and
// an AnimatedBuilder with the given animation.
class AnimatedTile extends StatelessWidget {
  const AnimatedTile({
    super.key,
    required this.animation,
    required this.slide,
    required this.child,
  });

  final Animation<double> animation;
  final int slide;
  final Widget child;

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
        animation: animation,
        child: child,//<--this is important!
        builder: (context, child) {
          return Transform(
            transform: Matrix4.translationValues(
                0, (1.0 - animation.value) * slide, 0),
            child: Padding(padding: const EdgeInsets.all(8.0),
                           child: child),//<--Otherwise this doesn't work
          );
        });
  }
}
```

This widget takes the `child` and wraps it in a `Transform` with the given `slide` and an `AnimatedBuilder` with the given `animation`. Note that **you have to fill in the `child` parameter** in the `AnimatedBuilder`, otherwise nothing is passed to the `Transform` widget.

Then our `home_page` code becomes:

```dart
Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
        title: Text(widget.title),
      ),
      body: Center(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            AnimatedTile(//<--wrapped in AnimatedTile
              animation: animation,
              slide: slide,
              child: Text(
                'Inspiring quote',
                style: Theme.of(context).textTheme.headlineLarge,
                textAlign: TextAlign.center,
              ),
            ),
            Expanded(
              child: AnimatedTile(//<--wrapped in AnimatedTile
                animation: animation,
                slide: slide,
                child: Padding(
                  padding: const EdgeInsets.all(16.0),
                  child: Center(
                    child: Text(
                      "... repeating and repeating the fine and golden words,... as they would be repeated every winter for all the white winters in time. Saying them over and over on the lips, like a smile, like a sudden patch of sunlight in the dark. Dandelion wine. Dandelion wine. Dandelion wine.",
                      style: Theme.of(context).textTheme.headlineMedium,
                      textAlign: TextAlign.justify,
                    ),
                  ),
                ),
              ),
            ),
            AnimatedTile(//<--wrapped in AnimatedTile
              animation: animation,
              slide: slide,
              child: Padding(
                padding: const EdgeInsets.all(8.0),
                child: Text(
                  'Dandelion Wine - Ray Bradbury',
                  style: Theme.of(context)
                      .textTheme
                      .headlineSmall!
                      .copyWith(fontStyle: FontStyle.italic),
                  textAlign: TextAlign.center,
                ),
              ),
            ),
            //not animating this
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: ElevatedButton(
                  onPressed: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                          builder: (context) =>
                              ListPage(title: "List Animation")),
                    );
                  },
                  child: const Text("Go to list page")),
            )
          ],
        ),
      ),
    );
  }
```

Note that the `AnimatedTile` doesn’t wrap the `Expanded` widget — it makes flutter layouts _freak out_ if `Expanded` isn’t immediately below `Column`, `Row`, or other flex widgets. The result looks like this:

![all-together](/assets/images/slide-in-animation-flutter/all-together-trim.gif){: .align-center}

<h6 style="text-align: center;">Not…exactly what I was looking for.</h6>
{% include responsive-embed url="https://giphy.com/embed/NBgQWvxGfpKs30pGB2" ratio="16:9" %}

The secret is in the slide. We want the top widget to slide less than the next widget, who will slide less than the next, and so on.

So `slide` becomes a `List`:

```dart
List<int> slide = [30, 60, 90];
//...
Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
        title: Text(widget.title),
      ),
      body: Center(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            AnimatedTile(
              animation: animation,
              slide: slide[0],//<-- this
              child: Text(
                'Inspiring quote',
                style: Theme.of(context).textTheme.headlineLarge,
                textAlign: TextAlign.center,
              ),
            ),
            Expanded(
              child: AnimatedTile(
                animation: animation,
                slide: slide[1],//<-- this
                child: Padding(
                  padding: const EdgeInsets.all(16.0),
                  child: Center(
                    child: Text(
                      "... repeating and repeating the fine and golden words,... as they would be repeated every winter for all the white winters in time. Saying them over and over on the lips, like a smile, like a sudden patch of sunlight in the dark. Dandelion wine. Dandelion wine. Dandelion wine.",
                      style: Theme.of(context).textTheme.headlineMedium,
                      textAlign: TextAlign.justify,
                    ),
                  ),
                ),
              ),
            ),
            AnimatedTile(
              animation: animation,
              slide: slide[2],//<-- this
              child: Padding(
                padding: const EdgeInsets.all(8.0),
                child: Text(
                  'Dandelion Wine - Ray Bradbury',
                  style: Theme.of(context)
                      .textTheme
                      .headlineSmall!
                      .copyWith(fontStyle: FontStyle.italic),
                  textAlign: TextAlign.center,
                ),
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: ElevatedButton(
                  onPressed: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                          builder: (context) =>
                              ListPage(title: "List Animation")),
                    );
                  },
                  child: const Text("Go to list page")),
            )
          ],
        ),
      ),
    );
  }
```

And now the result is finally what I want.

![Alt text](/assets/images/slide-in-animation-flutter/each-different-trim.gif){: .align-center}

<h6 style="text-align: center;">Smoooth</h6>

## Animated ListView

This would be super easy to implement in a `ListView`, as the index comes built in and then we don’t need to use that pesky `slide` list:

![Alt text](/assets/images/slide-in-animation-flutter/list-animation-trim.gif){: .align-center}

In a ListView, the code becomes much simpler:

```dart
class _ListPageState extends State<ListPage> with TickerProviderStateMixin {
  //animation
  late AnimationController animationController;
  late Animation<double> animation;

  //data
  List<String> books = [
    "Dandelion Wine",
    "Tress of the Emerald Sea",
    "The Blue Castle",
    "Reflex",
    "The Storied Life of AJ Fikry"
  ];

  @override
  void initState() {
    animationController = AnimationController(
        duration: const Duration(milliseconds: 800), vsync: this);
    animation = CurvedAnimation(
        parent: animationController, curve: Curves.fastOutSlowIn);

    startAnimation();
    super.initState();
  }

  void startAnimation() {
    animationController.value = 0;
    animationController.forward();
  }

  @override
  void dispose() {
    animationController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          backgroundColor: Theme.of(context).colorScheme.inversePrimary,
          title: Text(widget.title),
        ),
        body: ListView.builder(
            itemCount: 5,
            itemBuilder: (context, index) {
              return AnimatedTile(
                  animation: animation,
                  slide: index * 10,//no pesky slide list!
                  child: ListTile(
                    leading: Image.asset(
                      "images/${books[index].toLowerCase()}.jpg",
                      width: 100,
                      height: 100,
                    ),
                    title: Text(
                      books[index],
                      style: Theme.of(context).textTheme.headlineSmall,
                    ),
                  ));
            }));
  }
}
```

Everything is exactly the same as before, except that now we can use the index for the `slide` parameter.

## Slide-in from the side

As a bonus, try switching the parameters in the Transform, so the movement is in x:

```dart
Transform(
  transform: Matrix4.translationValues(
      (1.0 - animation.value) * slide, 0, 0),
  child: Padding(padding: const EdgeInsets.all(8.0), child: child),
);
```

And the result:

![Alt text](/assets/images/slide-in-animation-flutter/list-side-trim.gif){: .align-center}

<h6 style="text-align: center;">Woosh.</h6>

Just that extra bit of pizzazz.
![vines-separator](/assets/images/vines-separator-smaller.png){: .align-center}

_Dandelion Wine is one of my favorite books. Which books do you use when coding?_ 😉

_I used this animation in my [traveler’s prayer app](https://medium.com/@dsavir-h/a-prayer-for-the-way-f48b7599a64b), will be available soon in Google Play._

_Still praying for their speedy and safe return. [#BringThemHomeNow](https://www.facebook.com/bringhomenow/)._

_Check out my free and open source online game [Space Short](https://danielle-honig.com/space-short). If you like my [stories](https://dsavir-h.medium.com/) and site, you can also [buy me a coffee](https://www.buymeacoffee.com/369wkrttu6)._
