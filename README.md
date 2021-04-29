## Example code use to deploy the app

## Commands

```shell
gcloud projects list
```
Lista los proyectos de google cloud

```shell
gcloud config get-value project
```
Muestra cual es el proyecto activo

```shell
gcloud config set project <project_id>
```
Configura el projecto activo

```shell
gcloud app deploy --stop-previous-version 
```
Deploy de la aplicación (lo utilizamos para Node/React)

```shell
gcloud app browse
```
Despues de hacer deploy, arbir el proyecot en el navegador

```shell
gcloud app logs tail -s default
```
Obtener el log de la consola de nuestro servicio

```shell
mvn clean package appengine:deploy -P cloud-gcp
```
Comando para deploy de springBoot