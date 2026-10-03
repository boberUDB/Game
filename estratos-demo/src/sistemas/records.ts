// Contadores permanentes y récords.
import { emit } from '../events';
import { estado } from '../state';

let avisoBloques = false; // un solo aviso de récord de bloques por partida

export function registrarBloque(): void {
  const r = estado.records;
  r.bloquesTotal++;
  r.bloquesPartida++;
  if (r.bloquesPartida > r.mejorPartida) {
    if (!avisoBloques && r.mejorPartida > 0) {
      avisoBloques = true;
      emit('record:nuevo', { tipo: 'bloques', valor: r.bloquesPartida });
    }
    r.mejorPartida = r.bloquesPartida;
  }
}

export function registrarProfundidad(y: number): void {
  const r = estado.records;
  if (y > r.profundidadPartida) r.profundidadPartida = y;
  if (y > r.profundidadMax) {
    const antes = r.profundidadMax;
    r.profundidadMax = y;
    // Se avisa cada 10 m nuevos para no cansar.
    if (antes > 0 && Math.floor(y / 10) > Math.floor(antes / 10)) emit('record:nuevo', { tipo: 'profundidad', valor: y });
  }
}

export function reiniciarAvisosDeRecord(): void { avisoBloques = false; }
