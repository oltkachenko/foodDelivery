export function renderFormElementError(error = 'Field is required') {
    const markup = `
        <div class="b-form-error">${error}</div>
    `.trim();

    return markup;
}