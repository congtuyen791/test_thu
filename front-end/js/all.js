function danhMuc() {
    const url = 'http://localhost:3000/danhMuc';
    fetch(url)
        .then(res => res.json())
        .then(data => {
            data.forEach(danhMuc => {
                renderdanhMuc(danhMuc);
            });
        })
    const tabledanhMuc = document.querySelector("#danh-muc");
    const renderdanhMuc = (danhMuc) => {
        const output = `
        <li><a href="sanpham.html">${danhMuc.name_dm}</a></li>
        `;
        tabledanhMuc.insertAdjacentHTML('beforeend', output);
    }
}

function sanPhamMoi() {
    const url = 'http://localhost:3000/products?chu_de=mới';
    fetch(url)
        .then(res => res.json())
        .then(data => {
            data.forEach(product => {
                const tableProduct = document.querySelector(".san_pham_m");
                const output = `
                <div class="box_sp" id="idsp">
                    <img src="${product.avatar}" alt="">
                    <p class="ten_sp"><a href="chitetsp.html">${product.name}</a></p>
                    <span>
                        <p class="gia_sp">${product.gia}<sup>đ</sup></p>
                        <p class="gia_km">${product.gia_km}<sup>đ</sup></p>
                    </span>
                    <div class="nut">
                        <div class="them">
                            <a href="giohang.html" onclick="mua(${product.id})">Thêm vào giỏ hàng</a>
                        </div>
                        <div class="chi_tiet">
                            <a href="chitietsp.html?id=${product.id}">Chi tiết</a>

                        </div>
                    </div>
                </div>
                `;
                tableProduct.insertAdjacentHTML('beforeend', output);

            });
        })
}
function sanPham() {
    const url = 'http://localhost:3000/products';
    fetch(url)
        .then(res => res.json())
        .then(data => {
            data.forEach(product => {
                const tableProduct = document.querySelector(".san_pham-m");
                const output = `
                <div class="box_sp" id="idsp">
                    <img src="${product.avatar}" alt="">
                    <p class="ten_sp"><a href="chitetsp.html">${product.name}</a></p>
                    <span>
                        <p class="gia_sp">${product.gia}<sup>đ</sup></p>
                        <p class="gia_km">${product.gia_km}<sup>đ</sup></p>
                    </span>
                    <div class="nut">
                        <div class="them">
                            <a href="giohang.html" onclick="mua(${product.id})">Thêm vào giỏ hàng</a>
                        </div>
                        <div class="chi_tiet">
                            <a href="chitietsp.html?id=${product.id}">Chi tiết</a>

                        </div>
                    </div>
                </div>
                `;
                tableProduct.insertAdjacentHTML('beforeend', output);

            });
        })
}
function mua(idsp) {
    console.log("1");
    myCart = localStorage.getItem('myCart');
    if (myCart == null) {
        myCart = {};
    } else {
        myCart = JSON.parse(myCart)
    }
    console.log(myCart);
    if (myCart[idsp] != undefined) {
        myCart[idsp] = myCart[idsp] + 1;
    } else {
        myCart[idsp] = 1;
    }
    console.log(myCart);
    localStorage.setItem('myCart', JSON.stringify(myCart));
}
danhMuc();
sanPhamMoi();
sanPham();