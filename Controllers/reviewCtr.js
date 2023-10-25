const reviewModel = require('../Models/employee');

module.exports.createEmployee = async (req, res)=>{
    const {email, password, name} = req.body;
    const userExists =await reviewModel.findOne({email});
    if(userExists){
        res.status(400);
        res.json({
            message:'Employee already exists'
        });
        return res;
    }else{
        const savedUser =await reviewModel.create({
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
    const empList =await reviewModel.find();
        res.status(200);
        res.json({
            message:"Employees fetched successfully",
            empList
        });
        return res;
}

module.exports.getEmployee = async (req, res)=>{
    const id = req.params.id;
    const emp =await reviewModel.findById(id);
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
    const id = req.params.id;
    const emp =await reviewModel.findByIdAndDelete(id)
    res.status(204);
    res.json({
        message:"Employee Deleted successfully",
        emp
    });
    return res;    
}

module.exports.updateEmployee = async (req, res)=>{
    const id = req.params.id;
    const {email, password, name} = req.body;
    const emp =await reviewModel.findByIdAndUpdate(id,{email, password, name});
    res.status(200);
    res.json({
        message:"Employee Updated successfully",
    });
    return res;    
}