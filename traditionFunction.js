const counter = {
    count : 0,
    next : function() {
        return ++this.count;
    },
    current: () => this.count
};

try{
    console.log(counter.count)
    console.log(counter.next())
}
catch(e){
    console.log(e)
}