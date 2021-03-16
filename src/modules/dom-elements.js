
const dom = ((doc) => {

    const createTextarea = (id, name, maxlength, classes) => {
        const textarea = document.createElement('textarea');
        textarea.setAttribute('id', id);
        textarea.setAttribute('name', name);
        textarea.setAttribute('maxlength', maxlength);
        textarea.classList.add(...classes);
        return textarea;    
    }
    
    const createTextInput = (id, name, maxlength, classes) =>
    {
        const inputText = doc.createElement('input');
        inputText.setAttribute('type', 'text');
        inputText.setAttribute('id', id);
        inputText.setAttribute('name', name);
        inputText.setAttribute('maxlength', maxlength);
        inputText.classList.add(...classes);
        inputText.setAttribute('required', true);
        return inputText;
    };

    const createSubmit = (value, classes) => {
        const submit = doc.createElement('input');
        submit.setAttribute('type', 'submit');
        submit.setAttribute('value', value);
        submit.classList.add(...classes);
        return submit;
    }

    return {createTextarea, createTextInput, createSubmit};
})(document);

export {
    dom
}