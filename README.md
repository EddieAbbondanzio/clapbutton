# ClapButton

An easy to use, open source clap button similar to the one on medium.com. Allows users to clap once, or up to 50 times for a web page. Only requires 3 lines of HTML and an API to function (more below). For a turn key solution checkout https://clapbutton.com.

![Gif Example](https://github.com/EddieAbbondanzio/clapbutton/tree/master/images/example.gif)

## Installation

It doesn't take much to add the clap button to your site or blog. In the head of your HTML page you'll need to add a reference for a CSS file, and one more for a Javascript file.

```html
<!-- In the <head> of your HTML page. -->
<script src="https://unpkg.com/clap-button-com/dist/main.js"></script>
<link rel="stylesheet" href="https://unpkg.com/clap-button-com/dist/styles.css" />
```

## Usage

To use the button it's as easy as a single line.

```html
<!-- Where ever you want the button -->
<button class="clap-button"></button>
```

### Options

Options can be specified by adding HTML attributes to the button element.

### Dev Mode

Enable dev mode by adding a `data-dev` attribute. This will stop the button from making API calls. That way you spam the button as much as you like without effecting clap counts.

```html
<button class="clap-button" data-dev="true"></button>
```

### Page URL

By default the button detects the current page url using `window.location.href`. If you'd like to override this option it can be done by adding a `data-url` attribute to the button.

```html
<button class="clap-button" data-url="yourdomain.com/specific/page"></button>
```

### Color

The button comes in multiple flavors red, green, blue, grey, and white! By default the button will be set to green but it can be easily changed with a `data-color` attribute.

```html
<button class="clap-button" data-color="red"></button>
<button class="clap-button" data-color="green"></button>
<button class="clap-button" data-color="blue"></button>
<button class="clap-button" data-color="grey"></button>
<button class="clap-button" data-color="white"></button>
```

## API

For persisting clap counts the button expects an API. By default it's configured to work with https://clapbutton.com, but if you want to roll your own set up the button can accept a backend url as an attribute.

```html
<button class="clap-button" data-backend-url="yourdomain.com/api/route/"></button>
```

Your API will just need to support two endpoints: one to get clap counts, and one to clap for a page.

### `GET /clap` - Get Clap Count

GET endpoint that accepts a query string parameter of `page` that contains a URI encoded URL. Your backend should then be able to lookup the page via it's URL and return back the clap count as the body.

#### Example

To get the clap count for google.com, a request would be routed to `https://clapbutton.com/api/clap?page=google.com`.

### `POST /clap` - Clap For Page

POST endpoint that takes a JSON body of { url:string, claps: number } to add claps to a page. The API doesn't need to return anything back other than 200 OK.

#### Example

If we wanted to clap 12 times for google.com, we would send a POST request to `https://clapbutton.com/api/clap` with the following payload:

```json
{
  "url": "google.com",
  "claps": 12
}
```
