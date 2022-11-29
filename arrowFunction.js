// window.count= 10
//let count = 10;
const counter = {
    count : 0,
    next : () => ++this.count,
    current: () => this.count
};

try{
    console.log(counter.count)
    console.log(counter.next())
}
catch(e){
    console.log(e)
}

/**
 * Ejemplo 2
 */
// devolverá un valor de undefined
var myVar = 'my value';

(function() {
  console.log(myVar); // undefined
  var myVar = 'valor local';
})();