
// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDkMZmep5JIVywZe9jKKqgdf5ZdNubYL6g",
    authDomain: "datos-formulario-1b54d.firebaseapp.com",
    projectId: "datos-formulario-1b54d",
    storageBucket: "datos-formulario-1b54d.appspot.com",
    messagingSenderId: "781032368026",
    appId: "1:781032368026:web:0c3fa214ec7be4b90cfc23",
    measurementId: "G-951KB78N14"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);

// Inicializar Cloud Firestore y obtener una referencia al servicio
const db = firebase.firestore();

// Manejar el envío del formulario
document.getElementById('formulario').addEventListener('submit', (event) => {
    event.preventDefault();

    // Validar campo nombre
    let entradaNombre = document.getElementById('name');
    let errorNombre = document.getElementById('nameError');

    if (entradaNombre.value.trim() === '') {  
        errorNombre.textContent = 'Por favor, introduce tu nombre';
        errorNombre.classList.add('error-message');
    } else {
        errorNombre.textContent = '';
        errorNombre.classList.remove('error-message');
    }

    // Validar correo electrónico
    let emailEntrada = document.getElementById('email');
    let emailError = document.getElementById('emailError');
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(emailEntrada.value)) {
        emailError.textContent = 'Por favor, introduce un email válido';
        emailError.classList.add('error-message');
    } else {
        emailError.textContent = '';
        emailError.classList.remove('error-message');
    }

    // Validar contraseña
    let contrasenaEntrada = document.getElementById('password');
    let contrasenaError = document.getElementById('passwordError');
    let contrasenaPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    if (!contrasenaPattern.test(contrasenaEntrada.value)) {
        contrasenaError.textContent = 'La contraseña debe tener al menos 8 caracteres, 1 minúscula, 1 mayúscula, 1 número y 1 carácter especial';
        contrasenaError.classList.add('error-message');
    } else {
        contrasenaError.textContent = '';
        contrasenaError.classList.remove('error-message');
    }

    // Si todos los campos son válidos, enviar formulario a Firestore
    if (!errorNombre.textContent && !emailError.textContent && !contrasenaError.textContent) {
        db.collection("users").add({
            nombre: entradaNombre.value,
            email: emailEntrada.value,
            password: contrasenaEntrada.value  // Corregido 'pasword' a 'password'
        })
        .then((docRef) => {
            console.log("Documento escrito con ID: ", docRef.id);
        })
        .catch((error) => {
            console.error("Error al agregar el documento: ", error);
        });

        alert('El formulario se ha enviado con éxito');
        document.getElementById('formulario').reset();
    }
});
