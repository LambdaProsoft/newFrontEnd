export default function sidebar(){
    return `<div class="sidebar-content">
                <h1 class="logo-title">Unaj<span>Pay</span></h1>
                <nav class="sidebar-menu">
                    <div class="items">
                        <img class="icono" src="./assets/img/inicio.svg">
                        <a id="start" href="./dashboard.html" class="menu-item">| Inicio</a>
                    </div>
                    <div class="items"> 
                        <img class="icono" src="./assets/img/cuenta3.svg"> 
                        <a id="account" href="./accountDetail.html" class="menu-item">| Cuenta</a>
                    </div>
                    <div class="items">
                        <img class="icono" src="./assets/img/usuario.svg">
                        <a id="userProfile" href="./UserProfile copy.html" class="menu-item">| Mi usuario</a>
                    </div>
                    <div class="items-exit" style="">
                        <img class="icono" src="./assets/img/cerrarSesion.svg">
                        <a id="logout" href="./login.html" class="menu-item">| Cerrar sesión</a>
                    </div>
                </nav> 
            </div>    
    `;
}

/*ORIGINAL
<div class="sidebar-content">
    <h1 class="logo-title">Unaj<span>Pay</span></h1>
    <nav class="sidebar-menu">
        <a href="#" class="menu-item">Inicio</a>
        <a href="#" class="menu-item">Cuenta</a>
        <a href="#" class="menu-item">Mi usuario</a>
        <a href="#" class="menu-item cerrar-sesion">Cerrar sesión</a>
    </nav> 
</div>  
*/