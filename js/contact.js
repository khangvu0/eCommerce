// Validation function
function validate(event){
    // Prevent form submission to handle validation first
    event.preventDefault(); 

    // Clears up previous error messages
    // For each div in the loop, set text content to null
    document.querySelectorAll('.contact-error').forEach(div => div.textContent = '');

    // Form value variables
    const firstName = document.getElementById('first-name');
    const lastName = document.getElementById('last-name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    const country = document.getElementById('country');

    // Regular expression variables
    const nameRegex = /^[a-zA-Z]{2,12}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Validation result variables
    let valid = true;

    // Validate fields
    if (!nameRegex.test(firstName.value)) {
        valid = false;
        showError('firstName', 'First name must be between 2 and 12 letters.');
        firstName.classList.remove('input-valid');
        firstName.classList.add('input-invalid');
    } else {
        firstName.classList.remove('input-invalid');
        firstName.classList.add('input-valid');
    }

    if (!nameRegex.test(lastName.value)) {
        valid = false;
        showError('lastName', 'Last name must be between 2 and 12 letters.');
        lastName.classList.remove('input-valid');
        lastName.classList.add('input-invalid');
    } else {
        lastName.classList.remove('input-invalid');
        lastName.classList.add('input-valid');
    }

    if (!emailRegex.test(email.value)) {
        valid = false;
        showError('email', 'Please enter a valid email address.');
        email.classList.remove('input-valid');
        email.classList.add('input-invalid');
    } else {
        email.classList.remove('input-invalid');
        email.classList.add('input-valid');
    }

    if (!nameRegex.test(message.value)) {
        valid = false;
        showError('message', 'Please enter a valid message (More than 2 letters).');
        message.classList.remove('input-valid');
        message.classList.add('input-invalid');
    } else {
        message.classList.remove('input-invalid');
        message.classList.add('input-valid');
    }

    if (!country.value) {
        valid = false;
        showError('country', 'Please enter a valid country.');
        country.classList.remove('input-valid');
        country.classList.add('input-invalid');
    } else {
        country.classList.remove('input-invalid');
        country.classList.add('input-valid');
    }


    if (valid) { 
        alert('Form submitted successfully'); 
        document.getElementById('form').reset();    // Resets form

        // Remove green/valid css styling
        firstName.classList.remove('input-valid');
        lastName.classList.remove('input-valid');
        email.classList.remove('input-valid');
        country.classList.remove('input-valid');
    }
}

// Error function - passes in id from validate function and spits out corresponding message
function showError(id, message) {
    const errorDiv = document.getElementById(`error-${id}`);
    if (errorDiv) {
        errorDiv.textContent = message;
    }
}

// Footer Form Validation
function validate(event){
    event.preventDefault(); 
    document.querySelectorAll('.footer--error').forEach(div => div.textContent = '');

    const form = document.getElementById('footer-form');
    const phone = document.getElementById('phone');
    const phoneRegex = /^(?:\(\d{3}\)[\s\-\.]?|\d{3}[\s\-\.]?)\d{3}[\s\-\.]?\d{4}$/;

    let valid = true;

    if (!phoneRegex.test(phone.value)) {
        valid = false;
        showError('phone', 'Please enter a valid phone number.');
        phone.classList.remove('input-valid');
        phone.classList.add('input-invalid');
    } else {
        phone.classList.remove('input-invalid');
        phone.classList.add('input-valid');
    }

    if (valid) { 
        alert('Form submitted successfully'); 
        document.getElementById('form').reset();
        phone.classList.remove('input-valid');

        const errorDiv = document.getElementById('phone-error');
        if (errorDiv) {
            errorDiv.remove();
        }
    }
}

// Error function - passes in id from validate function and spits out corresponding message
function showError(id, message) {
    const errorDiv = document.getElementById('phone-error');
    if (errorDiv) {
        errorDiv.textContent = message;
    }
}