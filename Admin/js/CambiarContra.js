
async function NuevaContra() {

    const url = "http://localhost:57708/api/"//"https://proyectofinalsw.azurewebsites.net/api/"
    let usuario=localStorage.getItem("usuarioLogin")
    usuario=JSON.parse(usuario)
    const password2 = localStorage.getItem("contrasena2")

    const objeto = {
        Id: usuario.Id,
        Username: usuario.Username,
        Contrasena: password2,
        Email: usuario.Email,
        Role: usuario.Role,
        PreguntaSeguridad: usuario.PreguntaSeguridad,
        RespuestaSeguridad: usuario.RespuestaSeguridad
       
    }
    const { data } = await axios.put(url + "user/"+ usuario.Id, objeto, {
        "Content-type": "application/json",
        "Accept": "application/json"
    })
    console.log(objeto)
    window.location="../index.html"
}



function VerificarClave() {
    const password1 = localStorage.getItem("contrasena1")
    const password2 = localStorage.getItem("contrasena2")
    if (password1 !== password2) {
        throw new Error("Contraseñas no son iguales")
    }
}

function CambiarContrasenaEvento(){
    try{
        VerificarClave()
        NuevaContra()
    }catch(Error){
        alert(Error)
    }
}



function contrasenaOnchageEvento() {
    const npasswordDOM = document.getElementById("npasswordtxt")
    const password2DOM = document.getElementById("password2txt")
    console.log(npasswordDOM)
    console.log(password2DOM)
    npasswordDOM.addEventListener("change", (e) => {
        localStorage.setItem("contrasena1", e.target.value)
        const contrasena1local = localStorage.getItem("contrasena1")
        console.log(contrasena1local)
    })
    password2DOM.addEventListener("change", (e) => {
        localStorage.setItem("contrasena2", e.target.value)
        const contrasena2local = localStorage.getItem("contrasena2")
        console.log(contrasena2local)
    })
}


function main(){
 
    contrasenaOnchageEvento()
}

main()