export default function logout(){
    document.getElementById('logout').addEventListener('click', () => {
        // Borrar los datos almacenados en localStorage para cerrar sesión
        localStorage.clear();
        window.location.href = './login.html';
    });
}