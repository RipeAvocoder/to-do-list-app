//Add tasks
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('taskForm');
  const titleInput = document.getElementById('taskTitle');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    removeErrorBox();

    const title = titleInput.value.trim();
    const description = document.getElementById('taskDescription').value.trim();

    if (!title) {
      showErrorBox('Task title is required. Task not added.');
      return;
    }

    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description })
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || 'Failed to add task. Please try again.');
      }

      form.reset();
      location.reload();
    } catch (err) {
      showErrorBox(err.message);
    }
  });

  titleInput.addEventListener('focus', () => {
    removeErrorBox();
  });
});

//Load tasks

//Edit tasks

//Delete tasks

//Complete tasks

//Showing and removing errors
function showErrorBox(message) {
  removeErrorBox();

  const box = document.createElement('div');
  box.id = 'errorBox';
  box.textContent = message;
  box.style.border = '2px solid red';
  box.style.backgroundColor = '#ffe6e6';
  box.style.color = 'red';
  box.style.padding = '0.75rem 1rem';
  box.style.borderRadius = '5px';
  box.style.marginTop = '0.5rem';
  box.style.fontWeight = 'bold';

  const form = document.getElementById('taskForm');
  form.insertAdjacentElement('afterend', box);
}

function removeErrorBox() {
  const box = document.getElementById('errorBox');
  if (box) box.remove();
}
