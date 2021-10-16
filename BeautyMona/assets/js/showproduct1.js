const posts = document.querySelector('#posts');

function getPosts() {
    axios.get('https://w0vd4.sse.codesandbox.io/posts?product__cate=' + 2)
        .then(response => {

            const results = response.data.map(posts => {
                return `
                <div class="product">
                                    <div class="product__avt" style="background-image: url(${posts.product__avt}); ">
                                    </div>
                                    <div class="product__info">
                                        <h3 class="product__name">${posts.product__name}</h3>
                                        <div class="product__price">
                                            <div class="price__old">
                                            ${posts.product__priceold}
                                            </div>
                                            <div class="price__new">${posts.product__price} <span class="price__unit">đ</span></div>
                                        </div>
                                        <div class="product__sale">
                                            <span class="product__sale-percent">${posts.product__sale}</span>
                                            <span class="product__sale-text">Giảm</span>
                                        </div>
                                    </div>
                                    <a href="product.html?id=${posts.id}" class="viewDetail">Xem chi tiết</a>
                                    <a href="#" class="addToCart">Thêm vào giỏ</a>
                                </div>
                
                `
            }).join("");
            posts.innerHTML = results;
        })
}
getPosts();
var sorts = document.querySelector('#sort');
sorts.addEventListener('change', function() {
    axios.get('https://w0vd4.sse.codesandbox.io/posts?_sort=product__price&product__cate=2&_order=' + sorts.value)
        .then(response => {
            const result = response.data.map(posts => {
                return `
                    <div class="product">
                                        <div class="product__avt" style="background-image: url(${posts.product__avt}); ">
                                        </div>
                                        <div class="product__info">
                                            <h3 class="product__name">${posts.product__name}</h3>
                                            <div class="product__price">
                                                <div class="price__old">
                                                ${posts.product__priceold}
                                                </div>
                                                <div class="price__new">${posts.product__price} <span class="price__unit">đ</span></div>
                                            </div>
                                            <div class="product__sale">
                                                <span class="product__sale-percent">${posts.product__sale}</span>
                                                <span class="product__sale-text">Giảm</span>
                                            </div>
                                        </div>
                                        <a href="product.html?id=${posts.id}" class="viewDetail">Xem chi tiết</a>
                                        <a href="cart.html?id=${posts.id}" class="addToCart">Thêm vào giỏ</a>
                                    </div>

                `
            }).join("");
            posts.innerHTML = result;
        })
})