function completarActaCD(DATOS) {
    // Armado del párrafo que se incorpora como un nuevo item en el Acta de Consejo Directivo
    const {
        EXPTE,
        newDocBody,
        procedimiento,
        generoRedaccion,
        adjPlural,
        nombresDNIs,
        loteManz,
        informeAnteced,
        planoAnt,
        anteproyectoAnt,
        loteAntSentence,
        elLaAntec,
        adjAnterior
    } = DATOS;
    const nombre = EXPTE[3].adj_datos.nombre_apellido
        .replace(
            EXPTE[3].adj_datos.nombre_apellido[0],
            EXPTE[3].adj_datos.nombre_apellido[0].toLowerCase()
        ).trim(),
        dni = EXPTE[3].adj_datos.dni,
        normativaAplicable = procedimiento.slice(
            procedimiento.indexOf('art'),
            procedimiento.indexOf('330') + 3
        );

    const primPfoActa = `Expte:\t${EXPTE[0].numero}: Por el que se pretende la Regularización Dominial del inmueble identificado como ${loteManz}, de la vecinal denominada “${EXPTE[2].vecinal}” de esta ciudad, con las medidas, superficie y linderos que surgen del plano de ${EXPTE[2].plano_objeto} Nº ${EXPTE[2].plano_num}, {ACTA_CONTENIDO}`;
    newDocBody.appendListItem(primPfoActa);

    let pfoActa;
    switch (procedimiento) {
        case 'Adjudicación':
            console.log('Ingresando párrafo en Acta de CD para adjudicación');
            pfoActa = `en el que se aconseja adjudicar dicho inmueble a favor de ${adjPlural ? 'sus actuales ocupantes' : 'su actual ocupante'}, ${nombresDNIs ? nombresDNIs : `${nombre}, ${dni}`}, para así, una vez cancelado el precio de venta, proceder al otorgamiento de la Escritura Pública traslativa de dominio, con el fin de poder dar continuidad al Programa de Regularización Dominial enmarcado en la Ordenanza Nº 11.631.-\r`;
            break;
        case 'Rescisión por artículo 2º de la Ordenanza Nº 8.330, y adjudicación':
            console.log('Ingresando párrafo en Acta de CD para resc.art 2 y adj.');
        case 'Rescisión por artículo 3º, inc. A, de la Ordenanza Nº 8.330, y adjudicación':
            console.log('Ingresando párrafo en Acta de CD para resc.art 3 a y adj.');
        case 'Rescisión por artículo 3º, inc. B, de la Ordenanza Nº 8.330, y adjudicación':
            console.log('Ingresando párrafo en Acta de CD para resc.art 3 b y adj.');
        case 'Rescisión por artículo 7º, inc. B, de la Ordenanza Nº 8.330, y adjudicación':
            console.log('Ingresando párrafo en Acta de CD para resc.art 7 b y adj.');
            pfoActa = `${informeAnteced.match(/vigente|escritura/i) ? 'respecto del cual' : 'que'} ${(planoAnt || anteproyectoAnt) ? `${informeAnteced.match(/manzana/i) ?
                informeAnteced : `${`se encuentra adjudicado por la Municipalidad de Santa Fe como ${loteAntSentence}`}`
                }` : informeAnteced
                }, a favor de ${adjAnterior}, ${elLaAntec} que se aconseja dejar sin efecto y publicar el edicto pertinente, en virtud del ${normativaAplicable}, y posteriormente adjudicar el mismo inmueble a favor de ${adjPlural ? 'sus actuales ocupantes' : 'su actual ocupante'}, ${nombresDNIs ? nombresDNIs : `${nombre}, ${dni}`}, para así, una vez cancelado el precio de venta, proceder al otorgamiento de la Escritura Pública traslativa de dominio, con el fin de poder dar continuidad al Programa de Regularización Dominial enmarcado en la Ordenanza Nº 11.631.-\r`;
            break;
        case 'Redeterminación de precio':
            console.log('Ingresando párrafo en Acta de CD para redeterminación de precio');
            pfoActa = `que ${(planoAnt || anteproyectoAnt) ? `${informeAnteced.match(/manzana/i) ?
                informeAnteced : `${`se encuentra adjudicado por la Municipalidad de Santa Fe como ${loteAntSentence}`}`
                }` : informeAnteced
                }, a favor de ${nombresDNIs ? nombresDNIs : `${nombre}, ${dni}`}, en el que se aconseja redeterminar el precio de venta a la suma de ${EXPTE[1].precio_a_redeterminar}, para así, una vez cancelado el mismo, proceder al otorgamiento de la Escritura Pública traslativa de dominio a favor de ${adjPlural ? generoRedaccion === 'M' ? 'los adjudicatarios' : 'las adjudicatarias' : generoRedaccion === 'M' ? 'el adjudicatario' : 'la adjudicataria'}, con el fin de poder dar continuidad al Programa de Regularización Dominial enmarcado en la Ordenanza Nº 11.631.-\r`;
            break;
        case 'Tener por cancelado y escriturar':
            console.log('Ingresando párrafo en Acta de CD para tener por cancelado y escriturar');
            pfoActa = `que ${(planoAnt || anteproyectoAnt) ? `${informeAnteced.match(/manzana/i) ?
                informeAnteced : `${`se encuentra adjudicado por la Municipalidad de Santa Fe como ${loteAntSentence}`}`
                }` : informeAnteced
                }, a favor de ${nombresDNIs ? nombresDNIs : `${nombre}, ${dni}`}, en el que se aconseja tener por cancelado el precio de venta, para así, proceder al otorgamiento de la Escritura Pública traslativa de dominio a favor de ${adjPlural ? generoRedaccion === 'M' ? 'los adjudicatarios' : 'las adjudicatarias' : generoRedaccion === 'M' ? 'el adjudicatario' : 'la adjudicataria'}, con el fin de poder dar continuidad al Programa de Regularización Dominial enmarcado en la Ordenanza Nº 11.631.-\r`;
            break;
        case 'Rescisión por artículo 2º de la Ordenanza Nº 8.330':
            console.log('Ingresando párrafo en Acta de CD para resc.art 2 (sin posterior adjudicación)');
        case 'Rescisión por artículo 3º, inc. A, de la Ordenanza Nº 8.330':
            console.log('Ingresando párrafo en Acta de CD para resc.art 3 a (sin posterior adjudicación)');
        case 'Rescisión por artículo 3º, inc. B, de la Ordenanza Nº 8.330':
            console.log('Ingresando párrafo en Acta de CD para resc.art 3 b (sin posterior adjudicación)');
        case 'Rescisión por artículo 7º, inc. B, de la Ordenanza Nº 8.330':
            console.log('Ingresando párrafo en Acta de CD para resc.art 7 b (sin posterior adjudicación)');
            pfoActa = `${informeAnteced.match(/vigente|escritura/i) ? 'respecto del cual' : 'que'} que ${(planoAnt || anteproyectoAnt) ? `${informeAnteced.match(/manzana/i) ?
                informeAnteced : `${`se encuentra adjudicado por la Municipalidad de Santa Fe como ${loteAntSentence}`}`
                }` : informeAnteced
                }, a favor de ${adjAnterior}, ${elLaAntec} que se aconseja dejar sin efecto y publicar el edicto pertinente, en virtud del ${normativaAplicable}, con el fin de poder dar continuidad al Programa de Regularización Dominial enmarcado en la Ordenanza Nº 11.631, a favor de los actuales ocupantes del inmueble.-\r`;
            break;
        default: console.error('--> No se pudo completar correctamente el Acta de Consejo */*')
    }

    newDocBody.replaceText('\{ACTA_CONTENIDO\}', pfoActa);

    // Acomodando el estilo del Acta con las negritas necesarias y el justificado del texto
    let items = newDocBody.getListItems();
    for (let item of items) {
        let itemText = item.editAsText().getText();
        if (itemText.includes('Expte:')) {
            item.editAsText().setBold(0, 30, true);
            item.editAsText().setBold(31, itemText.length - 1, false);
            let style = {
                [DocumentApp.Attribute.HORIZONTAL_ALIGNMENT]: DocumentApp.HorizontalAlignment.JUSTIFY
            };
            item.editAsText().setAttributes(style);
        } else { continue };
    };
};