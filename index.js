

const listWrapper = document.getElementById("myUL");

function addToStorage(text) {
  const store = localStorage.getItem("todo");

  if (store) {
    let jsonValue = JSON.parse(store);
    localStorage.setItem("todo", JSON.stringify([...jsonValue, text]));
    return;
  } else {
    localStorage.setItem("todo", JSON.stringify([text]));
    return;
  }
}


function newElement() {
  var inputValue = document.getElementById("myInput").value;

  if (inputValue.trim() === "") {
    return alert("You must write something!");
  } else {
    const store = localStorage.getItem("todo");
    let col = JSON.parse(store);
    exist = col.find((item) => item === inputValue);
    if(exist) {
        alert('Item exist already')
        return
    }
    addToStorage(inputValue);
    populateStoreList(inputValue);
  }
  document.getElementById("myInput").value = "";
}

function populateStoreList(item) {
  const store = localStorage.getItem("todo");

  if (store) {
    listWrapper.innerHTML = null;
    let col = JSON.parse(store);
    col.forEach(function (todo) {
      let li = document.createElement("li");
      let t = document.createTextNode(todo);
      li.appendChild(t);
      let span = document.createElement("SPAN");
      let txt = document.createTextNode("\u00D7");
      span.className = "close";
      span.appendChild(txt);

      span.addEventListener("click", function () {
        removeFromStore(todo);
      });
      li.appendChild(span);
      listWrapper.appendChild(li);
    });
    return;
  }
}

function removeFromStore(todo) {
  const store = localStorage.getItem("todo");
  let col = JSON.parse(store);
  col = col.filter((item) => item !== todo);
  localStorage.setItem("todo", JSON.stringify(col));
  populateStoreList();
}

populateStoreList();
