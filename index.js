fetch('http://localhost:3000/burgers')
    .then(response => responsejson())
    .then(burgers => {
        console.log(burgers);
    })