let View = function () {
    this.squares = [];
    this.score = document.querySelector('.score');
    this.highest = document.querySelector('.highest');
    this.warning = document.querySelector('.warning');
    this.startBtn = document.getElementById("startBtn");
    this.onStartButton = null;
    this.onClickDownSquare = null;
    this.onClickUpSquare = null;
};

View.prototype.init = function () {

    let simonScene = document.querySelector('.simonScene');
    let id = 0;
    for(let i=0; i<SIZE; ++i)
    {
        simonScene.innerHTML += "<div class='line'>";
        let line = document.getElementsByClassName("line")[i];
        for(let j=0; j<SIZE; ++j) {
            line.innerHTML += "<div class='square' id=" + id + "></div>";
            id++;
        }
    }

    this.squares = document.getElementsByClassName("square");
    this.startBtn.addEventListener('click', this.onStartButton);
    for(let square of this.squares) {
        square.addEventListener('mousedown', this.onClickDownSquare);
        square.addEventListener('mouseup', this.onClickUpSquare);
    }
};

View.prototype.render = function (objs) {

    this.score.innerText = "Score " + objs.score;
    this.highest.innerText = "Highest " + objs.highest;
    this.warning.innerText = objs.warning;
    for(let i = 0; i < this.squares.length; ++i)
    {
        this.squares[i].style.backgroundColor = objs.square_color[i];
    }
};

let simonView = new View();