function Enemy(x,y){
  this.g = 0;
  this.x = x;
  this.y = y;
  this.vx = 0;
  this.vy = 0;
  this.ax = 0;
  this.ay = 0;
  this.am = 0;
  this.width = 64;
  this.height = 64;
  this.angle = 270;
  this.debug = true;
  this.comportamento;
  this.linhaDeRespawn;
}
 
Enemy.prototype.desenhar = function (ctx) {
  ctx.save();
  ctx.translate(this.x, this.y);
  ctx.rotate(this.angle*2*Math.PI/360);
  ctx.fillStyle = this.color;
  ctx.beginPath();
  ctx.moveTo(-this.width/2, -this.height/2);
  ctx.lineTo(-this.width/2, +this.height/2);
  ctx.lineTo(+this.width/2, 0);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = "black";
  ctx.stroke();
  ctx.strokeStyle = "grey";
  ctx.strokeRect(-this.width/2, -this.height/2, this.width, this.height);
  ctx.restore();
};

Enemy.prototype.desenharImg = function (ctx, img) {
  ctx.save();
  ctx.translate(this.x, this.y);
  ctx.rotate(this.angle*2*Math.PI/360);
  ctx.rotate(Math.PI/2);
  ctx.fillStyle = this.color;
  ctx.drawImage(img, -this.width/2, -this.height/2, this.width, this.height);
  if(this.debug){
    ctx.strokeStyle = "black";
    ctx.strokeRect(-this.width/2, -this.height/2, this.width, this.height);
    //ctx.fillRect(-this.width/2, -this.height/2, this.width, this.height);
  }
  ctx.restore();
};

Enemy.prototype.comportamentoA = function (dt) {
  this.vx = this.vx + this.ax*dt;
  this.vy = this.vy + (this.ay+this.g)*dt;
  this.x = this.x + this.vx*dt;
  this.y = this.y + this.vy*dt;
};

Enemy.prototype.comportamentoC = function (dt) {
  this.vx = this.vx + this.ax*dt;
  this.vy = this.vy + (this.ay+this.g)*dt;

  if(this.linhaDeRespawn == 1){
    this.y = this.y + this.vy*dt;
    this.x = this.x + this.vx*dt;
    if(this.y > 500)
       this.x = this.x + ((this.vx*dt) + 2);
  }
  else if(this.linhaDeRespawn == 4){
    this.y = this.y + this.vy*dt;
    this.x = this.x + this.vx*dt;
    if(this.y > 500)
       this.x = this.x - ((this.vx*dt) + 2);
  }
};

Enemy.prototype.comportamentoB = function (dt) {
  if(this.linhaDeRespawn == 2){
    this.y = this.y + this.vy*dt;
    this.x = this.x + this.vx*dt;
    if(this.y > 500){ 
      this.angle = 75;
      this.x = this.x + ((this.vx*dt) + 2);
    } else{
       this.vx = this.vx + this.ax*dt;
       this.vy = this.vy + (this.ay+this.g)*dt;
    } 
  }
  else if(this.linhaDeRespawn == 3){
    this.y = this.y + this.vy*dt;
    this.x = this.x + this.vx*dt;
    if(this.y > 500)
       this.angle = 125;
       this.x = this.x - ((this.vx*dt) + 2);
  }else{
     this.vx = this.vx + this.ax*dt;
     this.vy = this.vy + (this.ay+this.g)*dt;
  }
};

Enemy.prototype.colidiuCom = function (alvo) {
  if(this.x + this.width/2  < alvo.x - alvo.width/2 )  return false;  // colisão pela esquerda
  if(this.x - this.width/2  > alvo.x + alvo.width/2 )  return false;  // colisão pela direita
  if(this.y - this.height/2 > alvo.y + alvo.height/2)  return false;  // colisão por  cima
  if(this.y + this.height/2 < alvo.y - alvo.height/2)  return false;  // colisão por  baixo
  return true;
};











