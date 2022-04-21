let ListaConsecutivos = []

const GetConsecutivos = async () => {
    ListaConsecutivos = []
    $(".tableconsecutivo tbody").empty()

    const consecutivos = await GetConsecutivo()
    consecutivos.forEach((consecutivo, index) => {
        let fila = `
        <tr>
            <td>${index + 1}</td>
            <td>${consecutivo.Entidad}</td>
            <td>${consecutivo.Cantidad}</td>
            <td>${consecutivo.Ejemplar}</td>
        </tr>`
        $(".tableconsecutivo > tbody").append(fila)
    })
    console.log(consecutivos)
}

const MostrarAgregarConsecutivo = () => {
    $(".wholetable").slideUp()
    $(".addConsecutivo").removeAttr('hidden')
}

const CerrarAgregarConsecutivo = () => {
    $(".wholetable").slideDown()
    $(".addConsecutivo").attr('hidden', true)
}

const main = async () => {
    await GetConsecutivos()
}

main()