// Slider
const slides = document.querySelector(".main__slice .slider").children;
const prev = document.querySelector(".controls .prev");
const next = document.querySelector(".controls .next");
const indicator = document.querySelector(".main__slice .indicator");
let index = 0;

prev.addEventListener("click", function() {
    prevSlide();
    updateCircleIndicator();
    resetTimer();
})

next.addEventListener("click", function() {
    nextSlide();
    updateCircleIndicator();
    resetTimer();
})

// -->create circle indicators
function circleIndicator() {
    for (let i = 0; i < slides.length; i++) {
        const div = document.createElement("div");
        div.innerHTML = i + 1;
        div.setAttribute("onclick", "indicateSlide(this)")
        div.id = i;
        if (i == 0) {
            div.className = "active";
        }
        indicator.appendChild(div);
    }
}
circleIndicator();

function indicateSlide(element) {
    index = element.id;
    changeSlide();
    updateCircleIndicator();
    resetTimer();
}

function updateCircleIndicator() {
    for (let i = 0; i < indicator.children.length; i++) {
        indicator.children[i].classList.remove("active");
    }
    indicator.children[index].classList.add("active");
}

function prevSlide() {
    if (index == 0) {
        index = slides.length - 1;
    } else {
        index--;
    }
    changeSlide();
}

function nextSlide() {
    if (index == slides.length - 1) {
        index = 0;
    } else {
        index++;
    }
    changeSlide();
}

function changeSlide() {
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove("active");
    }

    slides[index].classList.add("active");
}

function resetTimer() {
    // when click to indicator or controls button 
    // stop timer 
    clearInterval(timer);
    // then started again timer
    timer = setInterval(autoPlay, 4000);
}


function autoPlay() {
    nextSlide();
    updateCircleIndicator();
}

let timer = setInterval(autoPlay, 4000);

window.onscroll = function() {
    const myHeader = document.querySelector("#myHeader")
    const headerScroll = document.querySelector('.header.scrolling')
    const upTop = document.querySelector("#upTop")

    if ((document.documentElement.scrollTop > 400) || document.body.scrollTop > 0) {
        if (headerScroll) headerScroll.classList.remove('scrolling')
        upTop.style.display = 'block'
    } else {
        myHeader.classList.add('scrolling');
        upTop.style.display = 'none'

    }
}
const post = document.querySelector('#post');

function getPost() {
    axios.get('https://w0vd4.sse.codesandbox.io/posts?product__cate=' + 1)
        .then(response => {

            const result = response.data.map(post => {
                return `
                <div class="product">
                                    <div class="product__avt" style="background-image: url(${post.product__avt}); ">
                                    </div>
                                    <div class="product__info">
                                        <h3 class="product__name">${post.product__name}</h3>
                                        <div class="product__price">
                                            <div class="price__old">
                                            ${post.product__priceold}
                                            </div>
                                            <div class="price__new">${post.product__price} <span class="price__unit">đ</span></div>
                                        </div>
                                        <div class="product__sale">
                                            <span class="product__sale-percent">${post.product__sale}</span>
                                            <span class="product__sale-text">Giảm</span>
                                        </div>
                                    </div>
                                    <a href="product.html?id=${post.id}" class="viewDetail">Xem chi tiết</a>
                                    <a href="#" class="addToCart">Thêm vào giỏ</a>
                                </div>
                
                `
            }).join("");
            post.innerHTML = result;
        })
}
getPost();


var sort = document.querySelector('#sort');
sort.addEventListener('change', function() {
    axios.get('https://w0vd4.sse.codesandbox.io/posts?_sort=product__price&product__cate=1&_order=' + sort.value)
        .then(response => {
            const result = response.data.map(post => {
                return `
                    <div class="product">
                                        <div class="product__avt" style="background-image: url(${post.product__avt}); ">
                                        </div>
                                        <div class="product__info">
                                            <h3 class="product__name">${post.product__name}</h3>
                                            <div class="product__price">
                                                <div class="price__old">
                                                ${post.product__priceold}
                                                </div>
                                                <div class="price__new">${post.product__price} <span class="price__unit">đ</span></div>
                                            </div>
                                            <div class="product__sale">
                                                <span class="product__sale-percent">${post.product__sale}</span>
                                                <span class="product__sale-text">Giảm</span>
                                            </div>
                                        </div>
                                        <a href="product.html?id=${post.id}" class="viewDetail">Xem chi tiết</a>
                                        <a href="cart.html?id=${post.id}" class="addToCart">Thêm vào giỏ</a>
                                    </div>

                `
            }).join("");
            post.innerHTML = result;
        })
})


// Đăng ký user
var formSignin = document.querySelector('#formSignup');
formSignin.addEventListener('submit', function(e) {
    e.preventDefault();
    const user = {

        account: document.querySelector('#account').value,
        email: document.querySelector('#email').value,
        password: document.querySelector('#password').value
    }

    axios.post('https://w0vd4.sse.codesandbox.io/signup', user)
        .then(response => alert('Đăng ký thanh cong'))
    window.location.href = 'http://127.0.0.1:5500/BeautyMona/index.html#my-Login';

});

// Đăng nhập

const formLogin = document.querySelector('#formSignin');
formLogin.addEventListener('submit', function(e) {
    e.preventDefault();
    var user = {
        email: document.querySelector('#txtemail').value,
        password: document.querySelector('#txtpassword').value
    };
    console.log(user);
    axios.post('https://w0vd4.sse.codesandbox.io/signin', user)
        .then(respose => {
            localStorage.setItem('user', JSON.stringify(respose.data));
            $('.notify').innerHTML = '<p class="text-success>Đăng nhập thành công</p>';
            alert('Đăng nhập thành công');
            window.location.href = 'http://127.0.0.1:5500/BeautyMona';
        })
        .catch(reject => {
            alert("Đăng nhập thất bại !!!");
        })
})