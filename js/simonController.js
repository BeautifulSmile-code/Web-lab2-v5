let Controller = function (View, Model) {
    this.simonView = View;
    this.simonModel = Model;
};

Controller.prototype.init = function () {
    this.simonView.onStartButton = this.startButt.bind(this);
    this.simonView.onClickDownSquare = this.pressSquare.bind(this);
    this.simonView.onClickUpSquare = this.clickSquare.bind(this);
    this.simonModel.init( this.needRendering.bind(this));
    this.simonView.init();

    this.needRendering();
};

Controller.prototype.needRendering = function(){
    this.simonView.render(simonModel.objs);
};

Controller.prototype.pressSquare = function(e) {
    this.simonModel.pressSquare(e);
};

Controller.prototype.clickSquare = function(e) {
    this.simonModel.clickSquare(e);
};

Controller.prototype.startButt = function(e) {
    this.simonModel.startButtHandler(e);
};

let simonController = new Controller(simonView, simonModel);
simonController.init();