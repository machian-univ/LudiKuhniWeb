const main_form = document.forms.reg;

const email = main_form.username;
const nameus = main_form.name;
const pass = main_form.password;

main_form.addEventListener("submit", function(event){
  console.log('форма отправляется ...');

  if(!email.value){
    console.log('поле Почта не заполнено');
    email.parentElement.insertAdjacentHTML(
			"beforeend",
			`<div class="alert alert-danger mt-2">
        Введите электронную почту перед отправкой
			</div>`
		);
    event.preventDefault();
  }
  else  if (emailTest(main_form)) {
		email.parentElement.insertAdjacentHTML(
			"beforeend",
			`<div class="alert alert-danger mt-2">
				Электронная почта введена неверно
			</div>`
		);
		event.preventDefault();
	}

  if(!nameus.value){
    console.log('поле Имя не заполнено');
    nameus.parentElement.insertAdjacentHTML(
			'beforeend',
			`<div class="alert alert-danger mt-2">
        Введите имя перед отправкой
			</div>`
		);
    event.preventDefault();
  }

  if(!pass.value){
    console.log('поле Пароль не заполнено');
    pass.insertAdjacentHTML(
			'beforeend',
			`<div class="alert alert-danger mt-2">
				Введите пароль перед отправкой
			</div>`
		);
    event.preventDefault();
  }

});

email.addEventListener("focus", function (event) {
	if (email.nextElementSibling) {
		email.nextElementSibling.remove();
	}
});

nameus.addEventListener("focus", function (event) {
	if (nameus.nextElementSibling) {
		nameus.nextElementSibling.remove();
	}
});

pass.addEventListener("focus", function (event) {
	if (pass.nextElementSibling) {
		pass.nextElementSibling.remove();
	}
});

function emailTest(input) {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value);
}