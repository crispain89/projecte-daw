# Instalacion Aplicacion Cram Sports

Este repositorio cuenta con dos carpetas principales: 

- react-cram: contiene el frontend hecho con reactjs (npx create-react-app)
- server-cram: contiene el backend hecho con expressjs y con una base de datos MYSQL

## Requisitios previos para la instalacion del proyecto

Nodejs >=16.4.2
Npm >=8.5

Para instalar node de una forma rapida y con la version adecuada seguimos estos pasos:

-Instalar nvm: 'wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash'
-Recargar bashrc: 'source ~./bashrc'
-Instalar la version de node que queramos: nvm install 18

## Pasos a seguir para poner la aplicacion en marcha (en localhost)

Desde la raiz del proyecto 'projecte-daw/':

- cd server-cram
- nano .env *Pegamos el contenido del .env de la api que se encuentra en el anexo de la documentación*
- npm install && npm start

Desde la raiz del proyecto 'projecte-daw/':

- cd react-cram
- nano .env *Pegamos el contenido del .env del frontend que se encuentra en el anexo de la documentación*
- npm install && npm start

Estos comandos iniciaran dos servidores localhost uno para frontend y otro para backend con los puertos 3000 y 8080  respectivamente

Una vez hecho todo esto, solo tenemos que ir al navegador con la ruta http://localhost:3000 para el fontend y http://localhost:8080 para el backend


## Pasos a seguir para desplegar la aplicacion (en servidor externo)

### Requisitos previos para el despliegue

Apache2
vsftpd
filezilla (en cliente)
pm2(opcional)

Configuramos servidor apache:

- creamos nuevo archivo de configuracion nombre.conf en /etc/apache2/sites-available
- configuramos el virtualHost para que el DocumentRoot escuche a /var/www/html/'carpeta'
- a2ensite nombre.conf  (para habilitar el virtualhost propio)
- a2dissite 000-default.conf (para desactivar el virtualhost por defecto)
- service apache2 restart

Desplegamos aplicacion de react:

- en otra maquina, ejecutamos el comando npm run build que nos creara una carpeta build
- pasamos la carpeta build al servidor a traves de filezilla
- service apache2 restart
- abrimos el navegador con la ruta http://65.108.245.5/

Desplegamos api de node:


- Nos aseguramos que el puerto que necesitemos para nuestra app de node esta abierto con el comando: 'iptables -L'
- Si no lo encontramos: 'iptables -I INPUT 1 -i eth0 -p tcp --dport 4000 -j ACCEPT'
- Instalamos node si no esta instalado (ir al anexo para el script de instalacion)
- Clonamos el repositorio de github en la carpeta /var/www/html/projecte-daw
- Accedemos a server-cram desde ahi
- Nos aseguramos que el index.js del node esta escuchando al puerto que acabamos de abrir
- Nos aseguramos que el script de inicio npm start apunta al fichero index.js
- Ejecutamos 'npm start' en la raiz
- Abrimos esta url en el navegador y esperamos la respuesta: http://65.108.245.5:4000
- opcionalmente podemos ejecutar el comando pm2 start index.js para tener el servidor en segundo plano y activo 24/7
