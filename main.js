var Name = document.getElementById('name');
var Url = document.getElementById("url");
var btn = document.getElementById('btn');
var tableRow = document.getElementById('tableRow');
var input = document.querySelector('.form-control');
var RegexUrl = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
var RegexName = /^[a-zA-Z0-9.-]{3,}$/
var UrlArr = [];
if (localStorage.getItem('Website') != null) {
    UrlArr = JSON.parse(localStorage.getItem('Website'))
    display(UrlArr)
}
btn.onclick = function () {
    submit()
}
function submit() {
    if (UrlRegex() && NameRegex()) {
        var Website = {
            name: Name.value,
            url: Url.value
        }
        UrlArr.push(Website);
        localStorage.setItem('Website', JSON.stringify(UrlArr))
        display(UrlArr)
        Name.value = "";
        Url.value = "";

    }
    else {
        NotMatch()
    }
}

function NameRegex() {
    return RegexName.test(Name.value)
}
function UrlRegex() {
    return RegexUrl.test(Url.value)
}
function NotMatch() {
    if (!UrlRegex() || !NameRegex()) {
        alert("Input Not Match")
    }
}
function deleteItem(index) {
    UrlArr.splice(index, 1)
    localStorage.setItem('Website', JSON.stringify(UrlArr))
    display(UrlArr)
}

function display(list) {
    var box = '';
    for (var i = 0; i < list.length; i++) {
        box += `
    <tr>
    <td>${i + 1}</td>
    <td>${list[i].name}</td>
    <td><button class="btn" style = 'background-color: #9eb23b ; color: #FFF' onclick="visit(${i})"><div class="vl d-flex align-items-center">
    <i class="fa-solid fa-eye p-1" style="color: #ffffff;"></i>
    visit
</div></button></td>
    <td><button class="btn btn-danger" onclick="deleteItem(${i})"><div class="d-flex align-items-center">
    <i class="fa-solid fa-trash-can p-1" style="color: #ffffff;"></i>
    Delete</button></td>
    </tr>`
    }
    tableRow.innerHTML = box
}
function visit(index) {
    var urlToVisit = UrlArr[index].url;
    window.open('https://' + urlToVisit);
}



Name.addEventListener("input", function () {
    validate(Name, RegexName);
});

Url.addEventListener("input", function () {
    validate(Url, RegexUrl);
});

function validate(element, regex) {
    var testRegex = regex;
    if (testRegex.test(element.value)) {
        element.classList.add("is-valid");
        element.classList.remove("is-invalid");
    } else {
        element.classList.add("is-invalid");
        element.classList.remove("is-valid");
    }
}

