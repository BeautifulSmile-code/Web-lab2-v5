const COLOR_ARRAY = ["#ffdd00", "#4dff47", "#476fff", "#d41919"];
const COLOR_LIGHT_ARRAY = ["#f7ff95", "#b8ffb5", "#47ffea", "#ff8181"];

const COUNT_STEP = 100;
const COUNT_COLOR = 4;
const SIZE = 2;

const TIME_FLASH = 500;
const TIME_DIM = 1000;

let Model = function () {
    this.objs = {
        square_color: [],
        step: [],
        level: 0,
        current_step: 0,
        score: 0,
        highest: 0,
        user_step: 0,
        play: false,
    };
};

Model.prototype.getRandomInt = function (max) {
    return Math.floor(Math.random() * Math.floor(max));
}

Model.prototype.gameInit = function () {
    this.objs.score = 0;
    this.objs.step = [];
    for(let i = 0; i < COUNT_STEP; ++i)
    {
        this.objs.step.push(this.getRandomInt(COUNT_COLOR));
    }

    this.startPos();
};

Model.prototype.init = function (renderFunction) {
    this.needRendering = renderFunction;
    this.gameInit();
}

Model.prototype.startButtHandler = function (e) {
    this.objs.play = true;
    clearTimeout(this.timer);
    this.gameInit();
    this.objs.level = 0;
    this.nextLevel();
}

Model.prototype.nextLevel = function () {
    this.signal = true;
    this.objs.user_step = 0;
    this.objs.current_step = 0;
    this.objs.level++;
    this.timer = setTimeout(this.time.bind(this), 0);
}

Model.prototype.pressSquare = function (e) {
    if(this.objs.play) {
        let square = e.target;
        let id = square.getAttribute("id");
        this.objs.square_color[id] = COLOR_LIGHT_ARRAY[id];
        this.needRendering();
    }
}

Model.prototype.clickSquare = function (e) {
    if(this.objs.play) {
        this.startPos();
        let square = e.target;
        let id = square.getAttribute("id");

        if (this.objs.step[this.objs.user_step] === Number.parseInt(id)) {
            this.objs.user_step++;
            if (this.objs.user_step === this.objs.level) {
                this.objs.score = this.objs.level;
                if(this.objs.score > this.objs.highest) this.objs.highest = this.objs.score;
                this.needRendering();
                this.timer = setTimeout(this.nextLevel.bind(this), TIME_DIM);
            }

        } else {
            this.objs.play = false;
            this.objs.warning = "Game over! Press Start to restart!";
            this.needRendering();
        }
    }
}

Model.prototype.time = function() {
    this.objs.play = false;
    if(this.signal)
    {
        this.playStep();
        this.signal = !this.signal;
        this.timer = setTimeout(this.time.bind(this), TIME_DIM);
    }
    else
    {
        this.startPos();
        if(this.objs.current_step < this.objs.level) {
            this.signal = !this.signal;
            this.timer = setTimeout(this.time.bind(this), TIME_FLASH);
        }
        else
        {
            this.objs.play = true;
        }
    }
}

Model.prototype.startPos = function(){
    this.objs.warning = "";
    for(let i = 0; i < COUNT_COLOR; ++i)
    {
        this.objs.square_color[i] = COLOR_ARRAY[i];
    }
    this.needRendering();
}

Model.prototype.playStep = function() {
    let square = this.objs.step[this.objs.current_step];
    this.objs.square_color[square] = COLOR_LIGHT_ARRAY[square];
    this.needRendering();
    this.objs.current_step++;
}

let simonModel = new Model();
