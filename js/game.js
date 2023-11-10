import modules from "https://lvoz2.github.io/factory-fight/js/moduleAggregate.mjs";

$(function () {
	modules.initialiseServer();
	const fileList = ["js/noise.js"];
	const assetList = ["./Graphic/Background_Tiles/Tile_Dirt_1.png", "./Graphic/Background_Tiles/Tile_Dirt_2.png", "./Graphic/Background_Tiles/Tile_Dirt_3.png", "./Graphic/Background_Tiles/Tile_Dirt_4.png", "./Graphic/Background_Tiles/Tile_Dirt_5.png", "./Graphic/Background_Tiles/Tile_Grass_1.png", "./Graphic/Background_Tiles/Tile_Grass_2.png", "./Graphic/Background_Tiles/Tile_Grass_3.png", "./Graphic/Background_Tiles/Tile_Grass_4.png", "./Graphic/Background_Tiles/Tile_Grass_5.png", "./Graphic/Background_Tiles/Tile_Sand_1.png", "./Graphic/Background_Tiles/Tile_Sand_2.png", "./Graphic/Background_Tiles/Tile_Sand_3.png", "./Graphic/Background_Tiles/Tile_Sand_4.png", "./Graphic/Background_Tiles/Tile_Sand_5.png", "./Graphic/Background_Tiles/Tile_Stone_1.png", "./Graphic/Background_Tiles/Tile_Stone_2.png", "./Graphic/Background_Tiles/Tile_Stone_3.png", "./Graphic/Background_Tiles/Tile_Stone_4.png", "./Graphic/Background_Tiles/Tile_Stone_5.png"];
	appendChunks(fileList);
	window.assets = loadAssets(assetList);
	window.canvas = $("canvas")[0];
	window.show = modules.show;
	window.modules = modules;
	window.size = [80, 40];
});

function loadAssets(assetList) {
	let assets = [];
	for (const asset of assetList) {
		assets.push(new modules.Asset(asset));
	}
	return assets;
}

$(window).on("resize", ((e) => {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight * 0.8;
}));

$(document).on("playerNameSent", ((e) => {
	window.map = [modules.generate(size[0], size[1])];
	modules.startRender(canvas.getContext("2d"), map, assets);
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight * 0.8;
	show("gamePage", "menu");
}));

function appendChunks(chunkList) {
	for (const chunk of chunkList) {
		let elem = "";
		const type = chunk.slice(chunk.lastIndexOf("."));
		switch (type) {
			case ".css":
				elem = "<link rel=\"stylesheet\" href=\"" + chunk + "\"></link>";
				break;
			case ".js":
				elem = "<script src=\"" + chunk + "\"></script>";
				break;
			case ".mjs":
				console.warn("Use a JavaScript import statement instead of loading via HTML. Link is " + chunk);
				break;
		}
		$("head").append(elem);
	}
}
