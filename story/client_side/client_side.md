The template filesystem structure should mimic the URLs associated with them.

	http://greatsite.com/user/docs/edit
	/var/www/site/views/user/docs/edit.tmpl	

All templates should be wrapped in a tag pair which has a unique id, 
and that unique id should mimic the URL and filesystem structure.

<pre class="html">
&lt;div id=&quot;home&quot; class=&quot;htmlRoot&quot;&gt;&lt;/div&gt;
</pre>

CSS and Javascript should not be embedded in templates.
If templates are wrapped in an id'd tag then page specific styles and actions can be set easily.

Here's how it's done in CSS...

<pre class="css">
.htmlRoot#home h1 {}
.htmlRoot#user h1 {}
.htmlRoot#news h1 {}
</pre>


... and in Javascript

<pre class="javascript">
//------------------------------------------------------------
// site code
//------------------------------------------------------------
//------------------------------------------------------------
// page code
//------------------------------------------------------------
var elem = document.getElementsByClassName(&#x27;htmlRoot&#x27;)[0];
var page = elem.id;
switch ( page ) {
	case &#x27;home&#x27;:
	// home page specific code goes here.
	break;
	
	case &#x27;user&#x27;:
	// user page specific code goes here.
	break;
	
	case &#x27;news&#x27;:
	// news page specific code goes here.
	break;
}
</pre>

## Page groups
If a page is one of a group of pages append the group name to the same class attribute as .htmlRoot
So for example you could have multiple pages which collectively are the store.

	/var/www/site/views/store/shop.tmpl
	/var/www/site/views/store/review.tmpl
	/var/www/site/views/store/shipping.tmpl
	/var/www/site/views/store/checkout.tmpl

Here's what each "htmlRoot" wrapper element would look like.

<pre class="html">
&lt;div id=&quot;store-shop&quot; class=&quot;htmlRoot store&quot;&gt;&lt;/div&gt;
&lt;div id=&quot;store-review&quot; class=&quot;htmlRoot store&quot;&gt;&lt;/div&gt;
&lt;div id=&quot;store-shipping&quot; class=&quot;htmlRoot store&quot;&gt;&lt;/div&gt;
&lt;div id=&quot;store-checkout&quot; class=&quot;htmlRoot store&quot;&gt;&lt;/div&gt;
</pre>

Here's what your store group specific CSS would look like

<pre class="css">
.htmlRoot.store h1 {}
</pre>

Here's what your javascript page/code switcher looks like.

<pre class="javascript">
//------------------------------------------------------------
// site code
//------------------------------------------------------------
var elem = document.getElementsByClassName(&#x27;htmlRoot&#x27;)[0];
//------------------------------------------------------------
// group code
//------------------------------------------------------------
var groups = elem.className.split(/\s+/);
for ( var group in groups ) {
	if ( group == &#x27;htmlRoot&#x27; ) {
		continue;
	}
	switch ( group ) {
		case &#x27;store&#x27;:
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

### Pros 
 
#### Consistency.

Projects that are inconsistent are difficult to maintain, 
and projects that are difficult to maintain eventually get replaced.
Consistency means there's less new developers have to learn before they can contribute something useful to your project.  Consistency also means...

#### It's easy to find errors.
If somebody reports a bug on a specific page you know exactly where to begin.

The alternative is doing this a lot...

	grep -rilh "some unique string I found in the page source" /var/www/site

#### You can isolate an infinite amount of page styles and javascript with one css and one js file.

Having to worry about how and where your stylesheet rules will be applied
or where javascript will run makes people very wary of change. 
Being afraid of change is why once successful projects stagnate and eventually get replaced.

#### It's easy to minify a single javascript file and css file.

### Cons
#### Your CSS and HTML attributes will be verbose.
Although performance doesn't necessarily have to take a hit if you use something like <a href="http://httpd.apache.org/docs/2.2/mod/mod_deflate.html">mod_deflate</a>