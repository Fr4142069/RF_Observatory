#!/bin/bash
# Script de respaldo para la base de datos de RF_Observatory
# Este script asume que pg_dump está instalado y configurado

BACKUP_DIR="./backups"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
DB_URL=${DATABASE_URL:-"postgresql://rf_user:rf_password@localhost:5432/rf_observatory?schema=public"}
FILE_NAME="rf_observatory_backup_$TIMESTAMP.sql"

echo "=== Iniciando respaldo de RF_Observatory ==="
mkdir -p "$BACKUP_DIR"

pg_dump "$DB_URL" -F c -f "$BACKUP_DIR/$FILE_NAME"

if [ $? -eq 0 ]; then
  echo "Respaldo exitoso: $BACKUP_DIR/$FILE_NAME"
else
  echo "Error durante el respaldo."
  exit 1
fi
