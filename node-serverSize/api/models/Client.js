const mongoose=require('mongoose')
const clientSchema=new mongoose.Schema({
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

}
)   
module.exports=mongoose.model('Client', clientSchema)