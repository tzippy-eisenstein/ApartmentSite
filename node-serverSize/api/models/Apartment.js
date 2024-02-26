// דירה:  שם – לא חובה, תיאור, תמונה, קוד קטגוריה, קוד עיר, כתובת, מס' מיטות, תוספים, מחיר, קוד מפרסם

const mongoose=require('mongoose')
const apartmentSchema=new mongoose.Schema({
   name:{
        type:String
    },
    description:{
        type:String
    },
    image:{
        type:String
    },
    idCategory:{
        type:mongoose.Types.ObjectId,
        require:true,
        ref:'Category'
    },
    cityId:{
        type:mongoose.Types.ObjectId,
        // require:true,
        ref:'City'
    },
    address:{
        type:String,
        require:true
    },
    numOfBad:{
        type:Number,

    },
    adition:{
        type:String,     
    },
    cost:{
        type:Number
    },
    idAdvertiser:{
        type:mongoose.Types.ObjectId,
        ref:'Advertiser'
    }
}
)   
module.exports=mongoose.model('Apartment', apartmentSchema)
