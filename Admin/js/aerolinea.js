let ListaAerolineas = []

const GetAerolineas = async () => {

    $(".tableaerolinea tbody").empty()
    ListaAerolineas = []

    const aerolineas = await GetAerolinea()
    aerolineas.forEach((aerolinea, index) => {
      let fila = `
      <tr>
        <td class="align-middle">${aerolinea.Id}</td>
        <td class="align-middle">${aerolinea.Nombre}</td>
        <td class="align-middle"><img src="${uri}Aerolinea/DownloadImage/${aerolinea.Id}" alt="${aerolinea.Nombre}"></td>
        <td class="align-middle"><button class="btn btn-outline-dark" onclick="MostrarEditarAerolinea(${index})">Editar</button></td>
        <td class="align-middle"><button class="btn btn-outline-dark" onclick="EliminarAerolinea(${index})">Eliminar</button></td>
      </tr>`  
      $(".tableaerolinea > tbody").append(fila)
      ListaAerolineas.push(aerolinea)
    })
}

const MostrarAgregarAerolinea = () => {
   /* $('.wholetable').attr('hidden', true)
    $('.addAerolinea').removeAttr('hidden')*/
    $('.wholetable').slideUp()
    $('.addAerolinea').removeAttr('hidden')
}

const AgregarAerolinea = async () => {
    const NombreAerolineaDOM = document.querySelector('.addNombre > label ~ input[type="text"]')
    const OrigenAerolineaDOM = document.querySelector('.addOrigen > label ~ input[type="text"]')
    try {
        const newAerolinea = {
            Id: "",
            Nombre: NombreAerolineaDOM.value,
            Origen: OrigenAerolineaDOM.value
        }
        const {data} = await axios.post(uri + 'aerolinea', newAerolinea, {
            "Accept":"application/json",
            "Content-type": "application/json"
        })  
        console.log(data)
    } catch (error) {
        console.log(error)
    } 
}

const AgregarImagen = async (css) => {
    try {
        const file = document.querySelector(`${css} > label ~ input`).files[0]
        const formData = new FormData()
        formData.append('image', file)
        const {data} = await axios.post(uri + 'Aerolinea/UploadImage', formData, {
            "Accept":"multipart/form-data",
            "Content-Type":"multipart/form-data"
        })
        console.log(data)
    } catch (error) {
        console.log(error)
    }   
}

const AgregarContenido = async () => {
    await AgregarAerolinea()
    await AgregarImagen('.addLogo')   
    await GetAerolineas()
    CerrarAgregarAerolinea()
}

const CerrarAgregarAerolinea = () => {
    $('.wholetable').slideDown()
    $('.addAerolinea').attr('hidden', true)
    $('.addNombre > label ~ input[type="text"]').val('')
    $('.addLogo > label ~ input[type="text"]').val('')
}

const MostrarEditarAerolinea = (id) => {
    $('.wholetable').slideUp()
    $('.editAerolinea').removeAttr('hidden')

    const aerolinea = ListaAerolineas[id]
    localStorage.setItem('EditAerolineaId', aerolinea.Id)

    $('.editNombre > label ~ input').val(aerolinea.Nombre)
    $('.editOrigen > label ~ input').val(aerolinea.Origen)
}

const EditarAerolinea = async () => {
    const NombreAerolineaDOM = document.querySelector('.editNombre > label ~ input')
    const OrigenAerolineaDOM = document.querySelector('.editOrigen > label ~ input')
    const AerolineaIdLocal = localStorage.getItem('EditAerolineaId')

    const editAerolinea = {
        Id: AerolineaIdLocal,
        Nombre: NombreAerolineaDOM.value,
        Origen: OrigenAerolineaDOM.value
    }

    const {data} = await axios.put(uri + 'aerolinea/' + AerolineaIdLocal, editAerolinea, {
        "Accept":"application/json",
        "Content-type": "application/json"
    })   
    console.log(data)
}

const EditarContenido = async () => {
    await EditarAerolinea()
    await AgregarImagen('.editLogo')   
    await GetAerolineas()
    CerrarEditarAerolinea()
}

const CerrarEditarAerolinea = () => {
    $('.wholetable').slideDown()
    $('.editAerolinea').attr('hidden', true)
}

const EliminarAerolinea = async (id) => {
    const aerolinea = ListaAerolineas[id]
    const {data} = await axios.delete(uri + 'aerolinea/' + aerolinea.Id)

    await GetAerolineas()
    console.log(data)
}

const main = async () => {
    await GetAerolineas()
}
main()