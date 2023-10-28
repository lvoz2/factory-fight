$(function () {
	const fileList = ["modules/stateTransferUtils.mjs"];
	appendChunks(fileList)
});

function appendChunks(chunkList) {
	for (chunk of chunkList) {
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
