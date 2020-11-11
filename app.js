const express = require('express');
const mysql = require('mysql');
const hbs = require('hbs');
const bodyParser = require('body-parser')

const app = express ();
const port = 5000;

//setting engine view bhs
app.set('view engine', 'hbs');

//setting parser data dari mysql ke appjs
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const koneksi = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'INVENT_SHOP'
}); 

koneksi.connect((err) => {
    if(err) throw err;
    console.log('Koneksi Database Berhasil Disambung');
});


//pelanggan
app.get('/', (req, res) => {
    koneksi.query('SELECT * FROM Pelanggan', (err, hasil) => {
        if(err) throw err;
        res.render('pelanggan', {
            judulHalaman: 'Inventaris Online Shop',
            data: hasil
        });
    });
});

app.post('/tambahdatapelanggan', (req, res) => {
    var nama = req.body.inputnama;
    var alamat = req.body.inputalamat;
    var telepon = req.body.inputtelepon;
    koneksi.query('INSERT INTO Pelanggan(Nama, Alamat, Telepon) VALUES(?, ?, ?)',
    [ nama, alamat, telepon ],
    (err, hasil) => {
        if(err) throw err;
        res.redirect('/');
    }
    )
});

app.get('/hapus-pelanggan/:Telepon', (req, res) => {
    var telepon = req.params.Telepon;
    koneksi.query('DELETE FROM Pelanggan WHERE Telepon=?', 
        [telepon], (err, hasil) => {
            if(err) throw err;
            res.redirect('/');
        }
    )
});


//pendapatan
app.get('/pendapatan', (req, res) => {
    koneksi.query('SELECT * FROM Pendapatan', (err, hasil) => {
        if(err) throw err;
        res.render('pendapatan', {
            judulHalaman: 'Inventaris Online Shop',
            data: hasil
        });
    });
});

app.post('/tambahdatapendapatan', (req, res) => {
    var keterangan = req.body.Keterangan;
    var jumlah = req.body.Jumlah;
    koneksi.query('INSERT INTO Pendapatan(Keterangan, Jumlah) VALUES(?, ?)',
    [ keterangan, jumlah ],
    (err, hasil) => {
        if(err) throw err;
        res.redirect('/pendapatan');
    }
    )
});

app.get('/hapus-pendapatan/:Jumlah', (req, res) => {
    var jumlah = req.params.Jumlah;
    koneksi.query('DELETE FROM Pendapatan WHERE Jumlah=?', 
        [ jumlah ], (err, hasil) => {
            if(err) throw err;
            res.redirect('/pendapatan');
        }
    )
});


//penjualan
app.get('/penjualan', (req, res) => {
    koneksi.query('SELECT * FROM Penjualan', (err, hasil) => {
        if(err) throw err;
        res.render('penjualan', {
            judulHalaman: 'Inventaris Online Shop',
            data: hasil
        });
    });
});

app.post('/tambahdatapenjualan', (req, res) => {
    var namabarang = req.body.inputnamabarang;
    var jumlah = req.body.inputjumlah;
    var harga = req.body.inputharga;
    koneksi.query('INSERT INTO Penjualan(Nama_Barang, Jumlah, Harga) VALUES(?, ?, ?)',
    [ namabarang, jumlah, harga ],
    (err, hasil) => {
        if(err) throw err;
        res.redirect('/penjualan');
    }
    )
});

app.get('/hapus-penjualan/:Harga', (req, res) => {
    var harga = req.params.Harga;
    koneksi.query('DELETE FROM Penjualan WHERE Harga=?', 
        [ harga ], (err, hasil) => {
            if(err) throw err;
            res.redirect('/penjualan');
        }
    )
});

app.listen(port, () => {
    console.log(`App berjalan pada port ${port}`);
});






