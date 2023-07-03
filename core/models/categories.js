
class Category {
    constructor(id, name) {
        this.id = id
        this.name = name
    }

    static fromJson(argument) {
        return new Category(argument.id, argument.name,)
    }
}
