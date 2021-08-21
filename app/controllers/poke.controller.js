const axios = require("axios");
const db = require("../models/index.js");
const MyPokemon = db.my_pokemon;
const Op = db.Sequelize.Op;
var Helper = require("../config/helper");
exports.getall = async (req, res) => {
    try {

        let url = 'https://pokeapi.co/api/v2/pokemon';
        var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
        const {
            data
        } = await axios.get(url);
        var populatepokemon = [];
        data.results.forEach(obj => {
            const splice = obj.url.split("/");
            populatepokemon.push({
                'name': obj.name,
                'urls': fullUrl + '/' + splice[6],
            })
        });
        return Helper.status(true, 200, 'Berhasil Menampilkan Data', populatepokemon, res);
    } catch (err) {
        return Helper.status(false, 500, 'Gagal', err, res);
    }
};

exports.getdetail = async (req, res) => {
    try {
        const id = req.params.id;
        let url = 'https://pokeapi.co/api/v2/pokemon/' + id;
        const {
            data
        } = await axios.get(url);
        return Helper.status(true, 200, 'Berhasil Menampilkan Data', data, res);
    } catch (err) {
        return Helper.status(false, 500, 'Gagal', err, res);
    }
};

exports.addpokemon = async (req, res) => {
    try {
        const insert = req.body;
        await MyPokemon.create(insert)
            .then(data => {
                return Helper.status(true, 200, 'Berhasil Menambahkan Data', data, res);
            })
            .catch(err => {
                return Helper.status(false, 500, 'Gagal Menambahkan Data', err.message, res);
            });
    } catch (err) {
        return Helper.status(false, 500, 'Gagal', err, res);
    }
};

exports.listpokemon = async (req, res) => {
    try {
        const {
            page,
            size,
        } = req.query;
        let limit;
        size ? limit = Number(size) : limit = size;
        let offset = 0;
        offset = limit * (page - 1);
        MyPokemon.findAndCountAll({
                limit: limit,
                offset: offset ? offset : 0,
            })
            .then(data => {
                let pages;
                page ? pages = Math.ceil(data.count / limit) : pages = 1;
                let datapopulate = {
                    'data': data.rows,
                    'count': data.count,
                    'pages': pages,
                    'current_pages': page,
                    'limit': limit
                }
                res.status(200).json({
                    'success': true,
                    'status_code': 200,
                    'message': 'berhasil',
                    'result': datapopulate,

                });
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving users."
                });
            });
    } catch (err) {
        return Helper.status(false, 500, 'Gagal', err, res);
    }
};

exports.remove = async (req, res) => {
    try {
        const id = req.params.id;

        MyPokemon.destroy({
                where: {
                    id: id
                }
            })
            .then(num => {
                if (num == 1) {
                    return Helper.status(true, 200, 'Berhasil Di Hapus', num, res);
                } else {
                    return Helper.status(true, 404, 'Data Tidak di Temukan', num, res);
                }
            })
            .catch(err => {
                return Helper.status(false, 500, 'Gagal di Hapus', err, res);
            });
    } catch (err) {
        return Helper.status(false, 500, 'Gagal', err, res);
    }
};