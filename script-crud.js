// encontrando o btn adicionar tarefa
const btnAddNewTask = document.querySelector('.app__button--add-task');
const formAddNewTask = document.querySelector('.app__form-add-task');
const textareaAddNewTask = document.querySelector('.app__form-textarea');
const listTask = document.querySelector('.app__section-task-list');
const btnCancell = document.querySelector('.app__form-footer__button--cancel');
const pDescriptionTask = document.querySelector('.app__section-active-task-description');
const btnRemoveComplete = document.querySelector('#btn-remover-concluidas');
const btnRemoveAllTasks = document.querySelector('#btn-remover-todas')

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

let taskSelected = null;
let liTaskSelected = null;

function updateTask(){
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function createElementTask(task){
  const li = document.createElement('li');
  li.classList.add('app__section-task-list-item');

  const svg = document.createElement('svg');
  svg.innerHTML = `<svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
    <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
  </svg>`;

  const p = document.createElement('p');
  p.classList.add('app__section-task-list-item-description')
  p.textContent = task.description;

  const btn = document.createElement('button');
  btn.classList.add('app_button-edit');

  btn.onclick = () => {
    // debugger
    const newDescription = prompt("Qual é o novo nome da tarefa ?");
    if(!newDescription){
      alert('A tarefa precisa ter uma descrição !')
      return
    }
    p.textContent = newDescription
      task.description = newDescription
      updateTask()
  }

  const btnImg = document.createElement('img');
  btnImg.setAttribute('src', './imagens/edit.png');
  btn.append(btnImg);

  li.append(svg);
  li.append(p);
  li.append(btn);

  if (task.complete){
    li.classList.add('app__section-task-list-item-complete')
    li.querySelector('button').setAttribute('disabled', 'disebled')
  }else{
    li.onclick = () => {
      document.querySelectorAll('.app__section-task-list-item-active').forEach(el =>{
        el.classList.remove('app__section-task-list-item-active')
      })
      if(taskSelected === task){
        pDescriptionTask.textContent = ''
        taskSelected = null
        liTaskSelected = null
        return
      }
      taskSelected = task
      liTaskSelected = li
      li.classList.toggle('app__section-task-list-item-active')
      pDescriptionTask.textContent = task.description
    }
  }
  return li
}

btnAddNewTask.addEventListener('click', () => {
  formAddNewTask.classList.toggle('hidden');
})

formAddNewTask.addEventListener('submit', e =>{
  e.preventDefault();

  const task ={
    description:textareaAddNewTask.value
  }

  tasks.push(task)
  const elementTask = createElementTask(task)
  listTask.append(elementTask)
  updateTask()
  textareaAddNewTask.value = ''
  formAddNewTask.classList.add('hidden')
  console.log(tasks)
})

btnCancell.addEventListener('click', e =>{
  e.preventDefault();
  formAddNewTask.classList.add('hidden')
  textareaAddNewTask.value = ''
})


tasks.forEach(task => {
  const elementTask = createElementTask(task);
  listTask.append(elementTask)
});

document.addEventListener('FocoFinalizado', ()=>{
  if(taskSelected && liTaskSelected){
    liTaskSelected.classList.remove('app__section-task-list-item-active')
    liTaskSelected.classList.add('app__section-task-list-item-complete')
    liTaskSelected.querySelector('button').setAttribute('disabled', 'disebled')
    taskSelected.complete = true
    updateTask()
  }
})

const removeTasks = (onlyComplete)=>{
  const selector = onlyComplete ? '.app__section-task-list-item-complete': '.app__section-task-list-item';

  document.querySelectorAll(selector).forEach(el=>{
    el.remove();
  })
  tasks = onlyComplete ? tasks.filter(task => !task.complete) : []
  updateTask()
}

btnRemoveComplete.addEventListener('click', () => removeTasks(true))

btnRemoveAllTasks.addEventListener('click', () => removeTasks(false))
