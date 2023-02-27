var totalnumberofmembers=16;
var totalnumberofversions=7;
var totalnumberofconditions=3;
var cond=[false,false,false]; //008 near 080; 052 near 097; 087 sleeping
var l=[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false];
var originality=[true,false,true,true,true,true,true,true,true,true,true,false,false,false,false,false,false,false,false];
var vers=3;
var colorlight=["#80ffa0","#008040","white","gray","#0080ff","#d07000","#8000ff","#e0a0ff","black","#00ffd0","#008070"];
var colordark=["#008040","#80ffa0","black","lightgray","#00b0ff","#ff8000","#e0a0ff","#8000ff","white","#008070","#00ffd0"];
var colors=colorlight;
var them="Light";

function activate(i){
  console.log(`v${i}`);
  var e=document.getElementById(`v${i}`);
  if(originality[i]){
    e.style.backgroundColor=colors[0];
    e.style.borderColor=colors[1];
  }
  else{
    e.style.backgroundColor=colors[9];
    e.style.borderColor=colors[10];
  }
  l[i]=true;
}

function inactivate(i){
  var e=document.getElementById(`v${i}`);
  e.style.backgroundColor=colors[2];
  e.style.borderColor=colors[3];
  l[i]=false;
}

function activatec(i){
  e=document.getElementById(`c${i}`);
  e.style.borderColor=colors[4];
  e.innerHTML='Yes';
  cond[i]=true;
}

function inactivatec(i){
  e=document.getElementById(`c${i}`);
  e.style.borderColor=colors[5];
  e.innerHTML='No';
  cond[i]=false;
}

function setversion(v){
  e=document.getElementById(`r${vers}`);
  e.style.borderColor=colors[3];
  e.style.backgroundColor=colors[2];
  e=document.getElementById(`r${v}`);
  e.style.borderColor=colors[6];
  e.style.backgroundColor=colors[7];
  e=document.getElementById('cc0');
  if(v<=2)e.style.display='none';
  else e.style.display='inline';
  e=document.getElementById('cc1');
  if(v<=3||v>=5)e.style.display='none';
  else e.style.display='inline';
  e=document.getElementById('cc2');
  if(v<=3)e.style.display='none';
  else e.style.display='inline';
  vers=v;
}

function settheme(t){
  if(t=="Light"){
    e=document.getElementById("theme");
    e.innerHTML="Light";
    colors=colorlight;
    them="Light";
  }
  if(t=="Dark"){
    e=document.getElementById("theme");
    e.innerHTML="Dark";
    colors=colordark;
    them="Dark";
  }
  bd=document.querySelector("body");
  bd.style.backgroundColor=colors[2];
  bd.style.color=colors[8];
  vv=vers;
  for(var i=0;i<totalnumberofversions;i++){
    setversion(i);
  }
  setversion(vv);
  for(var i=0;i<totalnumberofmembers;i++){
    if(l[i])activate(i);
    else inactivate(i);
  }
  for(var i=0;i<totalnumberofconditions;i++){
    if(cond[i])activatec(i);
    else inactivatec(i);
  }
  document.querySelector("h1").style.borderColor=colors[3];
  document.querySelector("#ans").style.borderColor=colors[3];
  document.querySelector("#theme").style.borderColor=colors[3];
}

function update(){
  var re=0;
  var hf=0;
  var pi=0;
  var im=0;
  var kp=0;
  var kappa=100**Math.random()/10-0.1;
  if(Math.random()<0.3)kappa*=-1;
  if(l[0]){
    if(vers<=0)re+=1;
    else re-=2;
  }
  if(l[1])re+=1;
  if(l[2]){
    if(vers<=2)re+=1;
    else pi+=1;
  }
  if(l[3]){
    if(vers<=1)re+=1;
    else if(vers<=2)re+=2;
    else{
      if(cond[0])re+=2;
      else re+=1;
    }
  }
  if(l[4]){
    if(vers<=3)re+=1;
    else{
      if(!cond[2])re+=2;
    }
  }
  if(l[5]){
    if(vers<=3)re+=1;
    else if(vers<=4){
      if(cond[0]&&(!cond[1]))re+=2;
      else if((!cond[0])&&cond[1])hf+=1;
      else re+=1;
    }
    else{
      if(cond[0])re+=2;
      else re+=1;
    }
  }
  if(l[6])re+=1;
  if(l[7]){
    if(vers<=1)re+=1;
    else{
      if(!l[6])re+=1;
    }
  }
  if(l[8]){
    if(vers<=0)re+=1;
    else{
      if(vers<=5)im+=1;
      else{
        im-=1;
        re+=1;
      }
    }
  }
  if(l[9]){
    if(vers<=0)re+=1;
  }
  if(l[10]){
    if(vers<=4)re+=1;
    else kp+=1;
  }
  if(l[11]){
    re+=16;
  }
  if(l[12]){
    re+=8;
  }
  if(l[13]){
    re+=4;
  }
  if(l[14]){
    re+=2;
  }
  if(l[15]){
    re+=1;
  }
  var c=0;
  for(var i=0;i<totalnumberofmembers;i++){
    if(l[i])c+=1;
  }
  var a='';
  halves=hf+re*2;
  if(halves%2==0){
    re=halves/2;
    a+=re.toString();
  }
  else{
    re=halves/2;
    a+=halves.toString()+'/2';
  }
  if(pi==1){
    a+='+π';
    if(vers>3){
      d=2**(vers-3);
      a+=`/${d}`
      pi=pi/d;
    }
  }
  if(im==1){
    a+='+i';
  }
  if(im==-1){
    a+='-i';
  }
  if(kp==1){
    a+='+κ';
  }
  if(re==0&&a!='0')a=a.slice(1);
  if(a[0]=='+')a=a.slice(1);
  document.getElementById('num').innerHTML=c.toString();
  document.getElementById('value').innerHTML=a;
  t=Math.sqrt((re+pi*Math.PI+kp*kappa)**2+im**2);
  document.getElementById('abs').innerHTML=t.toFixed(2);
}

for(var i=0;i<totalnumberofmembers;i++){
  document.getElementById(`v${i}`).addEventListener('click',(event)=>{
    p=(Number)(event.target.id.slice(1));
    if(!l[p]){
      activate(p);
    }
    else{
      inactivate(p);
    }
    update();
  });
}

for(var i=0;i<totalnumberofconditions;i++){
  document.getElementById(`c${i}`).addEventListener('click',(event)=>{
    p=(Number)(event.target.id.slice(1));
    if(!cond[p]){
      activatec(p);
    }
    else{
      inactivatec(p);
    }
    update();
  });
}

for(var i=0;i<totalnumberofversions;i++){
  document.getElementById(`r${i}`).addEventListener('click',(event)=>{
    p=(Number)(event.target.id.slice(1));
    console.log(p);
    setversion(p);
    update();
  });
}

document.getElementById("theme").addEventListener('click',(event)=>{
  if(them=="Light")settheme("Dark");
  else settheme("Light");
})

setversion(6);
settheme("Dark");
