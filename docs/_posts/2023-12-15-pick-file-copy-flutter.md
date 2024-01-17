---
layout: post
title: "Pick a file and copy it in Flutter"
categories: [flutter, file]
tags: [flutter, file, picker, copy]
description: how to pick a file in Flutter and convert content URI to file URI
comments: true
---

## File URIs and Content URIs, oh my.

I created [an app that will recite the traveler’s prayer](https://medium.com/@dsavir-h/a-prayer-for-the-way-f48b7599a64b) for you.

![woman reading aloud from a book](/assets/images/2023-12-15-pick-file-copy-flutter/2023-12-13_17-10-34_9634.png)

<h6 style="text-align: center;">Like that.
</h6>
Part of the point is that you can use your own recording of the traveler’s prayer instead of hearing my voice. So I need:

1.  Some way to pick an audio file.
2.  Copy it into my app file directory, so that the app can continue to use it even if the original file is moved or deleted.
3.  Use it in my app.
<!--more-->

## Use it in app

That’s pretty easy. I save only one custom app file, so that I’m not overrun with custom recordings. Surprisingly, I call it `custom.mp3`. I play it if needed. Done.

Or not... I would like to see the name of the file I’m using at least — much nicer to see `my_recording.mp3` or `cool_version.mp3` rather than `custom.mp3`. So I also save in [SharedPreferences](https://pub.dev/packages/shared_preferences) the name of the file.

![dragon in first ledge](/assets/images/2023-12-15-pick-file-copy-flutter/ledges-game-1.png)

<h6 style="text-align: center;">One step done to get to the pink smiley</h6>

## Pick an audio file

The great [file_picker](https://pub.dev/packages/file_picker) plugin is perfect for this, as you can set it to pick only audio files. It works on all platforms and has multiple options.

Easy-peasy.

![dragon in second ledge](/assets/images/2023-12-15-pick-file-copy-flutter/ledges-game-2.png)

<h6 style="text-align: center;">Second step done to get to the pink smiley</h6>

## Copy file to app directory

`File` has a built in function `copy` that copies the current file to a new place. So I figured I would use that.

The `FilePicker` doesn’t return a `File`, it returns a `PlatformFile`. `PlatformFile` has no `copy` function.

OK, no problem! `PlatformFile` has an `identifier`, which is a `Uri` on Android. And `File` has a `File.fromUri` option. So all we need to do is:

```dart
FilePickerResult? result = await FilePicker.platform.pickFiles();

if (result != null) {
  PlatformFile file = result.files.first;
  File toCopy = File.fromUri(Uri.parse(file.identifier));
  toCopy.copy("my/directory/custom.mp3")
}
```

Right?

```bash
Error:Cannot extract a file path from a content URI
```

Apparently, `File` can parse `file://`URIs (which makes sense). The FilePicker returns a `content://` URI on Android.

Sooo, I [looked around](https://stackoverflow.com/questions/56723992/flutter-how-to-convert-uri-to-file), and the recommended method is another plugin: [uri_to_file](https://pub.dev/packages/uri_to_file). Which allows me to …yep, get a file from my content URI.

So a perfectly simple action becomes:

```dart
FilePickerResult? result = await FilePicker
    .platform
    .pickFiles(type: FileType.audio);//file_picker plugin
if (result != null) {
  PlatformFile file = result.files.first;
  //need path_provider to get the app directory
  final directory =
      await getApplicationDocumentsDirectory();
  //get file from content uri - uri_to_file plugin
  File pickedFile =
      await toFile(file.identifier!);
  //and finally
  File cachedFile = await pickedFile.copy(
      "${directory.path}${Platform.pathSeparator}custom.mp3");
```

For these four lines, I needed 3 plugins: `file_picker`, `path_provider` and `uri_to_file`.

I’m sure that I’m missing something, does anyone have a better way?

On the other hand, it’s working great :) Check out the source code on [GitHub](https://github.com/danielle-h/auto-tefilat-haderech).

![dragon got the prize!](/assets/images/2023-12-15-pick-file-copy-flutter/ledges-game-3.png)

<h6 style="text-align: center;">Got the smiley!</h6>

![vines-separator](/assets/images/vines-separator-smaller.png){: .align-center}

_Images created using_ [_Fooocus 2.1.824_](https://github.com/lllyasviel/Fooocus) _and edited in GIMP._

_In these terrible times, we need all the prayers we can get. #_[_BringThemHomeNow_](https://stories.bringthemhomenow.net/)_._

_Check out my free and open source online game_ [_Space Short_](https://danielle-honig.com/space-short)_. If you like my_ [_site_](https://danielle-honig.com/)_, you can also_ [_buy me a coffee_](https://www.buymeacoffee.com/369wkrttu6)_._
