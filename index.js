let data =[];
let cardId;
console.log("data", data);

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

function deleteCard(id){
    const cardcontainer = document.getElementById("card-container");
    const cardId = `card_${id}`
    const card = document.getElementById(cardId)
    card.parentNode.removeChild(card);
    data =data.filter(item => item.id != id);
   // console.log("id of card to delete", id);
    // console.log("updated data",data);
}

function displayMyCard(id, value){
    console.log("js");
    console.log("id" , id);
    const addbtn1 = document.getElementById("addbtn1")
  addbtn1.style.display = "block";

  const cardHeading = document.querySelector('.cardHeading');
  cardHeading.innerHTML = value;

  const cards = document.querySelectorAll('.branchcard')
  cards.forEach(allcards => {
      allcards.style.display ='none';

//       const cardToShow = document.getElementById(id);
//   cardToShow.style.display = "block";
  });
//   const cardToShow = document.getElementById("id");
//   cardToShow.style.display = "block";

  const navBar = document.querySelector('#head')
  navBar.style.display = 'none'

  const backButton = document.querySelector('#back')
  backButton.style.display = 'block'
}


function backToAll(){
  const cards = document.querySelectorAll('.branchcard');
  const cardHeading = document.querySelector('.cardHeading');
 cardHeading.innerHTML = "";
  cards.forEach(allcards => {
      allcards.style.display ='block';
  });
  const navBar = document.querySelector('#head')
  navBar.style.display = 'block'

  const backButton = document.querySelector('#back')
  backButton.style.display = 'none'

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

function renderContent(){
for(let i = 0; i < data.length; i++){
    console.log(i);
    const ulElement = document.getElementById(`content_list_${data[i].id}`);
    let child = " ";
    for(let j = 0; j < data[i].content.length; j++){
        const content = data[i].content[j];
        console.log(data[i].content[j]);
        child += `<li class="size5 ${content.done ? "checked":""}" id="content_${content.id}" onclick="doneTask(${content.id},${data[i].id})">${content.contentText}</li>`
    } 
    ulElement.innerHTML = child;
    console.log(child);
}
}

function renderCards() {
    const cardcontainer = document.getElementById("card-container");
    let child = " ";
    for(let i=0; i< data.length; i++){
        console.log("Data[i]:", data[i]);
    child += `<div id="card_${data[i].id}" class="card branchcard">
              <p class="p2" onclick="displayMyCard(${data[i].id},this.getAttribute('value'))">${data[i].cardTitle}</p>
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
  renderContent()
}


function addContentToCard() {
    const contentListId = `content_list_${cardId}`;
    const Ul = document.getElementById(contentListId);
    const contentText = document.getElementById("card-content-input").value;
    if(!contentText){
        alert("Please add task name");
       }else{
         
         document.getElementById("card-content-input").value= "" ;
       // closeAddCardPopup();
        const liNode = document.createElement("li");
        const listId = new Date().getTime().toString();
       // const btnNode = document.createElement("button");
        liNode.innerHTML = contentText;
        liNode.id = `content_${listId}`;
        liNode.onclick = function(){
            doneTask(listId, cardId);
        };
        //liNode.className = "ckecked";
       // btnNode.innerHtml = liNode;
        Ul.appendChild(liNode);
       // Ul.appendChild(btnNode);
        removeAddContentToCardPopup();
        console.log("data",data);
        for(let i=0; i<data.length; i++){
            if(data[i].id == cardId){
                const content = {
                    id:new Date().getTime().toString(),
                    contentText: contentText,
                    done : false,
                }
                data[i].content.push(content);
            }
        }

      }
      
    //   console.log("data", data);
    //   document.getElementById("card-content-text").value ="";
    //   closeAddCardPopup();
    // const liNode = document.getElementById("li");
    // liNode.innerHTML = ""
    // Ul.appendChild(liNode);
}

function doneTask(listId, cardId){
    const contentId =`content_${listId}`;
    const liElement = document.getElementById(contentId);
    liElement.classList.toggle(`checked`);

    for(let i=0;i<data.length; i++){
        if(data[i].id == cardId){
            for(let j=0; j<data[i].content.length;j++){
                const content = data[i].content[j];
                if(content.id == listId){
                    data[i].content[j].done = !data[i].content[j].done;
                }
                
            }
        }
    }
}

