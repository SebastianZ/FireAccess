/* See license.txt for terms of usage */

define([
    "firebug/lib/object",
    "firebug/lib/trace",
],
function(Obj, FBTrace) {

// ********************************************************************************************* //
// Custom Module Implementation

Firebug.HTMLAccessibilityModule = Obj.extend(Firebug.Module,
{
    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //
    // Initialization

    initialize: function(owner)
    {
        Firebug.Module.initialize.apply(this, arguments);

        // TODO: Module initialization (there is one module instance per browser window)

        if (FBTrace.DBG_FIREACCESS)
            FBTrace.sysout("fireAccess; HTMLAccessibilityModule.initialize");
    },

    shutdown: function()
    {
        Firebug.Module.shutdown.apply(this, arguments);

        if (FBTrace.DBG_FIREACCESS)
            FBTrace.sysout("fireAccess; HTMLAccessibilityModule.shutdown");
    },

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //
    // Visual and audio accessibility
    calculateContrast: function(r1, g1, b1, r2, g2, b2)
    {
        function relativeLuminance(r, g, b)
        {
            r /= 255;
            g /= 255;
            b /= 255;
            var rl = r <= 0.03928 ? r / 12.92 : Math.pow((r+0.055) / 1.055, 2.4);
            var gl = g <= 0.03928 ? g / 12.92 : Math.pow((g+0.055) / 1.055, 2.4);
            var bl = b <= 0.03928 ? b / 12.92 : Math.pow((b+0.055) / 1.055, 2.4);

            return rl * 0.2126 + gl * 0.7152 + bl * 0.0722;
        }

        var l1 = relativeLuminance(r1, g1, b1);
        var l2 = relativeLuminance(r2, g2, b2);
        var lighterLuminance = l1 > l2 ? l1 : l2;
        var darkerLuminance = l1 < l2 ? l1 : l2;
        
        return (lighterLuminance + 0.05) / (darkerLuminance + 0.05);
    }
});

// ********************************************************************************************* //
// Registration

Firebug.registerModule(Firebug.HTMLAccessibilityModule);

return Firebug.HTMLAccessibilityModule;

// ********************************************************************************************* //
});
