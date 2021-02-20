function cerateArrowAnimation(box_id, arrow_anim) {
    var arrow_box = document.getElementById(box_id);

    var arrowAnim = document.createElement("div");
    arrowAnim.id = arrow_anim;

    var delay0 = document.createElement("div");
    delay0.classList = "arrowSliding";
    var delay1 = document.createElement("div");
    delay1.classList = "arrowSliding delay1";
    var delay2 = document.createElement("div");
    delay2.classList = "arrowSliding delay2";
    var delay3 = document.createElement("div");
    delay3.classList = "arrowSliding delay3";

    var arrow0 = document.createElement("div");
    arrow0.className = "arrow";
    var arrow1 = document.createElement("div");
    arrow1.classList = "arrow";
    var arrow2 = document.createElement("div");
    arrow2.classList = "arrow";
    var arrow3 = document.createElement("div");
    arrow3.classList = "arrow";

    delay0.appendChild(arrow0);
    delay1.appendChild(arrow1);
    delay2.appendChild(arrow2);
    delay3.appendChild(arrow3);

    arrowAnim.appendChild(delay0);
    arrowAnim.appendChild(delay1);
    arrowAnim.appendChild(delay2);
    arrowAnim.appendChild(delay3);

    arrow_box.appendChild(arrowAnim);
}

function createArrowIcon(box_id, arrow_anim) {
    var arrow_box = document.getElementById(box_id);

    var arrowAnim = document.createElement("div");
    arrowAnim.id = arrow_anim;

    var arrow = document.createElement("div");
    arrow.className = "arrow";

    arrowAnim.appendChild(arrow);
    arrow_box.appendChild(arrowAnim);
}

function changeToAnimation1() {
    var node = document.getElementById("arrowAnim1");
    node.remove();
    cerateArrowAnimation("arrow_box_1", "arrowAnim1");
}

function changeToIcon1() {
    var node = document.getElementById("arrowAnim1");
    node.remove();
    createArrowIcon("arrow_box_1", "arrowAnim1");
}

function changeToAnimation2() {
    var node = document.getElementById("arrowAnim2");
    node.remove();
    cerateArrowAnimation("arrow_box_2", "arrowAnim2");
}

function changeToIcon2() {
    var node = document.getElementById("arrowAnim2");
    node.remove();
    createArrowIcon("arrow_box_2", "arrowAnim2");
}

function createPatientData(data) {
    var name = document.createElement("div");
    name.innerHTML = "Name : " + data.patient.Name;

    var room = document.createElement("p");
    room.classList = "patient_room";
    room.innerHTML = "Room No. " + data.patient_room;
    
    var weight = document.createElement("p");
    weight.innerHTML = "Weight : " + data.patient.Weight;

    var drugs = document.createElement("p");
    drugs.classList = "drugs";
    drugs.innerHTML = "Allergic_drugs : " + data.patient.Allergic_drugs;

    var box = document.createElement("div");
    box.classList = "container";
    box.id = "box";

    var image = document.createElement("div");
    image.classList = "image";

    box.appendChild(room);
    box.appendChild(name);
    box.appendChild(weight);
    box.appendChild(image);
    box.appendChild(drugs);

    var info = document.getElementById("info");
    info.appendChild(box);

}

function find_patient(room_number) {
    fetch('http://158.108.182.15:3000/find_all_patient')
        .then((data) => data.json())
        .then((datas) => {
            datas.forEach(data => {
                if (data.patient_room == room_number) {
                    // console.log(data.patient.Name);
                    createPatientData(data);
                }
            });
        });
}

function post_patient(room_number) {
    fetch('http://158.108.182.15:3000/hw_post', {
        method: "POST",
        headers:{"Content-Type" : "application/json"},
        body: JSON.stringify({patient_room : room_number}),
    })
    
    // .then((data) => data.json())
    // .then((data) => console.log(data))
}

// fetch('http://158.108.182.15:3000/hw_status')
//     .then((data) => data.json())
//     .then((data) => console.log(data))

let form = document.getElementById("room_number");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    room = form.elements["room"].value;
    find_patient(room);
    // find_patient(room);
    post_patient(room);
    form.elements["room"].value = "";
})

setInterval(() => {
    fetch('http://158.108.182.15:3000/hw_status')
        .then((data) => data.json())
        .then((data) => {
            if (data.status == "start") {
                document.getElementById("dot_start").style.backgroundColor = "green";
                changeToAnimation1();
                document.getElementById("status").innerHTML = "Status : Start";
            }
            else if (data.status == "destination") {
                document.getElementById("dot_start").style.backgroundColor = "brown";
                changeToIcon1();
                document.getElementById("dot_dest").style.backgroundColor = "green";
                changeToAnimation2();
                document.getElementById("status").innerHTML = "Status : Destination";
            }
            else if (data.status == "receive") {
                document.getElementById("dot_dest").style.backgroundColor = "brown";
                changeToIcon2();
                document.getElementById("dot_received").style.backgroundColor = "green";
                document.getElementById("box").remove();
                document.getElementById("status").innerHTML = "Status : Recieved";
            }
            else {
                document.getElementById("dot_received").style.backgroundColor = "brown";
                document.getElementById("status").innerHTML = "Status : -";
            }
        })
}, 5000);