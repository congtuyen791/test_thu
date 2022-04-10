
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
    const gia = document.querySelector('#gia').value;
    const gia_km = document.querySelector('#gia_km').value;
    const so_luong = document.querySelector('#so_luong').value;
    const kich_thuoc = document.querySelector('#kich_thuoc').value;
    const mau_sac = document.querySelector('#mau_sac').value;
    const chu_de = document.querySelector('#chu_de').value;
    const mo_ta = document.querySelector('#mo_ta').value;
    if ((name || avatar || gia || gia_km || so_luong || kich_thuoc || mau_sac || mo_ta).length == 0) {
        alert('Không được bỏ trống!');
        return false;
    }
    var opt = {
        url: 'http://localhost:3000/products',
        method: 'post',
        data: {
            name: name,
            avatar: avatar,
            gia: Number(gia),
            gia_km: Number(gia_km),
            so_luong: Number(so_luong),
            kich_thuoc: kich_thuoc,
            mau_sac: mau_sac,
            mo_ta: mo_ta,
            chu_de: chu_de
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
