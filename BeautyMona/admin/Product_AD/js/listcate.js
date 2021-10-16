const list = document.querySelector("#listproduct");
var url = window.location.search;
const urlParams = new URLSearchParams(url);
const id = urlParams.get('id');
console.log(id)

function getList() {
    axios.get('https://w0vd4.sse.codesandbox.io/category')
        .then(response => {

            const result = response.data.map(listcate => {
                return `
                <table>
               
                    <td><p>${listcate.category__name}</p></td> 
                    
                   
                    <td><button class="bnt-confirm-delete btnDelete" data-id="${listcate.id}">Xóa</button></td>
        
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
                            axios.delete(`https://w0vd4.sse.codesandbox.io/category/${id}`)
                        }
                    }
                }
            }
            del()
        })

}
getList();