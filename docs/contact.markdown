---
layout: page
title: Contact
permalink: /contact/
---
<link rel="stylesheet" href="/css/custom.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.4.1/dist/css/bootstrap.min.css" integrity="sha256-bZLfwXAP04zRMK2BjiO8iu9pf4FbLqX6zitd+tIvLhE=" crossorigin="anonymous">
<!-- <script type="text/javascript" src="/js/contact-us.js"></script> -->


<figure>
  <img class="stretch" src="{{site.url}}/assets/images/diffusion-wide.png"  alt="Diffusion"/>
  <figcaption style="text-align:center">Diffusion simulation in Processing.</figcaption>
</figure>


 <!-- <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSd0PpgbZSB7JiKie9t6kY13LICkZ-rTjfGrnZfJzOcZiV_s4w/viewform?embedded=true" width="640" height="677" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe> -->
<div style="width:60%; margin:auto;">
   <form  target="_self" enctype="multipart/form-data" action="https://api.web3forms.com/submit" accept-charset="UTF-8" method="post">
      <input type="hidden" name="access_key" value="07400497-0bba-4e59-a636-342a79b01c3b" />
      <input type="hidden" name="redirect" value="https://danielle-h.github.io/contact-after">
      <input type="hidden" name="subject" value="new submission in contact" />
      <div class="mb-3">
         <label for="nameInput" class="form-label">Name</label>
         <input type="text" name="name" class="form-control" id="nameInput" placeholder="my name">
      </div>
      <div class="mb-3">
         <label for="emailInput" class="form-label">Email address</label>
         <input type="email" name="email" class="form-control" id="emailInput" placeholder="name@example.com">
      </div>
      <div class="mb-3">
         <label for="messageInput" class="form-label">Message</label>
         <textarea class="form-control" name="message" id="messageInput" rows="3"></textarea>
      </div>
      <div class="mb-3" style="margin-top:10px">
         <button type="submit" class="btn btn-danielle">Submit</button>
      </div>
      <div id="result"></div>
   </form>
</div>