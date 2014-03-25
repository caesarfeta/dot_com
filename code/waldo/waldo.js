$( document ).ready( function() {
	$('#code').append(
		'<div class="table">\
			<div class="cell">\
				<a id="imgbit" class="min" href="img/the-garden-of-earthly-delights.jpg"></a>\
				<div id="caption"></div>\
			</div>\
		</div>'
	);
	bit = $( '#imgbit' ).imgbit().data( '#imgbit' );
	$( bit.elem ).on( 'IMGBIT-FRAME', function( _e, _data ) {
		$( '#caption' ).html( _data['caption'] )
		//say( _data['caption'] );
	});
	bit.sequence(
		[{"coords":[23,36,2996,997,"0.30000000000000016"],"caption":"Big Shot"},{"coords":[108,92,205,231,"0.8"],"caption":"Birds in the hole."},{"coords":[915,103,384,158,"1.2000000000000002"],"caption":"Griffin tree meets flying fish knight."},{"coords":[183,1015,469,321,"0.9"],"caption":"The Jesus."},{"coords":[1640,1074,202,146,"0.9"],"caption":"fish butt"},{"coords":[1909,1071,150,151,"0.9"],"caption":"vases in your faces."}]
	, true );
	
	function say( _words ) {
		var msg = new SpeechSynthesisUtterance( _words );
		window.speechSynthesis.speak( msg );
	}
});