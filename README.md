
# Prueba Tecnica

## Tabla de Contenido

* [Prerequisitos](#prerequisitos)
* [Configuracion](#configuracion)
* [Entorno de desarrollo](#entorno-de-desarrollo)
* [Entorno de production](#entorno-de-production)

## Prerequisitos

* Los siguientes requisitos deben estar instalados para ejecutar el proyecto en los diferentes entornos:

    * NPM v6.14.12+
    * Node v12.22.1+
    * Docker v19.03.1+
    * Docker-Compose v1.24.1+

## Configuracion

* Crear los archivos para variables de entorno

    ```
    cp project/env/sample.develop backend/env/.develop
    cp project/env/sample.testing backend/env/.testing
    ```

### Entorno de desarrollo

* Instalar dependencias de desarrollo

    ```
    cd project
    npm install
    ```

* Ejecutar el servidor 

    ```
    npm start
    ```

* Ingresar a

    ```
    127.0.0.0:3000/
    ```

### Entorno de production

* Crear y ejecutar el contenedor docker

```
docker-compose up --build -d
```

* Ingresar a

    ```
    127.0.0.0:3000/
    ```