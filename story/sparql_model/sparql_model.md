I've been working with triplestores and Ruby lately.
I've written some code which makes manipulating data triples with Ruby easy.
I want to share with you what I've learned, 
showing you the basics of building a Rails application with a triplestore backend.

# SparqlModel

If you've used Rails you've probably written model classes which use ActiveRecord.  SparqlModel is essentially code which replicates a lot of ActiveRecord's functionality but instead of interacting with a relational database using SQL it interacts with a triplestore using SPARQL.

# Background
If you are unfamiliar with triplestores, graph-databases, SPARQL, or RDF, you may want to read the following articles I've written.  
They explain the core concepts of triplestores, SPARQL, and graph databases in more detail than what I'll include here.

* [ Graph Database Modelling ](/story/gdb_modelling)
* [ How to play with DbPedia ](/story/dbpedia)

# Get ready
1. Install Ruby
2. Install Rails
3. Install Apache Fuseki
4. Install the 'sparql', 'rdf', and 'sparql_model' gems
	* [ Grab SparqlModel here... ]( https://github.com/caesarfeta/sparql_model)

Added the following to your Rails Gemfile

	gem 'rdf'
	gem 'sparql'
	gem 'sparql_model'
	gem 'rest_client'

Start up fuseki...

Start up rails

	bundle exec rails server -e development

# The application
Let's make the periodic table of elements!

<div class="picture">
	<img src="img/periodic_table.jpg" />
	<p class="caption">Nature's Pantry &amp; Refridgerator</p>
</div>

# Define your model
We'll begin by defining a SparqlModel Element class.
Here's a close up of an element.

<div class="picture">
	<img src="img/silicon.jpg" />
	<p class="caption">My vote for "Element of the Century!"</p>
</div>

So here's a SparqlModel class where I define what kinds of data I need to model an element.

Here's a sample sparql_model class.

	class Element < SparqlModel
	  def initialize( _key=nil )
	    @endpoint = 'http://127.0.0.1:8080/ds'
	    @attributes = {
	      :symbol => [ "this:symbol", ::String, SINGLE, REQUIRED, UNIQUE, KEY ],
	      :name => [ "this:name", ::String, SINGLE, REQUIRED, UNIQUE ],
	      :number => [ "this:number", ::Integer, SINGLE, OPTIONAL, UNIQUE ],
	      :mass => [ "this:masss", ::Float, SINGLE, OPTIONAL ]
	    }
	    super( _key )
	  end
	end

# Your attention please!
What does all this mean?

* @endpoint
	* The url to your sparql endpoint.
* @attributes
	* This is where you define your models attributes.  
	These correspond to "edges" in your graph-database, 
	or "predicates" in your RDF style triplestore.
	Toe-may-toe Toe-mah-toe, as far as SparqlModel is concerned.

Each item in @attributes is a key-value pair.  
The key has to be a symbol.  
The value has to be an array.
The items in this array are as follows.

* [0] is the RDF-triple predicate value ( :p )
* [1] is the data-type of the RDF-triple object value ( :o )
* [2] some RDF predicates should have only a SINGLE value, others should have MULTI values
* [3] --Optional-- some values are REQUIRED for a new instance to be created
* [4] --Optional-- some SINGLE values must be UNIQUE
* [5] --Optional-- marks the predicate as the KEY used by the get method.  KEY's must be UNIQUE.

You may be wondering what "this:" in "this:something" is all about.
I haven't mentioned @prefixes. I'll explain those later.

# Use your model
Using your model is simple at this point.
Save it in the models directory of your Rails app.

	/path/to/rails/app/models/element.rb

Then fire up the Rails developer console and we can start messing around.

	cd /path/to/rails
	rails console development

Get an instance of Element.

	elem = Element.new

Create a new element.

	elem.create({ :name => "Silicon" })

Whoops that threw an error.

	RuntimeError: Required values missing ( symbol )

Looks like we have to pass the symbol value when we create an element.
Must be that REQUIRED attribute option.
Let's try this instead.

	 elem.create({ :name => "Silicon", :symbol=> "SI" })

Ahhh that works.

# Use your model some more...
What was the name of this element?  I forgot.

	elem.name

That's right, "Silicon".

Let's create a new element, Carbon.

	elem.create({ :name => "Crbon", :symbol => "C" })

Whoops... mispelled that.

	elem.name = "Carbon"

Ok fixed.  Carbon's atomic number is six.  So let's add that.

	elem.number = "six"

Another error... Oh of course I defined the :number attribute to use an ::Integer!  Duh!

	elem.number = 6

Interesting how Carbon's atomic number is six and it creates so many hexagonal shaped structures!  Benzene-rings and bucky-balls and all that.

Let's work on Silicon again.  We're getting Carbon distracted.

	elem.get("SI")

I can do that because I defined :symbol as my KEY attribute.

# Use your model some more... some more...
So what info do I have on Silicon?

	elem.all

	{
		:urn=>"<urn:sparql_model:element.1>", 
		:edited=>1406129133, 
		:symbol=>"SI", 
		:name=>"Silicon", 
		:created=>1406129133, 
		:number=>"", 
		:mass=>""
	}

I have a :urn.  
That was created automatically.  
It's an internal unique identifier used by SparqlModel.
It doesn't have to be the only unique identifier though.
I'm using :symbol as a unique identifier right now.
I could use :name too or create another attribute for storing a different URN and make that that the unique identifier if I wanted to. 
All I need is to set that attribute's UNIQUE and KEY configuration options.

I have :symbol and :name which I know about...

:edited and :created are timestamps which are created automatically.
:created is set when .create() is run.
:edited is set anytime a value is changed.

I haven't added filled out :number or :mass yet.  Let's do that in one shot.

	elem.change({ :number => 14, :mass => 28.086 })

Ahhh that's better.

	elem.all

	{
		:urn=>"<urn:sparql_model:element.1>", 
		:edited=>1406130770, 
		:mass=>28.086, 
		:number=>14, 
		:symbol=>"SI", 
		:name=>"Silicon", 
		:created=>1406129133
	}

Nothing is stopping us from creating another instance of SparqlModel.
We only have two elements defined so far, so let's get Carbon, and get it right away when we instantiate.

	carbon = Element.new("C")
	carbon.mass = 12.0107

Now we can do fun stuff like.

	if carbon.mass > elem.mass
		puts 'Whoa! Who rewrote the rules of the Universe?'
	end

# Using the model wrap-up...
So that's basically the gist of using SparqlModel.
I find it easy to work with.
Hopefully you do too.

If you want to see what an element looks like in Fuseki, peep this...
[ Oh my God!  What have I done!! ]( http://127.0.0.1:8080/ds/query?query=select+%3Fs+%3Fp+%3Fo%0D%0Awhere+%7B+%3Fs+%3Fp+%3Fo+%7D&output=text&stylesheet=)

If that URL doesn't resolve correctly just change the host and port to point to your Fuseki server.  Ahhhh... Look at those triples!

# The API
Now we want to build an API so other people can create and edit elements from a place other than the Rails development console on our host.

Let's figure out the basics of what our API should do, keeping things very basic to start. The API should allow us to...

* Create a new element
* Retrieve element data in an easily usable form
* Update an existing element's data

Let's create some URLs for these.  Here they are...

* element/create
* element/data/*id
* element/update

# Set it up
Okay.  Now we have to create an element controller and tweak our routes file so we can map some code to these URLs.  You know, Rails stuff.

Save this to **app/controllers/element_controller.rb**

	class ElementController < ActionController::Base
		
		# Create a new element
		def create
			render :text => "create"
		end
		
		# Retreive element data
		def data
			render :text => "data"
		end
		
		# Update element data
		def update
			render :text => "update"
		end
		
	end

Update **config/routes.rb**

    #-------------------------------------------------------------
    #  Element
    #-------------------------------------------------------------
    match 'element/create' => 'element#create'
    match 'element/data/*symbol' => 'element#data'
    match 'element/update' => 'element#update'

Check the URLs to see if they run the controller methods like they should.

# Use a Ruby HTTP client
I like using a Ruby HTTP client to interact with my controllers rather than a browser when developing.
That way I can save and run the HTTP requests later as proper tests.
I have a class that I wrote for doing this that simplifies using Ruby's rest_client gem.

Here it is.  Save this in **app/helpers/rest_test.rb**

	require 'rest_client'
	class RestTest
	  
	  # Basic Use
	  #   load 'rest_test.rb'
	  #   rest = RestTest.new( 'http://localhost:3000' )
	  #   report = rest.post( 'collection/add/keyword', { :collection_id => 1, :keyword => 'blue' } )
	  
	  #-------------------------------------------------------------
	  #  Getters & Setters
	  #-------------------------------------------------------------
	  attr_accessor :base
	  
	  # _base { String } Base URL
	  def initialize( _base='' )
	    @base = _base
	  end
	  
	  # _url { String } URL
	  # _params { Hash } Parameter
	  def post( _url, _params )
	    url = File.join( @base, _url )
	    response = RestClient.post( url, _params )
	    report( response )
	  end
	  
	  # _url { String } URL
	  # _params { Hash } Parameter
	  def get( _url )
	    url = File.join( @base, _url )
	    response = RestClient.get( url )
	    report( response )
	  end
	  
	  # _response { RestClient } RestClient response object
	  def report( _response )
	    if _response.code > 399
	      raise "Error: #{ _response.code }: #{ status( _response.code ) } #{ _response.to_str }"
	    end
	    return {
	      :code => _response.code,
	      :status => status( _response.code ),
	      :content => _response.to_str
	    }
	  end
	  
	  # _code { Integer } HTTP Response Code
	  def status( _code )
	    status = {
	      100 => 'Continue',
	      101 => 'Switching Protocols',
	      102 => 'Processing', #WebDAV
      
	      200 => 'OK',
	      201 => 'Created',
	      202 => 'Accepted',
	      203 => 'Non-Authoritative Information', # http/1.1
	      204 => 'No Content',
	      205 => 'Reset Content',
	      206 => 'Partial Content',
	      207 => 'Multi-Status', #WebDAV
      
	      300 => 'Multiple Choices',
	      301 => 'Moved Permanently',
	      302 => 'Found',
	      303 => 'See Other', # http/1.1
	      304 => 'Not Modified',
	      305 => 'Use Proxy', # http/1.1
	      306 => 'Switch Proxy', # no longer used
	      307 => 'Temporary Redirect', # http/1.1
      
	      400 => 'Bad Request',
	      401 => 'Unauthorized',
	      402 => 'Payment Required',
	      403 => 'Forbidden',
	      404 => 'Resource Not Found',
	      405 => 'Method Not Allowed',
	      406 => 'Not Acceptable',
	      407 => 'Proxy Authentication Required',
	      408 => 'Request Timeout',
	      409 => 'Conflict',
	      410 => 'Gone',
	      411 => 'Length Required',
	      412 => 'Precondition Failed',
	      413 => 'Request Entity Too Large',
	      414 => 'Request-URI Too Long',
	      415 => 'Unsupported Media Type',
	      416 => 'Requested Range Not Satisfiable',
	      417 => 'Expectation Failed',
	      418 => 'I\'m A Teapot',
	      421 => 'Too Many Connections From This IP',
	      422 => 'Unprocessable Entity', #WebDAV
	      423 => 'Locked', #WebDAV
	      424 => 'Failed Dependency', #WebDAV
	      425 => 'Unordered Collection', #WebDAV
	      426 => 'Upgrade Required', 
	      449 => 'Retry With', #Microsoft
	      450 => 'Blocked By Windows Parental Controls', #Microsoft
      
	      500 => 'Internal Server Error',
	      501 => 'Not Implemented',
	      502 => 'Bad Gateway',
	      503 => 'Service Unavailable',
	      504 => 'Gateway Timeout',
	      505 => 'HTTP Version Not Supported',
	      506 => 'Variant Also Negotiates',
	      507 => 'Insufficient Storage', #WebDAV
	      509 => 'Bandwidth Limit Exceeded', #Apache
	      510 => 'Not Extended'
	    }
	    status[ _code ]
	  end
	  
	end

# How to use RestTest
Start the development console.

	cd /path/to/rails
	rails console development

Here's how you use RestTest.

	http = RestTest.new( 'http://localhost:3000' )

Here's how you make a POST request.

	http.post( 'element/create', { :symbol => "B", :name => "Boron" })

Here's how you make a GET request.

	http.get( 'element/data/b' )

Armed with this knowledge we can start building our API.

# Flesh out the API
Save the following to **app/helpers/controller_helper.rb**

	module ControllerHelper
	  
	  # Remove unnecessary stuff from controller method parameters
	  def self.cleanParams( _params )
	    ignore = [ 'id', 'controller', 'action' ]
	    clean = {}
	    _params.each do |key,val|
	      if ignore.include?( key ) == false
	        clean[ key.to_sym ] = val
	      end
	    end
	    clean
	  end
	  
	end

This will let you pass POST parameters directly to SparqlModel instances.

Now we'll flesh out the create method.

	# Create a new element
	def create
	  elem = Element.new
	  elem.create( ControllerHelper.cleanParams( params ) )
	  render :json => elem.all.to_json
	end

Let's test this code out.
Go back to the development console, and run.

	http.post( 'element/create', { :symbol => "B", :name => "Boron" })

Here's the data method.

	# Retreive element data
	def data
	  elem = Element.new( params[:symbol] )
	  render :json => elem.all.to_json
	end

Does it work?

	http.get( 'element/data/B' )

Now finally here's the update method.

	# Update element data
	def update
	  vals = ControllerHelper.cleanParams( params )
	  elem = Element.new( vals[:symbol] )
	  elem.change( vals.except(:symbol) )
	  render :json => elem.all.to_json
	end

Does it work?

	http.post( 'element/update', { :symbol => "B", :number => 5 } )

# Few things about this API
So with very little work we know have a web API, and the ability to test it.
Not bad right?
We'll want to secure this API before we open it up to the world, but that's a lesson for another day.

#  Javascript version of RestTest
( TODO )
You have to decide when to query the SPARQL database from the client and when to use Rails as an intermediary.

The beauty of SPARQL is that interaction with the triplestore is done over HTTP.  
Updates should be restricted. 
Queries should be accessible.
