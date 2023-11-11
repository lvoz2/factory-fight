function random(limit) {
	return Math.floor(Math.random() * limit);
}

export function generate(x, y) {
	// let noise = new Noise(Math.random());
	let map = [];
	for (let curY = 0; curY < y; curY++) {
		map.push([]);
		for (let curX = 0; curX < x; curX++) {
			// const perlinVal = Math.floor(2 * (noise.simplex2(curX, curY) + 1));
			const texture = 1 + random(20); // Math.floor(Math.random() * 5) + Math.floor(perlinVal * 5);
			map[curY].push(texture);
		}
	}
	let oreMap = Array(y).fill(Array(x).fill(0));
	let oreCount = random(20) + 240;
	while (oreCount > 0) {
		const type = random(2.5) + 1;
		const size = [random(5) + 7, random(5) + 7];
		let coords = [random(201 - size[0]), random(101 - size[1])]
		let nodeMap = Array(size[1]).fill(Array(size[0]).fill(0));
		let nodes = random(8) + 36;
		while (nodes > 0) {
			const loc = [random(size[0]), random(size[1])];
			if (nodeMap[loc[1]][loc[0]] == 0) {
				nodeMap[loc[1]][loc[0]] = type;
				oreCount--;
				nodes--;
			}
		}
		for (let i = coords[1]; i < (coords[1] + size[1]); i++) {
			if (i < oreMap.length) {
				for (let j = coords[0]; j < (coords[0] + size[0]); j++) {
					if (j < oreMap[i].length) {
						oreMap[i][j] = nodeMap[i - coords[1]][j - coords[0]];
					}
				}
			}
		}
	}
	let buildMap = Array(y).fill(Array(x).fill(0));
	buildMap[Math.floor(y / 2)][Math.floor(x / 4)] = 1;
	buildMap[Math.floor(y / 2)][Math.floor(3 * x / 4)] = 2;
	map = [map, oreMap, buildMap];
	return map;
}

let loc = {x: 0, y: 0};

let ctx, map, assets;

export function startRender(initialCtx, initialMap, initialAssets, animate = true) {
	ctx = initialCtx;
	map = initialMap;
	assets = initialAssets;
	if (animate) {requestAnimationFrame(render);}
}

export let deltas = [];
let times = [];
export let renderStats = ["", "", "", "", "", "", "", "", "", ""];

export function render(time, animate = true) {
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
	let layer = -1;
	for (let subMap of map) {
		layer++;
		subMap = (() => {
			let chunk = [];
			for (let y = loc.y; y < (loc.y + ratio.y); y++) {
				chunk.push(subMap[y].slice(loc.x, loc.x + ratio.x + 1));
			}
			return chunk;
		})();
		for (let y = 0; y < subMap.length; y++) {
			for (let x = 0; x < subMap[y].length; x++) {
				const coords = [x * renderedCellSize, y * renderedCellSize];
				const cell = subMap[y][x];
				const asset = assets[layer][cell];
				const width = renderedCellSize;
				const height = renderedCellSize;
				renderStats.unshift({coords: coords, cell: cell, asset: asset, width: width, height: height});
				renderStats.length = 10;
				ctx.drawImage(asset.img, coords[0], coords[1], width, height);
			}
		}
	}
	if (animate) {requestAnimationFrame(render);}
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
