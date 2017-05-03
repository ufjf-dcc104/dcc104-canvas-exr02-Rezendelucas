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
  this.sentido;
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
    ctx.strokeStyle = "grey";
    ctx.strokeRect(-this.width/2, -this.height/2, this.width, this.height);
  }
  ctx.restore();
};

Enemy.prototype.mover = function (dt) {
  this.vx = this.vx + this.ax*dt;
  this.vy = this.vy + (this.ay+this.g)*dt;
  this.x = this.x + this.vx*dt;
  this.y = this.y + this.vy*dt;
};

Enemy.prototype.moverZigZag = function (dt) {
  this.vx = this.vx + this.ax*dt;
  this.vy = this.vy + (this.ay+this.g)*dt;
  if(this.sentido == 1){
    this.x = this.x + 2 + (this.vx*dt);
  }
  else if(this.sentido == 2){
    this.x = this.x + -2 + (this.vx*dt);
  }else
    this.x = this.x  + (this.vx*dt);
  this.y = this.y + this.vy*dt;
};

Enemy.prototype.colidiuCom = function (alvo) {
  if(this.x+this.width < alvo.x) return false;
  if(this.x > alvo.x+this.width) return false;
  if(this.y+this.height < alvo.y) return false;
  if(this.y > alvo.y+this.height) return false;
  return true;
};











