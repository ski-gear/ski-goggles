( function() {

  /**
   * Callback for panelCreated event
   */
  var panelCreated = function( panel ) {
    var queuedMessages = [],
        panelWindow,
        clearButton,
        port;

    port = chrome.extension.connect( { name: "skig-" + chrome.devtools.inspectedWindow.tabId } );

    /**
     * Receieves messages from the eventPage
     */
    port.onMessage.addListener( function( msg ) {
      if( panelWindow ) {
        panelWindow.Skig.receive_message( msg );
      } else {
        queuedMessages.push( msg );
      }
    } );

    /**
     * Called when the devtools panel is first shown
     */
    panel.onShown.addListener( function tmp( _window ) {
      panel.onShown.removeListener( tmp ); // Run once only
      panelWindow = _window;

      // Release queued messages
      var msg;
      while( ( msg = queuedMessages.shift() ) ) {
        panelWindow.Skig.receive_message( msg );
      }

      // Inject a reply mechanism into the caller
      panelWindow.Skig.send_message = function( msg ) {
        port.postMessage( msg );
      };
    } );
  };


  /**
   * Create the panel
   */
  chrome.devtools.panels.create(
    "Ski Goggles",
    "images/ski-googles-icon.png",
    "index.html",
    panelCreated
  );

  // public
  return {};

}() );
