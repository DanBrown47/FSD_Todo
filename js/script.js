$(document).ready(function() {
    'use strict';


    $("#login").click(function() {
        if ($("#inputEmail").val() === 'admin' && $("#inputPassword").val() === "12345") {
            login_redirect();
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Authenication Failed',
                text: 'Check your username/passwd'


            })
        }
    });

    $('#togglePwd[type="checkbox"]').click(function() {
        if ($(this).prop("checked") == true) {
            $('#inputPassword').prop("type", "text");
        } else if ($(this).prop("checked") == false) {
            $('#inputPassword').prop("type", "password");
        }
    });

    // auto load triggering
    $("#getTodo").ready(() => {
        getTodoList();
    });
    // get Todo list triggering
    $("#getTodo").click(function() {
        getTodoList();
    });
    //Logout function
    $("#logout").click(function() {
        window.location.replace("index.html");
    });
    // checkbox triggering using promise
    let count = 0;

    $("#todolist").on("change", ":checkbox", function() {
        var checked = this.checked;
        var promise = new Promise(function(resolve, reject) {
            (checked === true) ? count++ : count--;
            console.log(count, checked);
            if (count == 5) {
                resolve(`success`);
                count = 0
            } else {
                reject(`please select aleast five task`);
            }
        });
        promise
            .then((res) => Swal.fire({
                icon: 'success',
                title: ' Congrats....',
                text: '5 Tasks have been Successfully Completed '
            }))
            .catch((res) => console.log(res));
    });

});
// login redirect
login_redirect = () => window.location.replace("home.html");

// Jquery Ajax
var card = $('#todolist')
getTodoList = async() => {
    $.ajax({
        type: 'GET',
        url: "https://jsonplaceholder.typicode.com/todos",
        dataType: 'json',
        success: await
        function(data) {
            console.log(data);
            $.each(data, function(index, item) {
                card.append('<div class="col-sm-2"> ' + item.id + '</div> <div class="col-sm-8">' + item.title + '</div> <div class="col-sm-2">  <input type="checkbox" class="form-check-input" id="statusBox" ' + ((item.completed == true) ? 'checked disabled ' : '') + '>' + ' </div>');
            })
        }
    });
};