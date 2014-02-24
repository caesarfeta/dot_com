$( document ).ready( function(){
	var sh =$( '#code' ).jssh({
		"background-color": '#AAA',
		"padding": 100,
		"vars": {
			time: 1,
			train: 10
		}
	}).data('#code');
	var dragon = new LSYS.DragonCurve( sh.canvas );
});