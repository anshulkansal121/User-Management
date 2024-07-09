const router = require('express').Router();
const customerController = require('../controllers/customerController');

/** 
    GET /
    Homepage
*/
router.get('/',customerController.homepage);

/** 
    GET /
    About
*/
router.get('/about',customerController.about);

/** 
    GET /add
    Add Customer
*/
router.get('/add',customerController.addCustomer);


/** 
    POST /add
    Create New Customer
*/
router.post('/add',customerController.postCustomer)


/** 
    GET /view/id
    View Customer
*/
router.get('/view/:id',customerController.viewCustomer);

/** 
    GET /edit/id
    Edit Customer
*/
router.get('/edit/:id',customerController.editCustomer);

/** 
    PUT /edit/id
    Edit Customer
*/
router.put('/edit/:id',customerController.putCustomer);

/** 
    DELETE /edit/id
    Delete Customer
*/
router.delete('/edit/:id',customerController.deleteCustomer);

/**
 POST /search
 Search Customer

*/
router.post('/search',customerController.searchCustomer);


module.exports = router;
