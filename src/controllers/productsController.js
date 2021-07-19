const { getDiffieHellman } = require('crypto');
const fs = require('fs');
const path = require('path');

//Para getId
const  {  v4 : uuidv4  }  =  require ( 'uuid' ) ; 
uuidv4 ( ) ;  // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {

		res.render("products", {"listaDeTodosLosProductos": products});

	},

	// Detail - Detail from one product
	detail: (req, res) => {

		let idURL = req.params.id;

		let detalleProducto = products.filter((products)=>{
			return products.id == idURL;
		});
		res.render("detail", {"detalleProducto":detalleProducto});
	},

	// Create - Form to create
	create: (req, res) => {
		res.render ("product-create-form")
	},
	
	// Create -  Method to store
	store: (req, res) => {
		let nuevoProducto = {
			id: uuidv4(),
			name: req.body.name,
			price: (req.body.price).toLocaleString('en-US', {minimumFractionDigits:2}),
			discount: req.body.discount,
			category: req.body.category,
			description: req.body.description,
			image: "default-image.jpg"
		}
		products.push(nuevoProducto);
		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
		res.redirect("/products");
	},

	// Update - Form to edit
	edit: (req, res) => {
		let idURL = req.params.id;

		let edicionDeProducto = products.filter((products)=>{
			return products.id == idURL;
		});
		res.render("product-edit-form", {"edicionDeProducto":edicionDeProducto});
	},
    // Update - Method to update
	update: (req, res) => {
		let idURL = req.params.id;
		products.forEach((products) => {
			if( idURL == products.id) {
				products.name = req.body.name;
				products.price = (req.body.price).toLocaleString('en-US', {minimumFractionDigits:2});
				products.discount = req.body.discount;
				products.category = req.body.category;
				products.description = req.body.description;
			}
		});
		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
		res.redirect("/products");
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		let idURL = req.params.id;

		let eliminarProducto = products.filter((products)=>{
			return products.id != idURL;
		});
		
		fs.writeFileSync(productsFilePath, JSON.stringify(eliminarProducto, null, 2));
		res.redirect("/products");
	},
	
};

module.exports = controller;
