const url = 'http://localhost:3000/tin_Tuc';
fetch(url)
    .then(res => res.json())
    .then(data => {
        data.forEach(tinTuc => {
            renderUser(tinTuc);
        });
    })
const tableUser = document.querySelector("#table-tinTuc");
const renderUser = (tinTuc) => {
    const output = `
        <tbody>
            <tr data-id='${tinTuc.id}'>
                <td>${tinTuc.id}</td>
                <td>${tinTuc.name}</td>
                <td>${tinTuc.noiDung}</td>
                <td><img src="${tinTuc.avatar}" alt=""></td>
                <td><a href="#" onclick="EditRow(${tinTuc.id})">Sửa</a></td>
                <td><a href="#" id="delete-tinTuc" onclick="return confirm('Bạn có muốn xóa bài viết này không này không?')">Xóa</a></td>
            </tr>
        </tbody>
        `;
    tableUser.insertAdjacentHTML('beforeend', output);
    const deleteUser = document.querySelector(`[data-id = '${tinTuc.id}'] #delete-tinTuc`);
    deleteUser.addEventListener('click', (e) => {
        // console.log('deleteUser   ' + `${tinTuc.name}`);
        fetch(`${url}/${tinTuc.id}`, {
                method: 'DELETE'
            }).then(res => res.json)
            .then(() => location.reload());
    })

}
function EditRow(id) {
    console.log("Edit row " + id);
    document.getElementById('form-sua').style.display = 'block';
    document.getElementById('table-tinTuc').style.display = 'none';

    let url_delete = 'http://localhost:3000/tin_Tuc/' + id;

    fetch(url_delete, {
        method: "GET" // dùng phương thức get để lấy thông tin
    }).then(function (res) {
        return res.json(); // chuyển chuỗi nhận được thành đối tượng json
    }).then(function (data) {
        console.log(data);
        const ht = document.querySelector('#form-sua');
        const output = `
                <h2>Form sửa</h2>
                <form action="" id="sua" method="post" enctype="multipart/form-data">
                    <div class="form_label">
                        <label for="">Tên bài viết:</label>
                        <input type="text" name="name" id="name" value="${data.name}">
                    </div>
                    <div class="form_label">
                        <label for="">Nội dung:</label>
                        <textarea name="noiDung" id="noiDung" cols="30" rows="10" autocomplete="off" placeholder="" value="${data.noiDung}">${data.noiDung}</textarea>
                    </div>
                    <div class="form_label">
                        <label for="">Ảnh tin tức:</label>
                        <input type="file" name="avatar" id="avatar" placeholder=""
                            onchange="previewFile()">
                        <img src="${data.avatar}" alt="xem trước" id="avatar_preview" height="200">
                    </div>
                    <button type="button" onclick="SaveUpdate(${data.id})">Sửa bài viết</button>
                </form><br><br>
                `;
                ht.insertAdjacentHTML('beforeend', output);

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
function SaveUpdate(id) {
    //1. Lấy dữ liệu
    console.log("1");
    const name = document.querySelector('#name').value;
    const noiDung = document.querySelector('#noiDung').value;
    const avatar = document.querySelector('#avatar_preview').getAttribute('src');

    //2. kiểm tra hợp lệ
    if ((name || noiDung).length == 0) {
        alert('Không được bỏ trống!');
        return false;
    }
    console.log(id);
    // var id_edit = document.querySelector("#form_edit").getAttribute('id_edit');
    // console.log(name);
    var opt = {
        url: 'http://localhost:3000/tin_Tuc/' + id,
        method: 'put',
        data: {
            name: name,
            noiDung: noiDung,
            avatar: avatar
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

