import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import validate from "./../../validator";

export default function ClientEdit(props) {
    useEffect(() => {
        const client = props.clients.find((c) => (c.id === props.editingId));
        const state = { ...fields };
        state.name.value = client.name;
        setFields(state);
    }, [props.editingId])

    const [feedback, setFeedback] = useState("");

    const [fields, setFields] = useState({
        name: {
            value: "",
            feedback: "",
            isValid: false,
            validations: { required: true },
        }
    });

    const handleChange = (e, key) => {
        let state = { ...fields };
        state[key].value = e.target.value;
        setFields(state);

        handleBlur(e, key);
    }

    const handleBlur = async (e, key) => {
        let message = ``;
        message = validate(e.target.value, fields[key].validations);

        let state = { ...fields };
        state[key].isValid = (message.length <= 0);
        state[key].feedbacl = message;
        setFields(state);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const hasError = Object.keys(fields).find((field) => (!fields[field].isValid));
        if (hasError) { return; }

        let form = new FormData();
        form.append("name", fields.name.value);

        let res = await fetch(`http://localhost:8080/api/client/${props.editingId}`, { method: "post", body: form })
            .then((res) => (res.json())).then((res) => (res));

        if (res.status !== "success") {
            return setFeedback(res.message);
        }

        props.getClients();

        return props.setRoute("list");
    }

    return (
        <div className="client_edit">
            <form onSubmit={handleSubmit}>
                {feedback}
                <div className="text_field">
                    <label htmlFor="name">Name <span style={{ display: "block" }}>{fields.name.feedback}</span></label>
                    <input type="text" id="name" className="field" value={fields.name.value} onBlur={(e) => handleBlur(e, "name")} onChange={(e) => handleChange(e, "name")} />
                </div>
                <button>Editar</button>
            </form>
        </div>
    );
}