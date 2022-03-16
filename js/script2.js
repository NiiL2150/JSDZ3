//5-е задание выполнено в другом файле

function textChanged(){
  let formedStr = "";
  for (const char of digitlessInput.value) {
    if(char < '0' || char > '9'){
      formedStr+=char;
    }
  }
  digitlessInput.value = formedStr;
}

function toggleModal(){
  darkener.classList.toggle("hidden");
  coolModal.classList.toggle("hidden");
  setTimeout(function(){coolModal.classList.toggle("load")}, 2); //только так да работает
}

function pageOnLoad(){
  for (const item of svetofor.getElementsByTagName("*")) {
    lightList.push(item);
  }
  activeLight = lightList.length === 0 ? null : lightList[0];

  for (const item of document
    .getElementById("tooltip-buttons-container")
    .getElementsByClassName("button-container")) {
    let tooltip = document.createElement("div");
    tooltip.classList.add("tooltip");
    tooltip.classList.add("hidden");
    tooltip.textContent = 'Tooltip';
    item.getElementsByTagName("button")[0].onmouseover = ()=>{
      if(item.getBoundingClientRect().top<30){
        tooltip.classList.add("below");
      }
      else{
        tooltip.classList.remove("below");
      }
      tooltip.classList.toggle("hidden");
    };
    item.getElementsByTagName("button")[0].onmouseout = ()=>{
      tooltip.classList.toggle("hidden");
    };
    item.appendChild(tooltip);
  }
}

let lightList = [];
function nextLight(active){
  let activeIndex = lightList.indexOf(active);
  activeIndex++;
  activeIndex%=lightList.length;
  return lightList[activeIndex];
}
let activeLight;
function changeColor(){
  activeLight.classList.toggle("active");
  activeLight = nextLight(activeLight);
  activeLight.classList.toggle("active");
}
