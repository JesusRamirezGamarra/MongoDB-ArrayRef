import { mongoose } from 'mongoose'


const usuarioSchema = new  mongoose.Schema(
    {
        // id: { type: String, required: false },
        email: { type: String, required: true, trim:true, index: {unique: true }},
        password: { type: String, required: true },        
        first_name: { type: String, required: true },
        last_name: { type: String, required: true },
        phone_number: { type: String, required: true },
        image_url: { type: String, required: true },
        address:{ type:String, required: false },        
        age:{ type:Number,required: false },           
        role:{ type:String, enum: ['user','admin'], default:'user'},
        cart:{ type:mongoose.SchemaTypes.ObjectId, ref:'Carts' },

        
        // cartId:{ type:Number,required: false }, 
    },{
        timestamps :  { createdAt: true, updatedAt: true }
    }
)


const mongooseUserModel = mongoose.model('Users',usuarioSchema);
export default mongooseUserModel



// const usuarioSchema = new  mongoose.Schema(
//     {
//         id: { type: String, required: false },
//         email: { type: String, required: true, trim:true, index: {unique: true }},
//         password: { type: String, required: true },        
//         first_name: { type: String, required: true },
//         last_name: { type: String, required: true },
//         phone_number: { type: String, required: true },
//         image_url: { type: String, required: true },
//         address:{ type:String, required: false },        
//         age:{ type:Number,required: false },           
//         role:{ type:String, enum: ['user','admin'], default:'user'},
//         cartId:{ type:Number,required: false },       
//     },{
//         timestamps :  { createdAt: true, updatedAt: true }
//     }
// )