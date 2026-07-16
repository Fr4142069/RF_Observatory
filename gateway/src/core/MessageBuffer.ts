export class MessageBuffer {
  private queue: any[] = [];
  
  /**
   * Encola un payload para ser enviado.
   */
  enqueue(payload: any) {
    this.queue.push(payload);
    console.log(`[Buffer] Mensaje encolado. Tamaño actual: ${this.queue.length}`);
  }

  /**
   * Extrae el mensaje más antiguo de la cola.
   */
  dequeue(): any | undefined {
    return this.queue.shift();
  }

  /**
   * Re-encola un mensaje al principio si falló por error de red.
   */
  requeue(payload: any) {
    this.queue.unshift(payload);
    console.log(`[Buffer] Mensaje re-encolado. Tamaño actual: ${this.queue.length}`);
  }

  isEmpty(): boolean {
    return this.queue.length === 0;
  }
}
