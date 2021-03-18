
const dom = ((doc) => {

    const createTextInput = (labelText, labelClasses, id, name, maxlength, classes) => {
        const label = doc.createElement('label');
        label.classList.add(...labelClasses);
        label.setAttribute('for', id);

        const inputText = doc.createElement('input');
        inputText.setAttribute('type', 'text');
        inputText.setAttribute('id', id);
        inputText.setAttribute('name', name);
        inputText.setAttribute('maxlength', maxlength);
        inputText.classList.add(...classes);
        inputText.required = true;

        label.append(labelText, inputText);

        return label;
    };

    const createTextarea = (labelText, labelClasses, id, name, maxlength, classes) => {
        const label = doc.createElement('label');
        label.classList.add(...labelClasses);
        label.setAttribute('for', id);

        let labelTextSpan = labelText;
        if (maxlength) {
            labelTextSpan = doc.createElement('span');
            labelTextSpan.textContent = labelText;
            const parenthesis = doc.createElement('span');
            parenthesis.classList.add('parenthesis');
            parenthesis.textContent = `(up to ${maxlength} characters)`;
            labelTextSpan.appendChild(parenthesis);
        }

        const textarea = document.createElement('textarea');
        textarea.setAttribute('id', id);
        textarea.setAttribute('name', name);
        textarea.setAttribute('maxlength', maxlength);
        textarea.classList.add(...classes);

        label.append(labelTextSpan, textarea);

        return label;    
    }
    
    const createDateInput = (labelText, labelClasses, id, name, classes) => {

        const label = doc.createElement('label');
        label.classList.add(...labelClasses);
        label.setAttribute('for', id);

        const inputDate = doc.createElement('input');
        inputDate.setAttribute('type', 'date');
        inputDate.setAttribute('id', id);
        inputDate.setAttribute('name', name);
        inputDate.classList.add(...classes);
        inputDate.required = true;

        label.append(labelText, inputDate);

        return label;
    }

    const createSelectOption = (value, textContent, classes) => {
        const option = doc.createElement('option');
        option.value = value;
        option.textContent = textContent;
        option.classList.add(...classes);
        return option;
    }

    const createRadio = (labelText, labelClasses, id, name, value, classes) => {

        const label = doc.createElement('label');
        label.classList.add(...labelClasses);
        label.setAttribute('for', id);
        const inputRadio = doc.createElement('input');
        inputRadio.setAttribute('type', 'radio');
        inputRadio.setAttribute('id', id);
        inputRadio.setAttribute('name', name);
        inputRadio.classList.add(...classes);
        inputRadio.setAttribute('value', value);
        label.append(inputRadio,labelText);

        return label;
    };

    const createRadioFieldset = (labelText, labelClasses, id, radiosName, radios, classes) => {

        const label = doc.createElement('label');
        label.classList.add(...labelClasses);
        label.setAttribute('for', id);
        const fieldset = doc.createElement('fieldset');
        fieldset.setAttribute('id', id);
        fieldset.classList.add(...classes);
        radios.map(input => {
            input.firstElementChild.setAttribute('name', radiosName);
            fieldset.appendChild(input);
        });
        label.append(labelText, fieldset);


        return label;
    }

    const createSubmit = (value, classes) => {
        const submit = doc.createElement('input');
        submit.setAttribute('type', 'submit');
        submit.setAttribute('value', value);
        submit.classList.add(...classes);
        return submit;
    }

    const createForm = (formId, classes, submitValue, submitClasses, inputs) => {
        const form = doc.createElement('form');
        form.setAttribute('id', formId);
        form.classList.add(...classes);
        inputs.map(input => {
            form.appendChild(input);
        });
        const formSubmit = dom.createSubmit(submitValue, submitClasses);
        form.appendChild(formSubmit);
        return form;
    }

    return {createTextInput, createTextarea, createDateInput, createSelectOption, createRadio, createRadioFieldset, createSubmit, createForm};
})(document);

export {
    dom
}


