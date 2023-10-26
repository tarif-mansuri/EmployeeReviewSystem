const empModel = require('../Models/employee');
const reviewModel = require('../Models/review');
const isLoggedIn = require('../UtilFunctions/util');

module.exports.createReview = async (req, res)=>{
    const {message, rating} = req.body;
    console.log(`${message}  ${rating}`);

    //find if reveiwer is looged in
    const reviewerId = req.headers.cookie?.split('=')[1];
    const loogedIn =await isLoggedIn(reviewerId);
    if(!loogedIn){
        res.status(403);
        res.json({
            message:'Please log in first'
        });
        return res;
    }

      //Find if employee exists
      const empId = req.params.id;
      const emp = await empModel.findById(empId);
      if(emp==null){
          res.status(404);
          res.json({
              message:'Wrong Employee Id has been given'
          });
          return res;
      }

    //find by his id if guy has already given review
    const reviewExistsByUser = await reviewModel.findOne({reviewer:reviewerId, employee:empId});
    //console.log(reviewExistsByUser);
    
    if(reviewExistsByUser!=null){
        res.status(400);
        res.json({
            message:'User has already given Review, He can update his review..'
        });
        return res;
    }

    const review =await reviewModel.create({
        message,
        rating,
        employee:empId,
        reviewer:reviewerId
    });
    emp.reviews.push(review._id.toString());
    await emp.save();
    res.status(201);
    res.json({
        message:'Review has been created successfully',
        review
    })
    
}

module.exports.deleteReview = async (req, res)=>{
    const reviewerId = req.headers.cookie?.split('=')[1];
    const loogedIn =await isLoggedIn(reviewerId);
    if(!loogedIn){
        res.status(403);
        res.json({
            message:'Please log in first'
        });
        return res;
    }

      //Find if employee exists
      const empId = req.params.id;
      const empExists = await empModel.findById(empId);
      if(empExists==null){
          res.status(404);
          res.json({
              message:'Wrong Employee Id has been given'
          });
          return res;
      }

       //Find if Review exists for Employee by reviewer
       const reviewExists = await reviewModel.findOne({reviewer:reviewerId, employee:empId});
       if(reviewExists==null){
           res.status(404);
           res.json({
               message:`No Review exists for ${empExists.email} by You`
           });
           return res;
       }
    //remove the review   
    await reviewModel.findByIdAndDelete(reviewExists._id.toString());
    //remove the review id from Employee review list
    const reviewId = reviewExists._id.toString();
    const index = empExists.reviews.findIndex(id => reviewId == id);
    console.log(`Index found at ${index}`);
    empExists.reviews.splice(index,1);
    await empExists.save()
    res.json({
        message:"Review Deleted successfully",
    });
    return res;    
}

module.exports.updateReview = async (req, res)=>{
const reviewerId = req.headers.cookie?.split('=')[1];
const loogedIn =await isLoggedIn(reviewerId);
if(!loogedIn){
    res.status(403);
    res.json({
        message:'Please log in first'
    });
    return res;
}

    //Find if employee exists
    const empId = req.params.id;
    const empExists = await empModel.findById(empId);
    if(empExists==null){
        res.status(404);
        res.json({
            message:'Wrong Employee Id has been given'
        });
        return res;
    }

    //Find if Review exists for Employee by reviewer
    const reviewExists = await reviewModel.findOne({reviewer:reviewerId, employee:empId});
    if(reviewExists==null){
        res.status(404);
        res.json({
            message:`No Review exists for ${empExists.email} by You`
        });
        return res;
    }
    const {message, rating} = req.body;
    console.log(`${message} ${rating}`)
    const updatedReview = await reviewModel.findByIdAndUpdate(reviewExists._id.toString(),{message, rating});
    res.status(200);
    res.json({
        message:"Review Updated successfully",
        updatedReview
    });
    return res;    
}