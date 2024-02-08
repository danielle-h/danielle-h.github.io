---
layout: post
title: "Int to byte array converter online"
categories: [tools]
tags: [int, byte-array, online, javascript]
description: an int-to-byte-array converter, and vice versa, including javascript code
comments: true
---

I work a lot with BLE, and BLE characteristics are byte arrays. For example, I want to convert the current Unix timestamp to a byte array, send it to a device, and then check the memory of the device, parse the timestamp and see if it’s the correct time.

I guess the year isn’t 3534, huh?

{% include responsive-embed url="https://giphy.com/embed/3o6wranwiuVVOQwSmk" ratio="16:9" %}

So let’s get debugging.

First, let’s make sure we are getting the correct timestamp (got  `1701264027246`) and check the timestamp  [here](https://www.epochconverter.com/)  — looks good.

Then check the function that turns it into bytes, I got the following:
```
[0, 0, 1, 140, 27, 60, 238, 110]
```

I would like to check that it is actually the same int. I searched online back and forth. There are tons of binary-hex converters, decimal-hex, decimal-binary, what have you. But I couldn’t find a converter where I can put the bytes, in decimal or hex format (sometimes the logs are in hex) and get an int.

So I created it, using HTML & JavaScript, and uploaded it on  [my site](https://danielle-honig.com/int-array-converter).

![gif using the converter](/assets/images/2023-12-01-int-to-byte-array-converter/int-to-byte1.gif)

## HTML

First the headers: Bootstrap, JQuery, custom css and javscript:

```html
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet"  
  integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">  
<link rel="stylesheet" href="/css/custom.css">  
  
<script src="https://code.jquery.com/jquery-3.6.2.slim.js"  
  integrity="sha256-OflJKW8Z8amEUuCaflBZJ4GOg4+JnNh9JdVfoV+6biw=" crossorigin="anonymous"></script>  
  
<script type="text/javascript" src="/js/convert.js"></script>
```

Body:

First row is the byte inputs and the converter. Second row has three buttons. Third row has the int input. Bootstrap makes it look nice :)

```html
<body>  
  <div class="row no-gutter">  
    <div class="col-xs-9">  
      <div class="mb-3 input-group  ">  
        <label for="byte1" class="input-group-text">1</label>  
        <input type="text" class="convert-input form-control" id="byte1">  
        <label for="byte2" class="input-group-text">2</label>  
        <input type="text" class="convert-input form-control" id="byte2">  
        <label for="byte3" class="input-group-text">3</label>  
        <input type="text" id="byte3" class="convert-input form-control">  
        <label for="byte4" class="input-group-text">4</label>  
        <input type="text" id="byte4" class="convert-input form-control">  
        <label for="byte5" class="input-group-text">5</label>  
        <input type="text" id="byte5" class="convert-input form-control">  
        <label for="byte6" class="input-group-text">6</label>  
        <input type="text" id="byte6" class="convert-input form-control">  
        <label for="byte7" class="input-group-text">7</label>  
        <input type="text" id="byte7" class="convert-input form-control">  
        <label for="byte8" class="input-group-text ">8</label>  
        <input type="text" id="byte8" class="convert-input form-control">  
  
        <select id="byteFormat" class="convert-input" style="float:right">  
          <option value="decimal">Decimal</option>  
          <option value="hex">Hex</option>  
        </select>  
      </div>  
    </div>  
  </div>  
  
  <div class="convert-wrapper">  
    <button type="button" id="convertToInt" class="btn-danielle btn-convert btn">Convert  
      Down</button>  
  
    <button type="button" id="clear" class="btn-danielle  btn-convert btn">Clear</button>  
  
    <button type="button" id="convertToArray" class="btn-danielle  btn-convert btn">Convert  
      Up</button>  
  </div>  
  
  <div class="row" style="margin:0 2em;">  
    <div class="convert-wrapper input-group">  
      <label for="result" class="input-group-text">Int</label>  
      <input type="text" id="result" class="convert-input form-control">  
    </div>  
  </div>  
  
</body>
```

## JavaScript

Now to have the nice HTML actually do something:

```javascript
// transforms an 8-but byte array into an int64  
function fromBytesInt64(bytes) {  
  const { buffer } = new Uint8Array(bytes);  
  const dataview = new DataView(buffer);  
  val = dataview.getBigInt64(0);   
  return val;  
}  
  
//transform number into 8 unsigned bytes:  
function toBytesInt64(num) {  
  arr = new ArrayBuffer(8);   
  view = new DataView(arr);  
  view.setBigInt64(0, num, false); // byteOffset = 0; litteEndian = false  
  arr = new Uint8Array(arr);  
  return arr;  
}  
  
//Put "0" (Decimal) or "00" (Hex) in all the input fields  
function clear(format) {  
  var str = "0";  
  if (format == "hex") {  
    str = "00";  
  }  
  $("input").val(str);  
}  
  
//When ready, set click functions  
$(document).ready(function () {  
  //on load should already be filled with 0s  
  clear();  
    
  //clear on click  
  $("#clear").click(function () {  
    format = $("#byteFormat").val();  
    clear(format);  
  });  
    
  //convert bytes to int  
  $("#convertToInt").click(function () {  
    //get the radix  
    format = $("#byteFormat").val();  
    var radix = 10;  
    if (format == "hex") {  
      radix = 16;  
    }  
    //put all byte values in an array  
    var bytes = [];  
    for (i = 1; i < 9; i++) {  
      bytes.push(parseInt($("#byte" + i).val(), radix));  
    }  
    //convert to int  
    let decimalValue = fromBytesInt64(bytes);  
    //update UI  
    $("#result").val(decimalValue);  
  });  
    
  //convert int to bytes  
  $("#convertToArray").click(function () {  
    //get the radix  
    format = $("#byteFormat").val();  
    var radix = 10;  
    if (format == "hex") {  
      radix = 16;  
    }  
    //get the int  
    intValue = $("#result").val();  
    //convert to bytes  
    let bytes = toBytesInt64(intValue);  
    //update UI  
    for (i = 1; i < 9; i++) {  
      $("#byte" + i).val(bytes[i - 1].toString(radix));  
    }  
  });  
});
```

Works great!

{% include responsive-embed url="https://giphy.com/embed/xUySTUZ8A2RJBQitEc" ratio="16:9" %}

Now let’s get back to debugging that pesky timestamp :)

What tools do you use? For what do you use them? Have you created tools? Let me know in the comments.

_Check out the converter_ [_here_](https://danielle-honig.com/int-array-converter)_. Full code on_ [_GitHub_](https://github.com/danielle-h/danielle-h.github.io/blob/main/docs/int-array-converter.html)_._

<hr/>

[_May they all come back safely_](https://stories.bringthemhomenow.net/)_. #BringThemHomeNow_