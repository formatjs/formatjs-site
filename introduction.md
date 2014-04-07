## Client and Server JavaScript Internationalization

### Introduction

Handling internationalization and localization efforts has never been an easy task. Many applications will need data such as dates, times, and currency to be formatted in a very specific way, depending on the country and language that they'll be used in.

At the same time, we want to be able to use the same code for our application across the world, no matter what language it's being displayed in. In order to do this, we need to separate out the parts of our application that are language or locale-specific from the rest of our application. Translators can then focus on localizing that data, while the application developers can focus on the parts of the application that are general to all locales.

### Server-side Internationalization

In the past, applications handled internationalization tasks only as part of the backend server-side code. This was and still is fine for websites that didn't have much rich, dynamic content done in client-side JavaScript.
 
The locale would be determined by the initial request that a user would make to the server, usually through the `Accept-Language` header that a browser would send. By the time the content reached the user, the HTML markup would already have all of its content properly translated and localized for the user. 

This would load quickly, since no additional work would need to be done by the browser to display the content correctly for the user.

### Client-side Internationalization

With modern websites, especially sites that were mainly composed of widgets or were single-page applications, more internationalization work needed to be moved over to the client-side.  More HTML content was rendered in the browser, through JavaScript, rather than on the server, and that would require that content to be localized in the browser too.

The benefit of this was that users got a richer, more dynamic experience in their applications that was more than just clicking between pages in their web browser.

Today, JavaScript standards committees are also working on developing a standardized way of handling formatting dates, numbers, and more in different locales, as part of the Internationalization API, so we would no longer need to use external libraries to do client-side localization work.

### Problems to be solved

With both server-side and client-side internationalization, though, we would often find ourselves having to localize data twice - once for the server, and once again for the client, in two different ways. 

As well, although the Internationalization API started to standardize how we could localize our application, it hasn't been fully implemented in every browser yet. Polyfills for that API, which extended that functionality to older browsers, have since been developed, but for performance reasons, we wouldn't want to load in the polyfill and every single language bundle for every user. Instead, we would want an intelligent way of detecting what locale a user was in, if their browser supported the new API, and only loading the pieces we needed.
