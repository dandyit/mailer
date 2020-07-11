function func1(/* some parameters */){/* some code for func1 */}

function q1(values){
	function fun3(u,v){
		if(Math.random() > 0.5){
			var [x1,y1,z1] = func1(v);
			u = u + 2;
		}else{
			var [x1,y1,z1] = func2(v);
			u = u - 2;
		}
		return Math.abs(x1 * u) + Math.abs(y1 + u) + Math.abs(z1 - u);
	}

	function func2(vx){
		let [[p,q],[r,s]] = vx;
		return [p * s, q * r, p - r];
	}
	return values.slice(1).map((v,i) => [v, values[i]]).reduce(func3, 0);
}