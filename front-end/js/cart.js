function showCart() {
    myCart = localStorage.getItem('myCart');
    if (myCart == null) {
        document.querySelector('.msg').innerHTML = '<p style="color: red;">Có 0 sản phẩm trong giỏ hàng</p>';
        return;
    }
    myCart = JSON.parse(myCart);
    chuoi = '';
    Object.keys(myCart).forEach(function (key) {
        if (chuoi.length > 0)
            chuoi += '&';
        chuoi += 'id=' + key;
    });
    console.log(chuoi);
    _url = 'http://localhost:3000/products?' + chuoi;
    axios.get(_url)
        .then(function (data_res) {
            console.log(data_res);
            str_row = '';//dinh nghia chuoi nay de tao dong
            tong_tien = 0;
            data_res.data.forEach(function (sp) {
                so_luong_sp = myCart[sp.id];
                tien_sp = so_luong_sp * sp.so_luong;
                tong_tien += tien_sp;
                str_row += `<tr>
                            <td><img src="${sp.avatar}" alt=""></td>
                            <td>${sp.name}</td>
                            <td>${sp.gia_km}<sup>đ</sup></td>
                            <td><input type="number" name="" value="${so_luong_sp}"></td>
                            <td>${tien_sp}<sup>đ</sup></td>
                            <td onclick="Delete(${sp.id})" style=" cursor: pointer; color: red;">Xóa</td>
                        </tr>`;
            });
            document.querySelector('#gio-hang tbody').innerHTML = str_row;
            document.querySelector('tfoot tr th:last-child').innerHTML = tong_tien;
        })
}
function Delete(id){
    myCart = localStorage.getItem('myCart');
    window.localStorage.removeItem('myCart');
    location.reload();
}
showCart();