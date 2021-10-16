// Thêm sản phẩm
var form_add = document.querySelector('#form__input__product');
form_add.addEventListener('submit', function(e) {
    e.preventDefault();
    var post = {
        id: Math.random().toString(9).substr(2, 8),
        product__avt: document.querySelector('#inp__img').value,
        product__name: document.querySelector('#inp__name__product').value,
        product__priceold: document.querySelector('#inp__priceold__product').value,
        product__price: document.querySelector('#inp__price__product').value,
        product__sale: document.querySelector('#inp__discount__product').value,
        product__description: document.querySelector('#product_desc').value,
        product__descriptions: document.querySelector('#product_descs').value,
        product__cate: document.querySelector('#product_cate').value
    }
    axios.post('https://w0vd4.sse.codesandbox.io/posts', post)
        .then(response => alert('them thanh cong'))
    

});
window.location.href = 'https://anhtran25.github.io/Assignment_JS/BeautyMona/admin/Product_AD/listproduct.html';
