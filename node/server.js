const express = require('express')
const mysql = require('mysql')
const { uniqueNamesGenerator, names } = require('unique-names-generator');

const app = express()
const hostname = '0.0.0.0';
const port = 8888;

const con = mysql.createConnection({
    host: 'mysql',
    user: 'root',
    password: '12345678',
    database: 'people',
});

con.connect()

app.get('/', (_, res) => {

    const randomName = uniqueNamesGenerator({ dictionaries: [names] }); // big_red_donkey
    const new_person = { name: randomName }
    con.query(`INSERT INTO people SET ?`, new_person, (err, res) => {
        if (err) throw err
    })

    const header = `<h1>Full Cycle Rocks</h1>`;
    con.query(`SELECT name FROM people`, (err, rows) => {
        if (err) throw err
        var people_list = ''
        rows.forEach(row => {
            people_list += `- ${row.name}<br>`
        });
        const message = `${header}
        ${people_list}`
        res.send(message)
    })

})

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

