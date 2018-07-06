import TextPath from "./textpath";
import Utils from "facade/js/utils/utils";
import StyleLine from "facade/js/style/styleline";
/**
 * @namespace M.impl.postrenderer
 */
export default class RenderUtils {

  /**
   * Post render event method.<br />
   * Handles additional renderings after default ol style render.<br />
   *
   * <b>NOTICE</b> that this method is binded to vector layer, so
   * the context used inside method will be the olLayer (this = olLayer)
   *
   * @public
   * @see https://github.com/Viglino/ol3-ext/blob/gh-pages/style/settextpathstyle.js#L138
   * @function
   * @param {Object} e received event with framestate
   * @api stable
   */
  constructor(e = null) {

    // add support for textpath
    if (Utils.isUndefined(CanvasRenderingContext2D.prototype.textPath)) {
      CanvasRenderingContext2D.prototype.textPath = Textpath.render;
    }

    // Prevent drawing at large resolution
    if (e.frameState.viewState.resolution > this.textPathMaxResolution_) return;

    let extent = e.frameState.extent;

    let ctx = e.context;
    ctx.save();
    ctx.scale(e.frameState.pixelRatio, e.frameState.pixelRatio);

    if (this.getSource() != null && this.getSource().getFeatures().length == 0) {
      return false;
    }
    // gets features in extent
    this.getSource().getFeaturesInExtent(extent).forEach((feature) => {
      let selectedStyle = feature.getStyle() != null ? feature.getStyle() : this.getStyle();
      let styles = typeof selectedStyle === 'function' ? selectedStyle(feature, e.frameState.viewState.resolution) : selectedStyle;
      if (!(styles instanceof Array)) {
        styles = [styles];
      }
      styles.forEach((style) => {
        let geom = (style instanceof StyleLine ? style.options_.geometry : style.getGeometry()) || feature.getGeometry();
        let coords;
        switch (geom.getType()) {
          case 'MultiLineString':
            coords = geom.getLineString(0).getCoordinates();
            break;
          default:
            coords = geom.getCoordinates();
        }

        // add support for textpath
        let textStyle = (style instanceof StyleLine) ? style.options_.text : style.textPath;
        if (textStyle != null && textStyle instanceof TextPath) {
          TextPath.draw(ctx, e.frameState.coordinateToPixelTransform, textStyle, coords);
        }

        // add support for charts
        // if (feature.getGeometry() != null && (style instanceof ol.style.Style && style.getImage() != null && style.getImage())) {
        //   let imageStyle = style.getImage();
        //   if (imageStyle instanceof M.impl.style.OLChart) {
        //     imageStyle.forceRender_(feature, style, e.vectorContext);
        //   }
        //   else if (imageStyle instanceof M.impl.style.PointCircle ||
        //     imageStyle instanceof M.impl.style.PointIcon ||
        //     imageStyle instanceof M.impl.style.PointFontSymbol) {
        //     if (imageStyle.forceGeometryRender_) {
        //       imageStyle.forceRender_(feature, style, e.vectorContext);
        //     }
        //   }
        // }
      });
    });
    ctx.restore();
  }
}
