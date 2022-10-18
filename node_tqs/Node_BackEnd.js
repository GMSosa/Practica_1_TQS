


const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.get('/get_scores', async (req, res) => {
    const fs = require('fs');

    var response = fs.readFileSync('./scores.txt',
        {encoding:'utf8', flag:'r'});

    res.send(response);

});

// example http call:
// localhost:3000/set_score?nombre=MrUwU&puntuacion=20
app.get('/set_score',(req, res) => {
    const fs = require('fs');
    // var ip = req.ip;
    var name = req.query.nombre;
    var score = req.query.puntuacion;
    var lineScore = name + ',' + score +'|\n';
    console.log(score);

    fs.appendFile('./scores.txt',lineScore, err => {
        if(err){
            console.log(err);
        }
    });
    res.send('Añadido Correctamente');
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})