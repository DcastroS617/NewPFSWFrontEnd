async function AgregarUsuario() {
    const url = "http://localhost:57708/api/" //"https://proyectofinalsw.azurewebsites.net/api/"
    const NombreDOM = document.getElementById("nametxt")
    const contrasenaDOM = document.getElementById("password2txt")
    const emailDOM = document.getElementById("email")
    const preguntaDOM = document.getElementById("pregunta")
    const respuestaDOM = document.getElementById("respuesta")
    const objeto = {
        Id: "",
        Username: NombreDOM.value,
        Contrasena: contrasenaDOM.value,
        Email: emailDOM.value,
        Role: "Maintenance",
        PreguntaSeguridad: preguntaDOM.value,
        RespuestaSeguridad: respuestaDOM.value
    }
    const { data } = await axios.post(url + "user", objeto, {
        "Content-type": "application/json",
        "Accept": "application/json"
    })
    window.location = '../index.html'
    console.log(data)
}

function VerificarClave() {
    const password1 = localStorage.getItem("contrasenanew1")
    const password2 = localStorage.getItem("contrasenanew2")
    if (password1 !== password2) {
        throw new Error("Contraseñas no son iguales")
    }
}

function contrasenaOnchageEvento() {
    const npasswordDOM = document.getElementById("npasswordtxt")
    const password2DOM = document.getElementById("password2txt")
    console.log(npasswordDOM)
    console.log(password2DOM)
    npasswordDOM.addEventListener("change", (e) => {
        localStorage.setItem("contrasenanew1", e.target.value)
        const contrasena1local = localStorage.getItem("contrasena1")
        console.log(contrasena1local)
    })
    password2DOM.addEventListener("change", (e) => {
        localStorage.setItem("contrasenanew2", e.target.value)
        const contrasena2local = localStorage.getItem("contrasena2")
        console.log(contrasena2local)
    })
}