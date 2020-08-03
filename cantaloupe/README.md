# IIIF Image Server

This repository contains a Dockerfile to build a Docker image to run and test [Cantaloupe](https://medusa-project.github.io/cantaloupe/).
Cantaloupe is an open-source image server writtin in Java and complies with the [IIIF Image API](https://iiif.io/api/image/2.1/).

For more information, see:

- [International Image Interoperability Framework](https://iiif.io/) (IIIF)
- [Cantaloupe](https://cantaloupe-project.github.io/)
- [Awesome IIIF](https://github.com/IIIF/awesome-iiif)

## Prerequisits
Docker & [Docker Compose](https://docs.docker.com/compose/)

## Image server

First make sure

To start Cantaloupe, run:

    docker-compose up --build server

Now, Cantaloupe is running on port 8080 (http://localhost:8080/).

### Cantaloupe 
By default, Cantaloupe will serve the images in the [`example-images`](example-images) directory. This directory currently contains a couple images.

To view the [image information](https://iiif.io/api/image/2.1/#image-information) of this image, go to:

- http://localhost:8080/iiif/2/xxxxxxxxxx.tif/info.json

To view a scaled version of the image:

- http://localhost:8080/iiif/2/xxxxxxxxxx.tif/full/1000,/0/default.jpg

And to rotate the image by 90°:

- http://localhost:8080/iiif/2/xxxxxxxxxx.tif/full/1000,/90/default.jpg

Notes:

1. The [Dockerfile in this repository](Dockerfile) is based on a Dockerfile from [MIT Libraries](https://github.com/MITLibraries/docker-cantaloupe/blob/master/Dockerfile);

