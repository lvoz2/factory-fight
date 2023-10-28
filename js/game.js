$(function () {
	const fileList = [];
	for (file of fileList) {
		let elem = "";
		const type = file.slice(file.lastIndexOf("."));
		switch (type) {
			case ".css":
				elem = "<link rel=\"stylesheet\" href=\"" + file "\"></link>";
			case ".js":
				elem = "<script src=\"" + file "\"></script>";
			case ".mjs":
				elem = "<script src=\"" + file "\" type=\"module\"></script";
		$("head").append(elem);
	}
});
