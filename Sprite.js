function Sprite(x,y){
  this.g = 0;
  this.x = x;
  this.y = y;
  this.vx = 0;
  this.vy = 0;
  this.ax = 0;
  this.ay = 0;
  this.am = 0;
  this.width = 80;
  this.height = 80;
  this.angle = 270;
  this.vang = 0;
  this.color = "black";
  this.cooldown = 0;
  this.debug = true;
}

Sprite.prototype.desenhar = function (ctx) {
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

Sprite.prototype.desenharImg = function (ctx, img) {
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

Sprite.prototype.desenharBackground = function (ctx, img) {
   ctx.save();
   ctx.translate(this.x, this.y);
   ctx.drawImage(img, 0, 0, this.width, this.height);
   ctx.restore();
};



Sprite.prototype.mover = function (dt) {
  if(this.imgkey == "shot"){
    this.vy = this.vy + this.ay*dt;
    this.y = this.y + this.vy*dt;
  }
  this.vx = this.vx + this.ax*dt;
  this.x = this.x + this.vx*dt;
  this.vy = this.vy + this.ay*dt;
  this.y = this.y + this.vy*dt;

  if(this.cooldown>0) {
    this.cooldown -= 0.08 + dt;
  } else {
    this.cooldown = 0;
  }
};

Sprite.prototype.moverFundo = function (dt) {
  this.vy = 200  +  this.ay*dt;
  this.y = this.y + this.vy*dt;
  this.vx = this.vx + this.ax*dt;
  this.x = this.x + this.vx*dt;
};

Sprite.prototype.colidiuCom = function (alvo) {
  if(this.x + this.width < alvo.x)   return false;  // colisão pela esquerda
  if(this.x > alvo.x + alvo.width)   return false;  // colisão pela direita
  if(this.y + this.height < alvo.y)  return false;  //  colisão por cima
  if(this.y > alvo.y + alvo.height)  return false;  // colisão por baixo
  return true;
};

Sprite.prototype.colisaoCanto = function(dt){ 
 if(this.x <= 40){
      this.x = 40;
    }           
 if(this.x >= 960){
      this.x = 960;  
 }
 if(this.y <= 40 ){
     this.y = 40;
 }
 if(this.y >= 680){
     this.y = 680;
 }
};









