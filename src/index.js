// <⚠️ DONT DELETE THIS ⚠️>
import "./styles.css";
// <⚠️ /DONT DELETE THIS ⚠️>

const form = document.querySelector(`.forms`),
  input = form.querySelector(`input`),
  pendingList = document.querySelector(`.pending-list`),
  finishedList = document.querySelector(`.finished-list`);

const PENDING_LS = "PENDING";
const FINISHED_LS = "FINISHED";

let pending = [];
let finished = [];

function removePendingLS(event) {
  const btn = event.target;
  const li = btn.parentNode;
  const id = li.id;
  const value = li.childNodes[0].innerText;
  pendingList.removeChild(li);
  const item = {
    id: id,
    item: value
  };
  let tmp;
  const cleanPending = pending.filter(function (item) {
    console.log(typeof item.id, typeof li.id);
    if (typeof item.id === "number") {
      tmp = parseInt(li.id);
    } else tmp = li.id;

    return item.id !== tmp;
  });
  pending = cleanPending;
  savePendingLS();
  return item;
}

function transPendingLS(event) {
  const item = removePendingLS(event);
  saveFinishedLS();
  // savePendingLS();
  paintFinishedList(item.item, item.id);
}

function paintPendingList(value, id = null) {
  const li = document.createElement("li");
  const transBtn = document.createElement("button");
  transBtn.innerText = "✅";
  transBtn.addEventListener("click", transPendingLS);
  const delBtn = document.createElement("button");
  delBtn.innerText = "❌";
  delBtn.addEventListener("click", removePendingLS);
  const span = document.createElement("span");
  span.innerText = value;

  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(transBtn);
  pendingList.appendChild(li);
  if (id === null) {
    id = Date.now();
  }
  li.id = id;
  const item = {
    id: id,
    item: value
  };
  pending.push(item);
  savePendingLS();
}

function removeFinishedLS(event) {
  const btn = event.target;
  const li = btn.parentNode;
  const id = li.id;
  const value = li.childNodes[0].innerText;
  finishedList.removeChild(li);
  const item = {
    id: id,
    item: value
  };
  const cleanFinished = finished.filter(function (item) {
    console.log(typeof item.id, typeof li.id);
    return item.id !== li.id;
  });
  finished = cleanFinished;
  saveFinishedLS();
  return item;
}

function transFinishedLS(event) {
  const item = removeFinishedLS(event);
  savePendingLS();
  // saveFinishedLS();
  paintPendingList(item.item, item.id);
}

function paintFinishedList(value, id) {
  const li = document.createElement("li");
  const transBtn = document.createElement("button");
  transBtn.innerText = "⏪";
  transBtn.addEventListener("click", transFinishedLS);
  const delBtn = document.createElement("button");
  delBtn.addEventListener("click", removeFinishedLS);
  delBtn.innerText = "❌";
  const span = document.createElement("span");
  span.innerText = value;

  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(transBtn);
  finishedList.appendChild(li);
  li.id = id;
  const item = {
    id: id,
    item: value
  };
  finished.push(item);
  saveFinishedLS();
}

function savePendingLS(text) {
  localStorage.setItem(PENDING_LS, JSON.stringify(pending));
}

function saveFinishedLS(text) {
  localStorage.setItem(FINISHED_LS, JSON.stringify(finished));
}

function inputHandler(event) {
  event.preventDefault();
  const value = input.value;
  savePendingLS(value);
  paintPendingList(value);
}

function loadPending() {
  const pending = localStorage.getItem(PENDING_LS);
  if (pending !== null) {
    const parser = JSON.parse(pending);
    parser.forEach(function (pending) {
      paintPendingList(pending.item, pending.id);
    });
  }
}

function loadFinished() {
  const finished = localStorage.getItem(FINISHED_LS);
  if (finished !== null) {
    const parser = JSON.parse(finished);
    parser.forEach(function (finished) {
      paintFinishedList(finished.item, finished.id);
    });
  }
}

function init() {
  loadPending();
  loadFinished();
  form.addEventListener("submit", inputHandler);
}

init();
