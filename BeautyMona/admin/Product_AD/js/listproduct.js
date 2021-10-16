const list = document.querySelector("#listproduct");
var url = window.location.search;
const urlParams = new URLSearchParams(url);
const id = urlParams.get('id');
console.log(id)

function getList() {
    axios.get('https://w0vd4.sse.codesandbox.io/posts')
        .then(response => {

            const result = response.data.map(listproduct => {
                return `
                <table>
               
                    <td><p>${listproduct.product__name}</p></td> 
                    <td><p>${listproduct.product__price} <span class="price__unit">đ</span></p></td>
                    <td><p><img src="${listproduct.product__avt}" alt="" width="70px"; height:="70px"></p></td>
                    <td><p>${listproduct.product__sale}</p></td>
                    <td><p>${listproduct.product__description}</p></td>
                    <td><button><a href="./edit.html?id=${listproduct.id}">Sửa</a></button></td> 
                    <td><button class="bnt-confirm-delete btnDelete" data-id="${listproduct.id}">Xóa</button></td>
        
                </table>
                
                `
            }).join("");
            list.innerHTML = result;
        })
        .then(() => {
            function del() {
                const btnDelete = document.querySelectorAll(".btnDelete");
                console.log(btnDelete)
                for (let btn of btnDelete) {
                    const id = btn.dataset.id;
                    console.log(id)
                    btn.onclick = function(e) {
                        if (window.confirm('ban co chac chan muon xoa khong')) {
                            axios.delete(`https://w0vd4.sse.codesandbox.io/posts/${id}`)
                        }
                    }
                }
            }
            del()
        })

}
getList();