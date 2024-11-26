import alertMessage from "./components/alertMessage.js";
import Loader from "./components/Loader.js";

Loader.Hidden();


document.getElementById('login-btn').addEventListener('click', async (event) =>{
    event.preventDefault();

    Loader.Show();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const requestData = {
        email : email,
        password : password
    };

    try {
        // Petición al endpoint de login
        const response = await fetch('https://localhost:7160/api/User/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        });

        if (response.ok) {
            //alert('Inicio de sesión exitoso. Por favor, ingrese el código de verificación.');
            alertMessage(true, "Inicio de sesión exitoso. Por favor, ingrese el código de verificación.");
            document.getElementById('codigo-verificacion-container').style.display = 'block';
            document.getElementById('codigo-verificacion').style.display = 'block';
            document.getElementById('verify-btn').style.display = 'block';
            document.getElementById('login-btn').style.display = 'none';
            document.getElementById('volver-btn').style.display = 'block';
            document.getElementById('credentials1').style.display = 'none';
            document.getElementById('credentials2').style.display = 'none';

            Loader.Hidden();
        } else {
            const errorData = await response.json();
            if (errorData.message == "Invalid credentials") {
                errorData.message = "El mail o contraseña son incorrectos.";
            }
            alertMessage(false, errorData.message);

            Loader.Hidden();
        }
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        alert('Hubo un problema con la solicitud. Por favor, inténtelo de nuevo.');
        Loader.Hidden();
    }

});


document.getElementById('volver-btn').addEventListener('click', () =>{
    Loader.Show();

    document.getElementById('codigo-verificacion').style.display = 'none';
    document.getElementById('verify-btn').style.display = 'none';
    document.getElementById('login-btn').style.display = 'block';
    document.getElementById('volver-btn').style.display = 'none';
    document.getElementById('credentials1').style.display = 'block';
    document.getElementById('credentials2').style.display = 'block';

    Loader.Hidden();
});

