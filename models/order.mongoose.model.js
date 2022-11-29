import { mongoose } from "mongoose";


const orderSchema = new  mongoose.Schema(
	{
		// id: { type: String, required: true },
		// userId: { type: String, required: true },
		// email: { type: String, required: true },
		// date: { type: Number, required: true },
		user:{ type:mongoose.SchemaTypes.ObjectId, ref:'Users' },
		email: { type: String, required: true },
		products: { type: Array, required: true },
	},{
        timestamps :  { createdAt: true, updatedAt: true }
    }
)
const mongooseOrderModel = mongoose.model('orders',orderSchema);
export default mongooseOrderModel;



// const mongooseUserModel = mongoose.model(
// 	"Order",
// 	{
// 		id: { type: String, required: true },
// 		userId: { type: String, required: true },
// 		email: { type: String, required: true },
// 		date: { type: Number, required: true },
// 		products: { type: Array, required: true },
// 	},
// 	"orders"
// );