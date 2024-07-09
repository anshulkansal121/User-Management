const mongoose = require('mongoose');
const Customer = require('../models/customer');


exports.homepage = async (req, res) => {
    const messages = await req.consumeFlash('info');

    let perPage = 6;
    let page = req.query.page || 1;
    try {
        const customers = await Customer.aggregate([{ $sort: { createdAt: -1 } }])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();
        const count = await Customer.count;
        res.render('index', { messages, customers, current: page, pages: Math.ceil(count / perPage) });
    } catch (error) {
        console.log(error);
    }

}

exports.about = async(req,res)=>{
    try
    {
        res.render('about');
    }catch(error)
    {
        console.log(error);
    }
}

exports.addCustomer = async (req, res) => {
    res.render('customer/add');
}

exports.postCustomer = async (req, res) => {
    console.log(req.body);
    const newCustomer = new Customer({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        tel: req.body.tel,
        details: req.body.details,
        email: req.body.email
    });
    try {
        Customer.create(newCustomer);
        await req.flash('info', 'New Customer has been added');
        res.redirect('/');
    } catch (error) {
        console.log(error);
    }

}

exports.viewCustomer = async(req,res)=>{
    try
    {
        const customer = await Customer.findOne({_id: req.params.id})
        res.render('customer/view',{customer});
    }catch(error)
    {
        console.log(error);
    }
}


exports.editCustomer = async(req,res)=>{
    try
    {
        const customer = await Customer.findOne({_id: req.params.id})
        res.render('customer/edit',{customer});
    }catch(error)
    {
        console.log(error);
    }
}

exports.putCustomer = async(req,res)=>{
    try
    {
        await Customer.findByIdAndUpdate(req.params.id,{
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            email:req.body.email,
            tel:req.body.tel,
            details:req.body.details,
            updatedAt:Date.now()
        });

        res.redirect(`/edit/${req.params.id}`)
    }catch(error)
    {
        console.log(error);
    }
}

exports.deleteCustomer = async(req,res)=>{
    try
    {
        await Customer.deleteOne({_id:req.params.id});
        res.redirect("/")
    }catch(error)
    {
        console.log(error);
    }
}

exports.searchCustomer = async(req,res)=>{
    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9]/g,"");
    try
    {
        const customers = await Customer.find({
            $or: [
              { firstName: { $regex: new RegExp(searchNoSpecialChar, "i") } },
              { lastName: { $regex: new RegExp(searchNoSpecialChar, "i") } },
            ],
          });
        res.render("search",{
            customers
        })
    }catch(error)
    {
        console.log(error);
    }
}