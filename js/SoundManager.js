function SoundManager(){
	this.mute = false;
}

SoundManager.method('mute', function(){
	this.mute = true;
});

SoundManager.method('unmute', function(){
	this.mute = false;
});

