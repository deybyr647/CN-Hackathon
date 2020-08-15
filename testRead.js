let readJSON = (file) => {
    fetch(`${file}`)
    .then(response => {
        return response.json()
    })

    .then(data => {
        console.log(data)
    })
}

readJSON('data.json')