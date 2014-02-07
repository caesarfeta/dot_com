$( document ).ready( function(){
	var sh =$( '#code' ).jssh({
		"background-color": '#AAA',
		"padding": 50,
		"vars": {
			time: 1,
			train: 10
		}
	}).data('#code');
//	var dragon = new LSYS.DragonCurve( sh.canvas );
	var hexSierp = new LSYS.HexagonSierpinski( sh.canvas );
});