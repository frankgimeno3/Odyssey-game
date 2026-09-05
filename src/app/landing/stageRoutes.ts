export const ROUTE_TO_STAGE = {
  "1": "nombre",
  "1nombre": "nombre",
  "1nombrehola": "nombrehola",
  "2": "conflicto",
  "3": "relaciones",
  "4": "estrategia",
  "5": "resolutividad",
  "6": "trabajo",
  "7": "lugar",
  "8": "humor",
  "9": "creatividad",
  "910": "juicio",
  "911": "horario",
  "912": "alea",
  "913": "resultado",
  "914": "enviar",
  "915": "yapuedes",
} as const;

export type RouteStage = keyof typeof ROUTE_TO_STAGE;

const STAGE_TO_ROUTE: Record<string, RouteStage> = {
  nombre: "1",
  nombrehola: "1nombrehola",
  conflicto: "2",
  relaciones: "3",
  estrategia: "4",
  resolutividad: "5",
  trabajo: "6",
  lugar: "7",
  humor: "8",
  creatividad: "9",
  juicio: "910",
  horario: "911",
  alea: "912",
  resultado: "913",
  enviar: "914",
  yapuedes: "915",
};

export const getStageFromRoute = (route: string) =>
  ROUTE_TO_STAGE[route as RouteStage];

export const getRouteFromStage = (stage: string) => STAGE_TO_ROUTE[stage];
