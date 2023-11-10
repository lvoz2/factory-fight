export function generate(x, y) {
	let noise = new Noise(Math.random());
	let map = [];
	for (let curY = 0; curY < y; curY++) {
		map.push([]);
		for (let curX = 0; curX < x; curX++) {
			const perlinVal = Math.floor(2 * (noise.simplex2(curX, curY) + 1));
			const texture = Math.floor(Math.random() * 5) + Math.floor(perlinVal * 5);
			map[curY].push(texture);
		}
	}
	return map;
}

let loc = {x: 0, y: 0};

let ctx, map, assets;

export function startRender(initialCtx, initialMap, initialAssets) {
	ctx = initialCtx;
	map = initialMap;
	assets = initialAssets;
	requestAnimationFrame(render);
}

export let deltas = [];
let times = [];
export let renderStats = ["", "", "", "", "", "", "", "", "", ""];

export function render(time) {
	times.unshift(time);
	if (deltas.length == 0) {
		deltas.unshift(0)
	} else {
		deltas.unshift(time - times[1])
	}
	if (deltas.length > 10) {
		deltas.length = 10;
	}
	if (times.length > 10) {
		times.length = 10;
	}
	const renderedCellSize = (() => {
		const height = ctx.canvas.clientHeight / ratio.y;
		const width = ctx.canvas.clientWidth / ratio.x;
		return (height > width) ? width : height;
	})();
	for (let subMap of map) {
		subMap = (() => {
			let chunk = [];
			for (let y = loc.y; y <= (loc.y + ratio.y); y++) {
				chunk.append(subMap[y].slice(loc.x, loc.x + ratio.x + 1));
			}
			return chunk;
		})();
		for (let y = 0; y < subMap.length; y++) {
			for (let x = 0; x < subMap[y].length; x++) {
				const coords = [x * renderedCellSize, y * renderedCellSize];
				const cell = subMap[y][x];
				const asset = assets[cell];
				const width = renderedCellSize;
				const height = renderedCellSize;
				renderStats.unshift({coords: coords, cell: cell, asset: asset, width: width, height: height});
				renderStats.length = 10;
				ctx.drawImage(asset.img, coords[0], coords[1], width, height);
			}
		}
	}
	requestAnimationFrame(render);
}

export class Asset {
	constructor(url) {
		this.img = new Image();
		this.img.onload = ((e) => {
			this.height = e.target.height;
			this.width = e.target.width;
		});
		this.img.src = url;
	}
}

let ratio = {x: 32, y: 18};

const pkg = {loc, ratio, generate, startRender, Asset, deltas, render, renderStats};
export default pkg;
