# Haml and cheese.
So recently I've begun working with a team of web-developers on a Rails based application.
It has been my first exposure to Rails and Ruby for that matter, so I'm coming to this project as a bit of an outsider.

## What is it?
For those who don't know Haml is a meta-HTML markup language.
It's creators see it as HTML shorthand.
Here's the intro paragraph of the Haml homepage.

"Haml (HTML abstraction markup language) is based on one primary principle: 
markup should be beautiful.
It’s not just beauty for beauty’s sake either;
Haml accelerates and simplifies template creation down to veritable haiku."

## HTML isn't beautiful.
So HTML and it's big-brother XML have problems.
They're tag based which means all of your content gets wrapped in opening and closing tags.
These tags can get nested one inside of the other.
There's not really a practical limit to how deep this nesting can go.
So if somebody isn't careful they can easily make a mess for themselves by carelessly omitting a tag.
Haml tries to remedy this situation by replacing tag-pairs with carefully crafted whitespace.

## See for yourself.
Take a look at the haml project's homepage http://haml.info/

You're back... Excellent.
So you noticed all of the references to haiku.
Kind of obnoxious right?
Well I think so.
Web page mark-up is not poetry and it never will be.
Mark-up holds content.
Poetry IS content.
Whenever a new technology is marketed to you by coopting a somewhat exotic centuries old creative art get your guard up.
Usually you're being fed a big ol' heaping spoon of marketing bullshit.

I understand what the people marketing Haml are trying to do, and they're not alone in this.
They're trying to convince you that their language is elegant,
and it will increase your expressive power.
With just a small smattering of expertly sequenced letters you will build templates, which used to take you hours, in only a few minutes.
But sorry to say... nah... that's probably not going to happen.

Not to get too side-tracked but I have to get this off of my chest... web-developers, I'm talking to you... the majority of our work is the digital equivalent of setting-type and making sure the printing presses are running smoothly.
We aren't Lao-Tzu meditating on how to live harmoniously with the rest of the universe.
Take pride in your work, certainly, but learn some humility.
Your career will thank you, and I'll thank you because I won't have the tools of my trade sold to me by incessantly stroking my ego.

## Marketing bullshit aside...
Here's why Haml is ridiculous fundamentally.
Web browsers render HTML.
They don't render Haml.

The time you save typing is negligible when you realize developers don't spend the majority of their time typing.
The majority of our time is spent asking this question, 
"Why is the computer doing this?"

A front-end web-developer's primary question is a bit more specific, "Why is the browser rendering this page like this?"
Answering that question becomes much more complex with Haml.
Why? 
Because Haml has to be turned into HTML before it can be rendered by a browser.
Does that translation go smoothly?
Sometimes...
But what happens when it doesn't?

Well this happens.
The developer looks at the page and its source in his browser, then he looks at the template in his text-editor and tries to figure out where things have gone wrong.

Ever find yourself in a waiting room and you pick up a Hi-Lites magazine?
I know their for children I don't care.
Well they have these pages where two drawings are shown side-by-side and it's your job to figure out what's "wrong" in one of them.  You find the man with the mustache and the fish missing a fin and you feel good that you have such finely honed observational powers.

Well that's not that different than troubleshooting template bugs.
You're visually comparing two texts instead of two cartoon images.

Actually there's another layer to this...
a developer has to imagine how the template gets modified by the server.
So you're really comparing three texts: the browser source, the template source, and the nebulous ideal yet to be realized in your head.

## HTML is here to stay.
Until there is an alternative mark-up language rendered by the majority of web-browsers we have to live with HTML.
And since we have to live with HTML people have to learn how to use it responsibly.






# How to structure your templates, CSS, and Javascript without making a huge flerkin' mess.
The template filesystem structure should mimic the URLs associated with them.

	http://greatsite.com/user/docs/edit
	/var/www/site/views/user/docs/edit.tmpl	

All templates should be wrapped in a tag pair which has a unique id, 
and that unique id should mimic the URL and filesystem structure.

	<div id="home" class="htmlRoot"></div>

CSS and Javascript should not be embedded in templates.
If templates are wrapped in an id'd tag then page specific styles and actions can be set easily.

Here's how in CSS

	.htmlRoot#home h1 {}
	.htmlRoot#user h1 {}
	.htmlRoot#news h1 {}


In Javascript

	//------------------------------------------------------------
	// site code
	//------------------------------------------------------------
	//------------------------------------------------------------
	// page code
	//------------------------------------------------------------
	var elem = document.getElementsByClassName('htmlRoot')[0];
	var page = elem.id;
	switch ( page ) {
		case 'home':
		// home page specific code goes here.
		break;
		
		case 'user':
		// user page specific code goes here.
		break;
		
		case 'news':
		// news page specific code goes here.
		break;
	}

## Page groups
If a page is one of a group of pages append the group name to the same class attribute as .htmlRoot
So for example you could have multiple pages which collectively are the store.

	/var/www/site/views/store/shop.tmpl
	/var/www/site/views/store/review.tmpl
	/var/www/site/views/store/shipping.tmpl
	/var/www/site/views/store/checkout.tmpl

Here's what each "htmlRoot" wrapper element would look like.

	<div id="store-shop" class="htmlRoot store"></div>
	<div id="store-review" class="htmlRoot store"></div>
	<div id="store-shipping" class="htmlRoot store"></div>
	<div id="store-checkout" class="htmlRoot checkout"></div>

Here's what your store group specific CSS would look like

	.htmlRoot.store h1 {}

Here's what your javascript page/code switcher looks like.

	//------------------------------------------------------------
	// site code
	//------------------------------------------------------------
	var elem = document.getElementsByClassName('htmlRoot')[0];
	//------------------------------------------------------------
	// group code
	//------------------------------------------------------------
	var groups = elem.className.split(/\s+/);
	for ( var group in groups ) {
		if ( group == 'htmlRoot' ) {
			continue;
		}
		switch ( group ) {
			case 'store':
			break;
		}
	}
	//------------------------------------------------------------
	// page code
	//------------------------------------------------------------
	var page = elem.id;
	switch ( page ) {
		case 'store-shop':
		break;
		
		case 'store-review':
		break;
		
		case 'store-shipping':
		break;
		
		case 'store-checkout':
		break;
	}

## Identifying certain users and closing the development loop... informal QA
So here's a nice side-effect of this system, which can improve UI development especially for small projects.
Let's do a little bit of reflection.
Who's testing your UIs?
Do you have a QA team?
Do you have a QA testing environment with up-to-date data?
Many smaller software projects do not.
And the time costs of maintaining a separate QA test environment seperate from a developer test can be significant.
So if there isn't a dedicated QA team and environment how can you test new UI designs?

Here's a small scale solution.
Find a user and friend him up.
A user you like who fits the profile of an 'early adopter'.
And somebody who is representative of your user base.
Now all you have to do is mark the root element as testing with a template like this.

	<div id="store-shop" class="htmlRoot{% if user.id == '12345678' %} testing{% fi %}"></div>

Then you can write CSS and javascript which will only run on testing group pages, i.e. this one user's pages.

## Pros  
1. It's consistent.

	* Projects that are inconsistent are difficult to maintain, 
	and projects that are difficult to maintain eventually get replaced.

2. You can isolate individual page styles and javascript while having a single stylesheet and javascript file.

	* Having to worry about how and where your stylesheet rules will be applied
	or where javascript will run makes people very wary of change. 
	Being afraid of change is why once successful projects eventually get replaced.
	
3. It's easy to minify a single javascript file.

4. It's easy to find errors.

	* If somebody reports a bug on a specific page you know exactly where to begin.
	* If you find yourself doing this a lot...

			grep -rilh "some unique looking string I found in the page source" /var/www/site

	you have a problem.
	
5. You can easily close the development loop: design, test, implement, feedback, repeat...

## Cons
1. Your CSS will be verbose.

	* Performance doesn't necessarily have to take a hit... http://httpd.apache.org/docs/2.2/mod/mod_deflate.html