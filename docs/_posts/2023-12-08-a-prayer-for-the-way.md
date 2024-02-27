---
layout: post
title: "A prayer for the way"
categories: [flutter]
tags: ["How-To", "Flutter", "Time", "Prayer", "Programming"]
description: A prayer for the way Creating a timed read-out-loud traveler’s prayer service in Flutter
comments: true
---

![alt text](/assets/images/2023-12-08-a-prayer-for-the-way/traveler-prayer.png)
<h6 style="text-align: center;">Traveler’s prayer (image credits below)</h6>

In Jewish tradition, there is a prayer that is said when travelling: [Tefilat
HaDerech](https://en.wikipedia.org/wiki/Tefilat_HaDerech), the traveler’s
prayer. It is recited only **after** you have left your city limits.

<!--more-->

<hr>

 _[Linguistic trivia: for you fantasy lovers, “Tefilat HaDerech” sounds
similar to “_[ _Kwisatz
Haderach_](https://dune.fandom.com/wiki/Kwisatz_Haderach) _” because Kwisatz
Haderach_[ _is probably from
Hebrew_](https://dune.fandom.com/wiki/Kwisatz_Haderach#Behind_the_sce) _, it
is similar to “Kfitzat HaDerech” — the leaping of the way or the shortening of
the way. The suffix “-at” is a suffix meaning “of”.]_

<hr>

There is a fatal flaw in this concept: if you are driving alone, you need to
stop about 1km after the city limits and recite the prayer. This is extremely
impractical, and possibly even dangerous if you don’t find a safe place to
stop. On the other hand, [especially
in](https://stories.bringthemhomenow.net/) [these sad
times](https://w.ynet.co.il/news/absent?externalurl=true), we [really
need](https://yaledailynews.com/blog/2023/12/04/ben-zion-free-palestine-from-
hamas/) all the prayers we can get.

One solution would be to recite the prayer before I leave. Not the best
solution, but better than nothing.

Another solution is to carpool, and have my passenger recite the prayer. This
can be difficult as I often travel at low-traffic times (not everyone can
afford to arrive at work later or earlier than rush hour). It’s also difficult
because not everyone wants to recite a prayer and I don’t want to make people
feel uncomfortable riding with me.

 **So I’m creating an app that will recite the prayer at the time that I
wish.**

## Features

It is possible to choose the voice (male or female), whether you are returning
today (the prayer is slightly different if not) and of course, when you want
it to be recited (e.g. 30 minutes from now).

My original idea was to use [flutter_tts
](https://pub.dev/packages/flutter_tts)and text to speech, but it
unfortunately doesn’t support Hebrew. Also, the text is known in advance,
there isn’t actually a _need_ for text to speech. I did try some other
services, and I **really** didn’t like the robotic voice they produced. So I
recorded myself for the female voice, and one of my sons (he’s a tenor :) )
for the male voice.
{% include responsive-embed url="https://giphy.com/embed/l0K4hlUSxMWHhvdn2" ratio="16:9" %}
<h6 style="text-align: center;">Not my son.</h6>

I’m using
[android_alarm_manager_plus](https://pub.dev/packages/android_alarm_manager_plus)
for the delayed recitation. It’s a **super easy** plugin that gave me
everything I could possibly want. Just set the correct prayer version as the
alarm to play, and I’m done :). It also offers easy ways to check if an alarm
has been set and to cancel it if so.

## Code

First, the model:

```dart
//class representing the parameters for reciting a prayer at a later time.  
    class PrayerParameters {  
      //I created an enum instead of a bool because I like them. To each her own.  
      ReturnToday returnToday = ReturnToday.returnToday;  
      //In the future I want to add another voice type - user recording  
      VoiceType voiceType = VoiceType.female;  
      //time from now until prayer is recited  
      Duration time = const Duration(minutes: 30);  
      //to read at max volume or not? (sometimes I still use bools :))  
      bool maxVolume = false;  
        
      //the picker returns an int, easily turn it into a Duration  
      void setTime(int minutes) {  
        time = Duration(minutes: minutes);  
      }  
        
      //for debug  
      @override  
      String toString() {  
        return "$returnToday $voiceType $time";  
      }  
    }

```
And now the home page:

```dart
//in home_page.dart, on pressing the "Set prayer time" button  
      
    //get the prayer parameters  
    PrayerParameters? parameters = await Navigator.push(  
        context,  
        MaterialPageRoute(  
            builder: (context) =>  
                AlarmParametersPage()));  
    //if canceled, show snackbar and return  
    if (parameters == null) {  
      if (mounted) {  
        ScaffoldMessenger.of(context).showSnackBar(  
            const SnackBar(  
                content: Text("Recitation not set")));  
      }  
      return;  
    }  
    //choose the correct mp3 file  
    String filename =  
        "${parameters.voiceType.name}-${parameters.returnToday.name}.mp3";  
    //create the alarm settings  
    final alarmSettings = AlarmSettings(  
      //ID for cancellation  
      id: Constants.alarmId,//42, the answer to all questions.   
      //when to play the file  
      dateTime: DateTime.now().add(parameters.time),  
      //put the filename we created before  
      assetAudioPath: 'assets/sounds/$filename',  
      //don't loop  
      loopAudio: false,  
      //don't vibrate  
      vibrate: false,  
      //do we set the volume to maximum for the recitation?  
      volumeMax: parameters.maxVolume,  
      //don't fade out  
      fadeDuration: 0,  
      //notification parameters  
      notificationTitle: "Traveler's prayer",  
      notificationBody: 'Speaking now',  
      //notify user if app is killed, this cancels the alarm in most phones   
      enableNotificationOnKill: true,  
    );  
    //set the alarm  
    bool success =  
        await Alarm.set(alarmSettings: alarmSettings);  
    

```
As you can see, the [alarm
plugin](https://pub.dev/packages/android_alarm_manager_plus) makes things very
easy. A notification automatically appears when the alarm is sounded — you
don’t need to handle the notifications at all!

It also considerately outputs to the logcat the following on success:

```bash
I/flutter (13257): [Alarm] Notification with id 42 scheduled successfuly at 2023-12-07 15:37:24.955446Z GMT  
    I/flutter (13257): [Alarm] Alarm with id 42 scheduled successfully at 2023-12-07 15:37:24.955446  
    I/flutter (13257): [Alarm] NotificationOnKillService set with success

```
And if not, a clear error message (I got an error message that I needed a
specific permission, for example).

My app checks if alarm `alarmId` is set, and if so it provides a cancel
option:

```dart
//in home_page.dart, on pressing the "Cancel recitation" button  
      
    //easy cancel  
    bool success = await Alarm.stop(Constants.alarmId);  
    //notify user  
    if (mounted) {  
      if (success) {  
        ScaffoldMessenger.of(context).showSnackBar(  
            const SnackBar(  
                content: Text("Canceled successfully")));  
      } else {  
        ScaffoldMessenger.of(context).showSnackBar(  
            const SnackBar(  
                content: Text("Cancelation failed")));  
      }  
    }

```
And it is confirmed in the logcat again:

```bash
I/flutter (13257): [Alarm] Notification with id 42 canceled  
    I/flutter (13257): [Alarm] NotificationOnKillService stopped with success

```
In short, one of the **easiest plugins** it has been my pleasure to use.

## And next

Still some minor bugs to iron out, but I hope to release this soon (and use it
myself!). In the future, I will also support uploading your own recording, and
more prayer versions — there are a number of different traditions.

Praying for better times.

<hr>

 _Image created using_[ _Fooocus
2.1.824_](https://github.com/lllyasviel/Fooocus) _running on a Windows
computer, using prompt “A man standing at the side of the road with an open
prayer book in his hands. The man is reading silently from the book. The road
leads on to a beautiful landscape”. Fooocus is_ **_awesome_** _, by the way._

_Check out my free and open source online game_ [_Space Short_](https://danielle-honig.com/space-short)_. If you like my_ [_site_](https://danielle-honig.com/)_, you can also_ [_buy me a coffee_](https://www.buymeacoffee.com/369wkrttu6)_._
