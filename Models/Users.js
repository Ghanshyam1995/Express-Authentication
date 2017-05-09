var bcrypt = require('bcrypt');
var User = module.exports;
var sql = require("mssql");
var config = {
    user: 'gs',
    password: 'ghanshyam1995',
    server: 'localhost',
    database: 'SBAdmin3'
}
module.exports.createUser = function(newUser, callBack) {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            //Store 
            sql.connect(config, (err) => {
                if (err) throw err;
                var request = new sql.Request();
                request.input("Name", sql.NVarChar(100), newUser.username);
                request.input("Email", sql.NVarChar(100), newUser.email);
                request.input("Password", sql.NVarChar(200), hash);
                request.query("Insert Into Users(FirstName,Email,Password) VALUES (@Name,@Email,@Password)", (err, result) => {
                    if (err) throw err;
                    sql.close();
                })
            })
            newUser.password = hash;
        })
    })
}

module.exports.getUserByUsername = function(username, password, callBack) {
    sql.connect(config, (err) => {
        if (err) console.log(err);

        var request = new sql.Request();
        request.input('username', sql.NVarChar(100), username);
        request.input('password', sql.NVarChar(100), password);
        request.query("SElect * from Users where email=@username AND password=@password", (err, user) => {
            if (err) throw err;
        })
    })
}
module.exports.getUserById = function(Id, callBack) {

}
module.exports.comparePassword = function(userPassword, hash, callBack) {
    bcrypt.compare(userPassword, hash, function(err, isMatch) {
        if (err) throw err;

        callBack(null, isMatch);
    })
}