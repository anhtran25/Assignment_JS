const post = document.querySelector('#product');

var url_string = window.location.href;
var url = new URL(url_string);
var id = url.searchParams.get("id");

function getPost() {
    axios.get('https://w0vd4.sse.codesandbox.io/posts?id=' + id)
        .then(response => {

            const result = response.data.map(post => {
                return `
                <div class="row">
                    <div class="col l-5 m-12 s-12">
                        
                    <a href=""><img src="${post.product__avt}" alt="" width="500px"; height="350px" ;></a>
                    </div>
                    <div class="col l-7 m-12s s-12 pl">
                        <div class="main__breadcrumb">
                            <div class="breadcrumb__item">
                                <a href="#" class="breadcrumb__link">Trang chủ</a>
                            </div>
                            <div class="breadcrumb__item">
                                <a href="#" class="breadcrumb__link">Cửa hàng</a>
                            </div>
                            <div class="breadcrumb__item">
                                <a href="#" class="breadcrumb__link">Hãng DHC</a>
                            </div>
                        </div>
                        <h3 class="productInfo__name">
                        ${post.product__name}
                        </h3>
                        <div class="productInfo__price">
                        ${post.product__price} <span class="priceInfo__unit">đ</span>
                        </div>
                        <div class="productInfo__description">
                            <span> Lorem Ipsum </span>${post.product__description}
                        </div>

                        <div class="productInfo__addToCart">
                            <div class="buttons_added">
                                <p>Số Lượng</p>
                                <input aria-label="quantity" class="input-qty" max="10" min="1" name="" type="number" value="1">
                                
                            </div>

                            <div class=" btn btn--default orange ">
                            <button onclick="addToCart(${post.id})">
                            Add to cart
                        </button></div>
                        </div>
                        <div class="productIndfo__policy ">
                            <div class="policy bg-1 ">
                                <img src="./assets/img/policy/policy1.png " class="productIndfo__policy-img "></img>
                                <div class="productIndfo__policy-info ">
                                    <h3 class="productIndfo__policy-title ">Giao hàng miễn phí</h3>
                                    <p class="productIndfo__policy-description ">Cho đơn hàng từ 300K</p>
                                </div>
                            </div>
                            <div class="policy bg-2 ">
                                <img src="./assets/img/policy/policy2.png " class="productIndfo__policy-img "></img>
                                <div class="productIndfo__policy-info ">

                                </div>
                            </div>
                            <div class="policy bg-1 ">
                                <img src="./assets/img/policy/policy3.png " class="productIndfo__policy-img "></img>
                                <div class="productIndfo__policy-info ">

                                </div>
                            </div>
                            <div class="policy bg-2 ">
                                <img src="./assets/img/policy/policy4.png " class="productIndfo__policy-img "></img>
                                <div class="productIndfo__policy-info ">

                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                `
            }).join("");
            post.innerHTML = result;
        })
}
getPost();

const q = document.querySelector('#des');

function getQ() {
    axios.get('https://w0vd4.sse.codesandbox.io/posts?id=' + id)
        .then(response => {

            const result = response.data.map(q => {
                return `
                <div class="productDes__title ">${q.product__name}</div>
                                    <p class="productDes__text "> <a href="# " class="productDes__link ">
                                    ${q.product__descriptions}
                                    </p>
                `
            }).join("");
            q.innerHTML = result;
        })
}
getQ();

// add to cart


const showCart = document.querySelector("#showCart");
const getCartItems = () => {
    const cartItems = localStorage.getItem("cart") ?
        JSON.parse(localStorage.getItem("cart")) : [];
    return cartItems;
};
const setCartItems = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
};

function addToCart(id) {
    console.log(id); // 1
    axios.get("https://w0vd4.sse.codesandbox.io/posts/" + id).then((response) => {
        const newProduct = {
            ...response.data,
            quantity: 1
        };
        // Lấy danh sách sản phẩm từ localStorage
        let cartItems = getCartItems();
        console.log(cartItems);
        // // kiểm tra sản phẩm trong localStorage, nếu ID trùng nhau thì trả về 1 object
        const existProduct = cartItems.find(
            (product) => product.id === newProduct.id
        );
        console.log("existProduct", existProduct);
        if (existProduct) {
            // neu ton tai san pham trong localStorage thi quantity +1
            existProduct.quantity++;
        } else {
            // Nếu không tồn tại sản phẩm nào trùng ID thì thêm sản phẩm click vào giỏ hàng
            cartItems = [...cartItems, newProduct];
        }
        console.log("cartItems", cartItems);
        setCartItems(cartItems);
        // // Chay thong bao thanh cong
    }).join();
    showCart.innerHTML = newProduct;
}