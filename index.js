fetch('http://localhost:3000/burgers')
    .then(response => response.json())
    .then(burgers => {
        console.log(burgers);
    })