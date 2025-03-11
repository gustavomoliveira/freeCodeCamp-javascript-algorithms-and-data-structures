const input = document.getElementById('user-input');
const btnCheck = document.getElementById('check-btn');
const btnClear = document.getElementById('clear-btn');
const results = document.getElementById('results-div');

const checkNumber = () => {
    const regex = /^(?:1 \d{3}-\d{3}-\d{4}|1 \(\d{3}\) \d{3}-\d{4}|1\(\d{3}\)\d{3}-\d{4}|1 \d{3} \d{3} \d{4}|5\d{9}|5\d{2}-\d{3}-\d{4}|\(\d{3}\)\d{3}-\d{4}|1 \d{3}-\d{3}-\d{4})$/;
    return regex.test(input.value);
};

const checkInput = () => {
    btnCheck.addEventListener('click', () => {
        if(input.value.trim() === '') return alert('Please provide a phone number');

        let paragraphResult = document.createElement('p');
        results.appendChild(paragraphResult);
        paragraphResult.textContent = checkNumber() ? `Valid US number: ${input.value}` : `Invalid US number: ${input.value}`;
        input.value = '';
    });
};

const resetResults = () => {
    btnClear.addEventListener('click', () => {
        results.innerHTML = '';
    });
};

checkInput();
resetResults();