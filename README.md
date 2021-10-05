# Wall Height (Enhanced)

Thank you to Cole Schultz (cole#9640) for the original implementation. I  have now taken over the Module.

*If you enjoy this module, please upvote or comment on the [Gitlab Issue](https://gitlab.com/foundrynet/foundryvtt/-/issues/1829) for it to be added to core so that this feature can get the support it deserves.*

Adds the ability to set wall height for walls so that tokens can look over them (or under them).  3.5 adds the ability to MOVE over and under walls as well.

3.5 also adds the ability to enable this feature on a scene by scene basis, as many maps may find it unnecessary.

Some new features added by the community.  Token height functionality (enabled in Module settings).  This allows tokens to look over walls.  This may not be compatible with all modules so use at your own risk.

Also received a community spanish translation!

![Preview](scene-config.png)

The top and bottom heights of the walls are configurable in the wall configuration dialog.

![Preview](wall-height.gif)

Finally, 3.5 adds a Macro Compendium, with a Set Elevation macro, which allows for quick updating of the elevation of multiple tokens, handy when the party is moving to different levels on a multilevel map.

With 3.5.2, the Set Elevation macro has been modified to support Multilevel Tokens (https://foundryvtt.com/packages/multilevel-tokens/) (can accept one or two parameters for entry and exit elevations).

In addition, libWrapper support has been introduced to improve module compatability.

## Project Status

Wall Height was originally released as a proof of concept to show that just a feature was possible by (cole#9640). I am now maintaining and adding to this modules and accepting feature requests.

In addition to adding movement and the scene by scene enablement, I have update the code to use the latest vision refresh methods.

A couple of future ideas:
1) Implement some sort of wall library feature so that you can select from a number of pre-configured walls instead of having to set them by hand
2) Mouse over for walls in the wall interface, so you can see the heights without having to drill in
3) better support for lighting.  Currently, wall height does not affect lighting visibility (so if you are under the ground in a hallway, but there is a light above ground, the stretch of hallway you can see that intersects with the light will be illuminated.

## Compatibility

This module is likely incompatible with modules which modify token vision.

## License

Licensed under the GPLv3 License (see [LICENSE](LICENSE)).
