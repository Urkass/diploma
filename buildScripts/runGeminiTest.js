const glob = require("glob");
const path = require( 'path' );

const ROOT = '#root';
const TIMEOUT = 500;

const runGeminiTest = ({ name, stories, states: { hover, focus } }) => {
    hover = hover && ROOT;
    focus = focus && ROOT;

    gemini.suite(name, suite => {
        for (const story in stories) {
            
            gemini.suite(story, subSuite => {
                subSuite
                    .setUrl(`iframe.html?selectedKind=${name}&selectedStory=${story}`)
                    .setCaptureElements(ROOT)
                    .capture('plain');

                if (hover) {
                    subSuite.capture('hovered', (actions, find) => {
                        const el = find(hover);
                        actions.mouseMove(el).wait(TIMEOUT);
                    });
                }

                if (focus) {
                    subSuite.capture('focused', (actions, find) => {
                        const el = find(focus);
                        actions.focus(el).wait(FOCUS_TIMEOUT);
                    });
                }
            });
        }
    });
};

glob.sync( './src/Controls/**/*.gemini.js' ).forEach( function( file ) {
  const config = require( path.resolve( file ) );
  runGeminiTest(config)
});
