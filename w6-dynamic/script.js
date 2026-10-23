function convert(grade) {
    let points;

    switch (grade) {
        case 'A':
            points = 4;
            break;
        case 'B':
            points = 3;
            break;
        case 'C':
            points = 2;
            break;
        case 'D':
            points = 1;
            break;
        case 'F':
            points = 0;
            break;
        default:
            alert('Not a valid grade');
            return null;
    }

    return points;
}

const words = ['watermelon', 'peach', 'apple', 'tomato', 'grape'];
const students = [
    { last: 'Andrus', first: 'Aaron' },
    { last: 'Masa', first: 'Manny' },
    { last: 'Tanda', first: 'Tamanda' }
];

const longWords = words.filter((word) => word.length > 5);
const wordLengths = words.map((word) => word.length);
const totalCharacters = words.reduce((total, word) => total + word.length, 0);

document.querySelector('#words').textContent = words.join(', ');
document.querySelector('#long-words').textContent = longWords.join(', ');
document.querySelector('#word-lengths').textContent = wordLengths.join(', ');
document.querySelector('#total-characters').textContent = totalCharacters;
document.querySelector('#students').innerHTML = students
    .map((student) => `<li>${student.first} ${student.last}</li>`)
    .join('');

console.log('Words longer than five letters:', longWords);
console.log('Character count for each word:', wordLengths);
console.log('Total characters:', totalCharacters);
console.log('Grade points:', ['A', 'B', 'C', 'D', 'F'].map(convert));
