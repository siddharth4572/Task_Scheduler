function addHomework() {
  const task = document.getElementById('homeworkInput').value;
  const date = document.getElementById('homeworkDate').value;
  if (task && date) {
    const list = document.getElementById('homeworkList');
    const li = createTaskElement(`${task} (Due: ${date})`);
    list.appendChild(li);
    clearInputs('homeworkInput', 'homeworkDate');
    saveData();
  }
}

function addRoutine() {
  const task = document.getElementById('routineInput').value;
  const time = document.getElementById('routineTime').value;
  if (task && time) {
    const list = document.getElementById('routineList');
    const li = createTaskElement(`${task} at ${time}`);
    list.appendChild(li);
    clearInputs('routineInput', 'routineTime');
    saveData();
  }
}

function createTaskElement(text) {
  const li = document.createElement('li');
  li.innerHTML = `
    <input type="checkbox" onchange="toggleDone(this)">
    <span>${text}</span>
    <button onclick="removeItem(this)">Delete</button>
  `;
  return li;
}

function removeItem(button) {
  button.parentElement.remove();
  saveData();
}

function toggleDone(checkbox) {
  const li = checkbox.parentElement;
  li.classList.toggle('done');
  saveData();
}

function clearInputs(...ids) {
  ids.forEach(id => document.getElementById(id).value = '');
}

function saveData() {
  localStorage.setItem('homework', document.getElementById('homeworkList').innerHTML);
  localStorage.setItem('routine', document.getElementById('routineList').innerHTML);
}

function loadData() {
  document.getElementById('homeworkList').innerHTML = localStorage.getItem('homework') || '';
  document.getElementById('routineList').innerHTML = localStorage.getItem('routine') || '';
}

function switchTab(tabName) {
  document.getElementById('homeworkTab').classList.add('hidden');
  document.getElementById('routineTab').classList.add('hidden');
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));

  if (tabName === 'homework') {
    document.getElementById('homeworkTab').classList.remove('hidden');
    document.querySelector('.tab:nth-child(1)').classList.add('active');
  } else {
    document.getElementById('routineTab').classList.remove('hidden');
    document.querySelector('.tab:nth-child(2)').classList.add('active');
  }
}

window.onload = loadData;
