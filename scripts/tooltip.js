import { MODULE_SCOPE, TOP_KEY, BOTTOM_KEY,ENABLE_ADVANCED_VISION_KEY,ENABLE_ADVANCED_MOVEMENT_KEY } from "./const.js";

/**
 * Converts the coordinates of a Point from one context to another
 *
 * @static
 * @param {PIXI.IPointData} point - The Point to convert
 * @param {PIXI.Container} context1 - The context the point is currently in
 * @param {PIXI.Container} context2 - The context to translate the point to
 * @return {PIXI.Point} A Point representing the coordinates in the second context
 * @memberof Translator
 */
function translatePoint(point, context1, context2) {
    const pt = new PIXI.Container();
    context1.addChild(pt);
    pt.position.set(point.x, point.y);
    const tp = context2.toLocal(new PIXI.Point(), pt);
    context1.removeChild(pt);
    return tp;
  }

export class WallHeightToolTip extends BasePlaceableHUD {

	static get defaultOptions() {
		const options = super.defaultOptions;
		options.classes = options.classes.concat(["wall-height-tooltip"]);
		options.template = "modules/wall-height/templates/tooltip.html";
		options.id = "wall-height-tooltip";
		return options;
	}

    getData() {
		const data = super.getData();
       return data;
    }

    setPosition() {
		if (!this.object) return;
        //let centerPoint=translatePoint(this.object.center,this.object.parent.parent,canvas.stage);
        const position = {
	        width: canvas.grid.size *1.2,
            height: canvas.grid.size *.8,
            left: this.object.center.x+20,
			top: this.object.center.y+20,
      "font-size": canvas.grid.size / 3.5 + "px",
      "display" : "grid"
        };
	    this.element.css(position);
    }
}
