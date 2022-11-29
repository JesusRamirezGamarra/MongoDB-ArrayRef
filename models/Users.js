import mongoose from 'mongoose';

const collection = 'Users';
const schema = new mongoose.Schema({
    name: String,
    email: String,
    pets: [
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Pets'
        }
    ],
    books: [
        {
            book: {
                type: mongoose.SchemaTypes.ObjectId,
                ref: 'Books'
            },
            quantity: Number
        }
    ],
    cart: 
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Carts'
        }
    
    // carts:[
    //     { 
    //         product: {
    //             type:mongoose.SchemaTypes.ObjectId, ref:'Carts' 
    //         },
    //         quantity: Number
    //     }
    // ],
})

schema.pre(/^find/, async function() {
    this.populate( 'pets' );
    this.populate( 'books.book' );
    // next();
})
schema.virtual('full_name').get( function(){
    return `${this.name} ......  ${this.email}`;
})
// schema.virtual('full_name').get(  ()=>{
//     return `${name} ......  ${email}`;
// })


const usersService = mongoose.model(collection, schema);

export default usersService;