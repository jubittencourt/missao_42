#!/bin/bash
if [ -z "$1" ]; then 
 echo "No arguments supplied"
 fi
[ -n "$1" ] && echo "$1"
[ -n "$2" ] && echo  "$2"
[ -n "$3" ] && echo  "$3"

