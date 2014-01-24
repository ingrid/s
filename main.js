require.config({
  baseUrl:"jam/",
});

require(["jam", "../lib/sylvester"], function(jam, syl) {
  jam.config({dataDir:"data/"});

  var lh = 177;
  var lw = 159;

  var walk = new jam.Sprite.Animation([0, 1, 0, 2], 10, 0, 0, function(){
      });
  var slow_walk = new jam.Sprite.Animation([0, 1, 0, 2], 2, 0, 0, function(){
      });
  var make_nutmeg = function(){
    var n = new jam.Sprite(0, 0);
    n.setImage("nutmeg.png", 16, 18);
    n.walk = walk;
    n.idle = new jam.Sprite.Animation([0], 0);

    n.on('update', function(dt){
            n.playAnimation(n.walk);
        });
    return n;
  };
  var make_large_nutmeg = function(){
    var n = new jam.Sprite(0, 0);
    n.setImage("nutmeg-large-walk.png", 160, 180);
    n.walk = walk;
    n.idle = new jam.Sprite.Animation([0], 0);

    n.on('update', function(dt){
            n.playAnimation(n.walk);
        });
    return n;
  };

  var make_static_nutmeg = function(frame, g){
    var n = new jam.Sprite(0, 0);
    n.setImage("nutmeg-large-walk.png", 160, 180);
    n.idle = new jam.Sprite.Animation([frame], 0);

    n.on('update', function(dt){
      n.playAnimation(n.idle);
    });
    return n;
  };

  var main = function() {
      /** /
    fullyAnimated();
    giantAnimated();
    slowGiantAnimated();
    giantFrames();
    walkSheet();
    walkSheetLines();
    /**/
    fullSheet();
    demo();
  };

  var fullyAnimated = function() {
    var g = new jam.Game(16, 18, document.getElementById('fully-animated'));

	var s = g.root.scene;
    var n = make_nutmeg();

    s.add(n);
    g.hasFocus = true;
	g.run();
  };


  var giantAnimated = function() {
    var g = new jam.Game(lw, lh, document.getElementById('giant-animated'));

	var s = g.root.scene;

    var n = make_large_nutmeg();

    s.add(n);
    g.hasFocus = true;
	g.run();
  };

  var slowGiantAnimated = function() {
      var g = new jam.Game(lw, lh, document.getElementById('slow-giant-animated'));

	var s = g.root.scene;

    var n = make_large_nutmeg();

    n.walk = slow_walk;

    s.add(n);
    g.hasFocus = true;
	g.run();
  };

  var giantFrame = function(i, f) {
      var g = new jam.Game(lw, lh, document.getElementById('giant-frame-' + i));

	var s = g.root.scene;

    var n = make_static_nutmeg(f, g);

    s.add(n);
    g.hasFocus = true;
	g.run();
  };

  var giantFrames = function(){
      giantFrame(0, 0);
      giantFrame(1, 1);
      giantFrame(2, 0);
      giantFrame(3, 2);
  };

  var walkSheet = function(){
      var g = new jam.Game(lw * 3, lh, document.getElementById('walk-sheet'));

	var s = g.root.scene;

    var n = make_static_nutmeg(0);
    n.width = lw * 3;
    s.add(n);
    g.hasFocus = true;
	g.run();
  };

  var walkSheetLines = function(){
      var g = new jam.Game(lw * 3, lh, document.getElementById('walk-sheet-lines'));

	var s = g.root.scene;

      g.on('render', function(dt){
              var ctx = g._context;
              ctx.strokeStyle="#0000FF";
              ctx.lineWidth = 1.0;

              // Frame borders.
              ctx.beginPath();
              ctx.setLineDash([2,3]);
              ctx.moveTo(0, 0);
              ctx.lineTo(0, lh);
              ctx.lineTo(lw * 3, lh);
              ctx.lineTo(lw * 3, 0);
              ctx.lineTo(0, 0);
              ctx.moveTo(lw, 0);
              ctx.lineTo(lw, lh);
              ctx.moveTo(lw * 2, 0);
              ctx.lineTo(lw * 2, lh);

              ctx.stroke();

              var buff = 10;

              // Arrows
              ctx.setLineDash([1, 0])
              for (var i=0;i<3;i++){
                  var b = lw * i;
                  ctx.beginPath();
                  ctx.strokeStyle="#FF0000";
                  ctx.fillStyle="#FF0000";
                  ctx.moveTo(2 + b, buff);
                  ctx.lineTo(50 + b, buff);
                  ctx.moveTo(100 + b, buff);
                  ctx.lineTo(lw - 2 + b, buff);

                  ctx.moveTo(5 + b, buff);
                  ctx.lineTo(5 + b, buff - 2);
                  ctx.lineTo(2 + b, buff);
                  ctx.lineTo(5 + b, buff + 2);
                  ctx.closePath();

                  ctx.moveTo(lw - 2 - 3 + b, buff);
                  ctx.lineTo(lw - 3 - 3 + b, buff - 2);
                  ctx.lineTo(lw - 2 + b, buff);
                  ctx.lineTo(lw - 2 - 3 + b, buff + 2);
                  ctx.closePath();
                  ctx.fill();

                  ctx.stroke();

                  ctx.strokeText('16 pixels', 54 + b, 10);
                  }

              for (var i=0;i<3;i++){
                  var b = lw * i;
                  ctx.beginPath();
                  ctx.strokeStyle="#FF0000";
                  ctx.fillStyle="#FF0000";
                  ctx.moveTo(lw - buff + b, 2);
                  ctx.lineTo(lw - buff + b, 80);
                  ctx.moveTo(lw - buff + b, 100);
                  ctx.lineTo(lw - buff + b, lh - 2);

                  ctx.moveTo(lw - buff + b, 2);
                  ctx.lineTo(lw - buff - 2 + b, 4);
                  ctx.lineTo(lw - buff + b, 4);
                  ctx.lineTo(lw - buff + 2 + b, 4);
                  ctx.closePath();

                  ctx.moveTo(lw - buff + b, lh - 2);
                  ctx.lineTo(lw - buff - 2 + b, lh - 4);
                  ctx.lineTo(lw - buff + b, lh - 4);
                  ctx.lineTo(lw - buff + 2 + b, lh - 4);
                  ctx.closePath();

                  ctx.fill();
                  ctx.stroke();

                  ctx.strokeText('18 pixels', 115 + b, 93);
              }

          });

    var n = make_static_nutmeg(0);
    n.width = lw * 3;
    s.add(n);
    g.hasFocus = true;
	g.run();
  };

  var fullSheet = function() {
      var g = new jam.Game(lw * 4, lh, document.getElementById('full-sheet'));

      var n = new jam.Sprite(0, 0);
      n.setImage("nutmeg-large-full.png", lw * 4, lh);
      n.idle = new jam.Sprite.Animation([0], 0);

      n.on('update', function(dt){
              n.playAnimation(n.idle);
          });

	var s = g.root.scene;
      s.add(n);
      g.run();
  };

  var demo = function() {
      var g = new jam.Game(96, 112, document.getElementById('demo'));

	var s = g.root.scene;


    var n = make_nutmeg();
      n.acceleration.y = 80;
      n.x = 50;
      n.y = 50;
      n.jump = new jam.Sprite.Animation([3], 0, 0, 0, function(){
           });
      n.false = true;
    n.on('update', function(dt){
            if (Math.floor(n.y) === 94){
                n.jumping = false;
            }

                n.playAnimation(n.idle);
                n.velocity.x = 0;
            if(jam.Input.down("LEFT")){
                n.velocity.x = -20;
                n.playAnimation(n.walk);
                n.facing = jam.Sprite.LEFT;
            }
            if(jam.Input.down("RIGHT")){
                n.velocity.x = 50;
                n.playAnimation(n.walk);
                n.facing = jam.Sprite.RIGHT;
            }
            if(jam.Input.down("UP")){
                n.velocity.y = -40;
                n.jumping = true;
            }

            if (n.jumping){
                n.playAnimation(n.jump);
            }
            jam.Rect.collide(n, tm);
        });

    s.add(n);

      var tm = new jam.TileMap(16, "tiles.png");
      tm.x = -16;
      tm.y = 0;

	var level = "3,0,0,0,0,0,0,3\n" +
	  "3,0,0,0,0,0,0,3\n" +
	  "3,0,0,0,0,0,0,3\n" +
	  "3,0,0,0,0,0,0,3\n" +
      "3,0,0,0,0,0,0,3\n" +
	  "3,0,0,0,0,0,0,3\n" +
	  "3,0,0,0,0,0,0,3\n" +
	  "3,3,3,3,3,3,3,3\n";

      tm.loadCSV(level);

      s.add(tm);

    g.hasFocus = true;
	g.run();
  };

  var preload = function() {
    jam.preload("nutmeg.png");
    jam.preload("nutmeg-large-walk.png");
    jam.preload("tiles.png");
	jam.showPreloader(main);
  };

  preload();
});
