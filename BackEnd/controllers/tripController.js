const  insertTripData =require ("../services/insertTripData.js")

const tripController =async (req,res)=>{
    const body = req.body
     try {
    await insertTripData(body.id,body.data);
    res.status(200).json({ message: "Trips fetched and inserted successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }


}

module.exports = tripController