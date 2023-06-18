const Minio = require('minio');
const express = require('express');
const fs = require('fs');

// Créez une instance du client MinIO avec les informations d'authentification
const minioClient = new Minio.Client({
    endPoint: 'localhost',
    port: 9000,
    useSSL: false,
    accessKey: 'minioadmin',
    secretKey: 'minioadmin'
});



// Vérifiez la connexion à MinIO
/*const bucketName = 'my-bucket';

minioClient.makeBucket(bucketName, (err, exists) => {
    if (err) return console.log('Erreur de connexion à MinIO :', err);
    console.log('Connexion à MinIO réussie !');
    return minioClient
});

 */


const bucketName = "isee-bucket";

/*
(async () => {
    console.log(`Creating Bucket: ${bucketName}`);
    await minioClient.makeBucket(bucketName, "videos").catch((e) => {
        console.log(
            `Error while creating bucket '${bucketName}': ${e.message}`
        );
    });

    console.log(`Listing all buckets...`);
    const bucketsList = await minioClient.listBuckets();
    console.log(
        `Buckets List: ${bucketsList.map((bucket) => bucket.name).join(",\t")}`
    );
})();

 */

(async () => {
    console.log(`Listing all buckets...`);
    const bucketsList = await minioClient.listBuckets();
    console.log(
        `Buckets List: ${bucketsList.map((bucket) => bucket.name).join(",\t")}`
    );
})();

/*
(async () => {
    // create object with string data
    const objectName = "file.txt";
    const result = await minioClient
        .putObject(bucketName, objectName, "video")
        .catch((e) => {
            console.log("Error while creating object: ", e);
            throw e;
        });

    console.log("Object uploaded successfully: ", result);
})();

 */
/*
(async () => {
    // read object in chunks and store it as a file
    const fileStream = fs.createWriteStream("./read-in-chunks.txt");
    const fileObjectKey = "file.txt.txt";

    const object = await minioClient.getObject(bucketName, fileObjectKey);
    object.on("data", (chunk) => fileStream.write(chunk));

    object.on("end", () => console.log(`Reading ${fileObjectKey} finished`));
})();
*/
/*
(async () => {
    // create object with string data
    const objectName = "file.txt";
    const result = await minioClient
        .putObject(bucketName, objectName, "video")
        .catch((e) => {
            console.log("Error while creating object: ", e);
            throw e;
        });

    console.log("Object uploaded successfully: ", result);
})();

(async () => {
    const objectName = "file.txt";
    minioClient.getObject(bucketName, objectName, (err, dataStream) => {
        if (err) {
            console.error('Erreur lors de la récupération de l\'objet :', err);
        } else {
            const chunks = [];
            dataStream.on('data', (chunk) => {
                chunks.push(chunk);
            });
            dataStream.on('end', () => {
                const fileContent = Buffer.concat(chunks).toString('utf-8');
                console.log('Contenu de l\'objet :', fileContent);
            });
            dataStream.on('error', (err) => {
                console.error('Erreur lors de la lecture de l\'objet :', err);
            });
        }
    });
})();

(async () => {
    const objectName = "file2.txt";
    minioClient.removeObject(bucketName, objectName, (err) => {
        if (err) {
            console.error('Erreur lors de la suppression de l\'objet :', err);
        } else {
            console.log('Objet supprimé avec succès');
        }
    });
})();

*/

module.exports = minioClient;
