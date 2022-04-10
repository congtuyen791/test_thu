const url = 'http://localhost:3000/users';
fetch(url)
    .then(res => res.json())
    .then(data => {
        data.forEach(user => {
            renderUser(user);
        });
    })
const tableUser = document.querySelector("#table-user");
const renderUser = (user) => {
    const output = `
        <tbody>
            <tr data-id='${user.id}'>
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.address}</td>
                <td><a href="sua.html">Sửa</a></td>
                <td><a href="#" id="delete-user" onclick="return confirm('Bạn có muốn xóa tài khoản này không?')">Xóa</a></td>
            </tr>
        </tbody>
        `;
    tableUser.insertAdjacentHTML('beforeend', output);
    const deleteUser = document.querySelector(`[data-id = '${user.id}'] #delete-user`);
    deleteUser.addEventListener('click', (e) => {
        // console.log('deleteUser   ' + `${user.name}`);
        fetch(`${url}/${user.id}`, {
                method: 'DELETE'
            }).then(res => res.json)
            .then(() => location.reload());
    })

}

function FormAdd(){
    document.getElementById('form_them').style.display = 'block';
}

