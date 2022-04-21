const uri = "http://localhost:57708/api/" /*"https://proyectofinalsw.azurewebsites.net/api/"*/

const GetVuelo = async () => {
    let {data} = await axios.get(uri + "vuelo")
    let returnList = []
    data.forEach(vuelo => {
        returnList.push(vuelo)
    })
    return returnList
}

const GetAerolinea = async () => {
    let { data } = await axios.get(uri + "aerolinea")
    let returnList = []
    data.forEach(aerolinea => {
        returnList.push(aerolinea)
    })
    return returnList
}

const GetDestino = async () => {
    let { data } = await axios.get(uri + "origen")
    let returnList = []
    data.forEach(destino => {
        returnList.push(destino)
    })
    return returnList
}

const GetPuerta = async () => {
    let { data } = await axios.get(uri + "puertaaeropuerto")
    let returnList = []
    data.forEach(puerta => {
        returnList.push(puerta)
    })
    return returnList
}

const GetConsecutivo = async () => {
    let { data } = await axios.get(uri + "consecutivo/analytics")
    let returnList = []
    data.forEach(puerta => {
        returnList.push(puerta)
    })
    return returnList
}

const GetBitacora = async () => {
    let {data} = await axios.get(uri + "bitacora")
    let returnList = []
    data.forEach(bitacora => {
        returnList.push(bitacora)
    })
    return returnList
}

const GetError = async () => {
    let {data} = await axios.get(uri + "error")
    let returnList = []
    data.forEach(error => {
        returnList.push(error)
    })
    return returnList
}

const GetUser = async () => {
    let {data} = await axios.get(uri + "user")
    let returnList = []
    data.forEach(user => {
        returnList.push(user)
    })
    return returnList
}  