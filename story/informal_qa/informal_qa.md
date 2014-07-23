Testing code or Quality Assurance, aka QA, if you work in the biz, is an interesting subject,
So let me spout some opinions about it.

The best way to test the majority of code is with an automated test suite.
A test suite is simply code that checks the quality and performance of other code.
An excellent automated test suite is a beautiful creation, 
and an absolute necessity if your software is even remotely complex.

# Becoming a "good ____" person
If you want to become an overall "good ____ " person you must subject yourself to this process:

1. Have ideals, typically ones shared by others, aka define what "good" is. And you must record those ideals somewhere. You know... for reference.
2. Constantly compare your recent actions to your definition of good.
3. Develop new strategies for acting closer to your definition of good.

# Writing "good" software
Action without introspection is what gets you executed or at least driven out of town, puts you in the hospital, and worst of all leaves you with code that once worked but is now a pathetic pile of useless bits.

Complex software requires the collective effort of lots of people who, hopefully, want to spend more time talking to their computers than each other.

So how do we get these kinds of people to cooperate and ensure that they aren't breaking

# Where automated test suites fail.
Well we can't.
Not everywhere anyway.
There's one software component that requires a human brain, preferably a poorly trained one, to test it... user-interfaces.

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
Where do we find these necessary human brains?

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

### Ultra-Simple Voluntary AB-Testing Implemented in Rails
#### Create "B" CSS file and Javascript

	touch public/stylesheets/b_css.css
	touch public/javascript/b_script.js

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

#### config/routes.rb

Map the URL to your new controller

<pre class="ruby">
map.connect 'split_testing/:switch',
    :controller => 'split_testing',
    :action => 'switch'
</pre>

#### app/views/header.haml
Pull in additional CSS and Javascript in your header or wrapper template. 

<pre class="ruby">
#-------------------------------------------------------------
#  split testing
#-------------------------------------------------------------
if session[:split] == true
  = stylesheet_link_tag 'b_css'
  = javascript_include_tag 'b_script'
</pre>
	
Create the switch.

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