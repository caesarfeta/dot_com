I write a lot of documentation, so I've developed some 
strong opinions/beliefs about how to do it.
Here they are.

* Remember your code is useless to other people 
	if they can't install / use it.
	
* Accept feedback humbly.  
	If a person found your documentation confusing 
	don't assume they are too stupid to follow your directions.
	Know your audience, and to grow your audience 
	make the writing clearer, simpler, and more accessible.
	
* Use Markdown for documentation. 
	It's practically industry standard.

* Put your project documentation in your project folder.  
	People shouldn't have to search for documentation 
	or search some third-party service.

## Installation Documentation - Process
1. Log - Install manually documenting all commands.

		This is actually pretty easy.  Just type whatever you'd type into your terminal into
		a text editor first.
	
2. Simplify - Change relative to absolute paths when possible, consolidate commands.
3. Reinstall / Revise / Reorder - Install a short time later following commands literally.

		Software, code libraries, anything that runs on computer is a network of interrelated parts.
		Files point to other dependent files.
		It's tangled and non-linear.
		That is not how people read documentation.
		They read it from beginning to end.
		They expect linearity.
		Do your best to turn configuring a network of interrelated parts into a linear process.
		Readers will love you for it.
	
4. Humanize - Provide context for commands for end user.  
	Take a confident mentorish tone but..
	If you are uncertain... sound uncertain.  
	It will help the reader to locate weaknesses in the documentation,
	so they will be prepared to do some thinking instead of slavishly following your orders.
	
5. Abstract - Abstract configuration into meta configuration.
6. Automate - Turn documentation into a script that can be run with minimum human intervention.
