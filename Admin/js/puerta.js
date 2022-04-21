let ListaPuertas = []

const GetPuertas = async () => {
    
    $(".tablepuerta tbody").empty()
    ListaPuertas = []

    const puertas = await GetPuerta()

    puertas.forEach((puerta, index) => {
        let fila = `
            <tr>
                <td>${puerta.Id}</td>
                <td>${puerta.Numero}</td>
                <td>${puerta.Descripcion}</td>
                <td><a class="btn btn-outline-dark" onclick="MostrarEditarPuerta(${index})">Editar</a></td>
                <td><a class="btn btn-outline-dark" onclick="EliminarPuerta(${index})">Eliminar</a></td>
            </tr>`
        ListaPuertas.push(puerta)
        $(".tablepuerta > tbody").append(fila)
    });
}

const MostrarAgregarPuerta = () => {
    $(".wholetable").slideUp()
    $(".addPuerta").removeAttr("hidden")
}

const AgregarPuerta = async () => {
    const NumeroPuertaDOM = document.querySelector('.addNumero > label ~ input')
    const DescripcionPuertaDOM = document.querySelector('.addDescripcion > label ~ input')
    console.log(NumeroPuertaDOM, DescripcionPuertaDOM)
    const puertaNueva = {
        Id: "",
        Numero: NumeroPuertaDOM.value,
        Descripcion: DescripcionPuertaDOM.value
    }

    const {data} = await axios.post(uri + 'puertaaeropuerto', puertaNueva, {
        "Accept": "application/json",
        "Content-type": "application/json"
    })
    await GetPuertas()
    CerrarAgregarPuertaForm()
    console.log(data)
}

const CerrarAgregarPuertaForm = () => {
    $(".wholetable").slideDown()
    $(".addPuerta").attr("hidden", true)
    $('.addNumero > label ~ input').val('')
    $('.addDescripcion > label ~ input').val('')
}

const MostrarEditarPuerta = (id) => {

    $(".wholetable").slideUp()
    $(".editPuerta").removeAttr("hidden")

    const NumeroPuertaDOM = document.querySelector('.editNumero > label ~ input')
    const DescripcionPuertaDOM = document.querySelector('.editDescripcion > label ~ input')
    const puerta = ListaPuertas[id]

    localStorage.setItem("EditPuertaId", puerta.Id)
    NumeroPuertaDOM.value = puerta.Numero
    DescripcionPuertaDOM.value = puerta.Descripcion
}

const EditarPuerta = async () => {
    const NumeroPuertaDOM = document.querySelector('.editNumero > label ~ input')
    const DescripcionPuertaDOM = document.querySelector('.editDescripcion > label ~ input')
    const PuertaIdLocal = localStorage.getItem("EditPuertaId")

    const puertaEdit = {
        Id: PuertaIdLocal,
        Numero: NumeroPuertaDOM.value,
        Descripcion: DescripcionPuertaDOM.value
    }

    const { data } = await axios.put(uri + 'puertaAeropuerto/' + PuertaIdLocal, puertaEdit, {
        "Content-type": "application/json",
        "Accept": "application/json"
    })
    console.log(data)
    await GetPuertas()
    CerrarEditarPuertaForm()
}

const CerrarEditarPuertaForm = () => {
    $(".wholetable").slideDown()
    $(".editPuerta").attr("hidden", true)
}

const EliminarPuerta = async (id) => {
    const puerta =  ListaPuertas[id]
    
    const {data} = await axios.delete(uri + 'puertaaeropuerto/' + puerta.Id)
    await GetPuertas()
    console.log(data)

}

const main = async () => {
    await GetPuertas()
}
main()