const empModel = require('../Models/employee')

const isLoggedIn = (id)=>{
    const user = empModel.findById(id);
    if(user==null){
        return false;
    }else{
        return true;
    }
}

module.exports = isLoggedIn;