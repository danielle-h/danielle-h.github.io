---
layout: post
title: "How to test GPS in Flutter using Android emulator"
categories: [Flutter]
tags: [test, GPS, location]
description: How to use Android emulator to test location services in Flutter
comments: true
---

In the app I’m currently developing, I need to save the users’ current location. In addition, I need to check if the user is driving.

The excellent [geolocator](https://pub.dev/packages/geolocator) plugin is easy to use and has extensive documentation and examples. Creating a simple class that returns the current [location](https://pub.dev/documentation/geolocator/latest/geolocator/Position-class.html) and checks the current [speed](https://pub.dev/documentation/geolocator/latest/geolocator/Position/speed.html) is trivial.
<!--more-->

```dart
import 'package:geolocator/geolocator.dart';
import 'package:smellit/gps/location_exception.dart';

/// A service class for managing and utilizing location-based features.
class LocationService {

  // Constant for the speed limit to determine if the user is driving.
  static const double speedLimit = 2.5;//meter per second

  /// Requests and checks the necessary permissions for location services.
  static Future<bool> requestPermissions() async {
    bool serviceEnabled;
    LocationPermission permission;

    // Test if location services are enabled.
    serviceEnabled = await Geolocator.isLocationServiceEnabled();
    if (!serviceEnabled) {
       return Future.error('Location services are disabled.');
    }

    permission = await Geolocator.checkPermission();
    if (permission == LocationPermission.denied) {
      permission = await Geolocator.requestPermission();
      if (permission == LocationPermission.denied) {
        return Future.error('Location permissions are denied');
      }
    }

    if (permission == LocationPermission.deniedForever) {
      // Permissions are denied forever, handle appropriately.
      return Future.error(
      'Location permissions are permanently denied, we cannot request permissions.');
    }
    return true;
  }

  /// Determines if the user is currently driving based on their speed.
  static Future<bool> isDriving() async {
    Position start = await getCurrentPosition();
    return start.speed > speedLimit;
  }

  /// Gets the current position of the user after ensuring permissions are granted.
  static Future<Position> getCurrentPosition() async {
    await requestPermissions();
    return await Geolocator.getCurrentPosition();
  }
}
```

But how to test it? I don’t really feel like taking a drive and checking my phone, obviously…
{% include responsive-embed url="https://giphy.com/embed/457GTXAdgEjddtturx" ratio="16:9" %}

By using the Android emulator :)

<!--more-->

<hr/>

#### Setting up the emulator

In the Android emulator, there are three dots for “Extended menu”.

![extended menu in android emulator](/assets/images/2024-02-02-test-gps-flutter/gps-emulate-1.png){: .align-center}

Click on that and go to “Location”. There you can search for a location, e.g. the Eiffel Tower, and set the location of the emulator to the Eiffel Tower using “Set Location” button.
![set the current location to the Eiffel Tower](/assets/images/2024-02-02-test-gps-flutter/gps-emulate-2-upscaled.png)

When you check the current location, your program should state that you’re in position (48.8, 2.3).

And the cooler part is, that you can click on “Routes” and simulate driving somewhere, e.g. Versailles, by searching for it and then pressing on the “Directions” button. After seeing the route, click on the “Play Route” button:

![create route and play it in android emulator](/assets/images/2024-02-02-test-gps-flutter/gps-emulate-5-upscaled-annotated.png)

You can also decide to play it _very fast_ by changing the “Playback speed”.

And the emulator will show the updated GPS location and speed, allowing you to easily test if the emulator is driving :)

![gif showing the location changing as it emulates driving on a route](/assets/images/2024-02-02-test-gps-flutter/gps-emulate-6.gif){: .align-center}

<h6 style="text-align: center;">Emulator</h6>

![gif showing the test app during the route, detects user is driving](/assets/images/2024-02-02-test-gps-flutter/gps-emulate-7-driving.gif){: .align-center}

<h6 style="text-align: center;">My app</h6>

And I didn’t even need to leave the computer.
{% include responsive-embed url="https://giphy.com/embed/1XCcD9VLQZ2Io" ratio="16:9" %}

<h6 style="text-align: center;">Though leaving the computer is good sometimes.</h6>

#### Troubleshooting

![white screen instead of map](/assets/images/2024-02-02-test-gps-flutter/white-screen.png){: .align-center}

<h6 style="text-align: center;">Problem 1</h6>

**Problem**: You open the emulator and you see a blank white screen. You can’t search for locations, nothing shows up.

**Solution**: Using Android Studio, update the SDK platform-tools and the Android Emulator to latest version (Tools → SDK Manager → SDK Tools → choose platform tools and emulator and click Apply).

**Problem**: The map in the emulator doesn’t show the correct current location.

**Solution**: In the emulator, open Google Maps. You don’t need to sign in, just skip that part. Give Google Maps permission to access location. Wait for Google Maps to show you the correct location, and then return to the emulator.

Enjoy the GPS.
![joyful girl skipping in a fantasy landscape](/assets/images/2024-02-02-test-gps-flutter/enjoy.png)

<h6 style="text-align: center;">You are now this happy. (created using Dall-E)</h6>

<hr/>

[_118 days_](https://stories.bringthemhomenow.net/)_, I can barely believe it._ [_#BringThemHome_](https://www.facebook.com/bringhomenow/)_._

_Check out my free and open source online game_ [_Space Short_](https://danielle-honig.com/space-short)_. If you like my_ [_site_](https://danielle-honig.com/)_, you can also_ [_buy me a coffee_](https://www.buymeacoffee.com/369wkrttu6)_._
