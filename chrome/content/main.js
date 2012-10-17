/* See license.txt for terms of usage */

define([
    "firebug/lib/trace",
    "fireaccess/accessibilityPanel",
    "fireaccess/accessibilityModule",
],
function(FBTrace, HTMLAccessibilityPanel, HTMLAccessibilityModule) {

// ********************************************************************************************* //
// Documentation

// Firebug coding style: http://getfirebug.com/wiki/index.php/Coding_Style
// Firebug tracing: http://getfirebug.com/wiki/index.php/FBTrace

// ********************************************************************************************* //
// The application/extension object

var theApp =
{
    initialize: function()
    {
        if (FBTrace.DBG_FIREACCESS)
            FBTrace.sysout("fireAccess; FireAccess extension initialize");

        // Registration of Firebug panels and modules is made within appropriate files,
        // but it could be also done here.

        // TODO: Extension initialization
    },

    shutdown: function()
    {
        if (FBTrace.DBG_FIREACCESS)
            FBTrace.sysout("fireAccess; FireAccess extension shutdown");

        // Unregister all registered Firebug components
        Firebug.unregisterPanel(Firebug.HTMLAccessibilityPanel);
        Firebug.unregisterModule(Firebug.HTMLAccessibilityModule);
        Firebug.unregisterStylesheet("chrome://fireaccess/skin/fireaccess.css");
        Firebug.unregisterStringBundle("chrome://fireaccess/locale/fireaccess.properties");

        // TODO: Extension shutdown
    }
}

// ********************************************************************************************* //

return theApp;

// ********************************************************************************************* //
});
