let ListaVuelos = []

const GetVuelos = async () => {
    try {
        ListaVuelos = []
        $(".tableindex tbody").empty()
        const vuelos = await GetVuelo()
        vuelos.forEach((vuelo, index) => {
            let fila = `<tr>
                        <td>${vuelo.Id}</td>
                        <td>${vuelo.Descripcion}</td>
                        <td>${vuelo.Aerolinea}</td>
                        <td>${vuelo.Origen}</td>
                        <td>${vuelo.Provincia}</td>
                        <td>${vuelo.PuertaAeropuerto}</td>
                        </tr>`
            ListaVuelos.push(vuelo)
            $(".tableindex > tbody").append(fila)
        })
    } catch (error) {
        console.log(error)
    }
}

const MostrarBuscarVuelo = () => {
    $(".buscarvuelo").removeAttr('hidden')
    $(".vuelostitle").attr('hidden', true)
}

const BuscarVuelo = async () => {
   $(".tableindex tbody").empty()
    const BuscarQuery = document.querySelector('.buscarevento > input')
    const {data} = await axios.get(`http://localhost:57708/api/Vuelo?Origen=${BuscarQuery.value}`)
    console.log(data)
    data.forEach(vuelo => {
        let fila = `<tr>
                        <td>${vuelo.Id}</td>
                        <td>${vuelo.Descripcion}</td>
                        <td>${vuelo.Aerolinea}</td>
                        <td>${vuelo.Origen}</td>
                        <td>${vuelo.Provincia}</td>
                        <td>${vuelo.PuertaAeropuerto}</td>
                    </tr>`
        $(".tableindex > tbody").append(fila)
    })
}

const CerrarBuscarVuelo = async () => {
    $(".buscarvuelo").attr('hidden', true)
    $(".vuelostitle").removeAttr('hidden')
    $('.buscarevento > input').val('')
    await GetVuelos()
}

const main = async () => {
    await GetVuelos()
}
main()