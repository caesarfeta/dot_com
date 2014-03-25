$( document ).ready( function() {
	$('#code').append(
		'<div class="table">\
			<div class="cell">\
				<a id="imgbit" class="min" href="../../javascript/lib/imgspect/examples/img/wheres-waldo.jpg"></a>\
				<div id="caption"></div>\
			</div>\
		</div>'
	);
	bit = $( '#imgbit' ).imgbit().data( '#imgbit' );
	$( bit.elem ).on( 'IMGBIT-FRAME', function( _e, _data ) {
		$( '#caption' ).html( _data['caption'] )
		say( _data['caption'] );
	});
	bit.sequence([
		{
			coords: [ 700, 900, 150, 150, 3 ],
			stay: 5,
			wipe: 2,
			caption: "\"I'm going to stab you!\", said the soldier."
		},
		{
			coords: [ 750, 900, 150, 150, 3 ],
			stay: 5,
			wipe: .5,
			caption: "\"Good I was tired of living anyway\", said the other soldier."
		},
		{
			coords: [ 0, 0, 1000, 600, 1 ],
			stay: 5,
			wipe: 2,
			caption: "Big shot!"
		}
	], true );
	
	function say( _words ) {
//		var msg = new SpeechSynthesisUtterance( _words );
//		window.speechSynthesis.speak( msg );
	}
});