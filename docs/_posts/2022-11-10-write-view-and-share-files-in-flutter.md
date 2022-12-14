---
layout: post
title:  "Write, view and share files in Flutter"
date:   2022-11-10 19:56:08 +0200
categories: flutter
tags: file,share
---
Many apps need to save files that the user can afterwards view such as log files, data files, etc. I used to create the files and save them in Downloads or Documents.  However, as Android becomes more security and privacy conscious, Android is using storage scoping, and saving csv files to Downloads has become difficult. 

Each app has its own folder for app files, where it can save whatever it wants without additional permissions needed. However, this is typically not accessible to the user. The solution is to have _from within the app_ a page that allows the user to view the app files, select them, and share them. But how to do this in Flutter?

For this I wrote a set of two articles in Medium:
- [Part I](https://medium.com/@dsavir-h/write-view-and-share-app-files-part-i-d6f2170f2cb2)
- [Part II](https://medium.com/@dsavir-h/write-view-and-share-app-files-part-ii-20a7a7435df2)

The resulting example app looks the the gif below. You can also checkout  the code on [GitLab](https://gitlab.com/dsavir/medium-file-app).

![gif of app creating, saving, selecting and sharing files](/assets/images/app-files-flutter/full_file_app.gif "create, select and share files in flutter")
