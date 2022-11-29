import { mongoose } from "mongoose";


const cartSchema = new  mongoose.Schema(
	{
		products:[
			{
				product: {
					type: mongoose.SchemaTypes.ObjectId,
					ref: 'Products'
				},
				quantity: Number
			}
		]
	},{
        timestamps :  { createdAt: true, updatedAt: true }
    }
)
const mongooseCartModel = mongoose.model('Carts',cartSchema);
export default mongooseCartModel;


// const mongooseCartModel = mongoose.model(
// 	"Cart",
// 	{
// 		id: { type: String, required: true },
// 		products: { type: Array, required: true },
// 	},
// 	"carts"
// );