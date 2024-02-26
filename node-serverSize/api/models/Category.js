const mongoose=require('mongoose')

const categorySchema=new mongoose.Schema({
    name:{
        type:String,
        lowercase:true
    },

    apartments:[{
        type:mongoose.Types.ObjectId,
        required:true,
        ref: 'Apartment'
    }
]
}
)
module.exports=mongoose.model('Category', categorySchema)