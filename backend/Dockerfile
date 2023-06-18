# Choisissez une image de base
FROM node:14

# Définissez le répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Copiez les fichiers de dépendances du package.json et du package-lock.json
COPY package*.json /usr/src/app/

# Installez les dépendances
RUN npm install

# Copiez le reste du code de l'application
COPY . /usr/src/app

# Exposez le port que votre application utilise
EXPOSE 3003

# Démarrez l'application
CMD [ "node", "index.js", "require('bcryptjs')"]