jaws.assets.add("/public/images/shipsprite1.png");
jaws.assets.add("/public/images/rocks/a_0.png");
jaws.assets.add("/public/images/starfield.jpg");
jaws.assets.add("/public/images/shot.png");
jaws.assets.add("/public/images/explosion.png");

function SpaceGame(){
	function get_random(min, max){
	return Math.floor(Math.random() * (max-min))+min;
	}
	
	
	function handleAnalogControl(){
	/**	 socket.on("controller",function(command){
			starship+=command;
		});**/
	}
	function handleRemoteControl(){
		ws.onmessage = function(command){
			if(command.data=="apple"){
				createShot();
			}
			if(command.data=="right"){
				starship.x+=speed;
			}
			if(command.data=="left"){
				starship.x-=speed;
			}
	
			if(command.data=="up"){
				starship.y-=speed;
		
			}
			if(command.data=="down"){
				starship.y+=speed;
			}
		
		if(command.vector != undefined){
			starship.x+=command.vector.x;
			starship.y+=command.vector.y;
		 }
	}
		
		
	}
	
	function moveThings(){
		var pre_rock;
		rocks.forEach(function(rock)
		{
			if(rock.x<-50){
				
				rock.x = get_random(jaws.width+2,jaws.width+200);
				//rock.x = rock.x+pre_rock.scale_x;
				rock.y = jaws.height * Math.random()+2;
				//rock.y = rock.y+pre_rock.scale_y;
				pre_rock = rock;
			}
			rock.x-=1
		});
		
		bullets.forEach(function(bullet){
			
			if(jaws.isOutsideCanvas(bullet)){
				bullets.remove(bullet);
			}
			bullet.x+=bulletSpeed;
		});
	}
	
	
	
	function test(){
		//console.log("test");
		explosion.anim_default.index=0;
	}
	
	function createShot(){
		bullets.push(new jaws.Sprite({image:"/public/images/shot.png",x:starship.rect().right,y:starship.y,anchor:"right_center"}));
	}
	
	function createExplosion(){
		return new jaws.Animation({sprite_sheet:"/public/images/explosion.png",frame_size:[128,128],orientation:"right",frame_duration:35});
	}
	
	var starship;
	
	var bullets;
	var bulletSpeed=7;
	var rock1;
	var rock2;
	var rock3;
	var rocks;
	
	var explosionAnim;
	var explosion;
	var speed=2;
	var rocksCount = 5;
	var backgroundlayer;
	var explosionList;
	var fire;
	this.setup = function(){
		
		handleRemoteControl();
		backgroundlayer = new jaws.Parallax({repeat_x:true,repeat_y:true});
		backgroundlayer.addLayer({image:"/public/images/starfield.jpg",damping:1});
		
		bullets = new jaws.SpriteList();
		explosion = new jaws.Sprite({anchor:"top_left"});
		explosionlist = new jaws.SpriteList();
		explosion_anim = new jaws.Animation({sprite_sheet:"/public/images/explosion.png",frame_size:[128,128],orientation:"right",frame_duration:35});
		
		var fire=false;
		explosion.anim_default = explosion_anim.slice(0,16);
		rocks = new jaws.SpriteList();
		
		for(var i = 0;i<rocksCount;i++){
			rocks.push(new jaws.Sprite({image:"/public/images/rocks/a_0.png",x:Math.random()*jaws.width,y:Math.random()*jaws.height}));
		}
		
	
		var anim = new jaws.Animation({sprite_sheet:"/public/images/shipsprite1.png",frame_size:[64,64],orientation:"right",frame_duration:200})	
		starship = new jaws.Sprite({x:100,y:300,anchor:"right_center"});	
		starship.anim_default = anim.slice(6,9);
		starship.canFire = true;
		
	}
	
	

	this.draw = function (){
		jaws.clear();
		backgroundlayer.draw();
		bullets.draw();
		rocks.draw();
		starship.draw();
		explosionlist.draw();
	
		
		
		
	}
	
	function handleEx(){
		explosionlist.forEach(function(explosion1){
			explosion1.anim = explosion_anim;
			explosion1.setImage(explosion1.anim.next());
			explosion1.draw();
			if(explosion1.anim.atLastFrame()){
				explosionlist.remove(explosion1);
			}
		
		});
	}
	
	this.update = function (){
		starship.setImage(starship.anim_default.next());
		
		
		handleEx();
		

		backgroundlayer.camera_x+=0.5;
		moveThings();
		jaws.collideManyWithMany(bullets,rocks).forEach(function(pair){
			
			explosionlist.push(new jaws.Sprite({x:pair[1].x-50,y:pair[1].y-50}));
			
			explosion.setX(pair[1].x-50);
			explosion.setY(pair[1].y-50);
			explosion.draw();
		
			
			pair[1].x = get_random(jaws.width+2,jaws.width+200);
		
			pair[1].y = jaws.height * Math.random()+2;
			
			bullets.remove(pair[0]);
		
		});
		
	}
	
}
