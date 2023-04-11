let data =[];
let cardId;

function showPop(){
    const popup1 = document.getElementById("add-card-popup")
    popup1.style.display = "block"
     
} 
function closeAddCardPopup() {
    const popup1 = document.getElementById("add-card-popup")
    popup1.style.display = "none"
    
}
function handleAddCard(){
 const cardText = document.getElementById("card-input-text").value;
 const card = {
    id: new Date().getTime().toString(),
    cardTitle: cardText,
    content: [],
 }
 if(cardText){
   data.push(card);
   renderCards();
 }else{
    alert("Please add card name");
 }
 //console.log("data", data);
 document.getElementById("card-input-text").value ="";
 closeAddCardPopup();
}

function renderContent(){
for(let i = 0; i < data.length; i++){
    const ulElement = document.getElementById(`content_list_${data[i].id}`);
    let child = "";
    for(let j = 0; j < data[i].content.length; j++){
        const content = data[i].content[j];
        console.log(data[i].content[j]);
        child += `<li id="content_${content.id}" onclick="doneTask(${content.id})">${content.contentText}</li>`
    } 
    ulElement.innerHTML = child;
}
}

function renderCards() {
    const cardcontainer = document.getElementById("card-container");
    let child = " ";
    for(let i=0; i< data.length; i++){
        console.log("Data[i]:", data[i]);
    child += `<div id="card_${data[i].id}" class="card">
              <p class="p2">${data[i].cardTitle}</p>
              <hr>
              <ul id="content_list_${data[i].id}">
              
              </ul>
              <div class="container2">
              
              <Button onclick="deleteCard(${data[i].id})" class="delete "><ion-icon name="trash-outline"></ion-icon></Button>
              <Button onclick="showAddContentToCardPopup(${data[i].id})" class="add"<ion-icon name="add-circle-outline"> +</ion-icon></Button>
             </div>
             </div>`;
    }
  cardcontainer.innerHTML = child;
  renderContent();
}

function deleteCard(id){
    const cardcontainer = document.getElementById("card-container");
    const cardId = `card_${id}`
    const card = document.getElementById(cardId)
    card.parentNode.removeChild(card);
    data =data.filter(item => item.id != id);
   // console.log("id of card to delete", id);
    // console.log("updated data",data);
}

function showAddContentToCardPopup(id){
    const popup2 = document.getElementById("popup2")
    popup2.style.display = "block"
    cardId = id;
}

function removeAddContentToCardPopup(){
    const popup2 = document.getElementById("popup2")
    popup2.style.display = "none"
}
function addContentToCard() {
    const contentListId = `content_list_${cardId}`;
    const Ul = document.getElementById(contentListId);
    const contentText = document.getElementById("card-content-input").value;
    if(!contentText){
        alert("Please add task name");
       }else{
         
         document.getElementById("card-content-input").value = "";
       // closeAddCardPopup();
        const liNode = document.createElement("li");
       // const btnNode = document.createElement("button");
        liNode.innerHTML = contentText;
        liNode.className = "ckecked";
       // btnNode.innerHtml = liNode;
        Ul.appendChild(liNode);
       // Ul.appendChild(btnNode);
        removeAddContentToCardPopup();
        for(let i=0; i<data.length; i++){
            if(data[i].id === cardId){
                let content = {
                    id: new Date().getTime().toString(),
                    contextText: contentText,
                    done : false,
                }
                data[i].content.push(content);
                console.log(data[i]);
            }
        }

      }
      
      //console.log("data", data);
    //   document.getElementById("card-content-text").value ="";
    //   closeAddCardPopup();
    // const liNode = document.getElementById("li");
    // liNode.innerHTML = ""
    // Ul.appendChild(liNode);
}

function doneTask(){
    const contentId =`content_${id}`
    const liElement = document.getElementById(contentId);
    liElement.classList.toggle(`checked`);
}

