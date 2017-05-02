function Level (){
  this.enemys = [];
  this.shots = [];
  this.colunas = 3;
}

Level.prototype.init = function () {
};

Level.prototype.spawn = function(){
  for (var i = 0; i < this.colunas; i++) {
          var inimigo = new Enemy();
          var eixoX = Math.floor(Math.random() * (250 + 1) + 50);
           if(i == 1){
             eixoX = eixoX + 264;
           }
            if(i == 2){
             eixoX = eixoX + 564;
           }
          var eixoY = 80 ;

          inimigo.x = eixoX;
          inimigo.y = eixoY;
          inimigo.width = 64;
          inimigo.height = 64;
          inimigo.angle = 90;
          inimigo.am = 00;
          inimigo.g = 30;
          inimigo.imgkey = "enemy";
          this.enemys.push(inimigo);
        
    
    }
};

Level.prototype.destroy = function(indice){
    for (var i = 0; i < this.enemysCont; i++) {
         this.enemys.splice(indice , 1);
    }
};

Level.prototype.mover = function (dt) {
    for (var i = 0; i < this.enemys.length; i++) {
         this.enemys[i].mover(dt);
      if(
        this.enemys[i].x >  3000 ||
        this.enemys[i].x < -3000 ||
        this.enemys[i].y >  780 ||
        this.enemys[i].y < -3000
      ){
        this.destroy(i);
      }
    }
    for (var i = this.shots.length-1;i>=0; i--) {
      this.shots[i].mover(dt);
      if(
        this.shots[i].x >  3000 ||
        this.shots[i].x < -3000 ||
        this.shots[i].y >  3000 ||
        this.shots[i].y < -3000
      ){
        this.shots.splice(i, 1);
      }
    }
    if(this.enemys.length <= 0){
      this.spawn();
    }
};

Level.prototype.moverAng = function (dt) {
    for (var i = 0; i < this.enemys.length; i++) {
      this.enemys[i].moverAng(dt);
    }
    for (var i = this.shots.length-1; i >= 0; i--) {
      this.shots[i].moverAng(dt);
      if(
        this.shots[i].x >  3000 ||
        this.shots[i].x < -3000 ||
        this.shots[i].y >  3000 ||
        this.shots[i].y < -3000
      ){
        this.shots.splice(i, 1);
      }
    }
};

Level.prototype.desenhar = function (ctx) {
    for (var i = 0; i < this.enemys.length; i++) {
      this.enemys[i].desenhar(ctx);
    }
    for (var i = 0; i < this.shots.length; i++) {
      this.shots[i].desenhar(ctx);
    }
};
Level.prototype.desenharImg = function (ctx,imageLib) {
    for (var i = 0; i < this.enemys.length; i++) {
      this.enemys[i].desenharImg(ctx,imageLib.images[this.enemys[i].imgkey]);
    }
    for (var i = 0; i < this.shots.length; i++) {
      this.shots[i].desenharImg(ctx,imageLib.images[this.shots[i].imgkey]);
    }
};

Level.prototype.colidiuCom = function (alvo, resolveColisao) {
    for (var i = 0; i < this.enemys.length; i++) {
      if(this.enemys[i].colidiuCom(alvo)){
        resolveColisao(this.enemys[i], alvo);
      }
    }
};

Level.prototype.perseguir = function (alvo, dt) {
  for (var i = 0; i < this.enemys.length; i++) {
    this.enemys[i].perseguir(alvo,dt);
  }
};


Level.prototype.fire = function (alvo, audiolib, key, vol){
  if(alvo.cooldown>0) return;
  var tiro = new Sprite();
  tiro.x = alvo.x;
  tiro.y = alvo.y;
  tiro.angle = alvo.angle;
  tiro.am = 100;
  tiro.width = 8;
  tiro.height = 16;
  tiro.imgkey = "shot";
  this.shots.push(tiro);
  alvo.cooldown = 1;
  if(audiolib && key) audiolib.play(key,vol);
}

Level.prototype.colidiuComTiros = function(al, key){
  for(var i = this.shots.length-1; i>=0; i--){

    this.colidiuCom(this.shots[i],
      (
        function(that)
        {
          return function(alvo){
            alvo.color = "green";
            that.shots.splice(i,1);
            x = that.enemys.indexOf(alvo);
            that.enemys.splice(x, 1);
            if(al&&key) al.play(key);
          }
        }
      )(this));
  }
}


//
