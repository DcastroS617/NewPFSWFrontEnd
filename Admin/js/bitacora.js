let ListaBitacoras = []

const GetBitacoras = async () => {
    ListaBitacoras = []
    $(".tablebitacora tbody").empty()

    const bitacoras = await GetBitacora()
    bitacoras.forEach((bitacora, index) => {
        let fila = `
        <tr>
            <td>${bitacora.Id}</td>
            <td>${bitacora.Usuario}</td>
            <td>${bitacora.Fecha}</td>
            <td>${bitacora.Tipo}</td>
            <td>${bitacora.Descripcion}</td>
            <td>${bitacora.Dato}</td>
        </tr>`
        $(".tablebitacora > tbody").append(fila)
    })
}

const main = async () => {
    await GetBitacoras()
}
main()