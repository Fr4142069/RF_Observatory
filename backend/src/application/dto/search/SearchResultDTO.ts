export interface SearchResultDTO {
  readonly id: string;
  readonly type: 'KNOWN_PROTOCOL' | 'FINGERPRINT' | 'EVIDENCE' | 'CAPTURE' | 'CLASSIFICATION';
  readonly matchRelevanceScore?: number; // Para el futuro (motores híbridos / IA)
  readonly title: string;
  readonly summary: string;
  readonly attributes: Record<string, any>; // Meta data específica del tipo
  readonly url?: string; // Enlace interno o identificador único para navegación
}
