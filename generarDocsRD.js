function generarDocsRD(e) {
    try {
        const sheet = SpreadsheetApp.getActive().getSheetByName('YOUR_SHEET_NAME'),
            lastRow = sheet.getLastRow(),
            EXPTE = [
                DATOS_EXPTE = {
                    marca_temporal: sheet.getRange(`A${lastRow}`).getDisplayValue(),
                    numero: sheet.getRange(`B${lastRow}`).getValue(),
                    caratula: sheet.getRange(`C${lastRow}`).getValue(),
                    procedimiento: sheet.getRange(`D${lastRow}`).getValue(),
                },
                ANTECEDENTES = {
                    informe: sheet.getRange(`E${lastRow}`).getValue(),
                    informe_fs: sheet.getRange(`F${lastRow}`).getValue(),
                    documentacion_fs: sheet.getRange(`G${lastRow}`).getValue(),
                    adj_anterior: sheet.getRange(`H${lastRow}`).getValue(),
                    sit_pago: sheet.getRange(`I${lastRow}`).getValue(),
                    pago_realizado: sheet.getRange(`J${lastRow}`).getValue(),
                    precio_a_redeterminar: sheet.getRange(`K${lastRow}`).getValue(),
                },
                DATOS_INMUEBLE = {
                    vecinal: sheet.getRange(`L${lastRow}`).getValue(),
                    lote_mz: sheet.getRange(`M${lastRow}`).getValue(),
                    plano_num: sheet.getRange(`N${lastRow}`).getValue(),
                    plano_objeto: sheet.getRange(`O${lastRow}`).getValue(),
                    padron: sheet.getRange(`P${lastRow}`).getValue(),
                    partida: sheet.getRange(`Q${lastRow}`).getValue(),
                    avaluo: sheet.getRange(`R${lastRow}`).getValue(),
                    dominio: sheet.getRange(`S${lastRow}`).getValue(),
                    geo_scit_fs: sheet.getRange(`T${lastRow}`).getValue(),
                },
                DATOS_OCUPANTES = {
                    adj_plural: sheet.getRange(`U${lastRow}`).getValue(),
                    adj_genero: sheet.getRange(`V${lastRow}`).getValue(),
                    adj_datos: {
                        nombre_apellido: sheet.getRange(`W${lastRow}`).getValue(),
                        dni: sheet.getRange(`X${lastRow}`).getValue(),
                        cuil: sheet.getRange(`Y${lastRow}`).getValue(),
                        apellido_mat: sheet.getRange(`Z${lastRow}`).getValue(),
                        estado_civ: sheet.getRange(`AA${lastRow}`).getValue(),
                    },
                    grupo_fliar_datos: {
                        existe: sheet.getRange(`AB${lastRow}`).getValue(),
                        conformidad: sheet.getRange(`AC${lastRow}`).getValue(),
                        conformidad_numero: sheet.getRange(`AD${lastRow}`).getValue(),
                        datos_personales: sheet.getRange(`AE${lastRow}`).getValue(),
                        conformidad_fs: sheet.getRange(`AF${lastRow}`).getValue(),
                    },
                },
                DATOS_SOCIALES = {
                    constatacion_fecha: sheet.getRange(`AG${lastRow}`).getValue(),
                    constatacion_fs: sheet.getRange(`AH${lastRow}`).getValue(),
                    ant_constatacion_fs: sheet.getRange(`AI${lastRow}`).getValue(),
                    documentacion_fs: sheet.getRange(`AJ${lastRow}`).getValue(),
                    informe_soc_fs: sheet.getRange(`AK${lastRow}`).getValue(),
                    planilla_soc_fs: sheet.getRange(`AL${lastRow}`).getValue(),
                    croquis_fs: sheet.getRange(`AM${lastRow}`).getValue(),
                    ddjj_fs: sheet.getRange(`AN${lastRow}`).getValue(),
                    negscit_fs: sheet.getRange(`AO${lastRow}`).getValue(),
                },
                RESPONSABLE = sheet.getRange(`AP${lastRow}`).getValue()
            ];

        const procedimientoSelect = sheet.getRange(`D${lastRow}`).getValue();
        if (!procedimientoSelect) throw new Error('-** No se ha seleccionado ningún procedimiento! **-');

        const adjPlural = EXPTE[3].adj_plural === 1 ? false : true,
            generoSelec = EXPTE[3].adj_genero === 'Masculino' ? 'M' : 'F';
        console.log('--> Información recopilada:\n', JSON.stringify(EXPTE));
        console.log(`Iniciando procedimiento: ${procedimientoSelect}`);
        console.log(`Género de redacción ${generoSelec}`);
        console.log(`Redacción en plural: ${adjPlural}`);

        // Inicia el procedimiento administrativo con la información recopilada del Formulario.
        inicProcAdministrativo(procedimientoSelect, EXPTE, generoSelec, adjPlural);

    } catch (err) {
        console.error('*/* Oh!.. algo ha sucedido al tratar de compilar la información del expediente **', err)
    };
};