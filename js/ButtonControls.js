function ButtonControls(game){
	this.game = game;
	this.light = game.lightManager;
	var me = this;
	$('#btnPlay').click(function(e){
		me.playBtnClicked($(this));
	});
	
    $('#btnReinit').click(function(e){
		me.reinitBtnClicked();
	});
    
    $('#btnSound').click(function(e){
		me.soundBtnClicked($(this));
	});

    this.lightGui = this.createLightControls();
    this.appendLightGui();

    $('#btnLight').click(function(e){
		me.lightBtnClicked();
	});

    $('.close-button').click(function(e){
        me.closeLightControls();
    });
   
    $('#btnInstructions').click(function(){
        me.openInstructions();
    }); 
    
    $('#btnCloseInstructions').click(function(){
        me.closeInstructions();
    });

	$('#btnNewGame').click(function(){
		me.newGameBtnClicked();
	});
}

ButtonControls.method('playBtnClicked', function (btn){
	btn.toggleClass('Play');
	btn.toggleClass('Pause');
	if(btn.hasClass('Play')){
		this.game.pause();
	}else{
		this.game.play();
	}
});

ButtonControls.method('reinitBtnClicked', function (){
    this.game.reinit();	
	$('#btnPlay').removeClass('Pause').addClass('Play');
});

ButtonControls.method('soundBtnClicked', function (btn){
	btn.toggleClass('SoundOn');
	btn.toggleClass('SoundOff');
	if(btn.hasClass('SoundOn')){
		this.game.mute();
	}else{
		this.game.unmute();
	}
});

ButtonControls.method('createLightControls', function (){
    var gui = new dat.GUI({ autoPlace: false });
    var activeController = 
        gui.add(this.light, 'active');
    var ambientColorController = 
        gui.addColor(this.light, 'ambientColor');
    var diffuseColorController = 
        gui.addColor(this.light, 'diffuseColor');
    var specularColorController = 
        gui.addColor(this.light, 'specularColor');
    var strengthController = 
        gui.add(this.light, 'strength', 0, 1);
    return gui;
});

ButtonControls.method('appendLightGui', function (){
    var container = $('#divLightControls')[0];
    container.appendChild(this.lightGui.domElement);
});

ButtonControls.method('lightBtnClicked', function (){
    $('#divLightControls').removeClass('Hide');	
    $('#btnLight').addClass('Hide');
    this.lightGui.closed = false;
});

ButtonControls.method('closeLightControls', function (){
    $('#divLightControls').addClass('Hide');	
    $('#btnLight').removeClass('Hide');
});

ButtonControls.method('openInstructions', function (){
    $('#divFooter').addClass('Hide');
    $('#divInstructions').removeClass('Hide');
});

ButtonControls.method('closeInstructions', function (){
    $('#divFooter').removeClass('Hide');
    $('#divInstructions').addClass('Hide');
});

ButtonControls.method('newGameBtnClicked', function (){
    $('#divGameOver').addClass('Hide');
	$('#divCenterGameOver').addClass('Hide');
    $('#btnReinit').click();
});

