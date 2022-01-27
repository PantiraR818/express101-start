const Product = require('../models/productModel');
exports.getProducts = async (req, res)=>{
    // 18-01-65 คลาส2
    Product.find()    // db.ptoduct.find() คำสั่งเดียวกัน
    .exec((error,result) =>{     //=>{} แอโร่ฟังก์ชั่น
        res.status(200).json({
            msg: "OK",
            data: result
        })
    });
    // res.send(`get all products`);
};

exports.getProductById = async (req,res)=>{
    //res.send(`get product by id = ${req.params.id}`);
    Product.findById(req.params.id)
    .exec((error,result) =>{     //=>{} แอโร่ฟังก์ชั่น
        res.status(200).json({
            msg: "OK",
            data: result
        })
    });
};

exports.getProductByName = async (req,res)=>{
    // res.send(`get product by name = ${req.params.name}`);
    Product.find({ name : new RegExp(req.params.name)})
    .exec((error,result) =>{     //=>{} แอโร่ฟังก์ชั่น
        res.status(200).json({
            msg: "OK",
            data: result
        })
    });
};
// ==============คลาส2 18-01-65=====================
                //การใช้Methodทำงานก่อน ให้ตามต่อไปเลย ไม่สนว่าเสร็จหรือไม่
exports.addProduct = async (req,res)=>{
    // res.send(`Add a product id: ${req.body.id}, name: ${req.body.name}`);
    try {
        // การกำหนดข้อมูลที่มาจากฟอร์ม Body กำหนดให้กับตัว Product Model
        let product = new Product({
            name: req.body.name,
            price: req.body.price,
            unit_in_stock: req.body.unit_in_stock
        });

        // เก็บ result จากการAdd Data
        let createProduct = await product.save();
                        //การทำให้คำสั่งดังกล่าวเสร็จก่อน ถึงจะทำต่อไป
        res.status(200).json({
            msg: "Add Product Complete",
            data: createProduct
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: error
        })
    }
};

exports.editWholeProduct = async (req,res)=>{
    //res.send(`Edit product by Id ${req.params.id} <br> Id ${req.body.id}`);
    let product = {
        name: req.body.name,
        price: req.body.price,
        unit_in_stock: req.body.unit_in_stock
    }
    Product.findByIdAndUpdate(req.params.id,product)
    .exec((error,result) =>{     //=>{} แอโร่ฟังก์ชั่น
        Product.findById(req.params.id)
        res.status(200).json({
            msg: "OK",
            data: result
        })
    });
};

exports.editProduct = async (req,res)=>{
    // res.send(`Edit product by Id ${req.params.id} <br> Id ${req.body.id}`);
    let reviewData = {
        $push : {
            reviews:{
                star : req.body.star,
                comment : req.body.comment
            }
        }
    }
    Product.findByIdAndUpdate(req.params.id,reviewData)
    .exec((error,result) =>{     //=>{} แอโร่ฟังก์ชั่น
        Product.findById(req.params.id)
        res.status(200).json({
            msg: "OK",
            data: result
        })
    });
};

exports.deleteProduct = async (req,res)=>{
    // res.send(`Delete product Id ${req.params.id}`);
    Product.findByIdAndDelete(req.params.id)
    .exec((error,result) =>{     //=>{} แอโร่ฟังก์ชั่น
        Product.findById(req.params.id)
        res.status(200).json({
            msg: "Product Id "+ req.params.id +"is delete"
        })
    });
};
