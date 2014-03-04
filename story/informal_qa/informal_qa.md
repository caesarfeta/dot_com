## Informal QA
Wouldn't we all love to remove humans from testing our software.
Let's get machines to do this for us!

Well we can't.
Not everywhere anyway.
There's one aspect of software testing that requires a human brain, preferably a poorly trained one... user-interfaces.

You can't take the user out of user-interface.
Even if you do all you're left with is "interface".
Machines don't need faces to talk to one another.
*Humans* give machines pretty faces, because *we* need them.

<div class="picture">
	<a href="img/news_anchors.jpg"><img src="img/news_anchors.jpg" alt="The Today Show"/></a>
	<p class="caption">The interface of the people's favorite news aggregator.</p>
</div>

It's unavoidable.
So you have to ask yourself.
Who's testing your UIs?
Is it just you?
Do you have a Quality Assurance team?
... Chances are you don't.
Do you have a QA testing environment with up-to-date data?
... Chances are you don't, and you don't want one.
That's another technological mouth to feed.
The time costs of maintaining a separate QA test environment seperate from a developer test environment can be significant.
So if there isn't dedicated QA people and a test environment how can you test new UI designs?
Where do we find these necessary human brains and where do we put them?

<div class="picture">
	<a href="img/igor.jpg"><img src="img/igor.jpg" alt="Igor"/></a>
	<p class="caption"><em>"You called?"</em></p>
</div>

### The solution is right under our noses.
You get your users to do it.
And you get them to test in your... *gasp*... production system.

You aren't going to get users to take time out of their day to test software with dummy data.
Users are humans so they're inheritently selfish they want to use "their data."
So let them.
You'll get better feedback.
You just have to take a few precautions.

What you need is a system that allows adventurous users to test out UI changes before they're thrust upon the more conservative members of your userbase.
What you need is voluntary AB-Testing.
Let's see what this entails...

### Voluntary AB-Testing Implemented in Rails
#### Create "B" CSS file and Javascript

	touch public/stylesheets/b_css.css
	touch public/javascript/b_script.js

#### /views/header.haml
Pull in additional CSS and Javascript in your header or wrapper template. 

<pre class="ruby">
#-------------------------------------------------------------
#  split testing
#-------------------------------------------------------------
if session[:split] == true
  = stylesheet_link_tag 'b_css'
  = javascript_include_tag 'b_script'
</pre>
	
Create the switch

<pre class="ruby">
#-------------------------------------------------------------
#  split testing switch
#-------------------------------------------------------------
if ( session[:split] == true )
  .split_switch.on= link_to( image_tag('split-b.png'), '/split_testing/switch' )
else
  .split_switch.off= link_to( image_tag('split-a.png'), '/split_testing/switch' )
</pre>

#### public/stylesheets/site.css

Display the switch in the upper-right.

<pre class="css">
.split_switch {
  padding: 10px;
  position: absolute;
  top: 0;
  right: 0;
}
</pre>

#### app/controllers/split_testing_controller.rb

Create the controller.

<pre class="ruby">
class SplitTestingController < ApplicationController
  def switch
    if session[:split] == true
      session[:split] = false
    else
      session[:split] = true
    end
    redirect_to :back
  end
end
</pre>

#### /config/routes.rb

Map the URL to your new controller

<pre class="ruby">
map.connect 'split_testing/:switch',
    :controller => 'split_testing',
    :action => 'switch'
</pre>