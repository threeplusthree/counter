var re=0;
var im=0;
var pi=0;
var n88=false;
var l=[false,false,false,false,false,false,false,false,false,false];

function activate(i){
  console.log(`v${i}`);
  var e=document.getElementById(`v${i}`);
  console.log(e);
  e.style.backgroundColor="#80ffa0";
  e.style.borderColor="#008040";
  l[i]=true;
  if(i==0){
    re-=2
  }
  if(i==1||i==4||i==5){
    re+=1
  }
  if(i==2){
    pi+=1
  }
  if(i==3){
    if(n88){
      re+=2
    }
    else{
      re+=1
    }
  }
  if(i==6){
    if(!l[7]){
      re+=1
    }
  }
  if(i==7){
    if(!l[6]){
      re+=1
    }
  }
  if(i==8){
    im+=1
  }
}

function inactivate(i){
  var e=document.getElementById(`v${i}`);
  e.style.backgroundColor="white";
  e.style.borderColor="gray";
  l[i]=false;
  if(i==0){
    re+=2
  }
  if(i==1||i==4||i==5){
    re-=1
  }
  if(i==2){
    pi-=1
  }
  if(i==3){
    if(n88){
      re-=2
    }
    else{
      re-=1
    }
  }
  if(i==6){
    if(!l[7]){
      re-=1
    }
  }
  if(i==7){
    if(!l[6]){
      re-=1
    }
  }
  if(i==8){
    im-=1
  }
}

function activaten88(){
  e=document.getElementById('n88');
  e.style.borderColor='#0080ff';
  e.innerHTML='Yes';
  n88=true;
  if(l[3]){
    re+=1;
  }
}

function inactivaten88(){
  e=document.getElementById('n88');
  e.style.borderColor='#ff8000';
  e.innerHTML='No';
  n88=false;
  if(l[3]){
    re-=1;
  }
}

function update(){
  var a='';
  a+=re.toString();
  if(pi==1){
    a+='+π';
  }
  if(im==1){
    a+='+i';
  }
  if(re==0&&(pi!=0||im!=0)){
    a=a.slice(2);
  }
  document.getElementById('value').innerHTML=a;
  t=Math.sqrt((re+pi*Math.PI)**2+im**2);
  document.getElementById('abs').innerHTML=t.toFixed(2);
}

for(var i=0;i<10;i++){
  document.getElementById(`v${i}`).addEventListener('click',(event)=>{
    p=(Number)(event.target.id[1])
    if(!l[p]){
      activate(p);
    }
    else{
      inactivate(p);
    }
    update();
  });
}

document.getElementById('n88').addEventListener('click',(event)=>{
  if(!n88){
    activaten88();
  }
  else{
    inactivaten88();
  }
  update();
});
