/**
 * Made by Felipe Takeu Iwamoto
 */

class FormSaver {
    constructor() {
        if (!Object.keys(this.get()).length) {
            localStorage.setItem("form_saver", "{}");
        }

        this.save();
        this.populate();
    }

    clear(id) {
        if (id) {
            let formSaver = this.get();
            formSaver[id] = {};
            return localStorage.setItem("form_saver", JSON.stringify(formSaver));
        }

        localStorage.setItem("form_saver", "{}");
    }

    get(id) {
        if (id) {
            let formSaver = JSON.parse(localStorage.getItem("form_saver"));
            return formSaver[id] ? formSaver[id] : {};
        }

        let formSaver = JSON.parse(localStorage.getItem("form_saver"));
        return formSaver ? formSaver : {};
    }

    set(id, data) {
        let formSaver = this.get();
        formSaver[id] = {
            ...formSaver[id],
            ...data
        };
        localStorage.setItem("form_saver", JSON.stringify(formSaver));
    }

    save() {
        let inputs = document.querySelectorAll(`
            form[id] input[type='text'],
            form[id] input[type='number'],
            form[id] input[type='date'],
            form[id] input[type='time'],
            form[id] input[type='datetime'],
            form[id] input[type='password']
        `);
        let selects = document.querySelectorAll(`form[id] select`);
        let textareas = document.querySelectorAll(`form[id] textarea`);
        let radio = document.querySelectorAll(`form[id] input[type='radio']`);
        let checkbox = document.querySelectorAll(`form[id] input[type='checkbox']`);

        inputs && this.saveTextFields(inputs);
        selects && this.saveSelectFields(selects);
        textareas && this.saveTextareaFields(textareas);
        radio && this.saveRadioFields(radio);
        checkbox && this.saveCheckboxFields(checkbox);
    }

    saveTextFields(inputs) {
        inputs.forEach((input) => {
            input.addEventListener("keyup", () => {
                this.set(input.closest("form[id]").id, {
                    [input.name]: input.value
                });
            })
        })
    }
    saveSelectFields(selects) {
        selects.forEach((select) => {
            select.addEventListener("change", () => {
                let values = [...select.options].filter((x) => x.selected).map((x) => x.value);
                this.set(select.closest("form[id]").id, {
                    [select.name]: values
                });
            })
        })
    }
    saveTextareaFields(textareas) {
        textareas.forEach((textarea) => {
            textarea.addEventListener("keyup", () => {
                this.set(textarea.closest("form[id]").id, {
                    [textarea.name]: textarea.value
                });
            })
        })
    }
    saveRadioFields(radios) {
        radios.forEach((radio) => {
            radio.addEventListener("click", () => {
                this.set(radio.closest("form[id]").id, {
                    [radio.name]: radio.value
                });
            })
        })
    }
    saveCheckboxFields(checkboxs) {
        checkboxs.forEach((checkbox) => {
            checkbox.addEventListener("click", () => {
                let values = [...document.querySelectorAll(`form[id] [name='${checkbox.name}']:checked`)]
                    .map((x) => x.value);
                this.set(checkbox.closest("form[id]").id, {
                    [checkbox.name]: values
                });
            })
        })
    }

    populate() {
        let forms = document.querySelectorAll("form[id]");

        if (forms) {
            forms.forEach((form) => {
                let formSaver = this.get()[form.id];

                if (formSaver) {

                    let inputs = document.querySelectorAll(`
                        form[id='${form.id}'] input[type='text'],
                        form[id='${form.id}'] input[type='number'],
                        form[id='${form.id}'] input[type='date'],
                        form[id='${form.id}'] input[type='time'],
                        form[id='${form.id}'] input[type='datetime'],
                        form[id='${form.id}'] input[type='password']
                    `);

                    let selects = document.querySelectorAll(`form[id='${form.id}'] select`);
                    let textareas = document.querySelectorAll(`form[id='${form.id}'] textarea`);
                    let radio = document.querySelectorAll(`form[id='${form.id}'] input[type='radio']`);
                    let checkbox = document.querySelectorAll(`form[id='${form.id}'] input[type='checkbox']`);

                    inputs && this.populateTextFields(inputs, formSaver);
                    selects && this.populateSelectFields(selects, formSaver);
                    textareas && this.populateTextareaFields(textareas, formSaver);
                    radio && this.populateRadioFields(radio, formSaver);
                    checkbox && this.populateCheckboxFields(checkbox, formSaver);
                }
            })
        }
    }

    populateTextFields(inputs, values) {
        inputs.forEach((input) => {
            input.value = values[input.name] || "";
        })
    }
    populateSelectFields(selects, values) {
        selects.forEach((select) => {
            [...select.options].forEach((option) => {
                if (values[select.name] && values[select.name].includes(option.value)) {
                    option.selected = true;
                }
            })
        })
    }
    populateTextareaFields(textareas, values) {
        textareas.forEach((textarea) => {
            textarea.value = values[textarea.name] || "";
        })
    }
    populateRadioFields(radios, values) {
        radios.forEach((radio) => {
            if (values[radio.name] && values[radio.name].includes(radio.value))
                radio.checked = true;
        })
    }
    populateCheckboxFields(checkboxs, values) {
        checkboxs.forEach((checkbox) => {
            if (values[checkbox.name] && values[checkbox.name].includes(checkbox.value))
                checkbox.checked = true;
        })
    }
}