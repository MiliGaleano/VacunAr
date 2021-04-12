import React, { useEffect, useState } from 'react'
import jsPDF from 'jspdf'
import NavDropdown from 'react-bootstrap/NavDropdown'
import imgVacunar from '../assets/header.png'

const ComponenteImprimir = ({datosImprimir, lista, nombre}) => {

  const [arrayVacunas, setArrayVacunas] = useState([])

  useEffect(() => {
    let newArr = []
    for (let i=0; i<lista.length;i++){
        let first= datosImprimir.filter((a) => a.periodo === lista[i].periodo)
        if (first.length !== 0){
        newArr.push(first)
        }
    }
    setArrayVacunas(newArr)
  }, [datosImprimir, lista, nombre])

function crearPDF() {
    let doc = new jsPDF('p', 'pt', 'a4')

    doc.addFont('Courier New')
    doc.setFont('Courier New')
    let pageHeight = 842
    let pageMargin = 50

    let startX = pageMargin
    let startY = pageMargin
    
    let image= imgVacunar
    doc.addImage(image,'PNG', 240, 30, 130, 30)
    
    doc.setFontSize(18)
    doc.text(`Libreta de vacunación de ${nombre}`, startX, startY + 70)

    startY= pageMargin + 110

    function createCard(item) {
        if (startY >= pageHeight - 110) {
            doc.addPage()
            startY = pageMargin  
        }
        doc.setFontSize(16)
        doc.text(item[0].periodo, startX, startY)

        for (let i = 0; i < item.length; i++) {
        startY += 40
        doc.setFontSize(14)
        doc.text(`${item[i].vac}        ${item[i].fecha} / ${item[i].lugar}`, startX, startY)
        }
        startY += 80
    }

    for (let i = 0; i < arrayVacunas.length; i++) {
      createCard(arrayVacunas[i])
    }

    doc.save('vacunas.pdf')
}

    return <NavDropdown.Item onClick={crearPDF}>Descargar PDF</NavDropdown.Item>
}

export default ComponenteImprimir