$(function () {
	const fileList = ["js/stateTransferUtils.mjs", "http://joeiddon.github.io/perlin/perlin.js", "js/MapManipulation.mjs"];
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

import stateUtils from "https://lvoz2.github.io/pvp-factory/modules/stateTransferUtils.mjs"
stateUtils.save("test", {test: 0})
