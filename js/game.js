/**
 * Created by keith on 12/24/16.
 */
window.onload = function () {
	var renderer = PIXI.autoDetectRenderer(512, 512);

	document.getElementById("game").appendChild(renderer.view);

	var stage = new PIXI.Container();

	renderer.render(stage);

}