let data = require( 'sdk/self' ).data;
let privateBrowsing = require( 'sdk/private-browsing' );
let tabs = require( 'sdk/tabs' );

function showMessage( tab ) {
  if ( privateBrowsing.isPrivate( tab ) ) {
    tab.attach({
      contentScriptFile: data.url( 'attach-message.js' )
    });
  }
}

function main() {
  tabs.on( 'ready', showMessage );
}

exports.main = main;