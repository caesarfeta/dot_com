I've always been fascinated by the shape of plants.
Growing up in Massachusetts meant I basically grew-up in a big forest.
A good chunk of my childhood summers was spent walking wooded trails on the outskirts of my hometown and in the neighboring suburbs.
Actually a good chunk of my adulthood is spent walking among trees and marvelling at their structures.

So I've seen a lot of plants is what I'm saying.
Also, my mother was very religious and I was told that a powerful being which resembled a wise old man designed everything I could see.
I gave up believing God exists at age 16, but I never lost the desire to have god-like powers of creation.
That's why I got into programming.
I figured if I couldn't be God of reality I'd settle for being a god on a microchip.
Let's build some imaginary plants with some clever programming.
Let's get godly...  

## L-Systems

So the first thing I want to explore with you are L-Systems.

The L in L-Systems is short for Lindenmayer.
Aristid Lindenmayer was a Hungarian theoretical biologist and botanist.
Now that we have that out of the way we have to answer this question...

### What are they?

They're a way of succinctly describing self-similar shapes.
Self-similar shapes are also known as fractals.

Self-similarity is when a shape is composed of smaller versions of itself.
If you've ever played Nintendo's "Legend of Zelda" you probably remember the Triforce.
The Triforce is an equilateral triangle composed of equilateral triangles.
It's a fractal.

It turns out that self-similar patterns can be found all over Nature, the plant kingdom included.
If you were to make a small shoebox diorama of a forest you could snip off twigs from trees and they would look pretty convincing as miniature trees.

This property isn't as common with man made objects.
If you break off a bunch of car door handles and put them in a shoebox you'll probably get an F for your parking lot diorama.

So it turns out self-similarity is so common in Nature because the easiest way to build something large and seemingly complex is to just repeat what you already know maybe changing something slightly along the way.

### Okay what are they really...

So, I repeat, L-Systems are a way of succinctly describing self-similar shapes.
Here's how the really work.  You need three things.

1. An initial state.
2. Change rules.
3. The number of times the change rules are applied.


These symbols define shapes which are drawn a specified number of times in a way that model growth patterns and therefore shapes and textures found in nature.

The traditional L-System algorithm requires three parameters.


So let's look at an example first and then I'll explain what's happening.

#### Algae
	alphabet: AB
	initial state: A
	change rules: A>AB, B>A
	number of times(n): 4
	
	n=0: A
	n=1: AB
	n=2: ABA
	n=3: ABAAB
	

	Explain what's happening...

### How do we build this in code?
1. Retrieving Input (easy)
2. L-System Algorithm (easy)
3. L-System Renderer (difficult,subjective)

An L-System Renderer is probably the most difficult piece.




### Notes
Plants are marvelous structures.
I'm not a religious man but I do believe that if anything should be deemed sacred and worthy of our worship it's the plant kingdom.
Let me share with you my perspective.
Plants convert radiant light into stored chemical energy to fuel their life support systems.
Removing plants from a light source will kill them.
	-- Kill them is a loaded word.
	
From a miniscule seed the largest living organisms on planet Earth, and as far as we know... the universe, are grown.

[FROM WIKIPEDIA] 
	"A superorganism is an organism consisting of many organisms. 
	This is usually meant to be a social unit of eusocial animals, 
		where division of labour is highly specialised and where individuals are not able to survive by themselves for extended periods of time.\"
	
Organ
Organelle
Organism
Greek -- organon -- tool, instrument, sense organ

eusocial - adjective - Zoology
	(of an animal species, esp. an insect) showing an advanced level of social organization, in which a single female or caste produces the offspring and nonreproductive individuals cooperate in caring for the young.

It can be argued that most organisms are superorganisms.
Many animals can only digest cellulose with the help of genetically distinct bacteria in their guts.
Cellulose is the primary energy source for these animals.
Gut bacteria have most certainly influeced the evolution of their home.

It can be argued that most human institutions are superorganisms.
We call our factories "plants" for good reason.
Industrial "plants" can be thought of as superorganisms.

Each plant species has a distinct structure and lifecycle that has evolved alongside all other species in its environment.
The drive to acquire the materials and energy necessary for individual growth and collective reproduction is what creates their forms.
	How tall they will grow
	The shape of their leaves
	The anchoring strenght of their roots

Vines cannot exist without trees or other well anchored plants.
	
Every structure in Nature has a purpose... a reason for being.
Nothing has to exist, but things that do exist, exist in a very particular way.

It is in our best interest as a species and as individuals to understand these structures.
	Their reason for being.
	Their applications in manufacturing our own living environments.
	
Their inherent mathematical and aesthetic beauty has been an inspiration for the greatest works of art and the most practical tools of day-to-day living.