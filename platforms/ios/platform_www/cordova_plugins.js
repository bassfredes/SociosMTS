cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "id": "cordova-plugin-camera.Camera",
        "file": "plugins/cordova-plugin-camera/www/CameraConstants.js",
        "pluginId": "cordova-plugin-camera",
        "clobbers": [
            "Camera"
        ]
    },
    {
        "id": "cordova-plugin-camera.CameraPopoverOptions",
        "file": "plugins/cordova-plugin-camera/www/CameraPopoverOptions.js",
        "pluginId": "cordova-plugin-camera",
        "clobbers": [
            "CameraPopoverOptions"
        ]
    },
    {
        "id": "cordova-plugin-camera.camera",
        "file": "plugins/cordova-plugin-camera/www/Camera.js",
        "pluginId": "cordova-plugin-camera",
        "clobbers": [
            "navigator.camera"
        ]
    },
    {
        "id": "cordova-plugin-camera.CameraPopoverHandle",
        "file": "plugins/cordova-plugin-camera/www/ios/CameraPopoverHandle.js",
        "pluginId": "cordova-plugin-camera",
        "clobbers": [
            "CameraPopoverHandle"
        ]
    },
    {
        "id": "cordova-plugin-console.console",
        "file": "plugins/cordova-plugin-console/www/console-via-logger.js",
        "pluginId": "cordova-plugin-console",
        "clobbers": [
            "console"
        ]
    },
    {
        "id": "cordova-plugin-console.logger",
        "file": "plugins/cordova-plugin-console/www/logger.js",
        "pluginId": "cordova-plugin-console",
        "clobbers": [
            "cordova.logger"
        ]
    },
    {
        "id": "cordova-plugin-device.device",
        "file": "plugins/cordova-plugin-device/www/device.js",
        "pluginId": "cordova-plugin-device",
        "clobbers": [
            "device"
        ]
    },
    {
        "id": "cordova-plugin-splashscreen.SplashScreen",
        "file": "plugins/cordova-plugin-splashscreen/www/splashscreen.js",
        "pluginId": "cordova-plugin-splashscreen",
        "clobbers": [
            "navigator.splashscreen"
        ]
    },
    {
        "id": "cordova-plugin-sqlite-2.sqlitePlugin",
        "file": "plugins/cordova-plugin-sqlite-2/dist/sqlite-plugin.js",
        "pluginId": "cordova-plugin-sqlite-2",
        "clobbers": [
            "sqlitePlugin"
        ]
    },
    {
        "id": "cordova-plugin-statusbar.statusbar",
        "file": "plugins/cordova-plugin-statusbar/www/statusbar.js",
        "pluginId": "cordova-plugin-statusbar",
        "clobbers": [
            "window.StatusBar"
        ]
    },
    {
        "id": "cordova-plugin-fullscreen.AndroidFullScreen",
        "file": "plugins/cordova-plugin-fullscreen/www/AndroidFullScreen.js",
        "pluginId": "cordova-plugin-fullscreen",
        "clobbers": [
            "AndroidFullScreen"
        ]
    },
    {
        "id": "com-sarriaroman-photoviewer.PhotoViewer",
        "file": "plugins/com-sarriaroman-photoviewer/www/PhotoViewer.js",
        "pluginId": "com-sarriaroman-photoviewer",
        "clobbers": [
            "PhotoViewer"
        ]
    },
    {
        "id": "cordova-plugin-network-information.network",
        "file": "plugins/cordova-plugin-network-information/www/network.js",
        "pluginId": "cordova-plugin-network-information",
        "clobbers": [
            "navigator.connection",
            "navigator.network.connection"
        ]
    },
    {
        "id": "cordova-plugin-network-information.Connection",
        "file": "plugins/cordova-plugin-network-information/www/Connection.js",
        "pluginId": "cordova-plugin-network-information",
        "clobbers": [
            "Connection"
        ]
    },
    {
        "id": "cordova-plugin-googlemaps.BaseClass",
        "file": "plugins/cordova-plugin-googlemaps/www/BaseClass.js",
        "pluginId": "cordova-plugin-googlemaps",
        "runs": true
    },
    {
        "id": "cordova-plugin-googlemaps.BaseArrayClass",
        "file": "plugins/cordova-plugin-googlemaps/www/BaseArrayClass.js",
        "pluginId": "cordova-plugin-googlemaps",
        "runs": true
    },
    {
        "id": "cordova-plugin-googlemaps.LatLng",
        "file": "plugins/cordova-plugin-googlemaps/www/LatLng.js",
        "pluginId": "cordova-plugin-googlemaps",
        "runs": true
    },
    {
        "id": "cordova-plugin-googlemaps.LatLngBounds",
        "file": "plugins/cordova-plugin-googlemaps/www/LatLngBounds.js",
        "pluginId": "cordova-plugin-googlemaps",
        "runs": true
    },
    {
        "id": "cordova-plugin-googlemaps.VisibleRegion",
        "file": "plugins/cordova-plugin-googlemaps/www/VisibleRegion.js",
        "pluginId": "cordova-plugin-googlemaps",
        "runs": true
    },
    {
        "id": "cordova-plugin-googlemaps.Location",
        "file": "plugins/cordova-plugin-googlemaps/www/Location.js",
        "pluginId": "cordova-plugin-googlemaps",
        "runs": true
    },
    {
        "id": "cordova-plugin-googlemaps.CameraPosition",
        "file": "plugins/cordova-plugin-googlemaps/www/CameraPosition.js",
        "pluginId": "cordova-plugin-googlemaps",
        "runs": true
    },
    {
        "id": "cordova-plugin-googlemaps.Polyline",
        "file": "plugins/cordova-plugin-googlemaps/www/Polyline.js",
        "pluginId": "cordova-plugin-googlemaps",
        "runs": true
    },
    {
        "id": "cordova-plugin-googlemaps.Polygon",
        "file": "plugins/cordova-plugin-googlemaps/www/Polygon.js",
        "pluginId": "cordova-plugin-googlemaps",
        "runs": true
    },
    {
        "id": "cordova-plugin-googlemaps.Marker",
        "file": "plugins/cordova-plugin-googlemaps/www/Marker.js",
        "pluginId": "cordova-plugin-googlemaps",
        "runs": true
    },
    {
        "id": "cordova-plugin-googlemaps.HtmlInfoWindow",
        "file": "plugins/cordova-plugin-googlemaps/www/HtmlInfoWindow.js",
        "pluginId": "cordova-plugin-googlemaps",
        "runs": true
    },
    {
        "id": "cordova-plugin-googlemaps.Circle",
        "file": "plugins/cordova-plugin-googlemaps/www/Circle.js",
        "pluginId": "cordova-plugin-googlemaps",
        "runs": true
    },
    {
        "id": "cordova-plugin-googlemaps.TileOverlay",
        "file": "plugins/cordova-plugin-googlemaps/www/TileOverlay.js",
        "pluginId": "cordova-plugin-googlemaps",
        "runs": true
    },
    {
        "id": "cordova-plugin-googlemaps.GroundOverlay",
        "file": "plugins/cordova-plugin-googlemaps/www/GroundOverlay.js",
        "pluginId": "cordova-plugin-googlemaps",
        "runs": true
    },
    {
        "id": "cordova-plugin-googlemaps.Common",
        "file": "plugins/cordova-plugin-googlemaps/www/Common.js",
        "pluginId": "cordova-plugin-googlemaps",
        "runs": true
    },
    {
        "id": "cordova-plugin-googlemaps.encoding",
        "file": "plugins/cordova-plugin-googlemaps/www/encoding.js",
        "pluginId": "cordova-plugin-googlemaps",
        "runs": true
    },
    {
        "id": "cordova-plugin-googlemaps.spherical",
        "file": "plugins/cordova-plugin-googlemaps/www/spherical.js",
        "pluginId": "cordova-plugin-googlemaps",
        "runs": true
    },
    {
        "id": "cordova-plugin-googlemaps.Geocoder",
        "file": "plugins/cordova-plugin-googlemaps/www/Geocoder.js",
        "pluginId": "cordova-plugin-googlemaps",
        "runs": true
    },
    {
        "id": "cordova-plugin-googlemaps.ExternalService",
        "file": "plugins/cordova-plugin-googlemaps/www/ExternalService.js",
        "pluginId": "cordova-plugin-googlemaps",
        "runs": true
    },
    {
        "id": "cordova-plugin-googlemaps.Map",
        "file": "plugins/cordova-plugin-googlemaps/www/Map.js",
        "pluginId": "cordova-plugin-googlemaps",
        "runs": true
    },
    {
        "id": "cordova-plugin-googlemaps.event",
        "file": "plugins/cordova-plugin-googlemaps/www/event.js",
        "pluginId": "cordova-plugin-googlemaps",
        "runs": true
    },
    {
        "id": "cordova-plugin-googlemaps.MapTypeId",
        "file": "plugins/cordova-plugin-googlemaps/www/MapTypeId.js",
        "pluginId": "cordova-plugin-googlemaps",
        "runs": true
    },
    {
        "id": "cordova-plugin-googlemaps.KmlOverlay",
        "file": "plugins/cordova-plugin-googlemaps/www/KmlOverlay.js",
        "pluginId": "cordova-plugin-googlemaps",
        "runs": true
    },
    {
        "id": "cordova-plugin-googlemaps.Environment",
        "file": "plugins/cordova-plugin-googlemaps/www/Environment.js",
        "pluginId": "cordova-plugin-googlemaps",
        "runs": true
    },
    {
        "id": "cordova-plugin-googlemaps.MarkerCluster",
        "file": "plugins/cordova-plugin-googlemaps/www/MarkerCluster.js",
        "pluginId": "cordova-plugin-googlemaps",
        "runs": true
    },
    {
        "id": "cordova-plugin-googlemaps.Cluster",
        "file": "plugins/cordova-plugin-googlemaps/www/Cluster.js",
        "pluginId": "cordova-plugin-googlemaps",
        "runs": true
    },
    {
        "id": "cordova-plugin-googlemaps.geomodel",
        "file": "plugins/cordova-plugin-googlemaps/www/geomodel.js",
        "pluginId": "cordova-plugin-googlemaps",
        "runs": true
    },
    {
        "id": "cordova-plugin-googlemaps.CordovaGoogleMaps",
        "file": "plugins/cordova-plugin-googlemaps/www/googlemaps-cdv-plugin.js",
        "pluginId": "cordova-plugin-googlemaps",
        "clobbers": [
            "plugin.google.maps"
        ]
    },
    {
        "id": "ionic-plugin-keyboard.keyboard",
        "file": "plugins/ionic-plugin-keyboard/www/ios/keyboard.js",
        "pluginId": "ionic-plugin-keyboard",
        "clobbers": [
            "cordova.plugins.Keyboard"
        ],
        "runs": true
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-compat": "1.1.0",
    "cordova-plugin-camera": "2.4.1",
    "cordova-plugin-console": "1.0.5",
    "cordova-plugin-device": "1.1.4",
    "cordova-plugin-splashscreen": "4.0.3",
    "cordova-plugin-sqlite-2": "1.0.4",
    "cordova-plugin-statusbar": "2.2.2",
    "cordova-plugin-whitelist": "1.3.1",
    "cordova-plugin-fullscreen": "1.1.0",
    "com-sarriaroman-photoviewer": "1.1.10",
    "cordova-plugin-network-information": "1.3.3",
    "com.googlemaps.ios": "2.4.0",
    "cordova-plugin-googlemaps": "2.1.0-beta-20170925-1216",
    "ionic-plugin-keyboard": "2.2.1"
};
// BOTTOM OF METADATA
});