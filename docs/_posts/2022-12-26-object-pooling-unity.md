---
layout: post
title:  "Object Pooling in Unity"
categories: unity
tags: [object-pooling,optimization]
---
![](https://miro.medium.com/max/720/1*TFiE8b2Ghx8XspdS9zAduA.gif)

Like many programmers, I have an awesome idea for a game. I decided I want to create this game in Unity. So in order to learn Unity, I decided to create yet another game. Its working name for now is *Space Short*. Basically it s a space shooter game (isn't that mandatory for your first Unity game? I'm sure it's written somewhere...).<!--more--> The space shooter game is limited to 10 levels, with two bosses, and the idea of the game is to see if you can survive to the end - and maybe even get a high score!
It has many elements that will be in the original awesome game, and it's a great way to learn about Unity. 


One of things I learned was object pooling. The concept is not new - instead of creating and destroying objects all the time, create 20 objects, and just move them around, disabling them if you don't need them at all. In the original Unity course I took Object Pooling was written from scratch, but from 2021 Unity has a framework for object pooling built in, making things almost ridiculously easy. But it's still easy to miss some things, like the pitfalls I fell into in the articles below:

[Part I](https://medium.com/@dsavir-h/unity-2021-object-pooling-62f469021552)  
[Part II](https://medium.com/@dsavir-h/unity-2021-object-pooling-part-ii-fa2848f4334b)