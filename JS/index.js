// Функція для показу повідомлення про збереження
function showSaveMessage() {
  const saveMessage = document.getElementById('saveMessage');
  saveMessage.classList.add('show'); // Показуємо повідомлення

  // Прибираємо повідомлення через 3 секунди
  setTimeout(function() {
    saveMessage.classList.remove('show'); // Ховаємо повідомлення
  }, 3000); // 3000 мс = 3 секунди
}

// Функція для збереження нотаток у Local Storage
function saveNotes() {
  const incompleteNotes = document.getElementById('incompleteNotesContainer').innerHTML;
  const completedNotes = document.getElementById('completedNotesContainer').innerHTML;

  // Зберігаємо нотатки в Local Storage
  localStorage.setItem('incompleteNotes', incompleteNotes);
  localStorage.setItem('completedNotes', completedNotes);
}

// Функція для завантаження нотаток з Local Storage
function loadNotes() {
  const incompleteNotes = localStorage.getItem('incompleteNotes');
  const completedNotes = localStorage.getItem('completedNotes');

  if (incompleteNotes) {
    document.getElementById('incompleteNotesContainer').innerHTML = incompleteNotes;
    addCheckboxEventListeners(document.getElementById('incompleteNotesContainer'));
  }

  if (completedNotes) {
    document.getElementById('completedNotesContainer').innerHTML = completedNotes;
    addCheckboxEventListeners(document.getElementById('completedNotesContainer'));
  }
}

// Функція для додавання подій на чекбокси
function addCheckboxEventListeners(container) {
  const checkboxes = container.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach(function(checkbox) {
    checkbox.addEventListener('change', function() {
      const note = checkbox.parentElement;
      const textSpan = note.querySelector('span');
      
      if (checkbox.checked) {
        document.getElementById('completedNotesContainer').appendChild(note);
        textSpan.style.textDecoration = 'line-through';
        note.style.backgroundColor = '#00fa9a';
      } else {
        document.getElementById('incompleteNotesContainer').appendChild(note);
        textSpan.style.textDecoration = 'none';
        note.style.backgroundColor = '#dc143c';
      }
      saveNotes(); // Зберігаємо нотатки після зміни
    });
  });
}

// Функція для додавання нотатки
function addNote() {
  const noteInput = document.getElementById('noteInput');
  const noteText = noteInput.value;

  if (noteText.trim() !== "") {
    // Створюємо новий елемент для нотатки
    const note = document.createElement('div');
    note.classList.add('note');

    // Створюємо чекбокс для відзначення виконання
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('note-checkbox');

    // Додаємо текст нотатки
    const textSpan = document.createElement('span');
    textSpan.textContent = noteText;

    // Додаємо елементи до нотатки
    note.appendChild(checkbox);
    note.appendChild(textSpan);

    // Додаємо нотатку до контейнера невиконаних
    document.getElementById('incompleteNotesContainer').appendChild(note);

    // Очищаємо поле введення
    noteInput.value = '';

    // Додаємо подію на чекбокс
    checkbox.addEventListener('change', function() {
      const note = checkbox.parentElement;
      const textSpan = note.querySelector('span');
      
      if (checkbox.checked) {
        document.getElementById('completedNotesContainer').appendChild(note);
        textSpan.style.textDecoration = 'line-through';
        note.style.backgroundColor = '#00fa9a';
      } else {
        document.getElementById('incompleteNotesContainer').appendChild(note);
        textSpan.style.textDecoration = 'none';
        note.style.backgroundColor = '#dc143c';
      }
      saveNotes(); // Зберігаємо нотатки після зміни
    });
  }
}

// Функція для очищення всіх нотаток
function clearAllNotes() {
  const incompleteNotes = document.getElementById('incompleteNotesContainer');
  const completedNotes = document.getElementById('completedNotesContainer');
  
  // Видаляємо всі нотатки з обох контейнерів
  incompleteNotes.innerHTML = '';
  completedNotes.innerHTML = '';

  // Очищуємо Local Storage
  localStorage.removeItem('incompleteNotes');
  localStorage.removeItem('completedNotes');

  showClearMessage(); // Показуємо повідомлення про очищення
}

// Функція для показу повідомлення про очищення
function showClearMessage() {
  const clearMessage = document.getElementById('clearMessage');
  clearMessage.classList.add('show'); // Показуємо повідомлення

  // Прибираємо повідомлення через 3 секунди
  setTimeout(function() {
    clearMessage.classList.remove('show'); // Ховаємо повідомлення
  }, 3000); // 3000 мс = 3 секунди
}

// Додаємо обробник події для кнопки "Додати нотатку"
document.getElementById('addNoteButton').addEventListener('click', addNote);

// Додаємо обробник події для клавіші Enter у полі введення
document.getElementById('noteInput').addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    addNote(); // Викликаємо функцію додавання нотатки
  }
});

// Додаємо обробник події для кнопки "Очистити всі нотатки"
document.getElementById('clearAllButton').addEventListener('click', clearAllNotes);

// Завантажуємо нотатки при завантаженні сторінки
window.onload = function() {
  loadNotes(); // Завантажуємо нотатки з Local Storage при відкритті сторінки
};

// Додаємо обробник події для кнопки "Зберегти"
document.getElementById('saveButton').addEventListener('click', function() {
  saveNotes(); // Спочатку зберігаємо всі нотатки
  showSaveMessage(); // Потім показуємо повідомлення про збереження
});
