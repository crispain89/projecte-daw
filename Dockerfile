# syntax=docker/dockerfile:1

# Docker base image
FROM node:16

# Command arguments (with optional default value)
# docker build --build-arg some_variable_name=a_value
ARG user=root

# Container user
#USER ${user}

# Environament variables
ENV WORKDIR=/home/${user}/nodejs-mvc-app
ENV SRCDIR=src
ENV PORT=8080

# Create app directory
#RUN mkdir -p ${WORKDIR} && chown -R ${user}:${user} ${WORKDIR}
RUN mkdir -p ${WORKDIR}
WORKDIR ${WORKDIR}

# Install dependencies
COPY ${SRCDIR}/package*.json ${WORKDIR}/
RUN npm install
# If you are building your code for production
# RUN npm install --only=production

# Copy app source
COPY ${SRCDIR}/ ${WORKDIR}/

# Container port (not machine port)
EXPOSE ${PORT}

# Starts application
CMD ["npm", "start"]
#CMD ["npm", "run", "devel"]