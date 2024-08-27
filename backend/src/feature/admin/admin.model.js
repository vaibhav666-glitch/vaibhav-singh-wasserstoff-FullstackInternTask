const email="xyz@gmail.com"
const password="1234"

export const signIn=(obj)=>{
    try{
        if(obj.email==email && obj.password==password)
            return true;
        else
        return false;
    }
    catch(err){
        console.log(err);
    }
}

