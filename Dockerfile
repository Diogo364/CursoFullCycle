FROM golang:1.22

RUN apt-get update && apt-get upgrade -y

ARG USERNAME
ARG UID=1000
ARG GID=1000

ENV HOME=/usr/src/app
RUN mkdir -p ${HOME} && chmod -R a+rwx ${HOME}

RUN groupadd --gid ${UID} ${USERNAME} \
    && useradd --uid ${UID} --gid ${GID} -m ${USERNAME} \
    && mkdir /etc/sudoers.d \
    && echo ${USERNAME} ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/${USERNAME} \
    && chmod 0440 /etc/sudoers.d/${USERNAME}

WORKDIR ${HOME}

USER ${USERNAME} 
