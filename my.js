const form = document.querySelector('form');
const input = document.querySelector('#txtTaskName');
const btnDeleteAll = document.querySelector('#btnDeleteAll');
const taskList = document.querySelector('#task-list');
let items;

loadItems();

eventListeners();

function eventListeners(){
form.addEventListener('submit',addNewItem);
taskList.addEventListener('click',deleteItem);
btnDeleteAll.addEventListener('click',deleteAllItem);

}

function loadItems(){

    items = getItemFromLS();
    items.forEach(function(item){
        createItem(item);
    });
}

function getItemFromLS(){
    if(localStorage.getItem('items') === null){
        items = [];
    }
    else{
        items = JSON.parse(localStorage.getItem('items'));
    }
    return items;
}

function setItemToLS(text){
    items = getItemFromLS();
    items.push(text);
    localStorage.setItem('items',JSON.stringify(items));
}

function deleteItemFromLS(text){ // sorunu düzelt 
    items = getItemFromLS();
    item.forEach(function(item,index){
        if(item === text){
        items.splice(index,1);      
    }
    });    
    localStorage.setItem('items',JSON.stringify(items));
}

function createItem(text){
    const li = document.createElement('li');
    const a = document.createElement('a');
    li.classList ='list-group-item list-group-item-secondary';
    li.innerText = text;

    a.classList = 'delete-item float-right';
    a.setAttribute('href','#');
    a.innerText='X';
    li.appendChild(a);
    taskList.appendChild(li);
}
function addNewItem(e){
    if(input.value === ''){
           alert("eleman ekle");
    }

     createItem(input.value);
   setItemToLS(input.value);

    input.value = '';

  e.preventDefault();
}

function deleteItem(e){
    if(e.target.className === 'delete-item float-right'){
      e.target.parentElement.remove();      
      deleteItemFromLS(e.target.parentElement.textContent);
    }         
    e.preventDefault();
}

function deleteAllItem(e){
    if(confirm('Emin misin')){
        while(taskList.firstChild){
            taskList.removeChild(taskList.firstChild);
        }
    localStorage.clear();
}

    e.preventDefault();
}