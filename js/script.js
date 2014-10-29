function changeStyle() {

status = 1;
x = document.getElementById("text")

if(status==1) {
    x.style.color = 'orange';
    status = 2;
}

else if(status==2) {
    x.style.color = 'red';
    status = 3;
}

else if(status==3) {
    x.style.color = 'yellow';
    status = 1;
}

}