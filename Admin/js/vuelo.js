let ListaVuelos = []
//los metodos GetVuelo, GetAerolinea, GetOrigen, GetPuerta se encuentran
//en el archivo utils.js, retornan una lista de todos los registros en 
//cada una de las entidades, esto para poder iterar sobre ellos y evitar
//repetir el codigo alrededor del programa

const GetVuelos = async () => {
    try {
        ListaVuelos = []
        $(".tablevuelo tbody").empty()
        const vuelos = await GetVuelo()
        vuelos.forEach((vuelo, index) => {
            let fila = `<tr>
                        <td>${vuelo.Id}</td>
                        <td>${vuelo.Descripcion}</td>
                        <td>${vuelo.Aerolinea}</td>
                        <td>${vuelo.Origen}</td>
                        <td>${vuelo.Provincia}</td>
                        <td>${vuelo.PuertaAeropuerto}</td>
                        <td><a class="btn btn-outline-dark" onclick='MostrarEditarVuelo(${index})'>Editar</a></td>
                        <td><a class="btn btn-outline-dark" onclick="EliminarVuelo(${index})">Eliminar</a></td>
                        </tr>`
            ListaVuelos.push(vuelo)
            $(".tablevuelo > tbody").append(fila)
        })
    } catch (error) {
        console.log(error)
    }
}

const MostrarAgregarVuelo = async () => {
    $(".addVueloForm").removeAttr("hidden")
    $(".wholetable").slideUp()
    $("#addaerolinea").empty()
    $("#adddestino").empty()
    $("#addpuerta").empty()

    let aerolineas = await GetAerolinea()
    let destinos = await GetDestino()
    let puertas = await GetPuerta()

    $("#addaerolinea").append("<option>Escoja una aerolinea...</option>")
    aerolineas.forEach(aerolinea => {
        $("#addaerolinea").append(`<option>${aerolinea.Nombre}</option>`)
    })

    $("#adddestino").append("<option>Escoja un destino...</option>")
    destinos.forEach(destino => {
        $("#adddestino").append(`<option>${destino.Nombre + " " + destino.Descripcion}</option>`)
    })

    $("#addpuerta").append("<option>Escoja un destino...</option>")
    puertas.forEach(puerta => {
        $("#addpuerta").append(`<option>#${puerta.Numero}</option>`)
    })
}

const AgregarVuelo = async () => {

    let descripcion = document.querySelector("#adddescription").value
    console.log(descripcion)

    let aerolineas = await GetAerolinea()
    let origenes = await GetDestino()
    let puertas = await GetPuerta()

    let aerolinea = document.querySelector("#addaerolinea")
    aerolinea = aerolinea.options[aerolinea.selectedIndex].text

    let origen = document.querySelector("#adddestino")
    origen = origen.options[origen.selectedIndex].text.split(' ')[1]

    let puerta = document.querySelector("#addpuerta")
    puerta = puerta.options[puerta.selectedIndex].text.split('#')[1]

    let aerolineaFound = aerolineas.find(a => a.Nombre === aerolinea)
    let origenFound = origenes.find(o => o.Descripcion === origen)
    let puertaFound = puertas.find(p => p.Numero === puerta)

    const vuelo = {
        Id: "",
        Descripcion: descripcion,
        AerolineaId: aerolineaFound.Id,
        OrigenId: origenFound.Id,
        PuertaAeropuertoId: puertaFound.Id
    }
    console.log(vuelo.AerolineaId)
    let { data } = await axios.post(uri + 'vuelo', vuelo, {
        "Content-type": "application/json",
        "Accept": "application/json"
    })
    console.log(data)
    
    await GetVuelos()
    CerrarAgregarVueloForm()
}

const CerrarAgregarVueloForm = () => {
    $(".addVueloForm").attr("hidden", true)
    $(".wholetable").slideDown()
    $("#adddescription").val('')
}

const MostrarEditarVuelo = async (id) => {

    $("#editaerolinea").empty()
    $("#editdestino").empty()
    $("#editpuerta").empty()
    $(".editVueloForm").removeAttr("hidden")
    $(".wholetable").slideUp()

    let vuelo = ListaVuelos[id]
    console.log(vuelo)
    localStorage.setItem("EditVueloId", vuelo.Id)
    localStorage.setItem("EditVueloDescripcion", vuelo.Descripcion)

    let aerolineas = await GetAerolinea()
    let destinos = await GetDestino()
    let puertas = await GetPuerta()

    $(".editdescripcion > label ~ input").val(vuelo.Descripcion)

    $("#editaerolinea").append("<option>Escoja una aerolinea...</option>")
    aerolineas.forEach(aerolinea => {
        $("#editaerolinea").append(`<option>${aerolinea.Nombre}</option>`)
    })

    $("#editdestino").append("<option>Escoja un destino...</option>")
    destinos.forEach(destino => {
        $("#editdestino").append(`<option>${destino.Nombre + " " + destino.Descripcion}</option>`)
    })

    $("#editpuerta").append("<option>Escoja un destino...</option>")
    puertas.forEach(puerta => {
        $("#editpuerta").append(`<option>#${puerta.Numero}</option>`)
    })
}

const EditarVuelo = async () => {

    let vueloId = localStorage.getItem("EditVueloId")
    let vueloDescripcion = localStorage.getItem("EditVueloDescripcion")

    let aerolineas = await GetAerolinea()
    let origenes = await GetDestino()
    let puertas = await GetPuerta()

    let aerolinea = document.querySelector("#editaerolinea")
    aerolinea = aerolinea.options[aerolinea.selectedIndex].text

    let origen = document.querySelector("#editdestino")
    origen = origen.options[origen.selectedIndex].text.split(' ')[1]

    let puerta = document.querySelector("#editpuerta")
    puerta = puerta.options[puerta.selectedIndex].text.split('#')[1]

    let aerolineaFound = aerolineas.find(a => a.Nombre === aerolinea)
    let origenFound = origenes.find(o => o.Descripcion === origen)
    let puertaFound = puertas.find(p => p.Numero === puerta)

    let editVuelo = {
        "Id": vueloId,
        "Descripcion": vueloDescripcion,
        "AerolineaId": aerolineaFound.Id,
        "OrigenId": origenFound.Id,
        "PuertaAeropuertoId": puertaFound.Id
    }

    let { data } = await axios.put(uri + "vuelo/" + vueloId, editVuelo, {
        "Accept": "application/json",
        "Content-type": "application/json"
    })

    CerrarEditarVueloForm()
    await GetVuelos()
}

const CerrarEditarVueloForm = () => {
    $(".editVueloForm").attr('hidden', true)
    $(".wholetable").slideDown()
}

const EliminarVuelo = async (id) => {
    let vuelos = await GetVuelo()
    let vuelo = vuelos[id]
    let { data } = await axios.delete(uri + "vuelo/" + vuelo.Id)
    GetVuelos()
    console.log(data)
}

const main = async () => {
    await GetVuelos()
}
main()