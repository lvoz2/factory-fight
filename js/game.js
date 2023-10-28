$(function () {
	const fileList = [];
	appendChunks(fileList)
});

function appendChunks(chunkList) {
	for (chunk of chunkList) {
		let elem = "";
		const type = chunk.slice(chunk.lastIndexOf("."));
		switch (type) {
			case ".css":
				elem = "<link rel=\"stylesheet\" href=\"" + chunk "\"></link>";
			case ".js":
				elem = "<script src=\"" + chunk "\"></script>";
			case ".mjs":
				elem = "<script src=\"" + chunk "\" type=\"module\"></script";
		}
		$("head").append(elem);
	}
}
