let ListaPaises = []

const GetPaises = async () => {
    try {
        ListaPaises = []
        $(".tablepais tbody").empty()

        const paises = await GetDestino()
        paises.forEach((pais, index) => {
            let fila = `
                <tr>
                    <td>${pais.Id}</td>
                    <td>${pais.Nombre}</td>
                    <td>${pais.Descripcion}</td>
                    <td><img src='${uri}/origen/imagedownload/${pais.Id}'></td>
                    <td><a class="btn btn-outline-dark" onclick='MostrarEditarPais(${index})'>Editar</a></td>
                    <td><a class="btn btn-outline-dark" onclick="EliminarPais(${index})">Eliminar</a></td>
                </tr>`
            ListaPaises.push(pais)
            $(".tablepais > tbody").append(fila)
        })
    } catch (error) {
        console.log(error)
    }
}

const MostrarEditarPais = (id) => {

    $(".wholetable").slideUp()
    $(".editPais").removeAttr('hidden')

    const NombrePaisDOM = document.querySelector('.editNombre > label ~ input')
    const ProvinciaPaisDOM = document.querySelector('.editProvincia > label ~ input')
    const EditBanderaDOM = document.querySelector('.editBandera > label ~ input')

    const paisEscogido = ListaPaises[id]

    localStorage.setItem("EditPaisId", paisEscogido.Id)
    NombrePaisDOM.value = paisEscogido.Nombre
    ProvinciaPaisDOM.value = paisEscogido.Descripcion
    EditBanderaDOM.value = paisEscogido.Bandera
}

const EditarPais = async () => {
    const NombrePaisDOM = document.querySelector('.editNombre > label ~ input')
    const ProvinciaPaisDOM = document.querySelector('.editProvincia > label ~ input')
    const EditBanderaDOM = document.querySelector('.editBandera > label ~ input')
    const PaisIdLocal = localStorage.getItem('EditPaisId')

    const paisEdit = {
        Id: PaisIdLocal,
        Nombre: NombrePaisDOM.value,
        Descripcion: ProvinciaPaisDOM.value,
    }

    const { data } = await axios.put(uri + 'origen/' + PaisIdLocal, paisEdit, {
        'Accept': 'application/json',
        'Content-type': 'application/json'
    })
    console.log(NombrePaisDOM.value, ProvinciaPaisDOM.value, EditBanderaDOM.value, data)

    await GetPaises()
    CerrarEditarPaisForm()
}

const CerrarEditarPaisForm = () => {
    $('.editPais').attr('hidden', true)
    $(".wholetable").slideDown()
}

const MostrarAgregarPais = () => {
    $(".wholetable").slideUp()
    $(".addPais").removeAttr('hidden')
}

const AgregarPais = async () => {
    const NombrePaisDOM = document.querySelector('.addNombre > label ~ input')
    const ProvinciaPaisDOM = document.querySelector('.addProvincia > label ~ input')
    const BanderaDOM = document.querySelector('.addBandera > label ~ input')
    const newPais = {
        Id: "",
        Nombre: NombrePaisDOM.value,
        Descripcion: ProvinciaPaisDOM.value,
    }

    const {data} = await axios.post(uri + 'origen', newPais, {
        'Accept': 'application/json',
        'Content-type': 'application/json'
    })
    await GetPaises()
    CerrarAgregarPaisForm()
}

const AgregarContenido = async () => {

}

const CerrarAgregarPaisForm = () => {
    $('.addPais').attr('hidden', true)
    $(".wholetable").slideDown()
    $('.addNombre > label ~ input').val('')
    $('.addProvincia > label ~ input').val('')
    $('.addBandera > label ~ input').val('')
}

const EliminarPais = async (id) => {
    const paisEscogido = ListaPaises[id]
    
    const {data} = await axios.delete(uri + 'origen/' + paisEscogido.Id)
    await GetPaises()
    console.log(data)
}

const main = async () => {
    await GetPaises()
}

main()