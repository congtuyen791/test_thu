
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
    const noiDung = document.querySelector('#noiDung').value;
    const avatar = document.querySelector('#avatar_preview').getAttribute('src');
    if ((name || avatar || gia || gia_km || so_luong || kich_thuoc || mau_sac || mo_ta).length == 0) {
        alert('Không được bỏ trống!');
        return false;
    }
    var opt = {
        url: 'http://localhost:3000/tin_Tuc',
        method: 'post',
        data: {
            name: name,
            noiDung: noiDung,
            avatar: avatar
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
