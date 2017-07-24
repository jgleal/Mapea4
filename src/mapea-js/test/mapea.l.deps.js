// This file was autogenerated by depswriter.py.
// Please do not edit.
goog.addDependency('../../../../src/facade/js/controls/controlbase.js', ['M.Control'], ['M.exception', 'M.facade.Base', 'M.utils'], false);
goog.addDependency('../../../../src/facade/js/controls/getfeatureinfo.js', ['M.control.GetFeatureInfo'], ['M.Control', 'M.exception', 'M.utils', 'goog.dom.classlist'], false);
goog.addDependency('../../../../src/facade/js/controls/layerswitcher.js', ['M.control.LayerSwitcher'], ['M.Control', 'M.exception', 'M.utils'], false);
goog.addDependency('../../../../src/facade/js/controls/location.js', ['M.control.Location'], ['M.Control', 'M.exception', 'M.utils'], false);
goog.addDependency('../../../../src/facade/js/controls/mouse.js', ['M.control.Mouse'], ['M.Control', 'M.exception', 'M.utils'], false);
goog.addDependency('../../../../src/facade/js/controls/navtoolbar.js', ['M.control.Navtoolbar'], ['M.Control', 'M.exception', 'M.utils'], false);
goog.addDependency('../../../../src/facade/js/controls/overviewmap.js', ['M.control.OverviewMap'], ['M.Control', 'M.exception', 'M.utils'], false);
goog.addDependency('../../../../src/facade/js/controls/panzoom.js', ['M.control.Panzoom'], ['M.Control', 'M.exception', 'M.utils'], false);
goog.addDependency('../../../../src/facade/js/controls/panzoombar.js', ['M.control.Panzoombar'], ['M.Control', 'M.exception', 'M.utils'], false);
goog.addDependency('../../../../src/facade/js/controls/scale.js', ['M.control.Scale'], ['M.Control', 'M.exception', 'M.utils'], false);
goog.addDependency('../../../../src/facade/js/controls/scaleline.js', ['M.control.ScaleLine'], ['M.Control', 'M.exception', 'M.utils'], false);
goog.addDependency('../../../../src/facade/js/controls/wmcselector.js', ['M.control.WMCSelector'], ['M.Control', 'M.exception', 'M.template', 'M.utils'], false);
goog.addDependency('../../../../src/facade/js/dialog.js', ['M.dialog'], ['M.utils'], false);
goog.addDependency('../../../../src/facade/js/eventsmanager.js', ['M.evt.EventsManager', 'M.evt.Listener'], [], false);
goog.addDependency('../../../../src/facade/js/exception/exception.js', ['M.exception'], ['M.dialog'], false);
goog.addDependency('../../../../src/facade/js/facade.js', ['M.facade.Base'], ['M.Object'], false);
goog.addDependency('../../../../src/facade/js/feature/feature.js', ['M.Feature'], ['M.facade.Base'], false);
goog.addDependency('../../../../src/facade/js/filter/filter.js', ['M.filter'], [], false);
goog.addDependency('../../../../src/facade/js/filter/filterFunction.js', ['M.filter.Function'], ['M.Filter'], false);
goog.addDependency('../../../../src/facade/js/filter/filterabstract.js', ['M.Filter'], [], false);
goog.addDependency('../../../../src/facade/js/filter/filtermodule.js', ['M.filter.spatial'], ['M.filter.Spatial'], false);
goog.addDependency('../../../../src/facade/js/filter/filterspatial.js', ['M.filter.Spatial'], ['M.filter.Function'], false);
goog.addDependency('../../../../src/facade/js/format/geojson.js', ['M.format.GeoJSON'], ['M.Feature'], false);
goog.addDependency('../../../../src/facade/js/geom.js', ['M.geom', 'M.geom.wfs.type', 'M.geom.wkt.type'], [], false);
goog.addDependency('../../../../src/facade/js/handlers/featureshandler.js', ['M.handler.Features'], ['M.exception', 'M.facade.Base', 'M.utils'], false);
goog.addDependency('../../../../src/facade/js/label.js', ['M.Label'], ['M.exception', 'M.facade.Base', 'M.utils', 'goog.dom.classlist'], false);
goog.addDependency('../../../../src/facade/js/layers/geojson.js', ['M.layer.GeoJSON'], ['M.exception', 'M.layer.Vector', 'M.utils'], false);
goog.addDependency('../../../../src/facade/js/layers/kml.js', ['M.layer.KML'], ['M.exception', 'M.layer.Vector', 'M.utils'], false);
goog.addDependency('../../../../src/facade/js/layers/layerbase.js', ['M.Layer', 'M.layer'], ['M.exception', 'M.facade.Base', 'M.parameter.layer', 'M.utils'], false);
goog.addDependency('../../../../src/facade/js/layers/layertype.js', ['M.layer.type'], ['M.layer'], false);
goog.addDependency('../../../../src/facade/js/layers/mapbox.js', ['M.layer.Mapbox'], ['M.Layer', 'M.exception', 'M.utils'], false);
goog.addDependency('../../../../src/facade/js/layers/osm.js', ['M.layer.OSM'], ['M.Layer', 'M.exception', 'M.utils'], false);
goog.addDependency('../../../../src/facade/js/layers/vector.js', ['M.layer.Vector'], ['M.Layer', 'M.exception', 'M.utils'], false);
goog.addDependency('../../../../src/facade/js/layers/wfs.js', ['M.layer.WFS'], ['M.Layer', 'M.exception', 'M.geom', 'M.layer.Vector', 'M.utils'], false);
goog.addDependency('../../../../src/facade/js/layers/wmc.js', ['M.layer.WMC'], ['M.Layer', 'M.exception', 'M.utils'], false);
goog.addDependency('../../../../src/facade/js/layers/wms.js', ['M.layer.WMS'], ['M.Layer', 'M.exception', 'M.utils'], false);
goog.addDependency('../../../../src/facade/js/layers/wmts.js', ['M.layer.WMTS'], ['M.Layer', 'M.exception', 'M.utils'], false);
goog.addDependency('../../../../src/facade/js/map/map.js', ['M.Map'], ['M.Control', 'M.Label', 'M.Layer', 'M.Parameters', 'M.Plugin', 'M.Popup', 'M.control.GetFeatureInfo', 'M.control.LayerSwitcher', 'M.control.Location', 'M.control.Mouse', 'M.control.Navtoolbar', 'M.control.OverviewMap', 'M.control.Panzoom', 'M.control.Panzoombar', 'M.control.Scale', 'M.control.ScaleLine', 'M.control.WMCSelector', 'M.dialog', 'M.exception', 'M.facade.Base', 'M.handler.Features', 'M.layer.GeoJSON', 'M.layer.KML', 'M.layer.Mapbox', 'M.layer.OSM', 'M.layer.WFS', 'M.layer.WMC', 'M.layer.WMS', 'M.layer.WMTS', 'M.remote', 'M.style.state', 'M.ui.Panel', 'M.utils', 'M.window', 'goog.dom.classlist'], false);
goog.addDependency('../../../../src/facade/js/mapea.js', ['M'], ['M.Map', 'M.exception', 'M.template', 'M.utils'], false);
goog.addDependency('../../../../src/facade/js/object.js', ['M.Object'], ['M.evt.EventsManager', 'M.evt.Listener'], false);
goog.addDependency('../../../../src/facade/js/parameters/center.js', ['M.parameter.center'], ['M.exception', 'M.utils'], false);
goog.addDependency('../../../../src/facade/js/parameters/layers.js', ['M.parameter.layer'], ['M.exception', 'M.parameter.kml', 'M.parameter.mapbox', 'M.parameter.osm', 'M.parameter.wfs', 'M.parameter.wmc', 'M.parameter.wms', 'M.parameter.wmts', 'M.utils'], false);
goog.addDependency('../../../../src/facade/js/parameters/layers/kml.js', ['M.parameter.kml'], ['M.exception', 'M.utils'], false);
goog.addDependency('../../../../src/facade/js/parameters/layers/mapbox.js', ['M.parameter.mapbox'], ['M.exception', 'M.utils'], false);
goog.addDependency('../../../../src/facade/js/parameters/layers/osm.js', ['M.parameter.osm'], ['M.exception', 'M.utils'], false);
goog.addDependency('../../../../src/facade/js/parameters/layers/wfs.js', ['M.parameter.wfs'], ['M.exception', 'M.utils'], false);
goog.addDependency('../../../../src/facade/js/parameters/layers/wmc.js', ['M.parameter.wmc'], ['M.exception', 'M.utils'], false);
goog.addDependency('../../../../src/facade/js/parameters/layers/wms.js', ['M.parameter.wms'], ['M.exception', 'M.utils'], false);
goog.addDependency('../../../../src/facade/js/parameters/layers/wmts.js', ['M.parameter.wmts'], ['M.exception', 'M.utils'], false);
goog.addDependency('../../../../src/facade/js/parameters/maxExtent.js', ['M.parameter.maxExtent'], ['M.exception', 'M.utils'], false);
goog.addDependency('../../../../src/facade/js/parameters/parameters.js', ['M.Parameters'], ['M.exception', 'M.parameter.center', 'M.parameter.layer', 'M.parameter.maxExtent', 'M.parameter.projection', 'M.parameter.resolutions', 'M.parameter.zoom', 'M.utils'], false);
goog.addDependency('../../../../src/facade/js/parameters/projection.js', ['M.parameter.projection'], ['M.exception', 'M.utils'], false);
goog.addDependency('../../../../src/facade/js/parameters/resolutions.js', ['M.parameter.resolutions'], ['M.exception', 'M.utils'], false);
goog.addDependency('../../../../src/facade/js/parameters/zoom.js', ['M.parameter.zoom'], ['M.exception', 'M.utils'], false);
goog.addDependency('../../../../src/facade/js/plugin.js', ['M.Plugin', 'M.plugin'], ['M.facade.Base'], false);
goog.addDependency('../../../../src/facade/js/popup.js', ['M.Popup'], ['M.exception', 'M.facade.Base', 'M.utils'], false);
goog.addDependency('../../../../src/facade/js/style/statestyle.js', ['M.style.state'], [], false);
goog.addDependency('../../../../src/facade/js/ui/panel.js', ['M.ui.Panel'], ['M.exception', 'M.facade.Base', 'M.ui.position', 'M.utils'], false);
goog.addDependency('../../../../src/facade/js/ui/position.js', ['M.ui.position'], [], false);
goog.addDependency('../../../../src/facade/js/utils/handlebarshelpers.js', ['M.Handlebars.helpers'], ['M.Handlebars'], false);
goog.addDependency('../../../../src/facade/js/utils/polyfills.js', ['M.polyfills'], [], false);
goog.addDependency('../../../../src/facade/js/utils/remote.js', ['M.remote', 'M.remote.Response', 'M.remote.method'], ['M.exception', 'M.utils', 'goog.dom', 'goog.dom.xml'], false);
goog.addDependency('../../../../src/facade/js/utils/template.js', ['M.template'], ['M.Handlebars', 'M.Handlebars.helpers', 'M.exception', 'M.utils'], false);
goog.addDependency('../../../../src/facade/js/utils/utils.js', ['M.utils'], ['M.geom.wkt.type', 'M.polyfills', 'goog.color', 'goog.color.alpha'], false);
goog.addDependency('../../../../src/facade/js/utils/window.js', ['M.window'], ['goog.dom.ViewportSizeMonitor'], false);
goog.addDependency('../../../../src/impl/leaflet/js/controls/panzoom.js', ['M.impl.control.Panzoom'], [], false);
goog.addDependency('../../../../src/impl/leaflet/js/layers/layerbase.js', ['M.impl.Layer'], [], false);
goog.addDependency('../../../../src/impl/leaflet/js/layers/osm.js', ['M.impl.layer.OSM'], ['M.exception', 'M.impl.Layer', 'M.utils'], false);
goog.addDependency('../../../../src/impl/leaflet/js/map/map.js', ['M.impl', 'M.impl.Map'], ['M', 'M.Leaflet', 'M.impl.Layer', 'M.impl.control.Panzoom', 'M.impl.layer.OSM', 'M.layer.type'], false);
goog.addDependency('../../../../src/plugins/archetypePlugin/facade/js/HelloWorld.js', ['P.plugin.HelloWorld'], ['P.control.HelloWorldControl'], false);
goog.addDependency('../../../../src/plugins/archetypePlugin/facade/js/HelloWorldControl.js', ['P.control.HelloWorldControl'], [], false);
goog.addDependency('../../../../src/plugins/archetypePlugin/impl/ol/js/HelloWorldControl.js', ['P.impl.control.HelloWorldControl'], [], false);
goog.addDependency('../../../../src/plugins/archetypePlugin/test/deps.js', ['debug'], ['M', 'M.impl', 'P.control.HelloWorldControl', 'P.impl.control.HelloWorldControl', 'P.plugin.HelloWorld'], false);
goog.addDependency('../../../../src/plugins/attributetable/facade/js/attributetable.js', ['P.plugin.AttributeTable'], ['P.control.AttributeTableControl', 'goog.events'], false);
goog.addDependency('../../../../src/plugins/attributetable/facade/js/attributetableControl.js', ['P.control.AttributeTableControl'], ['goog.dom', 'goog.dom.classlist', 'goog.fx.Dragger', 'goog.style'], false);
goog.addDependency('../../../../src/plugins/attributetable/impl/ol/js/attributetableControl.js', ['P.impl.control.AttributeTableControl'], [], false);
goog.addDependency('../../../../src/plugins/autocomplete/facade/js/autocomplete.js', ['P.plugin.Autocomplete'], ['goog.dom.classlist'], false);
goog.addDependency('../../../../src/plugins/autocomplete/test/autocompletador.js', ['pruebaPlugin2'], ['M', 'M.impl', 'P.plugin.Autocomplete'], false);
goog.addDependency('../../../../src/plugins/geosearch/facade/js/geosearch.js', ['P.plugin.Geosearch'], ['P.control.Geosearch'], false);
goog.addDependency('../../../../src/plugins/geosearch/facade/js/geosearchcontrol.js', ['P.control.Geosearch'], ['goog.dom.classlist', 'goog.events', 'goog.style'], false);
goog.addDependency('../../../../src/plugins/geosearch/impl/ol/js/geosearchcontrol.js', ['P.impl.control.Geosearch'], ['P.impl.layer.Geosearch', 'goog.dom.classes'], false);
goog.addDependency('../../../../src/plugins/geosearch/impl/ol/js/geosearchlayer.js', ['P.impl.layer.Geosearch'], ['P.impl.geosearch.style', 'P.impl.utils.Geosearch'], false);
goog.addDependency('../../../../src/plugins/geosearch/impl/ol/js/geosearchstyle.js', ['P.impl.geosearch.style'], [], false);
goog.addDependency('../../../../src/plugins/geosearch/impl/ol/js/utils.js', ['P.impl.utils.Geosearch'], [], false);
goog.addDependency('../../../../src/plugins/geosearch/test/deps.js', ['pruebaPlugin'], ['M', 'M.impl', 'P.impl.control.Geosearch', 'P.impl.layer.Geosearch', 'P.plugin.Geosearch', 'ol.format.WKT'], false);
goog.addDependency('../../../../src/plugins/geosearchbylocation/facade/js/geosearchbylocation.js', ['P.plugin.Geosearchbylocation'], ['P.control.Geosearchbylocation'], false);
goog.addDependency('../../../../src/plugins/geosearchbylocation/facade/js/geosearchbylocationcontrol.js', ['P.control.Geosearchbylocation'], ['P.control.Geosearch'], false);
goog.addDependency('../../../../src/plugins/geosearchbylocation/impl/ol/js/geosearchbylocation.js', ['P.impl.plugin.Geosearchbylocation'], ['P.impl.control.Geosearchbylocation', 'P.plugin.Geosearchbylocation'], false);
goog.addDependency('../../../../src/plugins/geosearchbylocation/impl/ol/js/geosearchbylocationcontrol.js', ['P.impl.control.Geosearchbylocation'], ['P.impl.control.Geosearch'], false);
goog.addDependency('../../../../src/plugins/geosearchbylocation/test/deps.js', ['pruebaPlugin'], ['M', 'M.impl', 'P.impl.control.Geosearchbylocation', 'P.plugin.Geosearchbylocation', 'ol.format.WKT'], false);
goog.addDependency('../../../../src/plugins/measurebar/facade/js/measurearea.js', ['P.control.MeasureArea'], ['P.control.Measure'], false);
goog.addDependency('../../../../src/plugins/measurebar/facade/js/measurebar.js', ['P.plugin.Measurebar'], ['P.control.MeasureArea', 'P.control.MeasureClear', 'P.control.MeasureLength'], false);
goog.addDependency('../../../../src/plugins/measurebar/facade/js/measurebase.js', ['P.control.Measure'], [], false);
goog.addDependency('../../../../src/plugins/measurebar/facade/js/measureclear.js', ['P.control.MeasureClear'], [], false);
goog.addDependency('../../../../src/plugins/measurebar/facade/js/measurelength.js', ['P.control.MeasureLength'], ['P.control.Measure'], false);
goog.addDependency('../../../../src/plugins/measurebar/impl/ol/js/measurearea.js', ['P.impl.control.MeasureArea'], ['P.impl.control.Measure'], false);
goog.addDependency('../../../../src/plugins/measurebar/impl/ol/js/measurebar.js', ['P.impl.plugin.Measurebar'], ['P.impl.control.MeasureArea', 'P.impl.control.MeasureClear', 'P.impl.control.MeasureLength', 'P.plugin.Measurebar'], false);
goog.addDependency('../../../../src/plugins/measurebar/impl/ol/js/measurebase.js', ['P.impl.control.Measure'], ['goog.dom', 'goog.dom.classes', 'goog.events'], false);
goog.addDependency('../../../../src/plugins/measurebar/impl/ol/js/measureclear.js', ['P.impl.control.MeasureClear'], ['goog.dom'], false);
goog.addDependency('../../../../src/plugins/measurebar/impl/ol/js/measurelength.js', ['P.impl.control.MeasureLength'], ['P.impl.control.Measure'], false);
goog.addDependency('../../../../src/plugins/measurebar/test/deps.js', ['pruebaPlugin'], ['M', 'M.impl', 'P.impl.plugin.Measurebar', 'P.plugin.Measurebar', 'ol.interaction.Draw'], false);
goog.addDependency('../../../../src/plugins/printer/facade/js/printer.js', ['P.plugin.Printer'], ['P.control.Printer'], false);
goog.addDependency('../../../../src/plugins/printer/facade/js/printercontrol.js', ['P.control.Printer'], ['goog.dom.classlist', 'goog.events', 'goog.style'], false);
goog.addDependency('../../../../src/plugins/printer/impl/ol/js/printercontrol.js', ['P.impl.control.Printer'], [], false);
goog.addDependency('../../../../src/plugins/printer/test/deps.js', ['pruebaPlugin'], ['M', 'M.impl', 'P.impl.control.Printer', 'P.plugin.Printer'], false);
goog.addDependency('../../../../src/plugins/searchstreet/facade/js/searchstreet.js', ['P.plugin.Searchstreet'], ['P.plugin.Autocomplete'], false);
goog.addDependency('../../../../src/plugins/searchstreet/facade/js/searchstreetcontrol.js', ['P.control.Searchstreet'], ['goog.dom', 'goog.events'], false);
goog.addDependency('../../../../src/plugins/searchstreet/impl/ol/js/searchstreetcontrol.js', ['P.impl.control.Searchstreet'], [], false);
goog.addDependency('../../../../src/plugins/searchstreet/test/searchstreet.js', ['pruebaPlugin'], ['M', 'M.impl', 'P.control.Searchstreet', 'P.impl.control.Searchstreet', 'P.plugin.Searchstreet', 'ol.format.WKT'], false);
goog.addDependency('../../../../src/plugins/searchstreetgeosearch/facade/js/geosearchintegratedcontrol.js', ['P.control.GeosearchIntegrated'], ['P.control.Geosearch', 'P.impl.control.Geosearch', 'P.impl.control.GeosearchIntegrated'], false);
goog.addDependency('../../../../src/plugins/searchstreetgeosearch/facade/js/searchstreetgeosearch.js', ['P.plugin.SearchstreetGeosearch'], ['P.plugin.Autocomplete'], false);
goog.addDependency('../../../../src/plugins/searchstreetgeosearch/facade/js/searchstreetgeosearchcontrol.js', ['P.control.SearchstreetGeosearch'], ['P.control.GeosearchIntegrated', 'P.control.SearchstreetIntegrated'], false);
goog.addDependency('../../../../src/plugins/searchstreetgeosearch/facade/js/searchstreetintegratedcontrol.js', ['P.control.SearchstreetIntegrated'], ['P.control.Searchstreet', 'P.impl.control.Searchstreet', 'P.impl.control.SearchstreetIntegrated'], false);
goog.addDependency('../../../../src/plugins/searchstreetgeosearch/impl/ol/js/geosearchintegratedcontrol.js', ['P.impl.control.GeosearchIntegrated'], ['P.impl.control.Geosearch', 'P.impl.layer.Geosearch'], false);
goog.addDependency('../../../../src/plugins/searchstreetgeosearch/impl/ol/js/searchstreetgeosearchcontrol.js', ['P.impl.control.SearchstreetGeosearch'], [], false);
goog.addDependency('../../../../src/plugins/searchstreetgeosearch/impl/ol/js/searchstreetintegratedcontrol.js', ['P.impl.control.SearchstreetIntegrated'], ['P.impl.control.Searchstreet'], false);
goog.addDependency('../../../../src/plugins/searchstreetgeosearch/test/searchstreetgeosearch.js', ['pruebaPlugin'], ['M', 'M.impl', 'P.control.GeosearchIntegrated', 'P.control.SearchstreetGeosearch', 'P.control.SearchstreetIntegrated', 'P.impl.control.GeosearchIntegrated', 'P.impl.control.SearchstreetGeosearch', 'P.impl.control.SearchstreetIntegrated', 'P.plugin.SearchstreetGeosearch', 'ol.format.WKT'], false);
goog.addDependency('../../../../src/plugins/streetview/facade/js/streetview.js', ['P.plugin.Streetview'], ['P.control.Streetview', 'goog.events'], false);
goog.addDependency('../../../../src/plugins/streetview/facade/js/streetviewcontrols.js', ['P.control.Streetview'], ['goog.dom.classlist', 'goog.fx.Dragger'], false);
goog.addDependency('../../../../src/plugins/streetview/impl/ol/js/streetview.js', ['P.impl.plugin.Streetview'], ['P.impl.control.Streetview', 'P.plugin.Streetview'], false);
goog.addDependency('../../../../src/plugins/streetview/impl/ol/js/streetviewcontrols.js', ['P.impl.control.Streetview'], [], false);
goog.addDependency('../../../../src/plugins/streetview/test/deps.js', ['pruebaPlugin'], ['M', 'M.impl', 'P.impl.plugin.Streetview', 'P.plugin.Streetview'], false);
goog.addDependency('../../../../src/plugins/wfstcontrols/facade/js/clearfeature.js', ['P.control.ClearFeature'], [], false);
goog.addDependency('../../../../src/plugins/wfstcontrols/facade/js/deletefeature.js', ['P.control.DeleteFeature'], [], false);
goog.addDependency('../../../../src/plugins/wfstcontrols/facade/js/drawfeature.js', ['P.control.DrawFeature'], [], false);
goog.addDependency('../../../../src/plugins/wfstcontrols/facade/js/editattribute.js', ['P.control.EditAttribute'], [], false);
goog.addDependency('../../../../src/plugins/wfstcontrols/facade/js/modifyfeature.js', ['P.control.ModifyFeature'], [], false);
goog.addDependency('../../../../src/plugins/wfstcontrols/facade/js/savefeature.js', ['P.control.SaveFeature'], [], false);
goog.addDependency('../../../../src/plugins/wfstcontrols/facade/js/wfstcontrols.js', ['P.plugin.WFSTControls'], ['P.control.ClearFeature', 'P.control.DeleteFeature', 'P.control.DrawFeature', 'P.control.EditAttribute', 'P.control.ModifyFeature', 'P.control.SaveFeature', 'goog.events'], false);
goog.addDependency('../../../../src/plugins/wfstcontrols/impl/ol/js/clearfeature.js', ['P.impl.control.ClearFeature'], [], false);
goog.addDependency('../../../../src/plugins/wfstcontrols/impl/ol/js/deletefeature.js', ['P.impl.control.DeleteFeature'], ['P.impl.control.WFSTBase'], false);
goog.addDependency('../../../../src/plugins/wfstcontrols/impl/ol/js/drawfeature.js', ['P.impl.control.DrawFeature'], ['P.impl.control.WFSTBase'], false);
goog.addDependency('../../../../src/plugins/wfstcontrols/impl/ol/js/editattribute.js', ['P.impl.control.EditAttribute'], ['goog.events'], false);
goog.addDependency('../../../../src/plugins/wfstcontrols/impl/ol/js/modifyfeature.js', ['P.impl.control.ModifyFeature'], [], false);
goog.addDependency('../../../../src/plugins/wfstcontrols/impl/ol/js/savefeature.js', ['P.impl.control.SaveFeature'], ['goog.dom.classes', 'goog.dom.xml'], false);
goog.addDependency('../../../../src/plugins/wfstcontrols/impl/ol/js/wfstcontrolbase.js', ['P.impl.control.WFSTBase'], [], false);
goog.addDependency('../../../../src/plugins/wfstcontrols/impl/ol/js/wfstcontrols.js', ['P.impl.plugin.WFSTControls'], ['P.impl.control.ClearFeature', 'P.impl.control.DeleteFeature', 'P.impl.control.DrawFeature', 'P.impl.control.EditAttribute', 'P.impl.control.ModifyFeature', 'P.impl.control.SaveFeature', 'P.impl.control.WFSTBase', 'P.plugin.WFSTControls'], false);
goog.addDependency('../../../../src/plugins/wfstcontrols/test/deps.js', ['pruebaPlugin'], ['M', 'M.impl', 'P.impl.plugin.WFSTControls', 'goog.events', 'ol.format.WFS', 'ol.interaction.Draw', 'ol.interaction.Modify', 'ol.interaction.Select'], false);
goog.addDependency('../../../handlebars/handlebars.js', ['M.Handlebars'], [], false);
