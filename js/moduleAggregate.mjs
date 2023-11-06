import stateUtils from "https://lvoz2.github.io/factory-fight/js/stateTransferUtils.mjs";
import mapManipulation from "https://lvoz2.github.io/factory-fight/js/mapManipulation.mjs";
import menu from "https://lvoz2.github.io/factory-fight/js/menu.mjs";

function returnContents(obj) {
	let res = []
	for (const key in obj) {
		res.push(obj[key]);
	}
	return res;
}

const pkg = {menu, stateUtils, mapManipulation, ...returnContents(stateUtils), ...returnContents(mapManipulation), ...returnContents(menu)};
export default pkg;
