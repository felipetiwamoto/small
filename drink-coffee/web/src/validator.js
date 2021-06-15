export default function validate(value, validations) {
	const types = {
		required: function (value, validations) {
			if (validations.required && (value.trim().length <= 0 || value.trim() === ""))
				return `This is a mandatory field.`;

			return "";
		},
		length: function (value, validations) {
			if (!validations.required && value.length <= 0) return "";

			if (value.length !== validations.length) return `The field must have ${validations.length} characters.`;

			return "";
		},
		minLength: function (value, validations) {
			if (!validations.required && value.length <= 0) return "";

			if (value.length < validations.minLength)
				return `The field must have at least ${validations.minLength} characters.`;

			return "";
		},
		maxLength: function (value, validations) {
			if (!validations.required && value.length <= 0) return "";

			if (value.length > validations.maxLength)
				return `The field must have max ${validations.maxLength} characters.`;

			return "";
		},
		value: function (value, validations) {
			if (!validations.required && value.length <= 0) return "";

			if (value !== validations.value) return `The value must be [${validations.minLength}].`;

			return "";
		},
		minValue: function (value, validations) {
			if (!validations.required && value.length <= 0) return "";

			if (value < validations.minValue) return `The value must be at least ${validations.minLength}.`;

			return "";
		},
		maxValue: function (value, validations) {
			if (!validations.required && value.length <= 0) return "";

			if (value > validations.maxValue) return `The max value must be ${validations.minLength}.`;

			return "";
		},
		isNumeric: function (value, validations) {
			if (!validations.required && value.length <= 0) return "";

			value = parseFloat(value.replace(",", "."));

			if (isNaN(value)) return "The value must be a number.";

			return "";
		},
		isInteger: function (value, validations) {
			if (!validations.required && value.length <= 0) return "";

			if (isNaN(value)) return "The value must be a positive number.";

			return "";
		},
	};

	let error = "";

	Object.keys(validations).forEach((field, index) => {
		if (error.length <= 0) {
			error = types[field](value, validations);
		}
	});

	return error;
}
