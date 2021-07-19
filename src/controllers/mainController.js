const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: (req, res) => {
		//Se deberán mostrar los productos separados en dos secciones: los últimos visitados y los productos en oferta
		let productoVisitado = products.filter((products)=>{
			return products.category == "visited";
		});
		let productoEnVenta = products.filter((products)=>{
			return products.category == "in-sale";
		});
		res.render("index", {"productoVisitado": productoVisitado, "productoEnVenta": productoEnVenta});
	},
	//search: (req, res) => {
		// Do the magic
	//},
};

module.exports = controller;
