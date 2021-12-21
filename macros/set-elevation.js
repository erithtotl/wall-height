let applyChanges = false;

if(args && args.length>0){
console.log(args);
  let enterval=parseFloat(args[0]);
  let exitval= args.length>1?parseFloat(args[1]):null;
  let moveval= args.length>2?parseFloat(args[2]):null;
  let elevation=0;
  if(event && event === MLT.ENTER)
    elevation = enterval;
  else if(event && event === MLT.LEAVE)
    elevation = exitval;
  else if(event && event === MLT.MOVE)
    elevation = moveval;
  token.update({
   "elevation": elevation
  });
}
else
{
    new Dialog({
    title: `Token Elevation Changer`,
    content: `
      <form>
        <div class="form-group">
          <label>Elevation Value:</label>
          <input id="token-elevation" name="token-elevation" type="number" step="1" value="0"/>
        </div>
      </form>
      `,
    buttons: {
      yes: {
        icon: "<i class='fas fa-check'></i>",
        label: `Apply Changes`,
        callback: () => applyChanges = true
      },
      no: {
        icon: "<i class='fas fa-times'></i>",
        label: `Cancel Changes`
      },
    },
    default: "yes",
    close: html => {
      if (applyChanges) {
        for ( let token of canvas.tokens.controlled ) {
        let elevation = html.find('[name="token-elevation"]')[0].value || "0";
        token.update({
            "elevation": parseFloat(elevation)
        });
        //token.data.elevation=parseInt(elevation);

        }
      }
    }
  }).render(true);
}
