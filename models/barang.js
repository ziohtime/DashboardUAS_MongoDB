const mongoose = require("mongoose");

const barangSchema = new mongoose.Schema({
    nama:{
        type: String,
        required: true,
    },
    keterangan:{
        type: String,
        required: true,
    },
    jumlah:{
        type: Number,
        required: true,
    }
})

const Barang = mongoose.model("Barang", barangSchema);

module.exports = Barang;