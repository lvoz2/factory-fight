$(function () {
	const fileList = ["js/noise.js", "js/stateTransferUtils.mjs", "js/mapManipulation.mjs"];
	appendChunks(fileList)
});

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
				elem = "<script src=\"" + chunk + "\" type=\"module\"></script>";
				break;
		}
		$("head").append(elem);
	}
}

window.gameModules = {};

gameModules.noise = new Noise(Math.random())
import stateUtils from "https://lvoz2.github.io/pvp-factory/js/stateTransferUtils.mjs";
gameModules.stateUtils = stateUtils;
import mapManipulation from "https://lvoz2.github.io/pvp-factory/js/mapManipulation.mjs";
gameModules.mapManipulation = mapManipulation;
