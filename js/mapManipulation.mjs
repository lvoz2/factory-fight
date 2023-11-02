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
	const renderedCellSize = (() => {
		const height = ctx.canvas.height / 16;
		const width = ctx.canvas.width / 9;
		return (height > width) ? width : height;
	});
	for (const subMap of map) {
		for (let y = 0; y < subMap.length; y++) {
			for (let x = 0; x < subMap[y].length; x++) {
				const coords = [x * renderedCellSize, y * renderedCellSize];
				const cell = subMap[y][x];
				const asset = assets[cell];
				const width = renderedCellSize * asset.width;
				const height = enderedCellSize * asset.height;
				ctx.drawImage(asset.img, coords[0], coords[1], width, height);
			}
		}
	}
}

class Asset {
	constructor(url) {
		this.img = new Image();
		this.img.src = url;
		this.height = this.img.height;
		this.width = this.img.width;
	}
}

const pkg = {generate, render, Asset};
export default pkg;
