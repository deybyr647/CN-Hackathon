//Fetches data file into the browser
let fetchData = (file) => {
    fetch(file)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            console.log('Done!')
        })
        .catch(err => {
            err ? console.error(err) : err = null;
        })
}

fetchData('results.json');