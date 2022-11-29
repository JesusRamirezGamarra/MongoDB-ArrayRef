import { mongoose } from "mongoose";


const productSchema = new  mongoose.Schema(
	{
		sku: { type: String, required: true, index: {unique: true } },
		name: { type: String, required: true },
		description: { type: String, required: true },
		price: { type: Number, required: true },
		stock: { type: Number, required: true },
		thumbnail: { type: String, required: false },
		// timestamp:{ type: Date, required: true, default: Date.now},
		category:{ type:mongoose.SchemaTypes.ObjectId, ref:'Categories' },
	},{
        timestamps :  { createdAt: true, updatedAt: true }
    }
)
const mongooseProductModel = mongoose.model('Products',productSchema);
export default mongooseProductModel;



// const mongooseProductModel = mongoose.model(
// 	"Product",
// 	// (
// 		{
// 			sku: { type: String, required: true, index: {unique: true } },
// 			name: { type: String, required: true },
// 			description: { type: String, required: true },
// 			price: { type: Number, required: true },
// 			stock: { type: Number, required: true },
// 			thumbnail: { type: String, required: true },
// 			timestamp:{ type: Date, required: true, default: Date.now},
// 		},
// 	"products"
// );