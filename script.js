const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearButton = document.getElementById('clear');
const listFilter = document.getElementById('filter');
const itemArray = document.querySelectorAll('li');

const itemMemory = [];

hideOrShow();
function hideOrShow() {
if (itemList.childElementCount === 0) {
    hideList();
}else {
    showList();
}
}

function displayItems() {
    const itemsFromStorage = getItemsFromStorage();
    itemsFromStorage.forEach((item) => addItemToDOM(item));

    hideOrShow();
}

function filterItems(e) {
  const items = itemList.querySelectorAll('li');
  const text = e.target.value.toLowerCase();

  items.forEach((item) => {
    const itemName = item.firstChild.textContent.toLowerCase();

    if (itemName.indexOf(text) != -1) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });
}

function onAddItemSubmit(e) {
    e.preventDefault();

    const newItem = itemInput.value;

    // Validate Input 
    if (newItem === '') {
        alert('Please add an item');
        return;
    }
    // Create item DOM element
    addItemToDOM(newItem);

    // Add item to local storage
    addItemToStorage(newItem);
    itemInput.value = '';

    hideOrShow();
}



function addItemToDOM(item) {
    const li = document.createElement('li');
    
    li.appendChild(document.createTextNode(item));

    const button = newButton('remove-item btn-link text-red');
    li.appendChild(button);

    itemList.appendChild(li);
}


function newButton (classes) {
    const button = document.createElement('button');
    button.className = classes;
    const icon = newIcon('fa-solid fa-xmark');
    button.appendChild(icon);
    return button;
}
function newIcon (classes) {
    const icon = document.createElement('i');
    icon.className = classes;
    return icon;
}

function addItemToStorage(item) {
    const itemsFromStorage = getItemsFromStorage();

    // Add new item to array
    itemsFromStorage.push(item);

    // Convert to JSON string and set to local storage

    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function getItemsFromStorage() {
    let itemsFromStorage;
    
    if (localStorage.getItem('items') === null) {
        itemsFromStorage = [];
    }else {
        itemsFromStorage = JSON.parse(localStorage.getItem('items'));
    }
    return itemsFromStorage;
}

function removeItem (e) {
    console.log('clicked');
    if (e.target.parentElement.classList.contains('remove-item')) {
        if (confirm('Are you sure?')) {
        e.target.parentElement.parentElement.remove();
        hideOrShow();
        }    
}
}

function clearItems() {
    if (confirm('Are you sure?')) {
    while (itemList.firstChild) {
        itemList.removeChild(itemList.firstChild);
    }}
    hideOrShow();
}

// When list is empty, hide filter and clear button.
function hideList() {
    clearButton.style.display = 'none';
    listFilter.style.display = 'none';
}
function showList() {
    clearButton.style.display = 'block';
    listFilter.style.display = 'block';
}


function init() {
// Event Listeners
itemForm.addEventListener('submit', onAddItemSubmit);
itemList.addEventListener('click', removeItem);
clearButton.addEventListener('click', clearItems);
listFilter.addEventListener('input', filterItems);
document.addEventListener('DOMContentLoaded', displayItems);
}

init();