const Post = require("../models/post.model");
const errorHandler = require("../utils/error")

const create = async(req,res,next)=>{
  if(!req.user.isAdmin){
    return next(errorHandler(403,"You are not authorized !"))
  }
  if(!req.body.title || !req.body.content){
    return next(errorHandler(400,"All fields are required !"))
  }
  const slug = req.body.title.split(' ').join('-').toLowerCase().replace(/[^a-zA-Z0-9-]/g, '');
  const newPost = new Post({
    ...req.body,slug,userId:req.user.id
  })
  try{
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  }
  catch(error){
    next(error)
  }
}
module.exports = {create}