
let ListaUsers = [ ]

async function NuevoRoll() {
    const url = "http://localhost:57708/api/" //"https://proyectofinalsw.azurewebsites.net/api/"
    $("#editroles").empty()
    ListaUsers = [ ]
    const usuarios = await GetUser()

    $("#editroles").append("<option>Escoja un Usuario...</option>")

    usuarios.forEach((usuario, index) => {
        ListaUsers.push(usuario)
        $("#editroles").append(`<option value=${index}>${usuario.Username}</option>`)

    })

    console.log(usuarios, ListaUsers)

    
}

async function AsignarRoles(){
    let UserSelected = document.getElementById("editroles")
    let usuario = ListaUsers[UserSelected.value]
    let rol=document.getElementById("roles")
    const objeto = {
        Id: usuario.Id,
        Username: usuario.Username,
        Contrasena: usuario.Contrasena,
        Email: usuario.Email,
        Role: rol.value,
        PreguntaSeguridad: usuario.PreguntaSeguridad,
        RespuestaSeguridad: usuario.RespuestaSeguridad
       
    }
    const { data } = await axios.put(uri + "user/"+ usuario.Id, objeto, {
        "Content-type": "application/json",
        "Accept": "application/json"
    })
    window.location = '../index.html'
    console.log(objeto)
}


NuevoRoll()