# Google Apps Script - Dinamic Docs Generator
Programa desarrollado en Google Workspace, y pensado para generar documentaciión legal/institucional de manera dinámica. Actualmente se encuentra en uso en la administración pública municipal de la ciudad de Santa Fe, Argentina.

### Problemática a resolver

El programa surgió a raíz de una problemática concreta, que tiene que ver con la necesidad de mejorar el flujo de trabajo del área legal de la institución pública, en relación a la redacción de documentación técnica específica. Esta documentación corresponde al programa social denominado Regularización Dominial.<br>
Busqué desarrollar una herramienta accesible, rápida y fácilmente entendible por los usuarios, de manera que éstos puedan concentrarse en la carga de datos.
De esta manera, y para no "reinventar la rueda", surge la idea de utilizar las herramientas de Google Workspace.

### Funcionamiento

Se carga de información a través de Google Forms y queda almacenada en Google SpreadSheets, de ahí se lee desde la App Script vinculada, generando los Google Docs correspondientes, que se guardan en una carpeta (que se crea al efecto) en Google Drive, para su descarga posterior.<br>
El programa solo funciona en el IDE de Google Apps Script, donde fue desarrollado.

#### Características

Este tipo de programa está fuertemente ligado a la documentación que busca generar, al tipo de datos insertados, y a la redacción específica que se necesita. A pesar de esto, es una herramienta que puede ser de utilidad para resolver problemáticas similaes en otros ámbitos. <br>
Si se realizan las adaptaciones necesarias, la matriz de generación automática de documentos a partir de templates puede replicarse con éxito.

El front-end completo está directamente derivado de Google Forms, por lo que no tuve que programar ningún tipo de interfaz (más allá de los simples ajustes que la plataforma permite).<br>
Lo mismo cabe decir de la seguridad de Forms, SpreadSheet y Drive en general. No me siento capacitado para hacer consideraciones al respecto, simplenente agregar que tuve en cuenta el hecho de que se necesite estar loggeado con una cuenta que tenga el archivo Forms compartido desde la cuenta oficial para poder tener acceso al formulario. Los documentos se guardan en una cuenta insitucional de gmail.

#### Consideración final

Queda aclarar que este programa surge por iniciativa propia, y que no cuenta con ningún tipo de apoyo gubernamental o inclinación partidaria.<br>
El fin último es mejorar el trabajo diario en las oficinas en cuanto a productividad y efectividad, y colaborar con la administración pública (de la que formo parte al día de hoy) en su mejor prestación de servicios sociales.
