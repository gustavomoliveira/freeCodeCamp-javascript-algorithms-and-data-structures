/* 
A palindrome is a word or phrase that can be read the
same way forwards and backwards, ignoring punctuation, case, and spacing.

Note: You'll need to remove all non-alphanumeric
characters (punctuation, spaces and symbols) and turn
everything into the same case (lower or upper case) in order to check for palindromes.
*/

const textInput = document.getElementById('text-input');
const checkButton = document.getElementById('check-btn');

checkButton.addEventListener('click', () => {
    resultText(isAPalindrome(textInput));
});

const checkEmptyInput = (textInput) => {
    if(textInput.value.trim() === '') {
        alert('Please input a value');
        return true;
    }
    return false;
}

const isAPalindrome = (textInput) => {
    if(checkEmptyInput(textInput)) {
        return;
    } else {
        const correctText = textInput.value.replace(/[^a-zA-Z0-9]/g, '').toLowerCase().split('');
        const correctTextResult = correctText.join('') === correctText.reverse().join('') ? `${textInput.value} is a palindrome` :
        `${textInput.value} is not a palindrome`;
        return correctTextResult;
    }
}

const resultDiv = document.getElementById('result');
let paragraphResult;

const resultText = (text) => {
    if (!paragraphResult) {
        paragraphResult = document.createElement("p");
        resultDiv.appendChild(paragraphResult);
    }
    paragraphResult.textContent = text;
}