function inicProcAdministrativo(procedimiento, EXPTE, generoSelec, adjPlural) {
    console.log('Iniciando carpeta y documentos');
    try {
        // Crea los archivos en la carpeta recientemente creada para el Acta de Consejo, 
        // o en la carpeta encontrada, si es que ya existía. 
        const { actaCDfolder, actaCDfile } = inicActaCD();
        console.log(`Carpeta de Acta seleccionada: ${actaCDfolder.getName()}`);
        console.log(`Archivo de Acta seleccionada: ${actaCDfile.getName()}`);
        // Crea la carpeta del procedimiento actual para guardar los archivos que se generen
        let folderNameProc = procedimiento.includes('Rescisión') ?
            `Resc.${procedimiento.slice(procedimiento.search(/Rescisión/) + 9, procedimiento.search(/2|\bA\b|\bB\b/i) + 1)}${procedimiento.includes('y adjudicación') ? ', y adj.' : ''}-` : `${procedimiento}-`;
        folderNameProc = folderNameProc.replace(/art[ií]culo/, 'art.');
        folderNameProc = folderNameProc.replace(/por\s/, '');
        let nombre,
            nombres;
        if (adjPlural) {
            nombres = EXPTE[3].adj_datos.nombre_apellido
                .split('y')
                .map(n => n.replace(/el sr.|la sra.|los sres./i, '').trim());
            nombres = nombres.join(' y ');
        } else {
            nombre = EXPTE[3].adj_datos.nombre_apellido.replace(/el sr.|la sra./i, '').trim();
        };
        const newExpteFolder = actaCDfolder.createFolder(`${nombre ? nombre : nombres} - ${folderNameProc}`),
            newProcFolder = DriveApp.getFolderById(newExpteFolder.getId());

        // Selecciona templates de los diferentes tipos de documentos a generarse de acuerdo 
        // al procedimiento elegido, y se hacen copias en la nueva carpeta, nombrada por nombre de adjudicatario.
        let informeTemplateID,
            informeTemplateFILE,
            resolucionTemplateID,
            resolucionTemplateFILE,
            notificacionTemplateID,
            notificacionTemplateFILE,
            appeTemplateID,
            appeTemplateFILE,
            newIMFORMEfile,
            newRESOLUCIONfile,
            newNOTIFICACIONfile,
            newAPPEfile;
        switch (procedimiento) {
            case "Adjudicación":
                console.log(`Generando documentos para "${procedimiento}"`);
                informeTemplateID = 'YOUR_TEMPLATE_ID';
                informeTemplateFILE = DriveApp.getFileById(informeTemplateID);
                newIMFORMEfile = informeTemplateFILE.makeCopy(newProcFolder);

                resolucionTemplateID = 'YOUR_TEMPLATE_ID';
                resolucionTemplateFILE = DriveApp.getFileById(resolucionTemplateID);
                newRESOLUCIONfile = resolucionTemplateFILE.makeCopy(newProcFolder);

                notificacionTemplateID = 'YOUR_TEMPLATE_ID';
                notificacionTemplateFILE = DriveApp.getFileById(notificacionTemplateID);
                newNOTIFICACIONfile = notificacionTemplateFILE.makeCopy(newProcFolder);

                appeTemplateID = 'YOUR_TEMPLATE_ID';
                appeTemplateFILE = DriveApp.getFileById(appeTemplateID);
                newAPPEfile = appeTemplateFILE.makeCopy(newProcFolder);
                break;
            case 'Rescisión por artículo 2º de la Ordenanza Nº 8.330, y adjudicación':
                console.log(`Generando documentos para "${procedimiento}"`);
                informeTemplateID = 'YOUR_TEMPLATE_ID';
                informeTemplateFILE = DriveApp.getFileById(informeTemplateID);
                newIMFORMEfile = informeTemplateFILE.makeCopy(newProcFolder);

                resolucionTemplateID = 'YOUR_TEMPLATE_ID';
                resolucionTemplateFILE = DriveApp.getFileById(resolucionTemplateID);
                newRESOLUCIONfile = resolucionTemplateFILE.makeCopy(newProcFolder);

                notificacionTemplateID = 'YOUR_TEMPLATE_ID';
                notificacionTemplateFILE = DriveApp.getFileById(notificacionTemplateID);
                newNOTIFICACIONfile = notificacionTemplateFILE.makeCopy(newProcFolder);

                appeTemplateID = 'YOUR_TEMPLATE_ID';
                appeTemplateFILE = DriveApp.getFileById(appeTemplateID);
                newAPPEfile = appeTemplateFILE.makeCopy(newProcFolder);
                break;
            case 'Rescisión por artículo 3º, inc. A, de la Ordenanza Nº 8.330, y adjudicación':
                console.log(`Generando documentos para "${procedimiento}"`);
                informeTemplateID = 'YOUR_TEMPLATE_ID';
                informeTemplateFILE = DriveApp.getFileById(informeTemplateID);
                newIMFORMEfile = informeTemplateFILE.makeCopy(newProcFolder);

                resolucionTemplateID = 'YOUR_TEMPLATE_ID';
                resolucionTemplateFILE = DriveApp.getFileById(resolucionTemplateID);
                newRESOLUCIONfile = resolucionTemplateFILE.makeCopy(newProcFolder);

                notificacionTemplateID = 'YOUR_TEMPLATE_ID';
                notificacionTemplateFILE = DriveApp.getFileById(notificacionTemplateID);
                newNOTIFICACIONfile = notificacionTemplateFILE.makeCopy(newProcFolder);

                appeTemplateID = 'YOUR_TEMPLATE_ID';
                appeTemplateFILE = DriveApp.getFileById(appeTemplateID);
                newAPPEfile = appeTemplateFILE.makeCopy(newProcFolder);
                break;
            case 'Rescisión por artículo 3º, inc. B, de la Ordenanza Nº 8.330, y adjudicación':
                console.log(`Generando documentos para "${procedimiento}"`);
                informeTemplateID = 'YOUR_TEMPLATE_ID';
                informeTemplateFILE = DriveApp.getFileById(informeTemplateID);
                newIMFORMEfile = informeTemplateFILE.makeCopy(newProcFolder);

                resolucionTemplateID = 'YOUR_TEMPLATE_ID';
                resolucionTemplateFILE = DriveApp.getFileById(resolucionTemplateID);
                newRESOLUCIONfile = resolucionTemplateFILE.makeCopy(newProcFolder);

                notificacionTemplateID = 'YOUR_TEMPLATE_ID';
                notificacionTemplateFILE = DriveApp.getFileById(notificacionTemplateID);
                newNOTIFICACIONfile = notificacionTemplateFILE.makeCopy(newProcFolder);

                appeTemplateID = 'YOUR_TEMPLATE_ID';
                appeTemplateFILE = DriveApp.getFileById(appeTemplateID);
                newAPPEfile = appeTemplateFILE.makeCopy(newProcFolder);
                break;
            case 'Rescisión por artículo 7º, inc. B, de la Ordenanza Nº 8.330, y adjudicación':
                console.log(`Generando documentos para "${procedimiento}"`);
                informeTemplateID = 'YOUR_TEMPLATE_ID';
                informeTemplateFILE = DriveApp.getFileById(informeTemplateID);
                newIMFORMEfile = informeTemplateFILE.makeCopy(newProcFolder);

                resolucionTemplateID = 'YOUR_TEMPLATE_ID';
                resolucionTemplateFILE = DriveApp.getFileById(resolucionTemplateID);
                newRESOLUCIONfile = resolucionTemplateFILE.makeCopy(newProcFolder);

                notificacionTemplateID = 'YOUR_TEMPLATE_ID';
                notificacionTemplateFILE = DriveApp.getFileById(notificacionTemplateID);
                newNOTIFICACIONfile = notificacionTemplateFILE.makeCopy(newProcFolder);

                appeTemplateID = 'YOUR_TEMPLATE_ID';
                appeTemplateFILE = DriveApp.getFileById(appeTemplateID);
                newAPPEfile = appeTemplateFILE.makeCopy(newProcFolder);
                break;
            case 'Escrituración':
                console.log(`Generando documentos para "${procedimiento}"`);
                informeTemplateID = 'YOUR_TEMPLATE_ID';
                informeTemplateFILE = DriveApp.getFileById(informeTemplateID);
                newIMFORMEfile = informeTemplateFILE.makeCopy(newProcFolder);

                resolucionTemplateID = 'YOUR_TEMPLATE_ID';
                resolucionTemplateFILE = DriveApp.getFileById(resolucionTemplateID);
                newRESOLUCIONfile = resolucionTemplateFILE.makeCopy(newProcFolder);

                appeTemplateID = 'YOUR_TEMPLATE_ID';
                appeTemplateFILE = DriveApp.getFileById(appeTemplateID);
                newAPPEfile = appeTemplateFILE.makeCopy(newProcFolder);
                break;
            case 'Redeterminación de precio':
                console.log(`Generando documentos para "${procedimiento}"`);
                informeTemplateID = 'YOUR_TEMPLATE_ID';
                informeTemplateFILE = DriveApp.getFileById(informeTemplateID);
                newIMFORMEfile = informeTemplateFILE.makeCopy(newProcFolder);

                resolucionTemplateID = 'YOUR_TEMPLATE_ID';
                resolucionTemplateFILE = DriveApp.getFileById(resolucionTemplateID);
                newRESOLUCIONfile = resolucionTemplateFILE.makeCopy(newProcFolder);

                notificacionTemplateID = 'YOUR_TEMPLATE_ID';
                notificacionTemplateFILE = DriveApp.getFileById(notificacionTemplateID);
                newNOTIFICACIONfile = notificacionTemplateFILE.makeCopy(newProcFolder);

                appeTemplateID = 'YOUR_TEMPLATE_ID';
                appeTemplateFILE = DriveApp.getFileById(appeTemplateID);
                newAPPEfile = appeTemplateFILE.makeCopy(newProcFolder);
                break;
            case 'Tener por cancelado y escriturar':
                console.log(`Generando documentos para "${procedimiento}"`);
                informeTemplateID = 'YOUR_TEMPLATE_ID';
                informeTemplateFILE = DriveApp.getFileById(informeTemplateID);
                newIMFORMEfile = informeTemplateFILE.makeCopy(newProcFolder);

                resolucionTemplateID = 'YOUR_TEMPLATE_ID';
                resolucionTemplateFILE = DriveApp.getFileById(resolucionTemplateID);
                newRESOLUCIONfile = resolucionTemplateFILE.makeCopy(newProcFolder);

                appeTemplateID = 'YOUR_TEMPLATE_ID';
                appeTemplateFILE = DriveApp.getFileById(appeTemplateID);
                newAPPEfile = appeTemplateFILE.makeCopy(newProcFolder);
                break;
            case 'Rescisión por artículo 2º de la Ordenanza Nº 8.330':
                console.log(`Generando documentos para "${procedimiento}"`);
                informeTemplateID = 'YOUR_TEMPLATE_ID';
                informeTemplateFILE = DriveApp.getFileById(informeTemplateID);
                newIMFORMEfile = informeTemplateFILE.makeCopy(newProcFolder);

                resolucionTemplateID = 'YOUR_TEMPLATE_ID';
                resolucionTemplateFILE = DriveApp.getFileById(resolucionTemplateID);
                newRESOLUCIONfile = resolucionTemplateFILE.makeCopy(newProcFolder);
                break;
            case 'Rescisión por artículo 3º, inc. A, de la Ordenanza Nº 8.330':
                console.log(`Generando documentos para "${procedimiento}"`);
                informeTemplateID = 'YOUR_TEMPLATE_ID';
                informeTemplateFILE = DriveApp.getFileById(informeTemplateID);
                newIMFORMEfile = informeTemplateFILE.makeCopy(newProcFolder);

                resolucionTemplateID = 'YOUR_TEMPLATE_ID';
                resolucionTemplateFILE = DriveApp.getFileById(resolucionTemplateID);
                newRESOLUCIONfile = resolucionTemplateFILE.makeCopy(newProcFolder);
                break;
            case 'Rescisión por artículo 3º, inc. B, de la Ordenanza Nº 8.330':
                console.log(`Generando documentos para "${procedimiento}"`);
                informeTemplateID = 'YOUR_TEMPLATE_ID';
                informeTemplateFILE = DriveApp.getFileById(informeTemplateID);
                newIMFORMEfile = informeTemplateFILE.makeCopy(newProcFolder);

                resolucionTemplateID = 'YOUR_TEMPLATE_ID';
                resolucionTemplateFILE = DriveApp.getFileById(resolucionTemplateID);
                newRESOLUCIONfile = resolucionTemplateFILE.makeCopy(newProcFolder);
                break;
            case 'Rescisión por artículo 7º, inc. B, de la Ordenanza Nº 8.330':
                console.log(`Generando documentos para "${procedimiento}"`);
                informeTemplateID = 'YOUR_TEMPLATE_ID';
                informeTemplateFILE = DriveApp.getFileById(informeTemplateID);
                newIMFORMEfile = informeTemplateFILE.makeCopy(newProcFolder);

                resolucionTemplateID = 'YOUR_TEMPLATE_ID';
                resolucionTemplateFILE = DriveApp.getFileById(resolucionTemplateID);
                newRESOLUCIONfile = resolucionTemplateFILE.makeCopy(newProcFolder);
                break;
            default:
                throw new Error(`*/* Se ve que el procedimiento "${procedimiento}" todavía no está contemplado en el programa */*`);
        }

        newIMFORMEfile.setName(`${nombre ? nombre : nombres} -${folderNameProc} INFORME`);
        console.log('*** Nuevo documento creado: INFORME ***');
        newRESOLUCIONfile.setName(`${nombre ? nombre : nombres} -${folderNameProc} RESOLUCIÓN`);
        console.log('*** Nuevo documento creado: RESOLUCIÓN ***');
        if (newNOTIFICACIONfile) {
            newNOTIFICACIONfile.setName(`${nombre ? nombre : nombres} -${folderNameProc} NOTIFICACIÓN`);
            console.log('*** Nuevo documento creado: NOTIFICACIÓN ***');
        };
        if (newAPPEfile) {
            newAPPEfile.setName(`${nombre ? nombre : nombres} -${folderNameProc} APPE`);
            console.log('*** Nuevo documento creado: APPE ***');
        };

        // Llama a textReplacer() para el reemplazo de los patrones regulares interpolados en los documentos recientemente
        // creados a partir de los templates, pasándoles la información necesaria.
        const documentacion = ['INFORME', 'RESOLUCIÓN', 'NOTIFICACIÓN', 'APPE', 'ACTA'];
        for (let typeofDoc of documentacion) {
            console.log(`--> Preparando el ingreso de datos */`);
            switch (typeofDoc) {
                case 'INFORME':
                    textReplacer(newIMFORMEfile, EXPTE, procedimiento, typeofDoc, generoSelec, adjPlural);
                    break;
                case 'RESOLUCIÓN':
                    textReplacer(newRESOLUCIONfile, EXPTE, procedimiento, typeofDoc, generoSelec, adjPlural);
                    break;
                case 'NOTIFICACIÓN':
                    if (newNOTIFICACIONfile) textReplacer(newNOTIFICACIONfile, EXPTE, procedimiento, typeofDoc, generoSelec, adjPlural);
                    break;
                case 'APPE':
                    if (newAPPEfile) textReplacer(newAPPEfile, EXPTE, procedimiento, typeofDoc, generoSelec, adjPlural);
                    break;
                case 'ACTA':
                    if (procedimiento !== 'Escrituración') textReplacer(actaCDfile, EXPTE, procedimiento, typeofDoc, generoSelec, adjPlural);
                    break;
                default: throw new Error(`*/* No ha podido generar el documento ${typeofDoc} */*`);
            }
            // Reemplazos finalizados con éxito
            console.log(`*** Documento finalizado: ${typeofDoc} ***`);
        }
    } catch (e) {
        console.error(`OOPSS...! =(  Algo ocurrió y no se puede iniciar el proceso\n ${e}`);
    };
};