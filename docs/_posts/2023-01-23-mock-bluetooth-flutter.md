---
layout: post
title:  "Mocking Bluetooth in Flutter"
categories: flutter
tags: [mock, testing, bluetooth]
---

Mocking is an important technique in software testing, as it allows developers to test the functionality of their code without relying on external dependencies. In this post, we will explore how to use the Mockito library in Flutter to mock Bluetooth functionality in your tests. Flutter has an excellent [Mockito](https://docs.flutter.dev/cookbook/testing/unit/mocking) tutorial. But what about more complicated cases, such as mocking [ScanResult Streams](https://pub.dev/packages/flutter_blue_plus#scan-for-devices)? Or [FlutterBluePlus.instance](https://pub.dev/packages/flutter_blue_plus#obtain-an-instance)?<!--more-->

This is what I show step by step below, as I show how to use Mockito to mock [FlutterBluePlus](https://pub.dev/packages/flutter_blue_plus) when testing the startup flow of a Bluetooth Flutter app.

Check out the full post in [Medium](https://medium.com/@dsavir-h/mocking-bluetooth-in-flutter-bf6c7d30582d).

![startup flow to test](/assets/images/mock-bluetooth/startup-flow.png "Startup flow to test"){: .align-center}

