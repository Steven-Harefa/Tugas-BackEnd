const express = require('express')
const app = express()
const cors = require('cors')

app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

const Db = require('mysql')
const { rows } = require('mysql')
const Connect = Db.createConnection({

    host : 'localhost',
    user: 'root',
    port: '3306',
    database: 'data_pekerja'

})

Connect.connect(function(err){

    if(!err){
        console.log('Berhasil Konek Ke Database')
    }

    else{
        console.log('Gagal Konek Ke Database')
    }

})

app.get('/', function(req, res){

    res.send(
        `<html>

        <h1> Tugas BackEnd </h1>

        <form action = "/todo" method = "POST">

            <p> Nama Pekerja </p>

            <input type="teks" Name="Nama">

            <br>
            <br>

            <button type="submit">Simpan Data</button>

        </form>

        </html>`
    )

})

app.post('/todo', function(req, res){
    
    var Data_Nama = req.body.Nama
    var Perintah = "INSERT INTO data_pribadi (Nama) VALUES ('"+ Data_Nama +"')"

    Connect.query(Perintah, Data_Nama, function(err){
        if(err){
            throw err;
        }   
    })

    res.end()
    
})

app.delete('/todo/:id', function(req, res){

    Connect.query("DELETE FROM data_pribadi WHERE ID_Pekerjaan = '"+ req.params.id +"'", function(err, rows){

        if(!err){
            
        }

        else{
            console.log(err)
        }
        
    })
    
    res.end()
})

app.get('/todo', function(req, res){

    Connect.query('SELECT * FROM data_pribadi', (err, rows, fields)=>{

        if(!err){
            res.send(rows)
        }

        else{
            console.log(err)
        }

    })

    

})

app.listen(3000)

