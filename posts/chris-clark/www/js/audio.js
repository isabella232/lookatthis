var AUDIO = (function() {
    var isAnimating = false;
    var onStory = false;

    var setUpPlayer = function() {
        var mp3FilePath = APP_CONFIG.DEPLOYMENT_TARGET ? APP_CONFIG.S3_BASE_URL + '/posts/chris-clark/assets/prototype/whale.mp3' : 'http://assets.apps.npr.org/lookatthis/chris-clark/prototype/whale.mp3';

        $player.jPlayer('setMedia', {
            mp3: mp3FilePath
        });

        $player.jPlayer('play');
    }

    var switchAudio = function() {
        var mp3FilePath = APP_CONFIG.DEPLOYMENT_TARGET ? APP_CONFIG.S3_BASE_URL + '/posts/chris-clark/assets/prototype/audio.mp3' : 'http://assets.apps.npr.org/lookatthis/chris-clark/prototype/audio.mp3';

        $player.jPlayer('setMedia', {
            mp3: mp3FilePath
        });

        onStory = true;

        $player.jPlayer('play');

        $play.hide();
        $pause.show();
    }

    var onTimeupdate = function(e) {
        var timeText = $.jPlayer.convertTime(e.jPlayer.status.currentTime);
        $currentTime.text(timeText);

        var duration = e.jPlayer.status.duration;
        var position = e.jPlayer.status.currentTime;

        // implementing my own ended event everything is terrible
        if (position > 0 && position >= duration - 0.5) {
            onEnded();
        }
    }

    var onEnded = function() {
        if (onStory) {
            $.deck('next');
        }
    }

    var _resumePlayer = function() {
        $player.jPlayer('play');
        $play.hide();
        $pause.show();
    }

    var _pausePlayer = function(end) {
        $player.jPlayer('pause');
        if (end) {
            $playedBar.css('width', $thisPlayerProgress.width() + 'px');
        }
        $play.show();
        $pause.hide();
    }

    var toggleAudio = function(e) {
        e.preventDefault();
        if ($player.data().jPlayer.status.paused) {
            _resumePlayer();
        } else {
            _pausePlayer(false);
        }
    }

    var visibilityToggle = function() {
        if (isHidden()) {
            _pausePlayer(false);
        } else {
            _resumePlayer();
        }
    }

    var reset = function(e) {
        e.preventDefault();
        $.deck('go', 1);

        $playerWrapper.velocity('fadeOut', {
            duration: 0
        });
        $fullscreenButton.velocity('fadeOut', {
            duration: 0
        });
        $introText.velocity('fadeIn', {
            duration: 2000
        });

        var mp3FilePath = APP_CONFIG.DEPLOYMENT_TARGET ? APP_CONFIG.S3_BASE_URL + '/posts/chris-clark/assets/prototype/whale.mp3' : 'http://assets.apps.npr.org/lookatthis/chris-clark/prototype/whale.mp3';

        $player.jPlayer('setMedia', {
            mp3: mp3FilePath
        });
        $player.jPlayer('play');

        $play.hide();
        $replay.hide();
        $pause.show();
    }

    return {
        'toggleAudio': toggleAudio,
        'setUpPlayer': setUpPlayer,
        'switchAudio': switchAudio,
        'onTimeupdate': onTimeupdate,
        'reset': reset,
        'visibilityToggle': visibilityToggle,
        'onEnded': onEnded
    }
}());