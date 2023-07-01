class Product {
    constructor(id, name, description, stock, price, itemsInCart) {
        this.id = id;
        this.name = name ?? '';
        this.description = description ?? '';
        this.stock = stock ?? 0;
        this.price = price ?? 0;
        this.itemsInCart = itemsInCart ?? 0;
    }

    static fromJson(argument) {
        return new Product(
            argument.id,
            argument.name,
            argument.description,
            argument.stock,
            argument.price,
            argument.itemsInCart
        );
    }
    addOneProductToCard(){
        if(this.itemsInCart === null || this.itemsInCart === undefined){
            this.itemsInCart = 0;
        }else{
            this.itemsInCart++
        }
    }
    removeOneProductToCard(){
        if(this.itemsInCart === null || this.itemsInCart === undefined){
            this.itemsInCart = 0;
        }else{
            this.itemsInCart--
        }
    }
}
