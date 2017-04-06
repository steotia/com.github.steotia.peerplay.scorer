EkstepEditor.basePlugin.extend({
    initialize: function() {
    },
    newInstance: function() {
        console.log('');

        var props=
          {
            left: {
              "x": 0,
              "y": 0,
              "fill": "#468966",
              "w": 50,
              "h": 10,
              "stroke": "rgba(255, 255, 255, 0)",
              "strokeWidth": 1,
              "opacity": 1,
              "type": "roundedrect",
              "id":"left"
            },
            right: {
              "x": 0,
              "y": 0,
              "fill": "#FFB03B",
              "w": 50,
              "h": 10,
              "stroke": "rgba(255, 255, 255, 0)",
              "strokeWidth": 1,
              "opacity": 1,
              "type": "roundedrect",
              "id":"right"
            }
        };
        var i;
        for(i in props){
          EkstepEditorAPI.instantiatePlugin('org.ekstep.shape', this.convertToFabric(props[i]), EkstepEditorAPI.getCurrentStage());
        }
    },
    onConfigChange: function(key, value) {
        var instance = EkstepEditorAPI.getCurrentObject();
        var editorObj = instance.editorObj;
        // switch (key) {
        //     case "color":
        //         editorObj.setStroke(value);
        //         instance.attributes.stroke = value;
        //         break;
        // }
        EkstepEditorAPI.render();
        EkstepEditorAPI.dispatchEvent('object:modified', { target: EkstepEditorAPI.getEditorObject() });
    }
});

//# sourceURL=peerplay.controls-editor.js
