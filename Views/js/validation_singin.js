const singin_form = document.forms.singin_form;

const email = singin_form.username;
const pass = singin_form.password;

singin_form.addEventListener("submit", function(event){
  console.log('форма отправляется ...');

  if(!email.value){
    console.log('поле Почта не заполнено');
    if(!email.nextElementSibling){
        email.parentElement.insertAdjacentHTML(
                "beforeend",
                `<div class="alert alert-danger mt-2">
            Введите электронную почту перед отправкой
                </div>`
            );
    }
    event.preventDefault();
  }

  if(!pass.value){
    console.log('поле Пароль не заполнено');
    if(!pass.nextElementSibling){
        pass.parentElement.insertAdjacentHTML(
                'beforeend',
                `<div class="alert alert-danger mt-2">
                    Введите пароль перед отправкой
                </div>`
            );
    }
    event.preventDefault();
  }

});

email.addEventListener("focus", function (event) {
	if (email.nextElementSibling) {
		email.nextElementSibling.remove();
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