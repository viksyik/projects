document.getElementById('addNoteButton').addEventListener('click', function() {
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

    // Додаємо подію на чекбокс для позначки виконання
    checkbox.addEventListener('change', function() {
      if (checkbox.checked) {
        // Переміщуємо нотатку до контейнера виконаних
        document.getElementById('completedNotesContainer').appendChild(note);
        textSpan.style.textDecoration = 'line-through'; // Перекреслюємо текст
        note.style.backgroundColor = '#00fa9a'; // Змінюємо фон на зелений
      } else {
        // Переміщуємо нотатку назад до контейнера невиконаних
        document.getElementById('incompleteNotesContainer').appendChild(note);
        textSpan.style.textDecoration = 'none'; // Знімаємо перекреслення
        note.style.backgroundColor = '#dc143c'; // Повертаємо стандартний фон
      }
    });
  }
});
