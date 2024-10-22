---
layout: page-comment
comments: true
title: Reverser
permalink: /reverser/
description: multiline text reverser in flutter
---

<iframe src="../reverser/index.html" ></iframe>

 <style>
        /* Default style (for desktop) */
        iframe {
            height: 45vw; /* Set height for desktop */
            width: 100%;
            border:0;
        }

        /* Media query for mobile devices */
        @media (max-width: 768px) {
            iframe {
                height: 500px; /* Set height for mobile */
                width: 100%;
                border:0;
            }
        }
    </style>

Reverses multiline text, line by line, with an option to copy results to clipboard.

This is meant for use with RTL challenged apps that reverse RTL text. Reverser
helps you put the already reversed text in the app to get the results you want.

Also [free](https://play.google.com/store/apps/details?id=com.honeystone.reverser) on Google Play.

Written in Flutter. Source code available on [GitHub](https://github.com/danielle-h/reverser).
