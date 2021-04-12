let hoy = new Date()
let dia = hoy.getDate()
if (dia.toString().length !== 2){
    dia='0'+dia
}
let mes= hoy.getMonth() +1
if (mes.length !== 10 && mes.length !== 11 && mes.length !== 12){
    mes='0'+mes
}
let anio= hoy.getFullYear()
let fecha_actual = String(anio+"-"+mes+"-"+dia)
let fecha_anioantes = String((anio-1)+"-"+mes+"-"+dia)

const apikey= 'f399ca5de86144599c58b66c5119485a'
const category= 'POLITICA%2CECONOMIA%2CSALUD'

const url = `https://api.jornalia.net/api/v1/articles?apiKey=${apikey}&search=vacuna&categories=${category}&startDate=${fecha_anioantes}&endDate=${fecha_actual}`

export default function getNoticias() {
    return (
        fetch(url)
        .then( res => res.json())
        .then(data => {
            return data.articles.slice(0,20)})
        .catch(err => console.log(err))
    )
}