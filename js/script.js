const linkArray = [
  'index.html',
  'http://google.com/',
  'https://itstep.org/',
  'https://mystat.itstep.org/',
  '/css/style.css',
  '/scss'
];

const dirTreeObj = {
  "This PC":{
    "Local Disk (C:)":{
      "Program Files" : null,
      "Users" : null,
      "Windows" : null
    },
    "Local Disk (D:)":{
      "New Folder 1" : null,
      "New Folder 2" : null,
      "New Folder 3" : null
    }
  }
}

const bookArray = [
  '"JavaScript for Kids: A Playful Introduction to Programming" by Nick Morgan',
  '"Eloquent JavaScript: A Modern Introduction to Programming" by Marjin Haverbeke',
  '"JavaScript: The Good Parts" by Douglas Crockford',
  `"You Don't Know JS" by Kyle Simpson`,
  'very long title by Eric Elliott',
  'мне надоело писать by David Herman',
  'Lorem Ipsum Dolor sit amet by David flaanfanksjfna'
];

const userArray = [
  {
    Firstname: "Mark",
    Lastname: "Zuckerberg",
    Age: 34,
    Company: "Facebook"
  },
  {
    Firstname: "Larry",
    Lastname: "Page",
    Age: 45,
    Company: "Google"
  },
  {
    Firstname: "Timothy",
    Lastname: "Cook",
    Age: 57,
    Company: "Apple"
  },
  {
    Firstname: "Bill",
    Lastname: "Gates",
    Age: 62,
    Company: "Microsoft"
  }
];

function addDir(obj, prevParent = null, areHidden = false){
  let parentObj = document.createElement("ul");
  if(areHidden){
    parentObj.classList.toggle("hidden");
  }
  if(prevParent!=null){
    prevParent.addEventListener("click", ()=>parentObj.classList.toggle("hidden"));
  }
  for (const [key, value] of Object.entries(obj)) {
    let childObj = document.createElement("li");
    let spanObj = document.createElement("span");
    spanObj.textContent = key;
    childObj.appendChild(spanObj);
    if (value != null) {
      let doubleChild = addDir(value, spanObj, true);
      childObj.appendChild(doubleChild);
    }
    parentObj.appendChild(childObj);
  }
  return parentObj;
}

function clear(array){
  if(!(array instanceof Array)){
    throw new TypeError("Wrong type!");
  }
  while (array.length > 0) {
    array.pop();
  }
}

//4
let isTexting = false;
function keyDown(e){
  let newTexting;
  if(window.event.key.toLowerCase() === 'e' && window.event.ctrlKey === true){
    newTexting = true;
  }
  else if(window.event.key.toLowerCase() === 's' && window.event.ctrlKey === true){
    newTexting = false;
  }
  else{
    return;
  }
  if(isTexting!==newTexting){
    isTexting = newTexting;
    textStatic.classList.toggle("hidden");
    textField.classList.toggle("hidden");
  }
}
function textBoxChange() {
  textStatic.innerText = textField.value
}

function initTable(){
  flushTable();
  {
    let x = document.createElement("thead");
    let y = document.createElement("tr");
    for (const [key, _] of Object.entries(userArray[0])) {
      let z = document.createElement("th");
      z.textContent = key;
      z.addEventListener("click", ()=>updateTable(key));
      y.appendChild(z);
    }
    x.appendChild(y);
    sortingTable.appendChild(x);
  }
  let x = document.createElement("tbody");
  for (const item of userArray) {
    let y = document.createElement("tr");
    for (const [_, value] of Object.entries(item)) {
      let z = document.createElement("td");
      z.textContent = value;
      y.appendChild(z);
    }
    x.appendChild(y);
  }
  sortingTable.appendChild(x);
}

let lastKey = null;
let isReversed = false;
function updateTable(key){
  userArray.sort((x, y)=>(x[key]<y[key])?-1:(x[key]>y[key])?1:0);
  if(isReversed){
    isReversed = false;
  }
  else if(lastKey===key){
    userArray.reverse();
    isReversed = true;
  }
  lastKey = key;
  initTable();
}

function flushTable(){
  sortingTable.innerHTML = "";
}

function pageOnLoad(){
  window.addEventListener("keydown",(e)=>{
    if((e.key.toLowerCase() === 's' || e.key.toLowerCase() === 'e') && (e.ctrlKey || e.metaKey)){
      e.preventDefault();
    }
  })

  //1
  for (const item of linkArray) {
    let listItem = document.createElement("li");
    let link = document.createElement("a");
    link.textContent = item;
    link.href = item;
    if(item.startsWith("http://") || item.startsWith("https://")){
      link.style.textDecoration = "underline dotted";
    }
    else{
      link.style.textDecoration = "none";
    }
    listItem.appendChild(link);
    linkList.appendChild(listItem);
  }

  //2
  treeOfDir.appendChild(addDir(dirTreeObj));

  //3
  let markedBooks = [];
  let prev = 0;
  let i = 0;
  for (const item of bookArray) {
    let child = document.createElement("li");
    child.textContent = item;
    child.id = `bookItem${i}`;
    i++;
    child.addEventListener("click", (e)=>{
      console.log(e);
      for (const item of markedBooks) {
        document.getElementById(item.id).classList.toggle("marked");
      }
      let current = Number.parseInt(child.id.slice(8));
      if(e.ctrlKey){
        let x = markedBooks.findIndex((x)=>x.id===child.id);
        if(x!==-1){
          markedBooks.splice(x, 1)
        }
        else{
          markedBooks.push(child);
        }
      }
      if(e.shiftKey){
        let current2 = current;
        let prev2 = prev;
        if(prev2<current2){
          let tmp = prev2;
          prev2 = current2;
          current2 = tmp;
        }
        for (let ind = current2; ind <= prev2; ind++) {
          let curId = `bookItem${ind}`;
          if(markedBooks.findIndex((x)=>x.id===curId) === -1){
            let tmp = document.createElement("li");
            tmp.id = curId;
            markedBooks.push(tmp);
            document.getElementById(curId).classList.toggle("marked");
          }
        }
      }
      if(!e.ctrlKey && !e.shiftKey){
        clear(markedBooks);
        markedBooks.push(child);
      }
      for (const item of markedBooks) {
        item.classList.toggle("marked");
      }
      prev = current;
    });
    bookList.appendChild(child);

    //4-е выше

    //5
    initTable();
  }

  //6-е задание в html
}
