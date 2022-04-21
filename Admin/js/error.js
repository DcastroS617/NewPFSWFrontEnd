let listaErrores = []

const GetErrores = async () => {
    listaErrores = []
    $(".tableerror tbody").empty()
    const errores = await GetError()
    errores.forEach((error, index) => {
        let fila = `<tr>
        <td>${error.Id}</td>
        <td>${error.Mensaje}</td>
        <td>${error.Fecha}</td>
        <td>${error.NumeroError}</td>
        </tr>`
        $(".tableerror > tbody").append(fila)
        listaErrores.push(error)
    })
}

const BuscarError = async () => {
    const FechaQuery = document.querySelector('.buscarfecha > input')
    const CancelarBuscar = document.querySelector('.buscarfecha > input ~ button ~ button')
    if (FechaQuery.value === '') {
        throw new Error("no se puede dejar en blanco la fecha")
    }
    const Fecha = new Date(FechaQuery.value)
    const FechaFinal = (parseInt(Fecha.getDate() + 1) + "/" + parseInt(Fecha.getMonth() + 1) + "/" + Fecha.getFullYear())
    console.log(FechaFinal)
    const { data } = await axios.get(`http://localhost:57708/api/error?fecha=${FechaFinal}`)
    if(data.length === 0){
        //FechaQuery.value = ''
        throw new Error("no se encontraron resultados")
    }
    console.log(data)
    $(".tableerror tbody").empty()
    CancelarBuscar.hidden = false
    data.forEach((error, index) => {
        let fila = `
        <tr>
            <td>${error.Id}</td>
            <td>${error.Mensaje}</td>
            <td>${error.Fecha}</td>
            <td>${error.NumeroError}</td>
        </tr>`
        $(".tableerror > tbody").append(fila)
    })
}

const CancelarBuscar = async () => {
    const FechaQuery = document.querySelector('.buscarfecha > input')
    const CancelarBuscar = document.querySelector('.buscarfecha > input ~ button ~ button')
    $(".tableerror tbody").empty()
    FechaQuery.value = ''
    CancelarBuscar.hidden = true
    await GetErrores()

}

const BuscarEvent = () => {
    const BuscarEventDOM = document.querySelector('.buscarfecha > input ~ button')
    BuscarEventDOM.addEventListener("click",async () => {
        try {       
            await BuscarError()
        } catch (error) {
            alert(error)
        }
    })
}

const CancelarEvent = () => {
    const CancelarEventDOM = document.querySelector('.buscarfecha > input ~ button ~ button')
    CancelarEventDOM.addEventListener("click", async () => {
        await CancelarBuscar()
    })
}
 
const main = async () => {
        await GetErrores()
        BuscarEvent()
        CancelarEvent()
}

main()