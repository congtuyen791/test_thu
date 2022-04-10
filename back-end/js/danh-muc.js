const url = 'http://localhost:3000/danhMuc';
fetch(url, {
    method: "GET"
}).then(function (res) {
    return res.json(); // chuyển chuỗi nhận được thành đối tượng json
}).then(function (data) {
    // các lệnh xử lý cho dữ liệu ở đây: các công việc hiển thị.
    console.log(data);

    //duyệt mảng và tạo các element cho vào bảng

    var bang = document.querySelector('#table-danhMuc');
    for (i = 0; i < data.length; i++) {
        var obj = data[i];
        let dong_moi = bang.insertRow(-1);
        let o1 = dong_moi.insertCell(0);
        o1.innerText = obj.id;
        let o2 = dong_moi.insertCell(1);
        o2.innerText = obj.name_dm;
        let o3 = dong_moi.insertCell(2);
        var btn_sua = document.createElement('button');
        btn_sua.setAttribute('type', 'button');
        btn_sua.innerText = "Sửa";
        btn_sua.setAttribute('onclick', 'EditRow(' + obj.id + ')') // truyền vào id user
        o3.appendChild(btn_sua);
        let o4 = dong_moi.insertCell(3);
        // tạo nút bấm xóa:
        var btn_xoa = document.createElement('button');
        btn_xoa.setAttribute('type', 'button');
        btn_xoa.innerText = "Xóa";
        btn_xoa.setAttribute('onclick', 'DeleteRow(' + obj.id + ')') // truyền vào id user
        o4.appendChild(btn_xoa);


    }

});
function Form_add(){

    document.getElementById('form_add').style.display = 'block';
    document.getElementById('form_edit').style.display = 'none';
}
function Insert() {

    var name_dm_add = document.querySelector("input[name=name_dm_add]");
    var opt = {
        url: 'http://localhost:3000/danhMuc',
        method: 'post',
        data: {
            name_dm: name_dm_add.value,
        }

    }
    axios(opt)
        .then(function (data) {
            alert('Thêm thành công!');
        })
        .then(() => location.reload());
}

function DeleteRow(id) {
    let url_delete = 'http://localhost:3000/danhMuc/' + id;
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
    document.getElementById('form_add').style.display = 'none';
    let url_delete = 'http://localhost:3000/danhMuc/' + id;

    fetch(url_delete, {
        method: "GET" // dùng phương thức get để lấy thông tin
    }).then(function (res) {
        return res.json(); // chuyển chuỗi nhận được thành đối tượng json
    }).then(function (data) {
        console.log(data);

        document.querySelector("input[name=name_dm_sua]").value = data.name_dm;
        document.querySelector("#form_edit").setAttribute('id_edit', id); // gắn luôn vào thẻ form cho nhanh
        document.querySelector("#form_edit").style.display = "block";

    });

}
function SaveUpdate() {
    //1. Lấy dữ liệu
    var name_dm_sua = document.querySelector("input[name=name_dm_sua]").value

    //2. kiểm tra hợp lệ
    if (name_dm_sua.length == 0) {
        alert('Bạn cần nhập ten danh muc');
        return false;
    }
    var id_edit = document.querySelector("#form_edit").getAttribute('id_edit');
    console.log(name_dm_sua);
    var opt = {
        url: 'http://localhost:3000/danhMuc/' + id_edit,
        method: 'put',
        data: {
            name_dm: name_dm_sua,
        }

    }
    axios(opt)
        .then(function (data) {
            console.log('Success:', data);
            alert('Thêm thành công!');
            if (data.id == id_edit) {
                alert('Đã cập nhật thành công');
                document.querySelector("input[name=name_dm_sua]").value = '';
                document.querySelector("#form_edit").removeAttribute('id_edit'); // xóa cả cái id vừa gắn vào
            }
        })
        .then(() => location.reload());
}