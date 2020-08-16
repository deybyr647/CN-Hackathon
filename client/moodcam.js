const moodHeading = document.querySelector('#mood');
const confidenceHeading = document.querySelector('#confidence');
const appHeading = document.querySelector('#app');

//Capitalizes first letter of passed string
let capitalizeStr = (str) => {
    let splitStr = str.toLowerCase().split(' ');
    for(let l = 0; l < splitStr.length; l++){
        splitStr[l] = splitStr[l].charAt(0).toUpperCase() + splitStr[l].substring(1);
    }

    return splitStr.join(' ');
}

//Gets mood key with highest value
let getMood = (result) => {
    let finalMoodResult;
    let finalMoodConfidence;
	let appResult = result.app;

    Object.keys(result.data).reduce((a, b) => {
        if(result.data[a] > result.data[b]){
            finalMoodResult = a;
            finalMoodConfidence = result.data[`${finalMoodResult}`];
        }
    })

    if(result.app == '' || result.app == undefined || result.app == null){
        result.app == 'Unknown/Unavailable App';
        appResult = result.app;
    }

    //finalMoodConfidence = result.data[`${finalMoodResult}`];
    //console.log('object result data: \n', result.data);

    //console.log('Final Mood Result: ', finalMoodResult);
    //console.log('Final Mood Confidence: ', finalMoodConfidence);
    //console.log('Final App Result: ', appResult);

    return {mood: finalMoodResult, confidence: finalMoodConfidence, app: appResult};
}

//Fetches data file into the browser
let getData = (file) => {
    fetch(file)
        .then(response => response.json())
        .then(data => {
            let objArr = data.results;
            let mood = getMood(objArr);
            moodHeading.innerHTML = `Mood: ${capitalizeStr(mood.mood)}`;
            //confidenceHeading.innerHTML = `${Math.trunc(mood.confidence * 100)}% confident of results`;
            moodHeading.innerHTML = `You seem pretty ${capitalizeStr(mood.mood)}`;
            confidenceHeading.innerHTML = `${Math.trunc(mood.confidence * 100)}% confident of results`;
            appHeading.innerHTML = `Currently Using: ${mood.app}`;
        })
        .catch(err => {
            err ? console.error(err) : err = null;
        })
}

let objArr = data.results;
let mood = getMood(objArr[objArr.length - 1]);
moodHeading.innerHTML = `You seem pretty ${capitalizeStr(mood.mood)}`;
confidenceHeading.innerHTML = `${Math.trunc(mood.confidence * 100)}% confident of results`;
appHeading.innerHTML = `Currently Using: ${mood.app}`;