var mysql = require('mysql');

const BrouillonModel = mysql.model('Brouillon', {
    email: {type: String, require: true}
});


module.exports = BrouillonModel