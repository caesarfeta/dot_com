So the following is a system I use for keeping my CSS styles and Javascript code tidy.
The biggest problems I've encountered when writing client-side code are the following...

* The file structure that organizes view templates don't resemble the project's URL scheme in the slightest.
* CSS and Javascript are embedded in the view templates.
	* This usually is done not out of laziness but fear that they will be applied and run where they shouldn't.
	This is especially common when you've inherited code or you're working

These problems only get worse over the project's lifetime.
So below is my solution to this problem.

### No! You can't build that new fancy feature until you clean your room!
All templates should be wrapped in a tag pair which has a unique id, 
and that unique id should mimic the URL and filesystem structure as closely as possible.

I call this tag the "wrapper-tag".

<pre class="html">
&lt;div id=&quot;home-user&quot; class=&quot;root&quot;&gt;&lt;/div&gt;
</pre>

	http://your-si.te/home/user/1212
	/var/www/site/views/home/user.tmpl

CSS and Javascript should be embedded in templates only under exceptional circumstances!
If templates are wrapped in a page id tag then page specific styles can be set easily.

Here's how it's done in CSS...

<pre class="css">
.root#home-user h1 {
	font-family: Helvetica, Arial, sans-serif;
}
.root#home-user img {
	padding: 30px;
}
.root#home-user .caption {
	font-style: italic;
}
</pre>


The id tag also allows for page specific Javascript to be run from a single Javascript file.

<pre class="javascript">
//------------------------------------------------------------
// site code
//------------------------------------------------------------
//------------------------------------------------------------
// page code
//------------------------------------------------------------
var elem = document.getElementsByClassName(&#x27;root&#x27;)[0];
var page = elem.id;
switch ( page ) {
	case &#x27;home-user&#x27;:
	// home page specific code goes here.
	break;
}
</pre>

## Page groups
If a page is one of a group of pages, add the group name to the wrapper-tag's class attribute.
So for example, if you have multiple pages which collectively are the store...

	/var/www/site/views/store/shop.tmpl
	/var/www/site/views/store/review.tmpl
	/var/www/site/views/store/shipping.tmpl
	/var/www/site/views/store/checkout.tmpl

... here's what each wrapper-tag would look like.

<pre class="html">
&lt;div id=&quot;store-shop&quot; class=&quot;root store&quot;&gt;&lt;/div&gt;
&lt;div id=&quot;store-review&quot; class=&quot;root store&quot;&gt;&lt;/div&gt;
&lt;div id=&quot;store-shipping&quot; class=&quot;root store&quot;&gt;&lt;/div&gt;
&lt;div id=&quot;store-checkout&quot; class=&quot;root store&quot;&gt;&lt;/div&gt;
</pre>

Here's what the store group specific CSS might look like.

<pre class="css">
.root.store {
	background-color: #AAFFAA;
}
</pre>

And here's what the Javascript might look like.

<pre class="javascript">
//------------------------------------------------------------
// site code
//------------------------------------------------------------
var elem = document.getElementsByClassName(&#x27;root&#x27;)[0];
//------------------------------------------------------------
// group code
//------------------------------------------------------------
var groups = elem.className.split(/\s+/);
for ( var group in groups ) {
	if ( group == &#x27;root&#x27; ) {
		continue;
	}
	switch ( group ) {
		case &#x27;store&#x27;:
		//------------------------------------------------------------
		//  Group code goes here
		//------------------------------------------------------------
		break;
	}
}
//------------------------------------------------------------
// page code
//------------------------------------------------------------
var page = elem.id;
switch ( page ) {
	case &#x27;store-shop&#x27;:
	break;
	
	case &#x27;store-review&#x27;:
	break;
	
	case &#x27;store-shipping&#x27;:
	break;
	
	case &#x27;store-checkout&#x27;:
	break;
}
</pre>

That's the system.  It's bone-headedly obvious.

* Every page gets a wrapper-tag which surrounds all other page content.
* Pages can be grouped together by adding additional group names to the wrapper-tag's class attributes.
* A single CSS file can identifiy specific pages and groups by prefixing selectors with the correct combination of a wrapper-tag's class and id attribute values.
* A single Javascript file can run page and group specific code by using the wrapper-tag's attributes to run discrete blocks of code.

### Pros 
 
#### Consistency.

Projects that are inconsistent are difficult to maintain, 
and projects that are difficult to maintain eventually get replaced.
Consistency means there's less new developers have to learn before they can contribute something useful to your project.
Consistency also means...

#### It's easy to find errors.

If somebody reports a bug on a specific page you know exactly where to begin.
You look at the problem page's URL, and open the corresponding view template.
Locating bad CSS rules or Javascript is easy once you know the wrapper-tag's class and id attributes.

The alternative is doing this a lot...

	grep -rilh "some unique string found in the page source" /var/www/site

... or you have to go spelunking in your controller classes.

#### You can isolate all of your pages' style-sheet rules with one .css file and all of your Javascript with one .js file.

Having to worry about how and where your stylesheet rules will be applied
or where Javascript will run makes people very wary of change. 
Being afraid of change is a guarantee that a project stagnates and eventually gets replaced.
Plus it's easy to minify a single .js file and .css file, which will improve server-response times.

### Cons
#### Your CSS and HTML attributes may become more verbose.
Although performance doesn't necessarily have to take a hit if you use something like <a href="http://httpd.apache.org/docs/2.2/mod/mod_deflate.html">mod_deflate</a>

