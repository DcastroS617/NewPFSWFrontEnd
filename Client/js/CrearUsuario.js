async function AgregarUsuario() {
    const url ="https://proyectofinalsw.azurewebsites.net/api/"
    const NombreDOM = document.getElementById("nametxt")
    const contrasenaDOM = document.getElementById("password")
    const emailDOM = document.getElementById("email")
    //const preguntaDOM = document.getElementById("pregunta")
    //const respuestaDOM = document.getElementById("respuesta")
    const objeto = {
    id: "",
    username: NombreDOM.value,
        contrasena: contrasenaDOM.value,
        email: emailDOM.value,
        role: "maintenance"
        //pregunta: preguntaDOM.value,
        //respuesta: respuestaDOM.value
    }
    const { data } = await axios.post(url + "user", objeto, {
        "Content-type": "application/json",
        "Accept": "application/json"
    })
    console.log(data)
}

