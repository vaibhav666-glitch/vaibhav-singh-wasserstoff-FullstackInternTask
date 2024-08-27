import jwt from "jsonwebtoken"

const jwtAuth=(req,res,next)=>{
    const token=req.headers['authorization']
    if(!token)
        return res.status(401).send({message:'Token not found'});

    try{
        const payload=jwt.verify(token,"BMEB3yf4zTYQqMYJX8eIt6qk4FtlRU2i")
        console.log(payload);

    }
    // return error
    catch(err)
    {
        return res.status(401).send(token);
    }

    //5. call next middleware

    next();
}
export default jwtAuth;