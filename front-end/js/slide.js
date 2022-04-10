
var anh = document.querySelector("#anh1");
var ds_anh = ["images/banner-thoi-trang-nam.jpg", "images/4444.jpg", "images/5555.jpg"];
var stt = 0;
var list_obj_anh = [];

function slideanh() {
    for (i = 0; i < ds_anh.length; i++) {
        list_obj_anh[i] = new Object();
        list_obj_anh[i].src = ds_anh[i];
    }
}

function Next() {
    stt++;
    if (stt == ds_anh.length)
        stt = 0;
    anh.setAttribute("src", list_obj_anh[stt].src);

}

function Prev() {
    stt--;
    if (stt < 0)
        stt = ds_anh.length - 1;
    anh.setAttribute("src", list_obj_anh[stt].src);

}
var t;
t = setInterval(function() {
    Next();
}, 3000)
slideanh();
anh.setAttribute("src", list_obj_anh[stt].src);