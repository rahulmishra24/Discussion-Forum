var mongoose = require('mongoose');
var userModel = require('../models/user');

var login = function(req, res) {
    userModel.findOne({
        regno: req.body.logid
    }, function(err, user) {
        if (err) throw err;
        if (user) {
            //bcrypt.compare(req.body.password,user.password,function(err,isMatch) {
            if (err) throw err;
            if (user.password == req.body.password) {
                var details = {
                    "name": user.name,
                    "email": user.email,
                    "phone": user.phone,
                    "gender": user.gender,
                };
                req.session.user = details;
                return res.redirect('/profile');
            } else
                return res.redirect('/login');
        }
    });
};
//
// var issue = function(req, res) {
//     issueModel.find({}, function(err, docs) {
//         if (!err) {
//             console.log(docs);
//         } else {
//             throw err;
//         }
//         res.render('admin', {
//             users: docs
//         });
//     });
// };

module.exports = {
    "login": login,
};
