function AudioPlayer() {
	this.path = 'audio/';
	this.extension = '.wav';
	this.type = 'audio/wav';

	this.currentlyPlaying = null;

	this.muteButton = null;
	this.unmuteButton = null;
	this.currentVolume = 1;

	this.sounds = [
		{src: this.path + 'GLaDOS_Hello_Welcome_to_Area_72_testing' + this.extension, id: 'entrance'},
		{src: this.path + 'GLaDOS_Random_test' + this.extension, id: 'test'},
		{src: this.path + 'GLaDOS_this_was_a_triumph_im_making_a_n' + this.extension, id: 'diagnostic'},
		{src: this.path + 'GLaDOS_No' + this.extension, id: 'no'},
		{src: this.path + 'GLaDOS_Why' + this.extension, id: 'why'},
		{src: this.path + 'GLaDOS_Indeed' + this.extension, id: 'indeed'},
		{src: this.path + 'GLaDOS_Please_dont_do_that' + this.extension, id: 'dontdothat'},
		{src: this.path + 'GLaDOS_I_cant_believe_you_would_actuall' + this.extension, id: 'actual'},
		{src: this.path + 'GLaDOS_You_are_currently_recieveing_a_c' + this.extension, id: 'call'},
		{src: this.path + 'GLaDOS_hi' + this.extension, id: 'hi'},
		{src: this.path + 'GLaDOS_That_information_is_classified' + this.extension, id: 'classified'},
		{src: this.path + 'driving_with_the_top_down' + this.extension, id: 'background'}
	];

	return this;
}

AudioPlayer.prototype.mute = function() {
	this.currentVolume = 0;

	if(this.currentlyPlaying) {
		document.getElementById(this.currentlyPlaying).volume = this.currentVolume;
	}

	document.getElementById('background').volume = 0;

	this.muteButton.style.display = 'none';
	this.unmuteButton.style.display = 'initial';
};

AudioPlayer.prototype.unmute = function() {
	this.currentVolume = 1;

	if(this.currentlyPlaying) {
		document.getElementById(this.currentlyPlaying).volume = this.currentVolume;
	}

	document.getElementById('background').volume = 0.1;

	this.muteButton.style.display = 'initial';
	this.unmuteButton.style.display = 'none';
};

AudioPlayer.prototype.play = function(file) {
	if(this.currentlyPlaying) {
		document.getElementById(this.currentlyPlaying).pause();
	}

	this.currentlyPlaying = file;
	document.getElementById(file).volume = this.currentVolume;
	document.getElementById(file).play();

	return this;
};

AudioPlayer.prototype.playBackground = function() {
	document.getElementById('background').volume = 0.1;
	document.getElementById('background').loop = 'infinite';
	document.getElementById('background').play();

	return this;
};

AudioPlayer.prototype.initialize = function() {
	for(var i in this.sounds) {
		var audio = document.createElement('audio');
		audio.id = this.sounds[i].id;
		audio.src = this.sounds[i].src;
		audio.type = this.sounds[i].type;
		document.body.appendChild(audio);
	}

	this.muteButton = document.createElement('button');
	this.muteButton.className = 'btn buttonMuteUnmute';
	this.muteButton.setAttribute('onclick', 'window.player.mute()');
	this.muteButton.innerHTML = '<span class="glyphicon glyphicon-volume-up"></span>';

	this.unmuteButton = document.createElement('button');
	this.unmuteButton.className = 'btn buttonMuteUnmute';
	this.unmuteButton.setAttribute('onclick', 'window.player.unmute()');
	this.unmuteButton.innerHTML = '<span class="glyphicon glyphicon-volume-off"></span>';
	this.unmuteButton.style.display = 'none';

	document.body.appendChild(this.muteButton);
	document.body.appendChild(this.unmuteButton);

	return this;
};