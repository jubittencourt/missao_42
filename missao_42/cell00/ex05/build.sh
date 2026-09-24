#!/bin/bash
if [ -z "$1" ]; then
echo "Insira argumento"
else 
for arg in "$@"; do
mkdir "ex$arg"
#echo "ex$arg"
done
fi 
