const empModel = require('../Models/employee');
const isLoggedIn = require('../UtilFunctions/util');

module.exports.logOut = async (req, res)=>{
    const {email, password} = req.body;
    {
        res.cookie('user_id', '-1');
        return res.json.status(200);
        res.json({
            message: 'Logged out successfully'
        });
        return res;
    }
}

module.exports.login = async (req, res)=>{
    const {email, password} = req.body;
    const user = await empModel.findOne({email});
    if(user == null){
        res.status(404);
        res.json({
            message:'User not registered'
        });
        return res;
    }else{
        if(password != user.password){
            res.status(401);
            res.json({
                message:'Incorrect password'
            });
            return res;
        }else{
            res.cookie('user_id', user._id.toString());
            res.status(200);
            res.json({
                mesaage:'Logged in successfully'
            });
            return res;
        }
    }
}

module.exports.createEmployee = async (req, res)=>{
    const {email, password, name} = req.body;
    const userExists =await empModel.findOne({email});
    if(userExists){
        res.status(400);
        res.json({
            message:'Employee already exists'
        });
        return res;
    }else{
        const savedUser =await empModel.create({
            email,
            password,
            name
        });
        res.status(201);
        res.json({
            message:"Employee saved successfully",
            savedUser
        });
        return res;
    }
}

module.exports.getEmployees = async (req, res)=>{
    const empList =await empModel.find().populate('reviews');
        res.status(200);
        res.json({
            message:"Employees fetched successfully",
            empList
        });
        return res;
}

module.exports.getEmployee = async (req, res)=>{
    const id = req.params.id;
    const emp =await empModel.findById(id).populate('reviews');
    if(emp==null){
        res.status(404);
        res.json({
            message:"Employees not found",
        });
        return res;
    }else{
        res.status(200);
        res.json({
            message:"Employee fetched successfully",
            emp
        });
        return res;
    }
}

module.exports.deleteEmployee = async (req, res)=>{
    const cockie = req.headers.cookie?.split('=')[1];
    const loogedIn =await isLoggedIn(cockie);
    if(!loogedIn){
        console.log(loogedIn);
        res.status(403);
        res.json({
            message:'Please log in first'
        });
        return res;
    }
    const id = req.params.id;
    if(id==='6539710dacaabb64b708501a'){
        return res.json({
            messagge:'Company Owner can not be deleted'
        })
    }
    console.log(id);
    await empModel.findByIdAndDelete(id);
    return res.json({
        messagge:'Employee Deleted successfully'
    })    
}

module.exports.updateEmployee = async (req, res)=>{
    const id = req.params.id;
    const {email, password, name} = req.body;
    const emp =await empModel.findByIdAndUpdate(id,{email, password, name});
    res.status(200);
    res.json({
        message:"Employee Updated successfully",
    });
    return res;    
}