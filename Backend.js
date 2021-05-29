const express = require('express')
const app = express()
const bodyPanser = require('body-parser')

app.use(express.json())
app.use(express.urlencoded())


const Db = require('mysql')
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

        <form action = "/Input" method = "POST">

            <p> ID Pekerja </p>
        
            <input Name = "Txt_ID">

            <p> Nama Pekerja </p>

            <input Name = "Txt_Nama">

            <br>
            <br>

            <button>Simpan Data</button>

        </form>


        </html>`
    )

})

app.post('/Input', function(req, res){
    
    var Data_ID = req.body.Txt_ID
    var Data_Nama = req.body.Txt_Nama
    var Perintah = "INSERT INTO data_pribadi (`ID_Pekerjaan`, `Nama`) values ('"+ Data_ID + "', '"+ Data_Nama +"')"


    Connect.query(Perintah, function(err){
        if(err){
            throw err;
        }   
    })

    res.end()
    
})

app.get('/Tampil', function(req, res){

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

