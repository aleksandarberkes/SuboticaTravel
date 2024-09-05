export type MarkerType = {
  type: string;
  properties: {
    stop_id: string;
    stop_name: string;
    route_ids: string[];
  };
  geometry: {
    type: string;
    coordinates: number[];
  };
};

export type LaneType = {
  type: string;
  properties: {
    route_id: string;
    route_name: string;
  };
  geometry: {
    type: string;
    coordinates: number[][][];
  };
};

export type UnivesalSeleceted = {
  selection_case:
    | 'filter-marker'
    | 'filter-lane'
    | 'map-marker'
    | 'map-lane'
    | 'none';
  lane_info?: LaneType[];
  marker_info?: MarkerType;
};
