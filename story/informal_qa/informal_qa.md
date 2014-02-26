
## Informal QA

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

<pre class="html">
&lt;div id=&quot;store-shop&quot; 
	class=&quot;htmlRoot{% if user.id == &#x27;12345678&#x27; %} testing{% fi %}&quot;&gt;
&lt;/div&gt;
</pre>

Then you can write CSS and javascript which will only run on testing group pages, i.e. this one user's pages.