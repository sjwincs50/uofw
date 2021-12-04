import kaboom from "kaboom";

// initialize context
kaboom({width:1024,height:768,stretch:true,letterbox:true});
const WIDTH=1024
const HEIGHT=768
// load assets
loadSprite("flappy", "sprites/flappy.png");
loadSprite("bg", "sprites/bg.png");

scene("main", () => {
	const JUMP_FORCE=800;
	const PIP_OPEN=240;
	const PIP_MIN=60;
	const SPEED=320;
	const CEILLING=-55

	layer(["bg","obj","ui"],"obj")
	gravity(3200);
	const flappy = add([sprite("flappy"),pos(WIDTH/4,0),area(),body(),]);
	add([sprite("bg"),pos(0,0),layer("bg"),])
	mouseClick(()=> {flappy.jump(JUMP_FORCE);})
	flappy.action(()=> {
		if (flappy.pos.y>=HEIGHT || flappy.pos.y<=CEILLING) {
			go("lose");
		}
	})
	function spawnPipe() {
		let h = rand(PIPE_MIN,HEIGHT-PIPE_MIN-PIPE_OPEN);
		let h0 = HEIGHT-h-PIPE_OPEN;
		add([pos(WIDTH,0),rect(64,h),color(111,67,80),area(),outline(4),move(LEFT,SPEED),cleanup(),"pipe"])
		add([pos(WIDTH,h+PIPE_OPEN),rect(64,h0),color(111,67,80),area(),outline(4),move(LEFT,SPEED),cleanup(),"pipe"])
	}
	loop(1,()=> {
		spawnPipe();
	})
	flappy.collides("pipe", ()=> {
		go("lose");
	})
scene("lose",()=> {
	add([sprite("bg"),pos(0,0)])
	add([sprite("flappy"),pos(WIDTH/2,HEIGHT/2 - 100)])
})
})
go("main");
