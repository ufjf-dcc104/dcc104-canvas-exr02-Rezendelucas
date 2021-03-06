function Level (){
  this.enemys = [];
  this.shots = [];
  this.numberEnemys = 3;
  this.linhaDeRespawn = 1;
  //this.music = true;
  //this.end = false;

}

Level.prototype.init = function () {
};

Level.prototype.spawn = function(){
  var eixoX = 0;
  var eixoY = 0;
  for (var i = 0; i < this.numberEnemys; i++) {
          var ran = Math.random(0,2); 
          ran = parseInt(ran);
          var inimigo = new Enemy();
          if(this.linhaDeRespawn == 1){
             eixoX = 200;
             inimigo.comportamento = 2;
             inimigo.linhaDeRespawn = this.linhaDeRespawn;
          }else if(this.linhaDeRespawn == 2){
             eixoX = 400;
             inimigo.comportamento = 1;
             inimigo.linhaDeRespawn = this.linhaDeRespawn;
            }else if(this.linhaDeRespawn == 3){
               eixoX = 600;
               inimigo.comportamento = ran;
               console.log(ran);
               inimigo.linhaDeRespawn = this.linhaDeRespawn;
              }else if(this.linhaDeRespawn == 4){
                eixoX = 800;
                inimigo.comportamento = 2;
                inimigo.linhaDeRespawn = this.linhaDeRespawn;
              }
          eixoY = -80 * (i + 1);
          inimigo.x = eixoX;
          inimigo.y = eixoY;
          inimigo.width = 80;
          inimigo.height = 80;
          inimigo.angle = 90;
          inimigo.am = 00;
          inimigo.g = 0;
          inimigo.vy = 300;
          inimigo.imgkey = "enemy";
          this.enemys.push(inimigo);
    }
    if(this.linhaDeRespawn < 4)
        this.linhaDeRespawn++;
      else
        this.linhaDeRespawn = 1;
};

Level.prototype.mover = function (dt) {
    for (var i = 0; i < this.enemys.length; i++) {
          if(this.enemys[i].comportamento == 0){
             this.enemys[i].comportamentoA(dt)
          }else if(this.enemys[i].comportamento == 1){
             this.enemys[i].comportamentoB(dt)
          }else if(this.enemys[i].comportamento == 2){
             this.enemys[i].comportamentoC(dt)
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
    for(var i = this.enemys.length-1;i>=0; i--){
      if(
        this.enemys[i].x >  1000 ||
        this.enemys[i].x < -1000 ||
        this.enemys[i].y >  780 ||
        this.enemys[i].y < -1000
      ){
        this.enemys.splice(i, 1);
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

Level.prototype.colisoesPlayer = function (alvo, audiolib, key, vol, resolveColisao) {
    for (var i = 0; i < this.enemys.length; i++) {
      if(this.enemys[i].colidiuCom(alvo)){
        resolveColisao(this.enemys[i], alvo);
        this.enemys.splice(i,1);  
        if(audiolib && key)
               audiolib.play(key,vol);
      }
    }
    for (var i = 0; i < this.shots.length; i++) {
      if(this.shots[i].colidiuCom(alvo)){
        resolveColisao(this.shots[i], alvo);
        this.shots.splice(i,1);
        if(audiolib && key)
               audiolib.play(key,vol);  
      }
    }
};

Level.prototype.acertoDisparo = function (audiolib, key, vol,resolveColisao) {
    for (var i = 0; i < this.enemys.length; i++) {
      for (var j = 0; j < this.shots.length; j++){
          if(this.enemys[i].colidiuCom(this.shots[j])){
              resolveColisao(this.enemys[i], this.shots[j]);
              this.enemys.splice(i,1);
              this.shots.splice(j,1);
              if(audiolib && key)
                 audiolib.play(key,vol);
              break; 
           }
      }
    }
};


Level.prototype.perseguir = function (alvo, dt) {
  for (var i = 0; i < this.enemys.length; i++) {
    this.enemys[i].perseguir(alvo,dt);
  }
};

Level.prototype.perseguirAng = function (alvo, dt) {
   for (var i = 0; i < this.inimigos.length; i++) {
     this.inimigos[i].perseguirAng(alvo,dt);
   }
 };


Level.prototype.fire = function (alvo, audiolib, key, vol){
  if(alvo.cooldown>0) return;
  var tiro = new Sprite();
  tiro.x = alvo.x ;
  tiro.y = alvo.y - 40;
  tiro.angle = alvo.angle;
  tiro.vy = -900;
  tiro.width = 16;
  tiro.height = 32;
  tiro.imgkey = "shot";
  this.shots.push(tiro);
  alvo.cooldown = 1;
  if(audiolib && key) audiolib.play(key,vol);
}

Level.prototype.colidiuComTiros = function(al, key){
   var that = this;
  for(var i = this.shots.length-1; i>=0; i--){

    this.colidiuCom(this.shots[i],      
        function(inimigo){
            that.shots.splice(i,1);
            x = that.enemys.indexOf(inimigo);
            that.enemys.splice(x, 1);
            if(al&&key) al.play(key);
        }
      );
  }
};



Level.prototype.colidiuCom = function (alvo, resolveColisao) {
    for (var i = 0; i < this.enemys.length; i++) {
      if(this.enemys[i].colidiuCom(alvo)){
        resolveColisao(this.enemys[i], alvo);
      }
    }
};


//


