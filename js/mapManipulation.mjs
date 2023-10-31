function generate(x, y) {
	perlin.seed();
	let map = [];
	for (let curY = 0; curY < y; curY++) {
		map.push([]);
		for (let curX = 0; curX < x; curX++) {
			const perlinVal = perlin.get(curX, curY) + 1;
			console.log(perlinVal);
			const texture = Math.floor(Math.random() * 5) + (perlinVal * 5);
			map[curY].push(texture);
		}
	}
	return map;
}

const pkg = {generate};
export default pkg;
