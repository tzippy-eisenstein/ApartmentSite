const mongoose=require('mongoose')
const advetiserSchema=new mongoose.Schema({
    email:{
        type:String,
        lowercase:true,
        unique: true, // הוספת תכונת ייחודיות לשדה המייל
        required: true // הוספת חובה לשדה המייל
    },

    password:{
        type:mongoose.Schema.Types.String,
        required:true,
    },

    phone:{
        type:String
    },

   aditionPhone:{
        type:String
    },

    houses:{
        Type:Array
    }
}
)   
module.exports=mongoose.model('Advertiser', advetiserSchema)