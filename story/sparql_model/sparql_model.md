I've been working with triplestores and Ruby lately.
I've written some code which makes manipulating data triples with Ruby a little easier.  This guide will show you how to build a triplestore backend Ruby on Rails app.

# SparqlModel

If you've used Rails you've probably written model classes which use ActiveRecord.  SparqlModel is essentially code which replicates a lot of ActiveRecords functionality but instead of interacting with a relational database using SQL it interacts with a triplestore using SPARQL.

# Background
If you are unfamiliar with triplestores, graph-databases, SPARQL, RDF, you may want to read the following articles.

[ Graph Database Modelling ]( http://127.0.0.1/dot_com/story/gdb_modelling )

[ DBpedia ]( http://127.0.0.1/dot_com/story/dbpedia )

# Get ready
1. Install Ruby
2. Install Rails
3. Install Apache Fuseki
4. Install the sparql_model gem.
 
[ Grab SparqlModel here... ]( https://github.com/caesarfeta/sparql_model )

# Define your model

Here's a sample sparql_model class.

	class Image < SparqlModel
	  def initialize( _key=nil )
	    @endpoint = 'http://127.0.0.1:8080/ds'
	    @prefixes = {
	      :exif => "<http://www.kanzaki.com/ns/exif#>",
	    }
	    @attributes = {
	      #-------------------------------------------------------------
	      #  Image paths
	      #-------------------------------------------------------------
	      :path => [ "this:path", ::String, SINGLE, REQUIRED, UNIQUE, KEY ],
	      :original => [ "this:original", ::String, SINGLE, REQUIRED ],
	      :thumb => [ "this:thumb", ::String, SINGLE, REQUIRED, UNIQUE ],
	      :basic => [ "this:basic", ::String, SINGLE, REQUIRED, UNIQUE ],
	      :advanced => [ "this:advanced", ::String, SINGLE, REQUIRED, UNIQUE ],
	      #-------------------------------------------------------------
	      #  Name
	      #-------------------------------------------------------------
	      :name => [ "this:name", ::String, SINGLE ],
	      #-------------------------------------------------------------
	      #  Keywords
	      #-------------------------------------------------------------
	      :keywords => [ "this:keywords", ::String, MULTI ],
	      #-------------------------------------------------------------
	      #  Exif Metadata
	      #-------------------------------------------------------------
	      :brightness_value => [ "exif:brightnessValue", ::String, SINGLE ],
	      :color_space => [ "exif:colorSpace", ::String, SINGLE ],
	      :compressed_bits_per_pixel => [ "exif:compressedBitsPerPixel", ::String, SINGLE ],
	      :contrast => [ "exif:contrast", ::String, SINGLE ],
	      :custom_rendered => [ "exif:customRendered", ::String, SINGLE ],
	      :date_time => [ "exif:dateTime", ::Fixnum, SINGLE ],
	      :exposure_bias_value => [ "exif:exposureBiasValue", ::String, SINGLE ],
	      :exposure_mode => [ "exif:exposureMode", ::String, SINGLE ],
	      :exposure_program => [ "exif:exposureProgram", ::Fixnum, SINGLE ],
	      :exposure_time => [ "exif:exposureTime", ::Rational, SINGLE ],
	      :flash => [ "exif:flash", ::String, SINGLE ],
	      :focal_length => [ "exif:focalLength", ::String, SINGLE ],
	      :focal_length_in_35mm_film => [ "exif:focalLengthIn35mmFilm", ::String, SINGLE ],
	      :f_number => [ "exif:fNumber", ::Rational, SINGLE ],
	      :height => [ "this:height", ::Fixnum, SINGLE ],
	      :image_description => [ "exif:imageDescription",  ::String, SINGLE ],
	      :image_unique_id => [ "exif:imageUniqueId", ::String, SINGLE ],
	      :iso_speed_ratings => [ "exif:isoSpeedRatings", ::Fixnum, SINGLE ],
	      :light_source => [ "exif:lightSource", ::String, SINGLE ],
	      :make => [ "exif:make",  ::String, SINGLE ],
	      :max_aperture_value => [ "exif:maxApertureValue", ::String, SINGLE ],
	      :metering_mode => [ "exif:meteringMode", ::String, SINGLE ],
	      :model => [ "exif:model", ::String, SINGLE ],
	      :orientation => [ "exif:orientation", ::String, SINGLE ],
	      :pixel_x_dimension => [ "exif:pixelXDimension", ::String, SINGLE ],
	      :pixel_y_dimension => [ "exif:pixelYDimension", ::String, SINGLE ],
	      :resolution_unit => [ "exif:resolutionUnit", ::Fixnum, SINGLE ],
	      :saturation => [ "exif:saturation", ::String, SINGLE ],
	      :scene_capture_type => [ "exif:sceneCaptureType", ::String, SINGLE ],
	      :sharpness => [ "exif:sharpness", ::String, SINGLE ],
	      :software => [ "exif:software", ::String, SINGLE ],
	      :user_comment => [ "exif:userComment", ::String, SINGLE ],
	      :white_balance => [ "exif:whiteBalance", ::String, SINGLE ],
	      :width => [ "this:width", ::Fixnum, SINGLE ],
	      :x_resolution => [ "exif:xResolution", ::Rational, SINGLE ],
	      :ycb_cr_positioning => [ "exif:ycbCrPositioning", ::String, SINGLE ],
	      :y_resolution => [ "exif:yResolution", ::Rational, SINGLE ],
	    }
	    super( _key )
	  end
	end

Here's some points I'd like to make.

	@endpoint

	@prefixes

	@attributes

# Use your model
Using your model is simple at this point.

# Controller methods
So your controller methods are the front-line of your web application.  So let's set one up.

# Ruby HTTP client
I like using a Ruby HTTP client when testing my controller methods rather than a browser.  The reason for that is you can create tests with commands.  The reason is testing with code will give you a record of your testing.  You can keep that around for regression testing.

#  Javascript API
The beauty of SPARQL is that interaction with the triplestore is done over HTTP.  Updates should be restricted.  Queries should be accessible.
