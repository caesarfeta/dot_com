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
	<div id="store-checkout" class="htmlRoot store"></div>

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