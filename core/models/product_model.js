class Product {
    constructor(argument) {
        this._id = argument.id,
            this._name = argument.name,
            this._description = argument.description,
            this._stock = argument.stock;
        this._price = argument.price;
    }
    get id() {
        return this._id;
    }
    get name() {
        return this._name;
    }
    get description() {
        return this._description;
    }
    get stock() {
        return this._stock;
    }
    get price() {
        return this._price;
    }
    fromJson(json) {
        return new Product({
            id: json.get('id'),
            name: json.get('name'),
            description: json.get('description'),
            stock: json.get('stock'),
            price: json.get('price'),
        });
    }
}
