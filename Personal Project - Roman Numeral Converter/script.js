const input = document.getElementById('number');
const convertBtn = document.getElementById('convert-btn');
const output = document.getElementById('output');

convertBtn.addEventListener('click', () => {
    output.textContent = checkOutput(input);
});

const checkOutput = (input) => {
    if(input.value.trim() === '') {
        return 'Please enter a valid number';
    } else if(input.value < 0) {
        return 'Please enter a number greater than or equal to 1';
    } else if(input.value >= 4000) {
        return 'Please enter a number less than or equal to 3999';
    } else {
        return readInputNumber(input);
    }
};

const readInputNumber = (input) => {
    const arrInput = input.value.padStart(4, '0').split(''); 
    let romanNumeral = '';
    
    for (let i = 0; i < arrInput.length; i++) {
        const numeralPosition = parseInt(arrInput[i]);
        if (i === 0) {
            romanNumeral += 'M'.repeat(numeralPosition);
        } else if (i === 1) {
            romanNumeral += checkArrSecondEl(numeralPosition);
        } else if (i === 2) {
            romanNumeral += checkArrThirdEl(numeralPosition);
        } else if (i === 3) {
            romanNumeral += checkArrFourthEl(numeralPosition);
        }
    }
    return romanNumeral;
};
    

const checkArrSecondEl = (secondEl) => {
    if (secondEl == 9) return 'CM';
    if (secondEl >= 5) return 'D' + 'C'.repeat(secondEl - 5);
    if (secondEl == 4) return 'CD';
    return 'C'.repeat(secondEl);
};

const checkArrThirdEl = (thirdEl) => {
    if (thirdEl == 9) return 'XC';
    if (thirdEl >= 5) return 'L' + 'X'.repeat(thirdEl - 5);
    if (thirdEl == 4) return 'XL';
    return 'X'.repeat(thirdEl);
};

const checkArrFourthEl = (fourthEl) => {
    if (fourthEl == 9) return 'IX';
    if (fourthEl >= 5) return 'V' + 'I'.repeat(fourthEl - 5);
    if (fourthEl == 4) return 'IV';
    return 'I'.repeat(fourthEl);
};