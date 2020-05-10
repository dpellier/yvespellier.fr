#!/usr/bin/env bash

echo "-- Starting converting images and generating data --"
echo ""

# Test if ImageMagick is installed locally
command -v convert >/dev/null 2>&1 || { echo >&2 "--> ImageMagick is not installed. Aborting."; exit 0; }

# Test script arguments
if [[ $# -eq 0 ]]
then
    echo ""
    echo "usage: generateData.sh <src_path> <dest_path> <data_src_path>"
    echo ""
    echo "<src_path> is the path where are located the pictures to you want to process"
    echo "<dest_path> is the path where the processed pictures will end."
    echo "<data_src_path> is the path that will be used in the generated json file."
    echo ""
    exit 0
fi

# Check that dest path exists
if [[ ! -d $2 ]]
then
    echo "Dest path $2 does not exists."
    exit 0
fi

function ProgressBar {
    let "_progress=(${1}*100/${2}*100)/100"
    let "_done=(${_progress}*4)/10"
    let "_left=40-$_done"

    _fill=$(printf "%${_done}s")
    _empty=$(printf "%${_left}s")

    printf "\rProgress : [${_fill// /#}${_empty// /-}] ${_progress}%%"
}

# Trim trailing slash
SRC_PATH=$(echo $1 | sed 's:/*$::')
DEST_PATH=$(echo $2 | sed 's:/*$::')
DATA_SRC_PATH=$(echo $3 | sed 's:/*$::')
DATA_FILE=${DEST_PATH}/data.json

FILE_COUNT=0
DIMENSIONS=( 400 800 1200 1600 )
DEFAULT_DIMENSION=${DIMENSIONS[${#DIMENSIONS[@]}-1]}

# Reset data file
echo -e "[" > ${DATA_FILE}

shopt -s nullglob # Avoid loop to return empty * as file
shopt -s nocaseglob # Search through extension caseless

NB_FILE=`ls -1 ${SRC_PATH}/*.{jpg,jpeg,png} 2>/dev/null | wc -l`

for FILE in ${SRC_PATH}/*.{jpg,jpeg,png}; do
    FILE_COUNT=$(expr ${FILE_COUNT} + 1)
    FILE_EXTENSION=${FILE##*.}
    CONVERT_COUNT=0

    # Horizontal ratio by default
    WIDTH=3
    HEIGHT=4

    RATIO=$(identify -format "%[fx:abs(w/h)]" ${FILE})
    ROUNDED_RATIO=$(echo "${RATIO}/1" | bc)

    if [[ ${ROUNDED_RATIO} -eq 1 ]]
    then
        WIDTH=4
        HEIGHT=3
    fi

    echo -e "\t{" >> ${DATA_FILE}
    echo -e "\t\t\"src\": \"${DATA_SRC_PATH}/${FILE_COUNT}-${DEFAULT_DIMENSION}.${FILE_EXTENSION}\"," >> ${DATA_FILE}
    echo -e "\t\t\"srcSet\": [" >> ${DATA_FILE}

    for DIMENSION in "${DIMENSIONS[@]}"
    do
        CONVERT_COUNT=$(expr ${CONVERT_COUNT} + 1)
        NEW_FILE_NAME=${FILE_COUNT}-${DIMENSION}.${FILE_EXTENSION}

        if [[ ${CONVERT_COUNT} -ne ${#DIMENSIONS[@]} ]]
        then
            echo -e "\t\t\t\"${DATA_SRC_PATH}/${NEW_FILE_NAME} ${DIMENSION}w\"," >> ${DATA_FILE}
        else
            echo -e "\t\t\t\"${DATA_SRC_PATH}/${NEW_FILE_NAME} ${DIMENSION}w\"" >> ${DATA_FILE}
        fi

        convert ${FILE} -resize ${DIMENSION}x ${DEST_PATH}/${NEW_FILE_NAME}
    done

    echo -e "\t\t]," >> ${DATA_FILE}
    echo -e "\t\t\"width\": ${WIDTH}," >> ${DATA_FILE}
    echo -e "\t\t\"height\": ${HEIGHT}" >> ${DATA_FILE}

    if [[ ${FILE_COUNT} -ne ${NB_FILE} ]]
    then
        echo -e "\t}," >> ${DATA_FILE}
    else
        echo -e "\t}" >> ${DATA_FILE}
    fi

    ProgressBar ${FILE_COUNT} ${NB_FILE}
done

shopt -u nocaseglob
shopt -u nullglob

echo "]" >> ${DATA_FILE}
echo ""
echo ""
echo "-- Script ended successfully --"
echo ""
