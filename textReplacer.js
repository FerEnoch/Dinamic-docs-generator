function textReplacer(newDoc, EXPTE, procedimiento, typeofDoc, generoRedaccion, adjPlural) {
    /**
     * Comienzan los reemplazos de las plantillas de texto interpoladas en los documentos de acuerdo
     * a un orden lógico de aparición.
     * Se cuida la redacción en género y número, así como también la puntuación.
     *  */
    console.log(`*** Ingresando datos ***`);

    const newDocBody = DocumentApp.openById(newDoc.getId()).getBody();
    newDocBody.replaceText('\{NUMERO_EXPTE\}', EXPTE[0].numero);
    newDocBody.replaceText('\{CARATULA_EXPTE\}', EXPTE[0].caratula);

    const loteManz = EXPTE[2].lote_mz.replace(EXPTE[2].lote_mz[0], EXPTE[2].lote_mz[0].toLowerCase()).trim(),
        M = loteManz.search(/M/);
    if (M) loteManz = loteManz.replace('M', 'm');

    newDocBody.replaceText('\{LOTE_MANZ\}', loteManz);
    newDocBody.replaceText('\{VECINAL\}', EXPTE[2].vecinal);
    newDocBody.replaceText('\{PLANO_OBJ\}', EXPTE[2].plano_objeto);
    newDocBody.replaceText('\{PLANO_NUM\}', EXPTE[2].plano_num);
    newDocBody.replaceText('\{FS_GEO y FS_SCIT\}', EXPTE[2].geo_scit_fs);
    newDocBody.replaceText('\{DOMINIO\}', EXPTE[2].dominio);
    newDocBody.replaceText('\{PADRÓN_MUNIC\}', EXPTE[2].padron);
    newDocBody.replaceText('\{PARTIDA_INM\}', EXPTE[2].partida);
    newDocBody.replaceText('\{AVALUO_FISCAL\}', EXPTE[2].avaluo);

    newDocBody.replaceText('\{ANTEC_FS\}', EXPTE[1].informe_fs);
    const informeAnteced = EXPTE[1].informe
        .replace(
            EXPTE[1].informe[0],
            EXPTE[1].informe[0].toLowerCase()
        );
    newDocBody.replaceText('\{ANTEC_INFO\}', informeAnteced);

    let adjAnterior = EXPTE[1].adj_anterior;
    if (adjAnterior) {
        adjAnterior = EXPTE[1].adj_anterior.replace(
            EXPTE[1].adj_anterior[0],
            EXPTE[1].adj_anterior[0].toLowerCase());
    };
    newDocBody
        .replaceText('\{ANTEC_ANT_ADJ\}',
            `${adjAnterior ? adjAnterior : '/** sin datos del adjudicatario anterior **/'}`);

    const sitPago = EXPTE[1].sit_pago ?
        EXPTE[1].sit_pago.replace(
            EXPTE[1].sit_pago[0],
            EXPTE[1].sit_pago[0].toLowerCase()
        ) : '';

    if (!sitPago) {
        newDocBody.replaceText('\{SIT_PAGO\}', '');
    } else {
        newDocBody.replaceText('\{SIT_PAGO\}', `. Asimismo, comunica que ${sitPago}`);
    };

    const docPfo = EXPTE[1].documentacion_fs ? ` (vid. fs. ${EXPTE[1].documentacion_fs})` : '';
    newDocBody.replaceText('\{ANTEC_DOCS_FS\}', docPfo);

    newDocBody.replaceText('\{FS_CONSTATACION\}', EXPTE[4].constatacion_fs);
    newDocBody.replaceText('\{FECHA_CONSTATACION\}', EXPTE[4].constatacion_fecha);

    let nombre = EXPTE[3].adj_datos.nombre_apellido
        .replace(
            EXPTE[3].adj_datos.nombre_apellido[0],
            EXPTE[3].adj_datos.nombre_apellido[0].toLowerCase()
        ).trim(),
        dni = EXPTE[3].adj_datos.dni && EXPTE[3].adj_datos.dni.trim(),
        estCiv = EXPTE[3].adj_datos.estado_civ && EXPTE[3].adj_datos.estado_civ
            .replace(
                EXPTE[3].adj_datos.estado_civ[0],
                EXPTE[3].adj_datos.estado_civ[0].toLowerCase()
            ).trim(),
        nombres,
        nombresDNIs,
        datosComplAdjs;

    // Trabajando la conjugación plural.
    if (adjPlural) {
        nombres = [];
        nombresDNIs = [],
            datosComplAdjs = [];
        EXPTE[3].adj_datos.nombre_apellido
            .split(/ [ey] /)
            .forEach((n, i) => {
                n = n.replace(n[0], n[0].toLowerCase()).trim();
                nombres.push(n);
                let dnis = EXPTE[3].adj_datos.dni && EXPTE[3].adj_datos.dni.split(/ [ey] /),
                    cuils = EXPTE[3].adj_datos.cuil && EXPTE[3].adj_datos.cuil.split(/ [ey] /),
                    apMat = EXPTE[3].adj_datos.apellido_mat && EXPTE[3].adj_datos.apellido_mat.split(/ [ey] /),
                    estCiv = EXPTE[3].adj_datos.estado_civ && EXPTE[3].adj_datos.estado_civ.split(/ [ey] /);
                n += `, ${dnis[i]},`;
                nombresDNIs.push(n);
                n += ` ${cuils[i]}, apellido materno ${apMat[i]}, de estado civil ${estCiv[i].replace(estCiv[i][0], estCiv[i][0].toLowerCase())},`;
                datosComplAdjs.push(n);
            });
        nombres = nombres.join(' y ');
        nombresDNIs = nombresDNIs.join(' y ');
        datosComplAdjs = datosComplAdjs.join(' y ');
    };

    let datosComplSentence = `${adjPlural ?
        procedimiento.includes('Redeterminación') || procedimiento.includes('por cancelado') || procedimiento.includes('Escrituración') ?
            generoRedaccion === 'M' ?
                'de los adjudicatarios ' : 'de las adjudicatarias' :
            '' :
        generoRedaccion === 'M' ?
            procedimiento.includes('Redeterminación') || procedimiento.includes('por cancelado') || procedimiento.includes('Escrituración') ?
                'del adjudicatario, ' : '' :
            procedimiento.includes('Redeterminación') || procedimiento.includes('por cancelado') || procedimiento.includes('Escrituración') ?
                'de la adjudicataria, ' : ''}`;
    datosComplSentence += `${datosComplAdjs ? datosComplAdjs :
        `${nombre}, ${dni}, ${EXPTE[3].adj_datos.cuil && EXPTE[3].adj_datos.cuil}, apellido materno ${EXPTE[3].adj_datos.apellido_mat && EXPTE[3].adj_datos.apellido_mat}, de estado civil ${estCiv},`}`;

    newDocBody.replaceText('\{ADJ_PERS_FINAL\}', `${datosComplSentence}`);

    if (typeofDoc === 'NOTIFICACIÓN') {
        if (nombres) {
            nombres = nombres
                .split(/ [ey] /)
                .map(n => n = n.replace(/el sr.|la sra.|los sres.|las sras./i, ''))
                .join(' y ')
                .trim();
        } else {
            nombre = nombre
                .replace(/el sr.|la sra./i, '')
                .trim();
        };
        newDocBody.replaceText('\{ADJ_NyA\}', `${nombres ? nombres : nombre}`);
    } else {
        newDocBody.replaceText('\{ADJ_NyA\}', `${nombres ? nombres : nombre}`);
    };
    newDocBody.replaceText('\{ADJ_PERS\}', `${nombresDNIs ? nombresDNIs : `${nombre}, ${dni}`}`);

    const datosComplSentenceAppe = `${datosComplAdjs ? datosComplAdjs :
        `${nombre}, ${dni}, ${EXPTE[3].adj_datos.cuil}, apellido materno ${EXPTE[3].adj_datos.apellido_mat}, de estado civil ${estCiv},`}`;
    newDocBody.replaceText('\{ADJ_PERS_FINAL_APPE\}', `${datosComplSentenceAppe}`);

    // Lógica para incluir la oración correspondiente al grupo familiar conviviente (si existe), o no.
    let grupFliarSentence;
    if (EXPTE[3].grupo_fliar_datos.existe === 'Si') {
        grupFliarSentence = `${adjPlural ? ' quienes residen' : ', quien reside'} junto a su grupo familiar,`;
    } else {
        grupFliarSentence = '';
    };
    newDocBody.replaceText('\{GRUPO_FLIAR\}', grupFliarSentence);

    // Lógica para incluir selectivamente las oraciones: las constataciones anteriores y la documentación adjunta, que
    // pueden existir o no, siendo 1 o 2, o más (separadas por 'y'). Lo mismo sucede con el informe social escrito y el
    // croquis de relevamiento de la vivienda.
    let antConstatSentenceINFO,
        antConstatSentenceRESOL;
    if (EXPTE[4].ant_constatacion_fs) {
        if (/y/.test(EXPTE[4].ant_constatacion_fs)) {
            antConstatSentenceINFO = ` anteriores constataciones de fs. ${EXPTE[4].ant_constatacion_fs}`;
            antConstatSentenceRESOL = ` anteriores constataciones`;
        } else {
            antConstatSentenceINFO = ` anterior constatación de fs. ${EXPTE[4].ant_constatacion_fs}`;
            antConstatSentenceRESOL = ` anterior constatación`;
        };
    } else {
        antConstatSentenceINFO = '';
        antConstatSentenceRESOL = '';
    };
    newDocBody.replaceText('\{ANT_CONSTATACION\}', antConstatSentenceINFO);
    newDocBody.replaceText('\{ANT_CONSTATACION_RESOL\}', antConstatSentenceRESOL);

    let docCumpleRequisitosSentenceINFO,
        docCumpleRequisitosSentenceRESOL;
    if (EXPTE[4].documentacion_fs) {
        docCumpleRequisitosSentenceINFO = `${EXPTE[4].ant_constatacion_fs ? ', y demás' : ' la'} documentación adjunta a fs. ${EXPTE[4].documentacion_fs}`;
        docCumpleRequisitosSentenceRESOL = `${EXPTE[4].ant_constatacion_fs ? ' y demás' : ' la'} documentación adjunta`;
    } else {
        docCumpleRequisitosSentenceINFO = '';
        docCumpleRequisitosSentenceRESOL = '';
    };
    newDocBody.replaceText('\{ACRED_POSESION_DOCUMENTACION\}', docCumpleRequisitosSentenceINFO);
    newDocBody.replaceText('\{ACRED_POSESION_DOCUMENTACION_RESOL\}', docCumpleRequisitosSentenceRESOL);

    if (EXPTE[4].informe_soc_fs) {
        newDocBody.replaceText('\{INFO_SOC\}', `a fs ${EXPTE[4].informe_soc_fs}, `);
    } else {
        newDocBody.replaceText('\{INFO_SOC\}', '');
    };

    newDocBody.replaceText('\{FS_PLANILLA_SOCIAL\}', `${EXPTE[4].planilla_soc_fs && EXPTE[4].planilla_soc_fs}`);

    let croquisSentenceINFO,
        croquisSentenceRESOL;
    if (EXPTE[4].croquis_fs) {
        croquisSentenceINFO = `, y con croquis de relevamiento de la vivienda a fs. ${EXPTE[4].croquis_fs}`;
        croquisSentenceRESOL = `, y con croquis de relevamiento de la vivienda`;
    } else {
        croquisSentenceINFO = '';
        croquisSentenceRESOL = '';
    };
    newDocBody.replaceText('\{CROQUIS\}', croquisSentenceINFO);
    newDocBody.replaceText('\{CROQUIS_RESOL\}', croquisSentenceRESOL);

    // Controla el párrafo de la declaración jurada de conformidad (si existe).
    const conformidad = EXPTE[3].grupo_fliar_datos.conformidad;
    if (conformidad === 'Si') {
        const firmantes = EXPTE[3].grupo_fliar_datos.datos_personales
            .replace(
                EXPTE[3].grupo_fliar_datos.datos_personales[0],
                EXPTE[3].grupo_fliar_datos.datos_personales[0].toLowerCase()
            ),
            residencia = EXPTE[3].grupo_fliar_datos.conformidad_numero === 1 ? 'quien también reside' : 'quienes también residen',
            manifestacion = EXPTE[3].grupo_fliar_datos.conformidad_numero === 1 ? 'manifiesta' : 'manifiestan';
        newDocBody.replaceText('\{CONFOR_FS\}', EXPTE[3].grupo_fliar_datos.conformidad_fs);
        newDocBody.replaceText('\{FIRMANTES\}', firmantes);
        newDocBody.replaceText('\{RESIDENCIA\}', residencia);
        newDocBody.replaceText('\{MANIFESTACION\}', manifestacion);
        const pfoConforResol = `Que ${firmantes}, ${residencia} en la vivienda en cuestión, ${manifestacion} su conformidad respecto a la continuidad de los trámites tendientes a la Regularización Dominial del inmueble, y al correspondiente otorgamiento de la Escritura Pública traslativa de dominio, a favor de ${nombres ? nombres : nombre}.`;
        newDocBody.replaceText('\{CONFOR_PFO_RESOL\}', pfoConforResol);
        if (procedimiento === 'Redeterminación de precio' || procedimiento === 'Escrituración') {
            if (typeofDoc === 'INFORME') newDocBody.removeChild(newDocBody.getChild(8));
            else if (typeofDoc === 'RESOLUCIÓN') newDocBody.removeChild(newDocBody.getChild(9));
        };
    } else {
        switch (procedimiento) {
            // Casos en los que el párrafo no está en el template
            case 'Escrituración':
            case 'Redeterminación de precio':
            case 'Tener por cancelado y escriturar':
            case 'Rescisión por artículo 2º de la Ordenanza Nº 8.330':
            case 'Rescisión por artículo 3º, inc. A, de la Ordenanza Nº 8.330':
            case 'Rescisión por artículo 3º, inc. B, de la Ordenanza Nº 8.330':
            case 'Rescisión por artículo 7º, inc. B, de la Ordenanza Nº 8.330':
                break;
            default: // Casos en en los que el párrafo de conformidad necesita eliminarse del template
                if (typeofDoc === 'INFORME') newDocBody.removeChild(newDocBody.getChild(8));
                else if (typeofDoc === 'RESOLUCIÓN') newDocBody.removeChild(newDocBody.getChild(9));
        };
    };

    newDocBody
        .replaceText('\{FS_DDJJ\}', EXPTE[4].ddjj_fs);
    newDocBody
        .replaceText('\{FS_NEGCIT\}', EXPTE[4].negscit_fs);
    newDocBody
        .replaceText('\{EL_LA_BENEF_GENERO\}',
            `${adjPlural ? generoRedaccion === 'M' ? 'los beneficiarios' : 'las beneficiarias' : generoRedaccion === 'M' ? 'el beneficiario' : 'la beneficiaria'}`);
    newDocBody
        .replaceText('\{EL_LA_ADJUD_GENERO\}',
            `${adjPlural ? generoRedaccion === 'M' ? 'los adjudicatarios' : 'las adjudicatarias' : generoRedaccion === 'M' ? 'el adjudicatario' : 'la adjudicataria'}`);
    newDocBody
        .replaceText('\{AL_A-LA_ADJUD_GENERO\}',
            `${adjPlural ? generoRedaccion === 'M' ? 'a los adjudicatarios' : 'a las adjudicatarias' : generoRedaccion === 'M' ? 'al adjudicatario' : 'a la adjudicataria'}`);
    newDocBody
        .replaceText('\{SR_SRA_ADJ_GENERO\}',
            `${adjPlural ? generoRedaccion === 'M' ? 'Señores' : 'Señoras' : generoRedaccion === 'M' ? 'Señor' : 'Señora'}`);
    newDocBody
        .replaceText('\{O-A_ADJ_GENERO\}',
            `${adjPlural ? generoRedaccion === 'M' ? 'notificados' : 'notificadas' : generoRedaccion === 'M' ? 'notificado' : 'notificada'}`);

    // Lógica para controlar la oración en la que se da cuenta de un cambio de plano (si existe)
    // entre la adjudicación anterior y la nueva.
    const planoAnt = informeAnteced.includes('plano'),
        anteproyectoAnt = informeAnteced.includes('anteproyecto'),
        loteNum = informeAnteced.match(/(?<=lote\sN*º*\s*)(\b[0-9]+\b)/),
        loteLetra = informeAnteced.match(/(?<=lote\sN*º*\s*)(\b"*[A-Z]+)"*\b/),
        loteAnteced = loteNum ? loteNum : loteLetra,
        mzActual = EXPTE[2].lote_mz.match(/\s\d{4,5}\s*\w*/);
    let loteAntSentence;
    if (anteproyectoAnt || planoAnt) {
        console.log(`${anteproyectoAnt ? 'anteproyecto anterior detectado' : 'plano de plano anterior detectado'} `);
        const slash = informeAnteced.indexOf('/'); //Encuentra plano Nº '.../año', y 'decreto/Res. Nº .../año'
        let yyyy;
        if (slash === -1) {
            yyyy = informeAnteced.match(/\d*\d{3}/);
            loteAntSentence = informeAnteced
                .slice(
                    informeAnteced.search(/lote/i),
                    (informeAnteced.search(/\d*\d{3}/) + yyyy[0].length)
                );
        } else {
            yyyy = informeAnteced.match(/\d*\d{3,}\/\d{4}/);
            loteAntSentence = informeAnteced
                .slice(
                    informeAnteced.search(/lote/i),
                    (informeAnteced.search(/\d*\d{3,}\/\d{4}/) + yyyy[0].length)
                );
            const docEncontrado = informeAnteced
                .match(/resoluci[oó]n/i) ?
                informeAnteced.match(/resoluci[oó]n/i) :
                informeAnteced.match(/decreto/i) ? informeAnteced.match(/decreto/i) : undefined;
            if (docEncontrado) {
                loteAntSentence = informeAnteced
                    .slice(
                        informeAnteced.search(/lote/i),
                        informeAnteced.search(/,* mediante/)
                    );
            };
        };
        if (procedimiento.includes('Rescisión')) {
            if (!(informeAnteced.match(/manzana/i))) {
                console.log('No se detectó número de manzana');
                let restSentence;
                if (planoAnt) {
                    planoAnt = informeAnteced.toLowerCase().indexOf('plano');
                    restSentence = informeAnteced.slice(planoAnt);
                };
                if (anteproyectoAnt) {
                    anteproyectoAnt = informeAnteced.toLowerCase().indexOf('anteproyecto');
                    restSentence = informeAnteced.slice(anteproyectoAnt);
                };
                loteAntSentence = `${loteNum ? `lote Nº ${loteNum}` : `lote ${loteLetra}`} de la manzana Nº${mzActual}, según ${restSentence.slice(0, restSentence.search(/,* mediante/))}`;
            } else {
                console.log('Número de manzana detectado');
                loteAntSentence = `${loteNum ? `lote Nº` : `lote`} ${informeAnteced.slice(informeAnteced.search(loteAnteced[0]), informeAnteced.search(/,* mediante/))}`;
            };
        };
        newDocBody.replaceText('\{LOTE_ANTERIOR\}', ` (ex ${loteAntSentence})`);
        if (loteAntSentence.match(/de igual manzana/)) {
            loteAntSentence = loteAntSentence.replace('de igual manzana', `de la manzana Nº${mzActual}`);
        };
        newDocBody.replaceText('\{LOTE_ANTERIOR_ART_1_RESC\}', loteAntSentence);
    } else {
        console.log('No se detectó cambio de plano de mensura');
        newDocBody.replaceText('\{LOTE_ANTERIOR\}', '');
        newDocBody
            .replaceText('\{LOTE_ANTERIOR_ART_1_RESC\}',
                `${loteManz}, de la vecinal denominada “${EXPTE[2].vecinal}” de esta ciudad, con las medidas, superficie y linderos que surgen del plano de ${EXPTE[2].plano_objeto} inscripto en el Servicio de Catastro e Información Territorial de la Provincia con el Nº ${EXPTE[2].plano_num}`);
    };

    // Controla el párrafo de la redeterminación de precio (si es necesario incluirlo).
    let pfoRedeterminacion;
    if (procedimiento.includes('Redeterminación')) {
        if (sitPago.includes('no se registran pagos')) {
            pfoRedeterminacion = `Que${typeofDoc === 'INFORME' ? ',' : ''} teniendo en cuenta el avalúo fiscal provincial informado por el Servicio de Catastro e Información Territorial, resulta conducente establecer dicho monto como precio de adjudicación${typeofDoc === 'INFORME' ? '.-' : '.'} `;
        } else {
            pfoRedeterminacion = `Que${typeofDoc === 'INFORME' ? ',' : ''} teniendo en cuenta que el monto efectivamente abonado por ${adjPlural ? generoRedaccion === 'M' ? 'los adjudicatarios' : 'las adjudicatarias' : generoRedaccion === 'M' ? 'el adjudicatario' : 'la adjudicataria'} asciende a la suma de {PRECIO_ABONADO}, correspondería deducir dicha suma del avalúo fiscal provincial informado por el Servicio de Catastro e Información Territorial, resultando de esta manera que el saldo restante es de {PRECIO_A_REDETERMINAR} ${typeofDoc === 'INFORME' ? '.-' : '.'} `;
        };
    } else if (procedimiento.includes('Tener por cancelado')) {
        pfoRedeterminacion = `Que${typeofDoc === 'INFORME' ? ',' : ''} teniendo en cuenta el monto efectivamente abonado por ${adjPlural ? generoRedaccion === 'M' ? 'los adjudicatarios' : 'las adjudicatarias' : generoRedaccion === 'M' ? 'el adjudicatario' : 'la adjudicataria'}, y el avalúo fiscal provincial informado por el Servicio de Catastro e Información Territorial, correspondería tener por cancelado el precio de adjudicación${typeofDoc === 'INFORME' ? '.-' : '.'} `;
    };
    newDocBody.replaceText('\{REDET_PFO\}', pfoRedeterminacion ? pfoRedeterminacion : '');
    newDocBody.replaceText('\{PRECIO_ABONADO\}', EXPTE[1].pago_realizado);
    newDocBody.replaceText('\{PRECIO_A_REDETERMINAR\}', EXPTE[1].precio_a_redeterminar);

    // Finalmente, armado del útimo párrafo  o "de resúmen".
    let instrumAdj,
        pfoAntecedenteFinal,
        elLaAntec;
    const decreto = (EXPTE[1].informe).match(/decreto/i),
        compraventa = (EXPTE[1].informe).match(/compraventa/i),
        resolucion = (EXPTE[1].informe).match(/resoluci[oó]n/i),
        instrumAntecedente = [decreto, compraventa, resolucion];
    for (let instrumento of instrumAntecedente) {
        if (instrumento) {
            instrumAdj = instrumento[0].toLowerCase()
            break;
        } else {
            instrumAdj = 'Adjudicación';
        };
    };
    if (instrumAdj && procedimiento !== 'Adjudicación') {
        switch (instrumAdj) {
            case 'compraventa':
                console.log('Boleto antecedente detectado');
                const indiceBoleto = EXPTE[1].informe.indexOf(instrumAdj) + instrumAdj.length,
                    fraseRescicFinal = EXPTE[1].informe.slice(indiceBoleto);
                pfoAntecedenteFinal = `rescindir el boleto de compraventa${fraseRescicFinal}`;
                elLaAntec = 'el';
                break;
            case 'decreto':
                console.log('Decreto antecedente detectado');
                const indiceDecreto = EXPTE[1].informe.toLowerCase().indexOf(instrumAdj),
                    fraseDejaSinEfectoDecreto = EXPTE[1].informe.slice(indiceDecreto);
                pfoAntecedenteFinal = `dejar sin efecto el ${fraseDejaSinEfectoDecreto}`;
                elLaAntec = 'el';
                break;
            case 'resolución':
                console.log('Resolución antecedente detectada');
                const indiceResolucion = EXPTE[1].informe.toLowerCase().indexOf(instrumAdj),
                    fraseDejaSinEfectoResolucion = EXPTE[1].informe.slice(indiceResolucion);
                pfoAntecedenteFinal = `dejar sin efecto la ${fraseDejaSinEfectoResolucion}`;
                elLaAntec = 'la';
                break;
            case 'Adjudicación':
                console.log('No se detectó instrumento de adjudicación antecedente');
                const indexAdjudicacion = EXPTE[1].informe.toLowerCase().search(/adjudicaci[oó]n/),
                    fraseDejaSinEfectoAdjudicacion = EXPTE[1].informe.slice(indexAdjudicacion);
                pfoAntecedenteFinal = `dejar sin efecto la ${fraseDejaSinEfectoAdjudicacion}`;
                elLaAntec = 'la';
        };
        newDocBody
            .replaceText('\{ANTEC_FINAL\}', pfoAntecedenteFinal);
        newDocBody
            .replaceText('\{COMPLEMENTO_FINAL\}',
                `${informeAnteced.match(/vigente|escritura/i) ? '' : ', mediante {EL-LA_ANTEC} cual se adjudicó'}`);
        newDocBody
            .replaceText('\{DE\}',
                `${informeAnteced.match(/vigente|escritura/i) ? ' de' : ''}`);
        newDocBody
            .replaceText('\{ANTEC_FINAL_ART_1\}',
                pfoAntecedenteFinal.replace(pfoAntecedenteFinal[0], pfoAntecedenteFinal[0].toUpperCase()));
        newDocBody
            .replaceText('\{EL-LA_ANTEC\}', elLaAntec);
    };

    newDocBody.replaceText('\{RESPONSABLE\}', EXPTE[5]);

    // Llama a la función correspondiente para completar el Acta de Consejo Directivo,
    // pasando los datos necesarios para la redacción.
    if (typeofDoc === 'ACTA' && procedimiento !== 'Escrituración') {
        const DATOS = {
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
        };
        completarActaCD(DATOS);
    };

    //** ****  Se controlan casos residuales de redacción **** **//

    // Últimos retoques con todos los campos llenados.
    newDocBody.replaceText('de el', 'del');
    newDocBody.replaceText(',,', ',');
    newDocBody.replaceText('de de', 'de');

    // Controla si es necesario volver al plural la documentación (caso de más de un adjudicatario).
    // Si no lo es, elimina los correspondientes patrones de texto interpolados en los templates.
    if (adjPlural) {
        newDocBody.replaceText('\{N\}', 'n');
        newDocBody.replaceText('\{S\}', 's');
    } else {
        newDocBody.replaceText('\{N\}', '');
        newDocBody.replaceText('\{S\}', '');
    };
};