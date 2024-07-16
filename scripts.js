// Obtiene el modal y la imagen
var modal = document.getElementById("myModal");
var img = document.getElementById("modal-image");
var profilePic = document.getElementById("profile-pic");
var closeModal = document.getElementById("close-modal");

// Agrega un evento para abrir el modal al hacer clic en la imagen de perfil
profilePic.addEventListener("click", function() {
    modal.style.display = "block";
    img.src = this.src;
});

// Agrega un evento para cerrar el modal al hacer clic en la "x"
closeModal.addEventListener("click", function() {
    modal.style.display = "none";
});

// Cierra el modal al hacer clic fuera de él solo si se ha abierto
window.addEventListener("click", function(event) {
    if (modal.style.display === "block" && event.target == modal) {
        modal.style.display = "none";
    }
});

// Asegura que el modal esté oculto al cargar la página
window.addEventListener("load", function() {
    modal.style.display = "none";
});

function toggleDetails(detailsId) {
    const details = document.getElementById(detailsId);
    if (details.style.display === "none" || details.style.display === "") {
        details.style.display = "block";
    } else {
        details.style.display = "none";
    }
}
