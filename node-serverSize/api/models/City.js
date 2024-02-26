const mongoose=require('mongoose')
const citySchema=new mongoose.Schema({
    name:{
        type:String,
        lowercase:true
    },

    apartments:[{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'Apartments'
    },
]

}
)
module.exports=mongoose.model('City', citySchema)