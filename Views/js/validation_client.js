// проверка формы
function validateForm(e) {

  const
    form = e.target,
    field = Array.from(form.elements);

  // сброс полей
  field.forEach(i => {
    i.setCustomValidity('');
    i.parentElement.classList.remove('invalid');
  });

  // email или телефон заданы?
  const err = form.email.value || form.tel.value ? '' : 'error';
  form.email.setCustomValidity(err);
  form.tel.setCustomValidity(err);

  if (!form.checkValidity()) {

    // форма не прошла валидацию - отмена отправки
    e.preventDefault();
    e.stopImmediatePropagation();

    // добавляем класс invalid
    field.forEach(i => {
      if (!i.checkValidity()) {
        // поле не прошло валидацию - добавляем класс
        i.parentElement.classList.add('invalid');
      }
    });
  }
}