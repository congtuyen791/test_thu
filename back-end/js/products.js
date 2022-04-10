const url = 'http://localhost:3000/products';
fetch(url, {
    method: "GET"
}).then(function (res) {
    return res.json(); // chuyển chuỗi nhận được thành đối tượng json
}).then(function (data) {
    console.log(data);
    var bang = document.querySelector('#table-products');
    for (i = 0; i < data.length; i++) {
        var obj = data[i];
        let dong_moi = bang.insertRow(-1);
        let o1 = dong_moi.insertCell(0);
        o1.innerHTML = obj.id;
        let o2 = dong_moi.insertCell(1);
        o2.innerHTML = `<img src="${obj.avatar}" alt="">`;
        let o3 = dong_moi.insertCell(2);
        o3.innerHTML = obj.name;
        let o4 = dong_moi.insertCell(3);
        o4.innerHTML = obj.gia;
        let o5 = dong_moi.insertCell(4);
        o5.innerHTML = obj.gia_km;
        let o6 = dong_moi.insertCell(5);
        o6.innerHTML = obj.so_luong;
        let o7 = dong_moi.insertCell(6);
        var btn_sua = document.createElement('button');
        btn_sua.setAttribute('type', 'button');
        btn_sua.innerHTML = "Sửa";
        btn_sua.setAttribute('href', 'sua.html');
        btn_sua.setAttribute('onclick', 'EditRow(' + obj.id + ')') // truyền vào id user
        o7.appendChild(btn_sua);

        // tạo nút bấm xóa:
        let o8 = dong_moi.insertCell(7);

        var btn_xoa = document.createElement('button');
        btn_xoa.setAttribute('type', 'button');
        btn_xoa.innerHTML = "Xóa";
        btn_xoa.setAttribute('onclick', 'DeleteRow(' + obj.id + ')') // truyền vào id user
        o8.appendChild(btn_xoa);

    }

});


function previewFile() {
    const preview = document.querySelector('#avatar_preview');
    const avatar = document.querySelector('#avatar').files[0];
    const reader = new FileReader();

    reader.addEventListener("load", function () {
        preview.src = reader.result;
    }, false);

    if (avatar) {
        reader.readAsDataURL(avatar);
    }
}


function DeleteRow(id) {
    let url_delete = 'http://localhost:3000/products/' + id;
    fetch(url_delete, {
        method: "DELETE"
    }).then(function (res) {
        return res.json(); // chuyển chuỗi nhận được thành đối tượng json
    }).then(function (data) {
        location.reload();
    });
}

function EditRow(id) {
    console.log("Edit row " + id);
    document.getElementById('sua').style.display = 'block';
    document.getElementById('list-sp').style.display = 'none';

    let url_delete = 'http://localhost:3000/products/' + id;

    fetch(url_delete, {
        method: "GET" // dùng phương thức get để lấy thông tin
    }).then(function (res) {
        return res.json(); // chuyển chuỗi nhận được thành đối tượng json
    }).then(function (data) {
        console.log(data);
        const ht = document.querySelector('#sua');
        const output = `
                <h2>Sửa sản phẩm</h2>
                <form action="" id="form_edit">
                    <div class="form_label">
                        <label for="">Tên sản phẩm:</label>
                        <input type="text" name="name_up" id="name" value="${data.name}" placeholder="Tên sản phẩm...">
                    </div>
                    <div class="form_label">
                        <label for="">Ảnh sản phẩm:</label>
                        <input type="file" name="avatar" id="avatar" autocomplete="off" placeholder="Ảnh sản phẩm"
                            onchange="previewFile()">
                        <img src="${data.avatar}"" alt="xem trước" id="avatar_preview" height="200">
                    </div>
                    <div class="form_label">
                        <label for="">Giá sản phẩm:</label>
                        <input type="number" name="gia_up" id="gia" value="${data.gia}"  autocomplete="off" placeholder="Giá sản phẩm....">
                    </div>
                    <div class="form_label">
                        <label for="">Giá khuyến mãi:</label>
                        <input type="number" name="gia_km_up" id="gia_km"  value="${data.gia_km}"   autocomplete="off" placeholder="Giá khuyến mại (nếu có)...">
                    </div>
                    <div class="form_label">
                        <label for="">Số lượng</label>
                        <input type="number" name="so_luong_up" id="so_luong"  value="${data.so_luong}"  autocomplete="off" placeholder="Số lượng sản phẩm...">
                    </div>
                    <div class="form_label">
                        <label for="">Kích thước sản phẩm:</label>
                        <input type="text" name="kich_thuoc_up" id="kich_thuoc" value="${data.kich_thuoc}"
                            autocomplete="off" placeholder="VD: size: X M L.. hoặc 38 39 40...">
                    </div>
                    <div class="form_label">
                        <label for="">Màu sắc sản phẩm:</label>
                        <input type="text" name="mau_sac_up" id="mau_sac" value="${data.mau_sac}"  autocomplete="off" placeholder="VD: Xanh, vàng, đỏ">
                    </div>
                    <div class="form_label">
                        <label for=""Chủ đề:</label>
                        <input type="text" name="chu_de_up" id="chu_de" value="${data.chu_de}"  autocomplete="off" placeholder="VD: Xanh, vàng, đỏ">
                    </div>
                    <div class="form_label">
                        <label for="">Mô tả sản phẩm:</label>
                        <textarea name="mo_ta_up" id="mo_ta" cols="30" rows="10" value="${data.mo_ta}" autocomplete="off"  placeholder="Nhập vào mô tả sản phẩm...">${data.mo_ta}</textarea>
                    </div>
                    <button type="button" onclick="SaveUpdate(${data.id})">Sửa sản phẩm</button>
                </form><br><br>
                `;
                ht.insertAdjacentHTML('beforeend', output);

    });

}

function SaveUpdate(id) {
    //1. Lấy dữ liệu
    console.log("1");
    var name = document.querySelector("input[name=name_up]").value;
    var avatar = document.querySelector("#avatar_preview").getAttribute('src');
    var gia = document.querySelector("input[name=gia_up]").value;
    var gia_km = document.querySelector("input[name=gia_km_up]").value;
    var so_luong = document.querySelector("input[name=so_luong_up]").value;
    var kich_thuoc = document.querySelector("input[name=kich_thuoc_up]").value;
    var mau_sac = document.querySelector("input[name=mau_sac_up]").value;
    var chu_de = document.querySelector("input[name=chu_de_up]").value;
    var mo_ta = document.querySelector("textarea[name=mo_ta_up]").value;

    //2. kiểm tra hợp lệ
    if ((name || avatar || gia || gia_km || so_luong || kich_thuoc || mau_sac || chu_de || mo_ta).length == 0) {
        alert('Không được bỏ trống!');
        return false;
    }
    console.log(id);
    // var id_edit = document.querySelector("#form_edit").getAttribute('id_edit');
    // console.log(name);
    var opt = {
        url: 'http://localhost:3000/products/' + id,
        method: 'put',
        data: {
            name: name,
            avatar: avatar,
            gia: Number(gia),
            gia_km: Number(gia_km),
            so_luong: Number(so_luong),
            kich_thuoc: kich_thuoc,
            mau_sac: mau_sac,
            chu_de: chu_de_up,
            mo_ta: mo_ta
        }

    }
    console.log(opt);
    axios(opt)
        .then(function (data) {
            console.log('Success:', data);
            alert('Sửa thành công!');
        })
        .then(() => location.reload());
}
