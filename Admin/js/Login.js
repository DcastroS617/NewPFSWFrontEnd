async function IniciarSesion() {
    const url = "http://localhost:57708/api/"//"https://proyectofinalsw.azurewebsites.net/api/"
    const UserDOM = document.getElementById("username")
    const contrasenaDOM = document.getElementById("password")
    const objeto = {
        Username: UserDOM.value,
        Contrasena: contrasenaDOM.value
    }
    const { data } = await axios.post(url + "user/Login", objeto, {
        "Content-type": "application/json",
        "Accept": "application/json"
    })
    console.log(data)
    localStorage.setItem("usuarioLogin", JSON.stringify(data))
    if(data){
        window.location="../index.html"
    }   
    let usuario=localStorage.getItem("usuarioLogin")
    usuario=JSON.parse(usuario)
    console.log(usuario)
}


// JavaScript source code
