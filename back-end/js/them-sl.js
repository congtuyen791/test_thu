
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
        .then(() => window.location.reload());
}
