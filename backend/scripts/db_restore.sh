#!/bin/bash
# Script de restauración para la base de datos de RF_Observatory

if [ -z "$1" ]; then
  echo "Uso: $0 <archivo_de_respaldo.sql>"
  exit 1
fi

BACKUP_FILE=$1
DB_URL=${DATABASE_URL:-"postgresql://rf_user:rf_password@localhost:5432/rf_observatory?schema=public"}

echo "=== Restaurando RF_Observatory desde $BACKUP_FILE ==="

if [ ! -f "$BACKUP_FILE" ]; then
  echo "El archivo $BACKUP_FILE no existe."
  exit 1
fi

pg_restore -c -d "$DB_URL" "$BACKUP_FILE"

if [ $? -eq 0 ]; then
  echo "Restauración completada exitosamente."
else
  echo "Error durante la restauración."
  exit 1
fi
