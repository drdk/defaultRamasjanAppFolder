(function() {
    function main(platform) {
        return {
            start: function(config, element, state) {

                return platform.loadScript("dist/bundle.js").then(function() {
                
                     window.main(platform, element);
                        
                    });

                
            },
            stop: function() {
                return Promise.resolve();
            },
            suspend: function() {},
            removeAll: function() {}
        }
    };
    return main;
})();