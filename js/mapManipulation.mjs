function generate(x, y) {
	let noise = new Noise(Math.random());
	let map = [];
	for (let curY = 0; curY < y; curY++) {
		map.push([]);
		for (let curX = 0; curX < x; curX++) {
			const perlinVal = noise.simplex2(curX, curY) + 1;
			const texture = Math.floor(Math.random() * 5) + Math.floor(perlinVal * 5);
			map[curY].push(texture);
		}
	}
	return map;
}

function render(ctx, map, assets) {
	const renderedCellSize = 100;
	for (const subMap of map) {
		for (let y = 0; y < subMap.length; y++) {
			for (let x = 0; x < subMap[y].length; x++) {
				const coords = [x * renderedCellSize, y * renderedCellSize];
				const cell = subMap[y][x];
				const img = assets[cell];
				ctx.drawImage(img, coords[0], coords[1], 100, 100);
			}
		}
	}
}

let map = []

const pkg = {map, generate, render};
export default pkg;
