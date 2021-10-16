const postss = document.querySelector('#postss');

function getPostss() {
    axios.get('https://w0vd4.sse.codesandbox.io/posts?product__cate=' + 3)
        .then(response => {

            const result = response.data.map(postss => {
                return `
                <div class="product">
                                    <div class="product__avt" style="background-image: url(${postss.product__avt}); ">
                                    </div>
                                    <div class="product__info">
                                        <h3 class="product__name">${postss.product__name}</h3>
                                        <div class="product__price">
                                            <div class="price__old">
                                            ${postss.product__priceold}
                                            </div>
                                            <div class="price__new">${postss.product__price} <span class="price__unit">đ</span></div>
                                        </div>
                                        <div class="product__sale">
                                            <span class="product__sale-percent">${postss.product__sale}</span>
                                            <span class="product__sale-text">Giảm</span>
                                        </div>
                                    </div>
                                    <a href="product.html?id=${postss.id}" class="viewDetail">Xem chi tiết</a>
                                    <a href="#" class="addToCart">Thêm vào giỏ</a>
                                </div>
                
                `
            }).join("");
            postss.innerHTML = result;
        })
}
getPostss();

var sortss = document.querySelector('#sort');
sortss.addEventListener('change', function() {
    axios.get('https://w0vd4.sse.codesandbox.io/posts?_sort=product__price&product__cate=3&_order=' + sortss.value)
        .then(response => {
            const result = response.data.map(postss => {
                return `
                    <div class="product">
                                        <div class="product__avt" style="background-image: url(${postss.product__avt}); ">
                                        </div>
                                        <div class="product__info">
                                            <h3 class="product__name">${postss.product__name}</h3>
                                            <div class="product__price">
                                                <div class="price__old">
                                                ${postss.product__priceold}
                                                </div>
                                                <div class="price__new">${postss.product__price} <span class="price__unit">đ</span></div>
                                            </div>
                                            <div class="product__sale">
                                                <span class="product__sale-percent">${postss.product__sale}</span>
                                                <span class="product__sale-text">Giảm</span>
                                            </div>
                                        </div>
                                        <a href="product.html?id=${postss.id}" class="viewDetail">Xem chi tiết</a>
                                        <a href="cart.html?id=${postss.id}" class="addToCart">Thêm vào giỏ</a>
                                    </div>

                `
            }).join("");
            postss.innerHTML = result;
        })
})