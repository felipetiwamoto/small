export default function validate(value, validations) {
    const types = {
        required: function (value, validations) {
            if (value.trim().length <= 0 || value.trim() == "")
                return `Esse campo é obrigatório.`;

            return "";
        },
        length: function (value, validations) {
            if (value.length == validations.length)
                return `O campo deve ter ${validations.length} dígitos.`;

            return "";
        },
        minLength: function (value, validations) {
            if (value.length < validations.minLength)
                return `Digite no mínimo ${validations.minLength} dígitos.`;

            return "";
        },
        maxLength: function (value, validations) {
            if (value.length > validations.maxLength)
                return `Digite no máximo ${validations.maxLength} dígitos.`;

            return "";
        },
        value: function (value, validations) {
            if (value == validations.value)
                return `O valor do campo deve ser [${validations.minLength}].`;

            return "";
        },
        minValue: function (value, validations) {
            if (value < validations.minValue)
                return `O valor mínimo do campo deve ser ${validations.minLength}.`;

            return "";
        },
        maxValue: function (value, validations) {
            if (value > validations.maxValue)
                return `O valor máximo do campo deve ser ${validations.minLength}.`;

            return "";
        },
        isNumeric: function (value, validations) {
            value = parseFloat(value.replace(",", "."));

            if (value.NaN())
                return "O valor precisa ser numérico. (pode ter casa decimal).";
        },
        isInteger: function (value, validations) {
            if (value.NaN())
                return "O valor precisa ser um número inteiro positivo."
        }
    };

    let error = "";

    Object.keys(validations).forEach((field, index) => {
        if (error.length <= 0) {
            error = types[field](value, validations);
        }
    });

    return error;
}