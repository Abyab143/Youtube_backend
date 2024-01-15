import jwt from "jsonwebtoken";

export const Authentication = (req, res, next) =>{
const token = req.cookies.access_token;
console.log(token);
if(token){
  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err){
      return res.send("Invalid access token")
    }
    req.user = user;
    next()
  });
}else{
return res.send("You are not authenticated");
}
};