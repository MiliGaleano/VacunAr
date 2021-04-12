import 'firebase/firestore'

export default function GetProximasVacunas(usermail,nombre,fechaNac) {

// fecha actual
let hoy = new Date()
let dia = hoy.getDate()
let mes= hoy.getMonth() +1
let anio= hoy.getFullYear()
let edadUsuario = []
let fechaUsuario = fechaNac.split('-')
// año
    if (mes === fechaUsuario[1]){
        if (dia < fechaUsuario[2]){
            edadUsuario.push((anio - fechaUsuario[0]) - 1)
        } else {
            edadUsuario.push(anio - fechaUsuario[0])
        }
    } else if (mes < fechaUsuario[1]){
        edadUsuario.push((anio - fechaUsuario[0]) - 1)
    } else {
        edadUsuario.push(anio - fechaUsuario[0])
    }
// mes
    if (mes === fechaUsuario[1]){
        if (dia >= fechaUsuario[2]){
            edadUsuario.push('00')
        } else {
            edadUsuario.push('11')
        }
    } else if (mes < fechaUsuario[1]){
        if (dia >= fechaUsuario[2]){
            edadUsuario.push((12 - (fechaUsuario[1] - mes)))
        } else {
            edadUsuario.push(12 - ((fechaUsuario[1] - mes) + 1))
        }
    } else {
        if (dia >= fechaUsuario[2]){
            edadUsuario.push(mes - fechaUsuario[1])
        } else {
            edadUsuario.push((mes - fechaUsuario[1]) - 1)
        }
    }
// dia
edadUsuario.push(dia >= fechaUsuario[2] ? dia - fechaUsuario[2] : (31 - (fechaUsuario[2] - dia)))

let totaldias= (edadUsuario[0]*365) + (edadUsuario[1]*30) + edadUsuario[2]

// array de dias de cada periodo de vacunas
const periodos= ['0','60','90','120','150','180','360','450','540','730','1825','4015','5840']
let rango1 = periodos.indexOf(periodos.find((x) => x > totaldias))

let periodoCorrespondiente
if (rango1 === -1) {
    periodoCorrespondiente = 'vacunas15'
} else {
    periodoCorrespondiente = 'vacunas'+( rango1 > 9 ? rango1+2 : rango1+1 === 9 ? '10' : rango1+1 < 10 ? '0'+(rango1+1) : rango1+1)
}

// 
// return periodoCorrespondiente
// const fechaProx= 
if (periodoCorrespondiente === 'vacunas11'){
    fechaUsuario[0]= parseInt(fechaUsuario[0]) + 2 
} else if (periodoCorrespondiente === 'vacunas12'){
    fechaUsuario[0]= parseInt(fechaUsuario[0]) + 6 
} else if (periodoCorrespondiente === 'vacunas13'){
    fechaUsuario[0]= parseInt(fechaUsuario[0]) + 11 
} else if (periodoCorrespondiente === 'vacunas14'){
    fechaUsuario[0]= parseInt(fechaUsuario[0]) + 16 
} else if (periodoCorrespondiente === 'vacunas15'){
    fechaUsuario= 'sólo de ser necesario' 
} else if (periodoCorrespondiente === 'vacunas10'){
    fechaUsuario[0]= fechaUsuario[1] <= 6 ? parseInt(fechaUsuario[0]) + 1 : parseInt(fechaUsuario[0]) + 2
    fechaUsuario[1]= fechaUsuario[1] <= 6 ? parseInt(fechaUsuario[1]) + 6 : ((parseInt(fechaUsuario[1]) + 6) - 12)
} else if (periodoCorrespondiente === 'vacunas08'){
    fechaUsuario[0]= fechaUsuario[1] <= 9 ? parseInt(fechaUsuario[0]) + 1 : parseInt(fechaUsuario[0]) + 2
    fechaUsuario[1]= fechaUsuario[1] <= 9 ? parseInt(fechaUsuario[1]) + 3 : ((parseInt(fechaUsuario[1]) + 3) - 12)
} else if (periodoCorrespondiente === 'vacunas07'){
    fechaUsuario[0]= parseInt(fechaUsuario[0]) + 1 
} else if (periodoCorrespondiente === 'vacunas06'){
    fechaUsuario[0]= fechaUsuario[1] <= 6 ? parseInt(fechaUsuario[0]) : parseInt(fechaUsuario[0]) + 1
    fechaUsuario[1]= fechaUsuario[1] <= 6 ? parseInt(fechaUsuario[1]) + 6 : ((parseInt(fechaUsuario[1]) + 6) - 12)
} else if (periodoCorrespondiente === 'vacunas05'){
    fechaUsuario[0]= fechaUsuario[1] <= 7 ? parseInt(fechaUsuario[0]) : parseInt(fechaUsuario[0]) + 1
    fechaUsuario[1]= fechaUsuario[1] <= 7 ? parseInt(fechaUsuario[1]) + 5 : ((parseInt(fechaUsuario[1]) + 5) - 12)
} else if (periodoCorrespondiente === 'vacunas04'){
    fechaUsuario[0]= fechaUsuario[1] <= 8 ? parseInt(fechaUsuario[0]) : parseInt(fechaUsuario[0]) + 1
    fechaUsuario[1]= fechaUsuario[1] <= 8 ? parseInt(fechaUsuario[1]) + 4 : ((parseInt(fechaUsuario[1]) + 4) - 12)
} else if (periodoCorrespondiente === 'vacunas03'){
    fechaUsuario[0]= fechaUsuario[1] <= 9 ? parseInt(fechaUsuario[0]) : parseInt(fechaUsuario[0]) + 1
    fechaUsuario[1]= fechaUsuario[1] <= 9 ? parseInt(fechaUsuario[1]) + 3 : ((parseInt(fechaUsuario[1]) + 3) - 12)
} else if (periodoCorrespondiente === 'vacunas02'){
    fechaUsuario[0]= fechaUsuario[1] <= 10 ? parseInt(fechaUsuario[0]) : parseInt(fechaUsuario[0]) + 1
    fechaUsuario[1]= fechaUsuario[1] <= 10 ? parseInt(fechaUsuario[1]) + 2 : ((parseInt(fechaUsuario[1]) + 2) - 12)
} else {
    fechaUsuario = 'consulte con su médico'
}

const lista = JSON.parse(sessionStorage.getItem('listaVacunas'))
const proxVac = lista.filter((x) => x.id === periodoCorrespondiente)
const response = typeof fechaUsuario === 'string' ? [proxVac, fechaUsuario] : [proxVac, fechaUsuario.join('-')]

return response
}