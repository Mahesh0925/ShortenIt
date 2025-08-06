import User from "../models/userAuth.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signUp = async (req, res) => {
  const { username, email, password } = req.body;

  const exist = await User.findOne({ email });
  if (exist)
    return res
      .status(400)
      .json({ success: false, message: "Email already exist" });

    const existUsername =await User.findOne({username}) 
  if (existUsername)
    return res
      .status(400)
      .json({ success: false, message: "Username already exist" });

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, email, password: hashedPassword });
  await user.save();

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res
    .cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    .status(201)
    .json({
      message: "Signup successful, user logged in",
      user: { id: user._id, email: user.email },
    });
};

export const login=async(req,res)=>{
    const {email, password} = req.body;

    const user = await User.findOne({email});
    if(!user) return res.status(400).json({message: "User not Found"});

    const isMatch=await bcrypt.compare(password, user.password);
    if(!isMatch) return res.status(400).json({success:false, message: "Invalid Email or Password"})

    const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{
        expiresIn:"7d",
    })

    res.cookie("token",token,{
        httpOnly: true,
        secure:process.env.NODE_ENV === "production",
        sameSite:"strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    .json({success:true, message:"Login Successful",user:{id:user._id,email:user.email}});
}


export const logOut=async(req,res)=>{
  res.clearCookie("token",{
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  res.json({success: true, message: "Logged out successfully"})
}

export const getUser = async (req,res) =>{
  const token = req.cookies?.token;
  if(!token) return res.status(401).json({ isLoggedIn: false});

  const decoded = jwt.verify(token,process.env.JWT_SECRET);
  const user = await User.findById(decoded.id).select("-password");

  res.json({isLoggedIn: true, user}); 
}