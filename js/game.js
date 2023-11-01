import stateUtils from "https://lvoz2.github.io/pvp-factory/js/stateTransferUtils.mjs";
import mapManipulation from "https://lvoz2.github.io/pvp-factory/js/mapManipulation.mjs";

$(function () {
	const fileList = ["js/noise.js"];
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
				console.warn("Use a JavaScript import statement instead of loading via HTML. Link is " + chunk);
				break;
		}
		$("head").append(elem);
	}
}
