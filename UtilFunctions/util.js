const empModel = require('../Models/employee')

const isLoggedIn =async(id)=>{
    //console.log(id);
    const user =await empModel.findById(id);
    console.log(`Logged in User ${user.email}`)
    if(user===null){
        return false;
    }else{
        return true;
    }
}

module.exports = isLoggedIn;