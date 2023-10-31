export function save(name, state) {
	const stateJSON = JSON.stringify(state);
	localStorage.setItem(name, stateJSON);
}

export function load(name) {
	const state = JSON.parse(localStorage.getItem(name));
	return [name, state];
}

export function send(state) {
	// TODO: Send state to server and parse response.
}

const pkg = {save, load, send};
export default pkg;
