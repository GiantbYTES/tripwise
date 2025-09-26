

export async function insertTripDataToDB(userId,data){
   
    try{

        const result = await apiFetch("/auth/insert-to-db",{
            method:"POST",
            body:{
                id:userId,
                data:data
            }
        })
        
    }catch(err){
        console.error("Error fetching/inserting trips:", err);
        
    }
}