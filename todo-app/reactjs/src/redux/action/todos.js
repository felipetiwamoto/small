export default function todosAction() {
	return {
		set: (payload) => ({ type: "SET_TODO", payload }),
	};
}
