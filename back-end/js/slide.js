const url = 'http://localhost:3000/slides';
fetch(url, {
    method: "GET"
}).then(function (res) {
    return res.json(); // chuyển chuỗi nhận được thành đối tượng json
}).then(function (data) {
    // các lệnh xử lý cho dữ liệu ở đây: các công việc hiển thị.
    console.log(data);

    //duyệt mảng và tạo các element cho vào bảng

    var bang = document.querySelector('#table-slides');
    for (i = 0; i < data.length; i++) {
        var obj = data[i];
        let dong_moi = bang.insertRow(-1);
        let o1 = dong_moi.insertCell(0);
        o1.innerHTML = obj.id;
        let o2 = dong_moi.insertCell(1);
        o2.innerHTML = obj.name_sl;
        let o3 = dong_moi.insertCell(2);
        o3.innerHTML = `<img src="${obj.avatar_sl}" alt="" style="width:150px;">`;
        let o4 = dong_moi.insertCell(3);
        var btn_sua = document.createElement('button');
        btn_sua.setAttribute('type', 'button');
        btn_sua.innerHTML = "Sửa";
        btn_sua.setAttribute('onclick', 'EditRow(' + obj.id + ')') // truyền vào id user
        o4.appendChild(btn_sua);
        let o5 = dong_moi.insertCell(4);
        // tạo nút bấm xóa:
        var btn_xoa = document.createElement('button');
        btn_xoa.setAttribute('type', 'button');
        btn_xoa.innerHTML = "Xóa";
        btn_xoa.setAttribute('onclick', 'DeleteRow(' + obj.id + ')') // truyền vào id user
        o5.appendChild(btn_xoa);


    }

});

function DeleteRow(id) {
    let url_delete = 'http://localhost:3000/slides/' + id;
    fetch(url_delete, {
        method: "DELETE"
    }).then(function (res) {
        return res.json(); // chuyển chuỗi nhận được thành đối tượng json
    }).then(function (data) {
        location.reload();
    });
}
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
function Insert() {
    const name = document.querySelector('#name').value;
    const avatar = document.querySelector('#avatar_preview').getAttribute('src');
    var opt = {
        url: 'http://localhost:3000/slides',
        method: 'post',
        data: {
            name_sl: name,
            avatar_sl: avatar
        }

    }
    axios(opt)
        .then(function (data) {
            console.log(data);
            if (data.status == 201) {
                alert('Thêm mới thành công!');
            }
        })
        .catch(function (ex) {
            console.log(ex);
        })
        .then(() => location.reload());
}


function EditRow(id) {
    console.log("Edit row " + id);

    let url_delete = 'http://localhost:3000/slides/' + id;

    fetch(url_delete, {
        method: "GET" // dùng phương thức get để lấy thông tin
    }).then(function (res) {
        return res.json(); // chuyển chuỗi nhận được thành đối tượng json
    }).then(function (data) {
        console.log(data);

        document.querySelector("input[name=name_sl]").value = data.name_sl
        document.querySelector("#edit-slide").setAttribute('id_edit', id); // gắn luôn vào thẻ form cho nhanh
        document.querySelector("#edit-slide").style.display = "block";
        document.querySelector("#add-slide").style.display = "none";

    });

}
function SaveUpdate() {
    //1. Lấy dữ liệu
    var name_sl = document.querySelector("input[name=name_sl]").value;
    var avatar_sl = document.querySelector("#avatar_preview_sl").getAttribute('src');
    //2. kiểm tra hợp lệ
    if (name_dm_sua.length == 0) {
        alert('Bạn cần nhập ten danh muc');
        return false;
    }
    var id_edit = document.querySelector("#form_edit").getAttribute('id_edit');
    console.log(name_sl);
    var opt = {
        url: 'http://localhost:3000/slides/' + id_edit,
        method: 'put',
        data: {
            name_sl: name_sl,
            avatar_sl: avatar_sl
        }

    }
    axios(opt)
        .then(function (data) {
            console.log('Success:', data);
            alert('Thêm thành công!');
            if (data.id == id_edit) {
                alert('Đã cập nhật thành công');
                document.querySelector("input[name=name_dm_sua]").value = '';
                document.querySelector("#edit-slide").removeAttribute('id_edit'); // xóa cả cái id vừa gắn vào
            }
        })
        .then(() => location.reload());
}