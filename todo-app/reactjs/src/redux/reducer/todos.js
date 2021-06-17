const initialState = [];

function setTodo(state, payload) {
	return payload;
}

export default function todos(state = initialState, action) {
	switch (action.type) {
		case "SET_TODO":
			return setTodo(state, action.payload);
		default:
			return state;
	}
}
