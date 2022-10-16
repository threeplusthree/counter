var totalnumberofmembers=10;
var totalnumberofversions=5;
var totalnumberofconditions=3;
var cond=[false,false,false]; //008 near 080; 052 near 097; 087 sleeping
var l=[false,false,false,false,false,false,false,false,false,false];
var vers=3;

function activate(i){
  console.log(`v${i}`);
  var e=document.getElementById(`v${i}`);
  console.log(e);
  e.style.backgroundColor="#80ffa0";
  e.style.borderColor="#008040";
  l[i]=true;
}

function inactivate(i){
  var e=document.getElementById(`v${i}`);
  e.style.backgroundColor="white";
  e.style.borderColor="gray";
  l[i]=false;
}

function activatec(i){
  e=document.getElementById(`c${i}`);
  e.style.borderColor='#0080ff';
  e.innerHTML='Yes';
  cond[i]=true;
}

function inactivatec(i){
  e=document.getElementById(`c${i}`);
  e.style.borderColor='#ff8000';
  e.innerHTML='No';
  cond[i]=false;
}

function setversion(v){
  e=document.getElementById(`r${vers}`);
  e.style.borderColor='gray';
  e.style.backgroundColor='white';
  e=document.getElementById(`r${v}`);
  e.style.borderColor='#8000ff';
  e.style.backgroundColor='#e0a0ff';
  e=document.getElementById('cc0');
  if(v<=2)e.style.display='none';
  else e.style.display='inline';
  e=document.getElementById('cc1');
  if(v<=3)e.style.display='none';
  else e.style.display='inline';
  e=document.getElementById('cc2');
  if(v<=3)e.style.display='none';
  else e.style.display='inline';
  vers=v;
}

function update(){
  var re=0;
  var hf=0;
  var pi=0;
  var im=0;
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
    else{
      if(cond[0]&&(!cond[1]))re+=2;
      else if((!cond[0])&&cond[1])hf+=1;
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
    else im+=1;
  }
  if(l[9]){
    if(vers<=0)re+=1;
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
  if(re==0&&(pi!=0||im!=0)){
    a=a.slice(2);
  }
  document.getElementById('num').innerHTML=c.toString();
  document.getElementById('value').innerHTML=a;
  t=Math.sqrt((re+pi*Math.PI)**2+im**2);
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

setversion(3);
