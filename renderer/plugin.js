Plugin.extend({
    _type: 'com.github.steotia.peerplay.scorer',
    _isContainer: false,
    _render: true,
    initPlugin: function(data) {
        console.log('com.github.steotia.peerplay.scorer INIT');
        console.log('data', data);
        var instance = this;
        instance._self = new createjs.Container();
        var dims = instance.relativeDims();
        instance._self.x = dims.x;
        instance._self.y = dims.y;
        instance._self.w = dims.w;
        instance._self.h = dims.h;

        var core = instance._theme.getParam('com.github.steotia.peerplay.core');
        if (_.isUndefined(core)) {
            console.log('com.github.steotia.peerplay.scorer CORE: undefined');
            core = EkstepRendererAPI.instantiatePlugin('com.github.steotia.peerplay.core',{},this._stage);
            instance._theme.setParam('com.github.steotia.peerplay.core',core);
        } else {
            console.log('com.github.steotia.peerplay.scorer CORE: OK');
        }

        instance.updateScores();

        EkstepRendererAPI.addEventListener('com.github.steotia.peerplay.core.state.update',function(e,_data){
            instance.updateState(_data);
            instance.updateScores();
        },instance);

    },
    updateState: function(_data){
        var instance = this;
        console.log('com.github.steotia.peerplay.scorer UPDATE: '+JSON.stringify(_data));
        instance._theme.setParam('com.github.steotia.peerplay.scorer.scores',_data.scores);
    },
    drawBorder: function() {

    },
    updateScores: function(){
        var instance = this;
        var scores = instance._theme.getParam('com.github.steotia.peerplay.scorer.scores')||{};
        var myuuid = instance._theme.getParam('com.github.steotia.peerplay.scorer.uuid');
        console.log('com.github.steotia.peerplay.scorer PARAMS: uuid: '+JSON.stringify(myuuid));
        console.log('com.github.steotia.peerplay.scorer PARAMS: score: '+JSON.stringify(scores));
        var uuid;
        for(uuid in scores){
            if(uuid!=myuuid){
                instance.updateScore('P2Score',scores[uuid]);
            } else {
                instance.updateScore('P1Score',scores[uuid]);
            }
        }
        // Renderer.update = true;
    },
    updateScore: function(_id,score){
        var _score  = EkstepRendererAPI.getPluginInstance(_id);
        if (_score){
            _score._self.text = score;
        }
        createjs.Tween.get(_score._self, { loop: false }).wait(400).to({ regX: 0, scaleX: 1 }, 500);
        createjs.Ticker.addEventListener("tick", function(){
            Renderer.update = true;
        });
    }
});
