class Form {
    constructor(){
        this.button = createButton("Restart");
    }

    hide(){
        this.button.hide();
    }

    display(){
        var title = createElement("h1");
        title.html("Angry Bird to the rescue!");
        title.position(400,100);

        this.button.postition(200,100);

        if(this.button.mousePressed()){
            gameState = "PLAY";
        }
    }
}