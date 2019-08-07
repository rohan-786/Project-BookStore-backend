import { promises } from "dns";

function executeQuery(con , sqlQuery){
    return(new promises(function(resolve,reject) {
        con.query(sqlQuery,args,(err,result)=>{
            if(err) return reject(err);
            resolve(result)
        })
    }));
}


module.exports ={
    executeQuery
}