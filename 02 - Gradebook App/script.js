function getAverage(scores) {
    let sum = 0;
    for(let score of scores) {
        sum += score;
    }
    let average = (sum / scores.length);
    return average;
}
  
console.log(getAverage([92, 88, 12, 77, 57, 100, 67, 38, 97, 89]));
console.log(getAverage([45, 87, 98, 100, 86, 94, 67, 88, 94, 95]));

function getGrade(score) {
    if(score == 100) {
        return 'A++';
    } else if(score >= 90 && score < 100) {
        return 'A';
    } else if(score >= 80 && score < 90) {
        return 'B';
    } else if(score >= 70 && score < 80) {
        return 'C';
    } else if(score >= 60 && score < 70) {
        return 'D';
    } else if(score < 60) {
        return 'F'
    }

}

console.log(getGrade(96));
console.log(getGrade(82));
console.log(getGrade(56));

function hasPassingGrade(score) {
  if(getGrade(score) !== 'F') {
    return true;
  } else {
    return false;
  }
}

console.log(hasPassingGrade(100));
console.log(hasPassingGrade(53)); 
console.log(hasPassingGrade(87)); 

function studentMsg(totalScores, studentScore) {
    if(hasPassingGrade(studentScore)) {
        return `Class average: ${getAverage(totalScores)}. Your grade: ${getGrade(studentScore)}. You passed the course.`
    } else {
        return `Class average: ${getAverage(totalScores)}. Your grade: ${getGrade(studentScore)}. You failed the course.`
    }
}

console.log(studentMsg([92, 88, 12, 77, 57, 100, 67, 38, 97, 89], 37));