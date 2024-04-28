---
layout: post
title: "How to add a search function to your ChatGPT chats"
categories: [tools]
tags: ["ChatGPT", "JavaScript", "Search", "History", "How To"]
description: How to add a search function to your ChatGPT chats Private and easy
comments: true
---

I have quite a few chats in my history now.
![screenshot of chatGPT chat history](/assets/images/2024-04-26-how-to-add-a-search-function-to-your-chatgpt-chats/chatgpt-chats.png){: .align-center}

<h6 style="text-align: center;">Lots and lots more below</h6>

Mostly that doesn’t bother me, but sometimes I want to find that image or that
code snippet, and… how?

<!--more-->

Scrolling down, looking at the names? That is not the efficiency I want when
using ChatGPT.

For reasons that escape me, [OpenAI have not implemented
this](https://community.openai.com/t/implementing-chatgpt-history-search-
capability/225778). There are a [number of Chrome
extensions](https://chromewebstore.google.com/search/chatgpt%20search%20history),
but I really didn’t have the patience to research each one and see if they are
private or not. And frankly, I have ChatGPT at my fingertips, why not ask it
for some JavaScript code that I can copy-paste into my console? You don’t get
more private than that :) ( **Important** : only do things like this if you
actually speak JavaScript!)

![image of sorceress with a laptop in the middle of a forest at twilight](/assets/images/2024-04-26-how-to-add-a-search-function-to-your-chatgpt-chats/2024-04-25_18-58-55_9650.png){: .align-center}

<h6 style="text-align: center;">ChatGPT at my fingertips (Fooocus)</h6>

So after a bit of inspecting and back and forth, here is the JavaScript
snippet:

```javascript
// Create the search input element
const searchInput = document.createElement("input");
searchInput.setAttribute("type", "text");
searchInput.setAttribute("placeholder", "Search chats...");
searchInput.style.margin = "10px";
searchInput.style.padding = "5px";

// Function to filter chat names based on search input
const filterChats = () => {
  const searchTerm = searchInput.value.toLowerCase();
  const chatItems = document.querySelectorAll("nav li"); // This selector targets <li> elements within the <nav>

  chatItems.forEach((item) => {
    // the chat name is in a great- grandchild element
    const chatNameElement = item.querySelector(":scope > * > * > * ");
    //show element if it contains the search term
    if (chatNameElement) {
      const isVisible = chatNameElement.textContent
        .toLowerCase()
        .includes(searchTerm);
      item.style.display = isVisible ? "" : "none";
    }
  });
};

// Add event listener to search input
searchInput.addEventListener("input", filterChats);

// Find the sidebar and append the search input
const sidebar = document.querySelector("nav"); // Assumes the sidebar is the <nav> element
sidebar.insertBefore(searchInput, sidebar.firstChild);
```

**Copy-paste** it into the console and press enter. And voilà! Your search
bar is at your service :)
![screenshot of chatGPT chat history with a search bar](/assets/images/2024-04-26-how-to-add-a-search-function-to-your-chatgpt-chats/chatgpt-search-big-featured.png){: .align-center}

<h6 style="text-align: center;">A thing of beauty</h6>

Caveats:

1. This only **searches the chat names** , not the chat content
2. It only searches **visible chat names** , so you might need to scroll down a bit to get to the general date you opened the chat (e.g. 3 months ago) so that the chats appear.
3. **No complex searches** such as “flutter AND test” (yet).

Enjoy!

**Bonus**:

If you're feeling adventurous, and you don't want to copy-paste into your console all the time, you can use [tampermonkey](https://www.tampermonkey.net/) to add the script to chat.openai.com on a regular basis.

<hr>

_Broken heart walking,_[ _202 days_](https://www.facebook.com/bringhomenow/)
_._[ _#BringThemHomeNow_](https://www.bringthemhome-diy.com/) _._

_Check out my free and open source online game_[ _Space
Short_](https://danielle-honig.com/space-short) _. If you like my_[
_stories_](/) _and_[ _site_](https://danielle-honig.com/) _, you can also_[
_buy me a coffee_](https://www.buymeacoffee.com/369wkrttu6) _._
