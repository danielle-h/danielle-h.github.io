---
layout: post
title: "Adding a curve to animations in Flutter"
categories: [flutter, animation]
tags: [flutter, animation, matrix]
description: how to add a curve to an animation in Flutter by chaining transformation matrices
comments: true
---

#### Chaining transformation matrices

In a [previous article](https://danielle-honig.com/flutter/animation/2023/12/22/slide-in-animation-flutter.html), I showed how to do a slide-in animation. Each widget slid into place from below (or the side) using a Transform Widget in an AnimatedBuilder.

But what if you want to add a curve to the slide?

And that is what chaining transformation matrices is for.

If you have knowledge of transformation matrices already, you don’t need this article. Go read a good book with a cup of your beverage of choice next to you :)
![Woman on couch reading a book with a cup of hot chocolate next to her](/assets/images/2024-01-11/image-1.png){: .align-center}

<h6 style="text-align: center;">Enjoy. [Created using Dall-E]</h6>

If not, you’ve come to the right place.

<!--more-->

![vines-separator](/assets/images/vines-separator-smaller.png){: .align-center}

We will build on the code from the previous article. In our `AnimatedTile`, we used the `Transform` widget with `Matrix4.translationValues`. It allows us to specify the translation — a.k.a. movement — we want to move the widget `x`, `y`, and `z`.

```dart
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
        child: child,
        builder: (context, child) {
          return Transform(
            transform: Matrix4.translationValues(
                0, (1.0 - animation.value) * slide, 0),
            child: Padding(padding: const EdgeInsets.all(8.0),
                           child: child),
          );
        });
  }
}
```

The Matrix4 class has many other helper functions to create transformations. And the cool thing about this is that you can **chain them together by multiplying them**. So if you want to add more to your slide-in, all you need to do is multiply the current transformation matrix by another helper function, and you’re done.

#### Rotation

The `rotationX`, `rotationY` and `rotationZ` functions rotate the widget around the given axis.

**X-Axis Rotation:**

The widget flips vertically, like a cat flap. Chained together with our slide in, it looks like this:

![gif of rotation around the x axis](/assets/images/2024-01-11/rotation-x-trim.gif){: .align-center}

And the code is:

```dart
@override
Widget build(BuildContext context) {
  return AnimatedBuilder(
      animation: animation,
      child: child,
      builder: (context, child) {
        return Transform(
            transform: Matrix4.translationValues(
                    0, -(animation.value - 1) * slide, 0) *//this is the slide
                Matrix4.rotationX((1 - animation.value) * 1),//rotation X
            child: child);
      });
}
```

Here, our rotation goes between 1 radian to 0 radians.

**Y-Axis Rotation:**

This gives a horizontal flip, as if the widget is a door swinging shut.

![gif of rotation around the y axis](/assets/images/2024-01-11/rotation-y-trim.gif){: .align-center}

And the code is:

```dart
@override
Widget build(BuildContext context) {
  return AnimatedBuilder(
      animation: animation,
      child: child,
      builder: (context, child) {
        return Transform(
            transform: Matrix4.translationValues(
                    0, -(animation.value - 1) * slide, 0) *//this is the slide
                Matrix4.rotationY((1 - animation.value) * 1),//rotation Y
            child: child);
      });
}
```

**Z-Axis Rotation**:

It’s like the widget is spinning on a record player.

![gif of rotation around the z axis](/assets/images/2024-01-11/rotation-z-trim.gif){: .align-center}

And the code is:

```dart
@override
Widget build(BuildContext context) {
  return AnimatedBuilder(
      animation: animation,
      child: child,
      builder: (context, child) {
        return Transform(
            transform: Matrix4.translationValues(
                    0, -(animation.value - 1) * slide, 0) *//this is the slide
                Matrix4.rotationZ((1 - animation.value) * 0.1),//rotation Z
            child: child);
      });
}
```

Here, I used a smaller rotation, as 1 radian around the Z axis was too much.

### Scaling

We can also add a scaling animation, giving the effect of growth, by multiplying with an additional helper function: `Matrix4.diagonal3Values()`. Here you specify the scaling in `x`, `y`, and `z`. So for a “growing” animation the values need to be the same on the `x` and `y` axes, and 0 in `z`. Chained with our slide-in and the rotation around the z-axis, it looks like this:

![gif of rotation around the z axis and widgets expanding using matrix chaining](/assets/images/2024-01-11/rotation-scale-trim.gif){: .align-center}

With the following code:

```dart
@override
Widget build(BuildContext context) {
  return AnimatedBuilder(
      animation: animation,
      child: child,
      builder: (context, child) {
        return Transform(
            transform: Matrix4.translationValues(
                    0, -(animation.value - 1) * slide, 0) *//slide
                Matrix4.rotationZ((1 - animation.value) * 0.1) *//rotate
                Matrix4.diagonal3Values(0.5 + animation.value * 0.5,
                    0.5 + animation.value * 0.5, 1),//scale
            child: child);
      });
}
```

Note the values in the function:

`x` and `y` are both `0.5 + animation.value * 0.5`, that is, they go between 0.5 and 1. `z` is 1, signifying no change.

As you can see, you can play around to your hearts’ content, using an [AnimatedBuilder](https://api.flutter.dev/flutter/widgets/AnimatedBuilder-class.html), a [Transform](https://api.flutter.dev/flutter/widgets/Transform-class.html) widget, and the endless possibilities of the [Matrix4](https://api.flutter.dev/flutter/vector_math/Matrix4-class.html) helper functions.

Animate on.

![vines-separator](/assets/images/vines-separator-smaller.png){: .align-center}

[_98 days and still counting_](https://w.ynet.co.il/news/absent?externalurl=true)_._ [_#BringThemHome_](https://www.facebook.com/bringhomenow/)_._

_Check out my free and open source online game_ [_Space Short_](https://danielle-honig.com/space-short)_. If you like my_ [_stories_](https://dsavir-h.medium.com/) _and_ [_site_](https://danielle-honig.com/)_, you can also_ [_buy me a coffee_](https://www.buymeacoffee.com/369wkrttu6)_._
