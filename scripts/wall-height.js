import { Patch_Token_onUpdate, Patch_Walls } from "./patches.js";
import { getWallBounds,getSceneSettings } from "./utils.js";
import { libWrapper} from '../shim.js';
import { WallHeightToolTip } from './tooltip.js';
import { MODULE_SCOPE, TOP_KEY, BOTTOM_KEY, ENABLE_ADVANCED_VISION_KEY, ENABLE_ADVANCED_MOVEMENT_KEY } from "./const.js";

const MODULE_ID = 'wall-height';
/*hooks.on("init", () => {
    Patch_Token_onUpdate();
    Patch_WallCollisions();
});
*/
Hooks.once("init",()=>{
    Patch_Walls();
    libWrapper.register(
        MODULE_ID, 'Token.prototype._onUpdate',Patch_Token_onUpdate,'WRAPPER');
    Hooks.on('renderHeadsUpDisplay', async (app, html, data) => {
            html.append('<template id="wall-height-tooltip"></template>');
            canvas.hud.wallHeight = new WallHeightToolTip();
    });

});

Hooks.on("hoverWall",(wall, hovered)=>{
    if (hovered) {
        canvas.hud.wallHeight.bind(wall);
    } else {
        canvas.hud.wallHeight.clear();
    }
});

/*Hooks.on('ready', async () => {


    Hooks.on('deleteToken', (...args) => {
        if (!canvas.hud.Wall) return;
        canvas.hud.Wall.clear();
    })
    
});
*/



Hooks.on("renderWallConfig", (app, html, data) => {
    const {advancedVision,advancedMovement} = getSceneSettings(canvas.scene);
    if(!advancedVision)
        return;
    const { wallHeightTop, wallHeightBottom } = getWallBounds(app.object);
    const topLabel = game.i18n.localize(`${MODULE_SCOPE}.WallHeightTopLabel`);
    const bottomLabel = game.i18n.localize(`${MODULE_SCOPE}.WallHeightBottomLabel`);
    const moduleLabel = game.i18n.localize(`${MODULE_SCOPE}.ModuleLabel`);

    html.find(".form-group").last().after(`
    <fieldset>
        <legend>${moduleLabel}</legend>
            <div class="form-group">
                <label>${topLabel}</label>
                <input name="flags.${MODULE_SCOPE}.${TOP_KEY}" type="text" data-dtype="Number" value="${wallHeightTop}">
            </div>
            <div class="form-group">
                <label>${bottomLabel}</label>
                <input name="flags.${MODULE_SCOPE}.${BOTTOM_KEY}" type="text" data-dtype="Number" value="${wallHeightBottom}">
            </div>
        </legend>
    </fieldset>
    `);
    app.setPosition({ height: "auto" });
});

Hooks.on("renderSceneConfig", (app, html, data) => {
    const {advancedVision,advancedMovement} = getSceneSettings(app.object);
    const enableVisionKeyLabel = game.i18n.localize(`${MODULE_SCOPE}.AdvancedVisionLabel`);
    const moduleLabel = game.i18n.localize(`${MODULE_SCOPE}.ModuleLabel`);
    //const enableMoveKeyLabel = game.i18n.localize(`${MODULE_SCOPE}.AdvancedMovementLabel`);
    html.find(".form-group").last().after(`
    <fieldset>
    <legend>${moduleLabel}</legend>
        <div class="form-group">
            <li class="flexrow">
                <label>${enableVisionKeyLabel}</label>
                <input name="flags.${MODULE_SCOPE}.${ENABLE_ADVANCED_VISION_KEY}" type="checkbox" data-dtype="boolean" value="true" `+ ((advancedVision || advancedVision==null)?`checked`:``)+`>
            </li>
        </div>
    </fieldset>`
    );
    //app.setPosition({ height: "auto" });
});



