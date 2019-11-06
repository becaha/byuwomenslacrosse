// function changeNavTheme() {
//     let navbarElement = document.getElementById("navbar-change-color");
//     toggleClasses(navbarElement, 'bg-dark', 'bg-light');
//     toggleClasses(navbarElement, 'navbar-dark', 'navbar-light');
// }

// function toggleClasses(element, defaultClass, class2) {
//     if (element.classList.contains(defaultClass)) {
//         element.classList.remove(defaultClass);
//         element.classList.add(class2);
//     }
//     else {
//         element.classList.remove(class2);
//         element.classList.add(defaultClass);
//     }
// }

/*global google*/
let map;
function initMapNUF() {
map = new google.maps.Map(document.getElementById('mapNUF'), {
  center: {lat: -34.397, lng: 150.644},
  zoom: 8
});
}

let map1;
function initMapIPF() {
map1 = new google.maps.Map(document.getElementById('mapIPF'), {
  center: {lat: 40.2472, lng: 111.6568}, // 40.2472° N, 111.6568° W
  zoom: 8
});
}
