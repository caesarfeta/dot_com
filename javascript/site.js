function getNav() {
	$.ajax({
		type: 'get',
		url: '../../json/nav.json',
		dataType: 'json',
		timeout: 3000,
		success: function( _data ) {
			buildNav( _data );
		},
		error: function( _error ) {
			console.log( _error );
		}
	});
}

function buildNav( _navData ) {
	var order = _navData[ "order" ];
	delete _navData[ "order" ];
	
	//------------------------------------------------------------
	//	Get the lookup into NAV data
	//------------------------------------------------------------
	var url = window.location.href;
	var segs = url.split("/");
	var lkup = null;
	var i = segs.length;
	while ( i >= 0 ) {
		if ( segs[i] == "story" || segs[i] == "cartoon" || segs[i] == "code" ) {
			lkup = segs[i] + "/" + segs[i+1];
			break;
		}
		i--;
	}
	
	//------------------------------------------------------------
	//	Get the current page's neighbors
	//------------------------------------------------------------
	var nextUrl = null;
	var prevUrl = null;
	if ( lkup != null ) {
		var i = order.length;
		while ( i >= 0 ) {
			if ( order[i] == lkup ) {
				nextUrl = ( i+1 < order.length ) ? order[i+1] : null;
				prevUrl = ( i-1 >= 0 ) ? order[i-1] : null;
				break;
			}
			i--;
		}
	}
	
	drawLink( nextUrl, _navData );
	drawLink( prevUrl, _navData, false );
}

function drawLink( _url, _navData, _pop ) {
	//------------------------------------------------------------
	//	If url is null there's nothing to do!
	//------------------------------------------------------------
	if ( _url == null ) {
		return;
	}
	
	//------------------------------------------------------------
	//	Get the link name
	//------------------------------------------------------------
	var title = _navData[ _url ][ 'title' ];
	
	//------------------------------------------------------------
	//	Add links to the correct end
	//------------------------------------------------------------
	var link = '<a class="link" href="../../' + _url + '">';
	if ( _pop === false ) {
		link += '&lt;&lt; ' + title +'</a>'
		$( '#extra-info #panel #home' ).before( link );
	}
	else {
		link += title +' &gt;&gt;</a>'
		$( '#extra-info #panel #home' ).after( link );
	}
}

function homeKeyWordClick() {
	$( '#genre a' ).click( function( _e ) {
		var clickWord = $( this ).text();
		homeKeyWordFilter( clickWord );
	});
}

function homeKeyWordFilter( _keyword ) {
	var n = 0;
	var clear = false;
	homeHideKeyWordClear();
	if ( _keyword == '' ) {
		$( '#list > .row' ).show();
	}
	$( '#list > .row' ).each( function() {
		//------------------------------------------------------------
		//	Check each stories keyword
		//------------------------------------------------------------
		var story = this;
		var show = false;
		$( '#genre a', story ).each( function(){
			if ( $( this ).text() == _keyword ) {
				show = true;
			}
		});
		//------------------------------------------------------------
		//	Hide or show as neccessary
		//------------------------------------------------------------
		if ( show == true ) {
			$( story ).show();
		}
		else {
			n++;
			$( story ).hide();
			clear = true;
		}
	});
	if ( clear == true ) {
		homeDrawKeyWordClear( n );
	}
}

function homeLoadHashFilter() {
	var keyword = window.location.hash;
	if ( keyword != '' ) {
		keyword = keyword.replace( '#', '' );
		homeKeyWordFilter( keyword );
	}
}

function homeDrawKeyWordClear( _n ) {
	var clear = $( 'a#keywordClear' );
	var count = ( _n > 1 ) ? _n + ' Stories Hidden' : _n + ' Story Hidden';
	var text = '[ ' + count + ' -- Show All ]';
	
	//------------------------------------------------------------
	//	If the clear button isn't set then build it
	//------------------------------------------------------------
	if ( clear.length == 0 ) {
		var html = '<a id="keywordClear" href=".">' + text + '</a>';
		$( "#extra-info #panel" ).append( html );
	}
	$( 'a#keywordClear' ).show();
	$( 'a#keywordClear' ).text( text );
}

function homeHideKeyWordClear() {
	$( 'a#keywordClear' ).hide();
}

function startInfImg() {
	$( 'a.inf_img' ).inf_img({ fade_time: 1 });
}

$( document ).ready( function() {
	//------------------------------------------------------------
	//	Get the page ID
	//------------------------------------------------------------
	var id = $( '.main' ).attr('id');
	
	//------------------------------------------------------------
	//	Run page specific javascript
	//------------------------------------------------------------
	switch ( id ) {
		case 'story':
			$('pre.javascript').snippet("javascript", {style:"darkblue", menu: false, showNum: false })
			break;
		case 'img':
		case 'code':
			getNav();
			break;
		case 'home':
			homeLoadHashFilter();
			homeKeyWordClick();
			startInfImg();
			break;
	}
});