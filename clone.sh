#!/bin/bash
# Clone files to Github - https://github.com/talesCPV/CBF.git

read -p "Deseja realmente clonar CBF do GitHub? S/ ->" -n 1 -r
echo    # (optional) move to a new line
if [[ $REPLY =~ ^[Ss]$ ]]
then

    cd ..

    rm -rf CBF/

    git init

    git clone https://github.com/talesCPV/CBF.git 

    echo ATUALIZANDO SISTEMA DE PASTAS

fi