import minimist from "minimist";
import mongoose from 'mongoose';
import booksService from './models/Books.js';
import petService from './models/Pets.js';
import usersService from './models/Users.js';

import productsService from './models/product.mongoose.model.js';
import cartsService from './models/cart.mongoose.model.js';


let {
    MODE,
    _
}= minimist(process.argv.slice(2),
    {
        alias:{m:"MODE"},
        default:{m:'exit'}
    }
)
// console.log( process.argv )
// console.log( MODE )


let user_01Id,user_02Id;
let pet_01Id,pet_02Id;
let book_01Id,book_02Id;
let product_01Id,product_02Id;
let cart_01Id,cart_02Id;
let user,userWithPopulate,pet,petWithPopulate,userResult,petResult,bookResult;
let cart


const environment = async() =>{

    const connection = mongoose.connect('mongodb+srv://coderhouse:Mishina2000@coderhouse-cluster-ljrg.qaohzev.mongodb.net/CoderHouse-MongoDB?retryWrites=true&w=majority')


    try{
        switch(MODE){
            case "initial" : 
                break;
            case "exit":
                process.exit();  
                break;
            case "virtual":
                user = await usersService.find()
                console.log('User ->', user[0].full_name);
                break;                
            case "InsertNany":

                const resultCarts = await cartsService.create({products:[]})
                cart_01Id = resultCarts._id;
                // resultUsers = await usersService.updateOne({_id:user._id},{$set:user});
                ///////////////////////////////////////
                const resultUsers = await usersService.insertMany([
                    {name:"Mauricio",email:"correomau@correo.com",pets:[],cart:cart_01Id},
                    {name:"Diego",email:"corrediego@correo.com",pets:[]}
                ])
                ///////////////////////////////////////
                user_01Id =  resultUsers[0]._id;
                user_02Id =  resultUsers[1]._id;
                const resultPets = await petService.insertMany([
                    {name:"Patas",specie:"fish"},
                    {name:"Orejas", specie:"bird"}
                ])
                pet_01Id =  resultPets[0]._id;
                pet_02Id =  resultPets[1]._id;
                ///////////////////////////////////////



                ///////////////////////////////////////
                console.log('Users ->',resultUsers);
                console.log('Pets ->',resultPets);
                console.log('Carts ->',resultCarts);                                
                break;
            case "findby":            
                // let user = await usersService.findById(userId)
                // let pet = await petService.findById(petId)
                console.log('User ->',await usersService.findById(user_01Id));
                console.log('Pet ->',await petService.findById(pet_01Id));
                break;
            case "update":
                    // let userId = '6382b6b446459f557df4684a';
                    // let petId = '6382b6b446459f557df4684c';
                    user = await usersService.findById(user_01Id)
                    pet = await petService.findById(pet_01Id)
                    console.log(`======================================================================`);
                    console.log('User ->',user);
                    console.log('Pet ->',pet);            
                    console.log(`======================================================================`);
                    user.pets.push(pet._id);
                    userResult = await usersService.updateOne({_id:user._id},{$set:user});
                    pet.adopted=true;
                    pet.owner= user._id;
                    petResult =await petService.updateOne({_id:pet._id},{$set:pet});    
                    console.log(`======================================================================`);
                    console.log('User ->',userResult);
                    console.log('Pet ->',petResult);
                    console.log(`======================================================================`);
                break;            
            case "populate_Users_pets":
                user = await usersService.findById(user_01Id)
                userWithPopulate = await usersService.findById(user_01Id).populate('pets')
                console.log('User ->',user);
                console.log('User ->',userWithPopulate);
                break;    
            case "populate_Pets_owner":
                pet = await petService.findById(pet_01Id)
                petWithPopulate = await petService.findById(pet_01Id).populate('owner');
                console.log('pet ->',pet);
                console.log('pet ->',petWithPopulate);         
                break;                            
            case "Insert_Users_books":
                // let result01 = await booksService.create({title:"libro1",author:"autor"})
                let bookResult = await booksService.insertMany([
                    {title:"libro1",author:"autor"},
                    {title:"libro2",author:"autor"}
                ])
                book_01Id = bookResult[0]._id;
                console.log(bookResult)

                user = await usersService.findById(user_01Id)
                user.books.push({book:book_01Id,quantity:3});
                await usersService.updateOne({_id:user._id},{$set:user});
                console.log('User ->',user);
                break;
            case "populate_Users_books":
                user = await usersService.findById(user_01Id).populate('pets').populate('books.book');
                // await usersService.updateOne({_id:user._id},{$set:user});
                console.log('User ->',user);
                console.log('User ->',JSON.stringify( user,null,'\t'));
                break;
            case "addProduct":
                const resultProducts = await productsService.insertMany([
                    {sku:"001", name:"Pokemon-01", description:"Pokemon-01-description",price:120,stock:1000,pets:[]},
                    {sku:"002", name:"Pokemon-02", description:"Pokemon-02-description",price:150,stock:2000,pets:[]}
                ])
                product_01Id =  resultProducts[0]._id;
                product_02Id =  resultProducts[1]._id;
                console.log('Products ->',resultProducts);
                break;
            case "addToCart":
                //user = await usersService.findById(user_01Id)
                user = await usersService.findOne({'name':'Mauricio'})
                .lean()
                .populate('cart')
                console.log('user ->',user)
                // console.log(user._id)
                // console.log(user.cart)

                console.log(`======================================================================`);
                const product_01Id = await productsService.findOne({sku:"001"})
                const product_02Id = await productsService.findOne({sku:"002"})
                console.log('product_01 ->',product_01Id)
                console.log('product_02 ->',product_02Id)
                console.log(`======================================================================`);
                
                cart = await cartsService.findById(user.cart)
                console.log ('cart ->',cart)

                cart.products.push( {product: product_01Id._id, quantity: 2} )
                cart.products.push( {product: product_02Id._id, quantity: 1} )
                // cart.products.push(product_01Id);
                // cart.products.push(product_02Id);
                const cartsResult = await cartsService.updateOne({_id:cart._id},{$set:cart});
                console.log('Carts ->',cartsResult);

                const cartsResult2 = await cartsService.findById(user.cart)
                        .populate('products.product')
                console.log('Carts populate->',cartsResult2);
                console.log('Carts populate ->',JSON.stringify( cartsResult2,null,'\t'));

                console.log(`======================================================================`);

                break;
            case "modificate":
                user = await usersService.findOne({'name':'Mauricio'})
                .lean()
                .populate('cart')
                console.log('user ->',user)
                cart = await cartsService.findById(user.cart).lean()
                   // .populate('products.product')
                console.log('Carts ->',JSON.stringify( cart,null,'\t'));
                console.log(user.cart._id)


                

                // const _product_01Id = await productsService.findOne({sku:"001"})
                // const _product_02Id = await productsService.findOne({sku:"002"})
                // cart.products.push( {product: _product_01Id._id, quantity: 20} )
                // cart.products.push( {product: _product_02Id._id, quantity: 10} )
                

                // cart = cartsService.update({ _id: user.cart },
                // { $set: {
                //     "products.0.quantity": 50 
                //     }
                // })
                // console.log('Carts ->', cart);     

                

                // // // cart = cartsService.update({ _id: user.cart._id },
                // // // {
                // // //     $set: {
                // // //         "products.0": {
                // // //             "product": "6384c41937c8fd50dba7ae5f",
                // // //             "quantity": 500,
                // // //             "_id": "6385fd093733934edb2c7800"
                // // //         }
                // // //     }
                // // // })
                // // // console.log('Carts ->', cart);

                // await cartsService.findOneAndUpdate({ id: cart._id }, { $pull: { products: { id: _product_01Id } } });

                // cart = await cartsService.findOneAndUpdate({ _id: cart._id }, { $push: { products: cart.products } }, { new: true });


                
                // (user.cart)

                // {$pull: { "skills": "GST" }}) // removes "GST" 


                // cart = await cartsService.find({_id:user.cart, "products.product":"6384c41937c8fd50dba7ae60"})
                // .populate('products.product')
                // console.log('Carts populate find ->',JSON.stringify( cart,null,'\t'));

                // const cart2 = await cartsService.find(
                //     {
                //         //_id:user.cart,
                //     //$and:
                //      [
                //         //{ 'procucts.product': { $eq: ObjectId("6384c41937c8fd50dba7ae60") }}
                //         { 'quantity': { $eq: 1 }}
                //     ]  
                // })
                // //.populate('products.product')
                // console.log('Carts populate find ->',JSON.stringify( cart2,null,'\t'));


                // cart.updateOne( {_id : cart._id , "products.product": "6384c41937c8fd50dba7ae60" }, { $set: {"products.quantity": 5 }   }  )
                // cart = await cartsService.findById(user.cart)
                //     .populate('products.product')
                // console.log('Carts populate ->',JSON.stringify( cart,null,'\t'));


                // cart = await cartsService.findById(user.cart)
                //     .populate('products.product')
                // console.log('Carts populate ->',JSON.stringify( cart,null,'\t'));                

            default:
                console.log(`Operator not exists`);
                break;

        }

    }
    catch(err){
        console.log(err)
    }
    finally{
        // mongoose.disconnect();
    }    
}


// do {

process.stdout.write("Insert operation :  ");

process.stdin.on(`data`, (data)=>{
    MODE = data.toString().trimEnd();
    process.stdout.write(`Operation : ${MODE} \n`)
    environment()
    .then( ()=> {
        console.log(`======================================================================`);
        process.stdout.write("Insert operation :  ");
        }
    );

    // // process.exit();  
});
// }  while(MODE != 'exit')