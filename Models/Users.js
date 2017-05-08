var bcrypt=require('bcrypt');
var User=module.exports;

module.exports.createUser=function(newUser , callBack){
    bcrypt.genSalt(10,function(err,salt){
        bcrypt.hash(newUser.password,salt,function(err,hash){
          //Store  
          newUser.password=hash;
        })
    })
}

module.exports.getUserByUsername=function(username,callBack){
   
}
module.exports.getUserById=function(Id,callBack){
   
}
module.exports.comparePassword=function(userPassword,hash,callBack){
  bcrypt.compare(userPassword,hash,function(err,isMatch){
   if(err) throw err;

   callBack(null,isMatch);
  })
}