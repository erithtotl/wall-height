import { MODULE_SCOPE, TOP_KEY, BOTTOM_KEY } from "./const.js";
import { getWallBounds,getSceneSettings } from "./utils.js";

const MODULE_ID = 'wall-height';
export function Patch_Token_onUpdate(func,data,options) {
    
    func.apply(this, [data,options]);
    const {advancedVision,advancedMovement} = getSceneSettings(canvas.scene);
    if(!advancedVision)
        return;
    const changed = new Set(Object.keys(data));
    
    // existing conditions that have already been checked to perform a sight layer update
    const visibilityChange = changed.has("hidden");
    const positionChange = ["x", "y"].some((c) => changed.has(c));
    const perspectiveChange = changed.has("rotation") && this.hasLimitedVisionAngle;
    const visionChange = [
            "brightLight",
            "brightSight",
            "dimLight",
            "dimSight",
            "lightAlpha",
            "lightAngle",
            "lightColor",
            "sightAngle",
            "vision",
    ].some((k) => changed.has(k));

    const alreadyUpdated =
        (visibilityChange || positionChange || perspectiveChange || visionChange) &&
        (this.data.vision || changed.has("vision") || this.emitsLight);

    // if the original _onUpdate didn't perform a sight layer update,
    // but elevation has changed, do the update now
    if (changed.has("elevation") && !alreadyUpdated) {
        this.updateSource(true);
        canvas.addPendingOperation("SightLayer.refresh", canvas.sight.refresh, canvas.sight);
        canvas.addPendingOperation("LightingLayer.refresh", canvas.lighting.refresh, canvas.lighting);
        canvas.addPendingOperation(`SoundLayer.refresh`, canvas.sounds.refresh, canvas.sounds);
    }
}
export function Patch_Walls()
{
    let currentTokenElevation = null;

    libWrapper.register(
        MODULE_ID, 'Token.prototype.updateSource',function Patch_UpdateSource(wrapped,...args) {
            // store the token elevation in a common scope, so that it can be used by the following functions without needing to pass it explicitly
        
            currentTokenElevation = this.data.elevation;
           wrapped(...args);
    //        currentTokenElevation = null;
        },'WRAPPER');

    libWrapper.register(
        MODULE_ID, 'WallsLayer.testWall', function Patch_TestWall (wrapped,ray,wall) {
            const { wallHeightTop, wallHeightBottom } = getWallBounds(wall);
            const {advancedVision,advancedMovement} = getSceneSettings(wall.scene);
            if (
                currentTokenElevation == null || !advancedVision ||
                (currentTokenElevation >= wallHeightBottom && currentTokenElevation < wallHeightTop)
            ) {
                return wrapped(ray,wall);
            } else {
                return null;
            }
        });
}
