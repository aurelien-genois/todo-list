const domForm = ((doc) => {
  const createTextInput = (
    labelText,
    labelClasses,
    id,
    name,
    maxlength,
    classes,
  ) => {
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
    if (maxlength) {
      inputText.placeholder = `(up to ${maxlength} characters)`;
    }
    label.append(labelText, inputText);
    return label;
  };

  const createTextarea = (
    labelText,
    labelClasses,
    id,
    name,
    maxlength,
    classes,
  ) => {
    const label = doc.createElement('label');
    label.classList.add(...labelClasses);
    label.setAttribute('for', id);
    let labelTextSpan = labelText;
    const textarea = document.createElement('textarea');
    textarea.setAttribute('id', id);
    textarea.setAttribute('name', name);
    textarea.setAttribute('maxlength', maxlength);
    textarea.classList.add(...classes);
    if (maxlength) {
      textarea.placeholder = `(up to ${maxlength} characters)`;
    }
    label.append(labelTextSpan, textarea);
    return label;
  };

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
  };

  const createSelectOption = (value, textContent, classes) => {
    const option = doc.createElement('option');
    option.value = value;
    option.textContent = textContent;
    option.classList.add(...classes);
    return option;
  };

  const createSelect = (
    labelText,
    labelClasses,
    id,
    name,
    options,
    classes,
  ) => {
    const label = doc.createElement('label');
    label.classList.add(...labelClasses);
    label.setAttribute('for', id);
    const select = doc.createElement('select');
    select.setAttribute('id', id);
    select.setAttribute('name', name);
    select.classList.add(...classes);
    select.append(...options);
    label.append(labelText, select);
    return label;
  };

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
    label.append(inputRadio, labelText);

    return label;
  };

  const createRadioFieldset = (
    labelText,
    labelClasses,
    id,
    radiosName,
    radios,
    classes,
  ) => {
    const label = doc.createElement('label');
    label.classList.add(...labelClasses);
    label.setAttribute('for', id);
    const fieldset = doc.createElement('fieldset');
    fieldset.setAttribute('id', id);
    fieldset.classList.add(...classes);
    radios.map((input) => {
      input.firstElementChild.setAttribute('name', radiosName);
      fieldset.appendChild(input);
    });
    label.append(labelText, fieldset);

    return label;
  };

  const createSubmit = (value, classes) => {
    const submit = doc.createElement('button');
    submit.setAttribute('type', 'submit');
    submit.textContent = value;
    submit.classList.add(...classes);
    return submit;
  };

  const createForm = (formId, classes, submitValue, submitClasses, inputs) => {
    const form = doc.createElement('form');
    form.setAttribute('id', formId);
    form.classList.add(...classes);
    if (Array.isArray(inputs)) {
      inputs.map((input) => {
        form.appendChild(input);
      });
    } else {
      form.appendChild(inputs);
    }
    const formSubmit = createSubmit(submitValue, submitClasses);
    form.appendChild(formSubmit);
    return form;
  };

  return {
    createTextInput,
    createTextarea,
    createDateInput,
    createSelectOption,
    createSelect,
    createRadio,
    createRadioFieldset,
    createSubmit,
    createForm,
  };
})(document);

const domElements = ((doc) => {
  const createH = (id, classes, textContent, level) => {
    const titleH = doc.createElement('h' + level);
    titleH.textContent = textContent;
    titleH.id = id;
    titleH.classList.add(...classes);
    return titleH;
  };

  const createButton = (id, classes, textContent) => {
    const button = doc.createElement('button');
    button.textContent = textContent;
    button.setAttribute('id', id);
    button.classList.add(...classes);
    return button;
  };

  const createDiv = (id, classes, children) => {
    const div = doc.createElement('div');
    div.id = id;
    div.classList.add(...classes);
    children.map((child) => {
      div.append(child);
    });
    return div;
  };
  const createSection = (id, classes, children) => {
    const section = doc.createElement('section');
    section.id = id;
    section.classList.add(...classes);
    children.map((child) => {
      section.append(child);
    });
    return section;
  };

  const body = doc.querySelector('#body');

  return { createH, createButton, createDiv, createSection, body };
})(document);

export { domForm, domElements };
