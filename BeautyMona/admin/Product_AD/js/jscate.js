var form_add = document.querySelector('#form__input__product');
form_add.addEventListener('submit', function(e) {
    e.preventDefault();
    var post = {
        category__name: document.querySelector('#inp__name__category').value

    }
    axios.post('http://localhost:3000/category', post)
        .then(response => alert('them thanh cong'))
});