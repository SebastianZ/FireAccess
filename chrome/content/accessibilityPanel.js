/* See license.txt for terms of usage */

define([
    "firebug/lib/object",
    "firebug/lib/trace",
    "firebug/lib/locale",
    "firebug/lib/domplate",
    "fireaccess/accessibilityModule"
],
function(Obj, FBTrace, Locale, Domplate, HTMLAccessibilityModule) {

//********************************************************************************************* //
//Constants

reRGB = /^rgb\((\d+?),\s*(\d+?),\s*(\d+?)\)$/;

// ********************************************************************************************* //
// Custom Panel Implementation

var panelName = "fireaccess";

Firebug.HTMLAccessibilityPanel = function HTMLAccessibilityPanel() {};
Firebug.HTMLAccessibilityPanel.prototype = Obj.extend(Firebug.Panel,
{
    name: panelName,
    title: "Accessibility",
    parentPanel: "html",
    order: 4,

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * //
    // Initialization

    initialize: function()
    {
        Firebug.Panel.initialize.apply(this, arguments);

        if (FBTrace.DBG_FIREACCESS)
            FBTrace.sysout("fireAccess; HTMLAccessibilityPanel.initialize");

        // TODO: Panel initialization (there is one panel instance per browser tab)

        this.refresh();
    },


    initializeNode: function(oldPanelNode)
    {
        Firebug.Panel.initializeNode.apply(this, arguments);
    },

    destroyNode: function()
    {
        Firebug.Panel.destroyNode.apply(this, arguments);
    },

    destroy: function(state)
    {
        if (FBTrace.DBG_FIREACCESS)
            FBTrace.sysout("fireAccess; HTMLAccessibilityPanel.destroy");

        Firebug.Panel.destroy.apply(this, arguments);
    },

    show: function(state)
    {
        Firebug.Panel.show.apply(this, arguments);

        if (FBTrace.DBG_FIREACCESS)
            FBTrace.sysout("fireAccess; HTMLAccessibilityPanel.show");
    },

    supportsObject: function(object, type)
    {
        if (FBTrace.DBG_FIREACCESS)
            FBTrace.sysout("fireAccess; HTMLAccessibilityPanel.supportsObject", {object: object, type: type});

        return object instanceof window.Element;
    },

    refresh: function()
    {
        if (FBTrace.DBG_FIREACCESS)
           FBTrace.sysout("fireAccess; HTMLAccessibilityPanel.supportsObject", {selection: this.selection});

        this.updateSelection(this.selection);
    },

    updateSelection: function(element)
    {
        if (!element)
            return;

        var win = element.ownerDocument.defaultView;
        var computedStyle = win.getComputedStyle(element);

        var match = computedStyle.getPropertyValue("color").match(reRGB);
        if (!match)
            return;

        var [match, textColorRed, textColorGreen, textColorBlue] = match;
        var match = computedStyle.getPropertyValue("background-color").match(reRGB);
        if (!match)
            backgroundColorRed = backgroundColorGreen = backgroundColorBlue = 255;
        else
            var [match, backgroundColorRed, backgroundColorGreen, backgroundColorBlue] = match;

        var contrast = HTMLAccessibilityModule.calculateContrast(textColorRed, textColorGreen,
            textColorBlue, backgroundColorRed, backgroundColorGreen, backgroundColorBlue);
        // Render panel content. The HTML result of the template corresponds to: 
        //this.panelNode.innerHTML = "<span>" + Locale.$STR("fireaccess.panel.label") + "</span>";
        this.MyTemplate.render(contrast, this.panelNode);

        // TODO: Render panel content
    }
});

// ********************************************************************************************* //
// Panel UI (Domplate)

// Register locales before the following template definition.
Firebug.registerStringBundle("chrome://fireaccess/locale/fireaccess.properties");

/**
 * Domplate template used to render panel's content. Note that the template uses
 * localized strings and so, Firebug.registerStringBundle for the appropriate
 * locale file must be already executed at this moment.
 */
with (Domplate) {
Firebug.HTMLAccessibilityPanel.prototype.MyTemplate = domplate(
{
    tag:
        SPAN(
            Locale.$STR("fireaccess.label.contrast") + " " + "$contrast|round:1"
        ),

    round: function(contrast)
    {
        return Math.round(contrast * 100) / 100;
    },

    render: function(contrast, parentNode)
    {
        this.tag.replace({contrast: contrast}, parentNode);
    }
})}

// ********************************************************************************************* //
// Registration

Firebug.registerPanel(Firebug.HTMLAccessibilityPanel);
Firebug.registerStylesheet("chrome://fireaccess/skin/fireaccess.css");

if (FBTrace.DBG_FIREACCESS)
    FBTrace.sysout("fireAccess; accessibilityPanel.js, stylesheet registered");

return Firebug.HTMLAccessibilityPanel;

// ********************************************************************************************* //
});
