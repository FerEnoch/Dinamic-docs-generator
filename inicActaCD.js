function inicActaCD() {
    /**
    *   Se crea la carpeta que contendrá las demás carpetas con archivos, más el archivo madre 'Acta de CD'.
    *   Esto se realiza solo la primera vez que se ejecuta el programa. 
    *   Las veces posteriores, selecciona la carpeta y el archivo 'Acta de CD' previamente creados,
    *   para su modificación con los datos correspondientes a cada procedimiento en particular.
    */
    // let pruebasRD_ID = '19CQp5gfByxRLW9QW34N5ueUBFj2HTq-b';
    const childFoldersDinamic_docs_app = DriveApp.getFolderById('YOUR_TARGET_FOLDER_ID').getFolders();
    let actaCDfolder,
        actaCDfile,
        actaCDfolderFiles,
        foundFolder,
        nextFile;
    if (childFoldersDinamic_docs_app.hasNext()) {
        while (childFoldersDinamic_docs_app.hasNext()) {
            foundFolder = childFoldersDinamic_docs_app.next();
            if (foundFolder.getName() === 'Nueva Acta de Consejo - RD') {
                console.log('**-> Carpeta de Acta de CD encontrada  //**')
                actaCDfolder = foundFolder;
                break;
            } else {
                console.log('Carpeta de acta no encontrada.');
                actaCDfolder = false;
            };
        };
    } else {
        console.error(`* No hay subcarpetas en la carpeta madre de RD! *`);
        actaCDfolder = false;
    };

    if (!actaCDfolder) {
        console.log('--> Ceando carpeta de acta CD');
        actaCDfolder = DriveApp.getFolderById('YOUR_TARGET_FOLDER_ID')
            .createFolder(`Nueva Acta de Consejo - RD`);
        console.log('** Carpeta de Acta de Consejo creada! **');
    };
    if (actaCDfolder) {
        console.log('**-> Ingresando a la carpeta de Acta de CD //**');
        actaCDfolderFiles = actaCDfolder.getFiles();
        if (actaCDfolderFiles.hasNext()) {
            while (actaCDfolderFiles.hasNext()) {
                nextFile = actaCDfolderFiles.next();
                if (nextFile) {
                    if (nextFile.getName() === 'Acta de Consejo - RD') {
                        console.log('**-> Archivo de Acta de CD encontrado  //**');
                        actaCDfile = nextFile;
                        break;
                    };
                } else {
                    console.log('Archivo de acta de no encontrado.');
                    actaCDfile = false;
                };
            };
        } else {
            console.log(`* No hay archivos en la carpeta del nuevo acta! *`);
            actaCDfile = false;
        };
    };
    if (!actaCDfile) {
        // Si no existe el archivo, lo crea a partir del template correspondiente. 
        console.log(`Creando nueva acta de Consejo Directivo para RD`);
        const actaTemplateID = 'YOUR_TEMPLATE_ID',
            actaTemplateFILE = DriveApp.getFileById(actaTemplateID);
        actaCDfile = actaTemplateFILE.makeCopy(actaCDfolder);
        actaCDfile.setName('Acta de Consejo - RD');
        console.log('**-> Nueva Acta creada //**');
    };
    return { actaCDfolder, actaCDfile };
};