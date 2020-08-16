const moodHeading = document.querySelector('#mood');

let capitalizeStr = (str) => {
    let splitStr = str.toLowerCase().split(' ');
    for(let l = 0; l < splitStr.length; l++){
        splitStr[l] = splitStr[l].charAt(0).toUpperCase() + splitStr[l].substring(1);
    }

    return splitStr.join(' ');
}

let getMood = (arr) => {
    let finalMoodResult;
    arr.forEach(result => {
        Object.keys(result.data).reduce((a, b) => {
            if(result.data[a] > result.data[b]){
                finalMoodResult = a;
            }
        })
        console.log(result.data);
    })

    console.log('Final Mood Result: ', finalMoodResult);
    return finalMoodResult;
}

let displayMoodData = () => {

}

//Fetches data file into the browser
let getData = (file) => {
    fetch(file)
        .then(response => response.json())
        .then(data => {
            let objArr = data.results;
            getMood(objArr);
            let mood = getMood(objArr);
            moodHeading.innerHTML = `You seem pretty ${capitalizeStr(mood)}`;
        })
        .catch(err => {
            err ? console.error(err) : err = null;
        })
}

getData('results.json');