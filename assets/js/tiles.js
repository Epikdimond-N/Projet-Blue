class Tiles{
    constructor(type = null, value = 0){
        this.element = new Elements(type);
        this.value = value
    }

    SetElement(element){
        this.element = element;
    }

    SetValue(value){
        this.value = value;
    }

    UsePower(){
        try {
            this.element.UsePower()
        }catch (e){
            console.log(e)
        }
    }
}