import {LaneType, MarkerType} from '../assets/types';
import {linesGeoJSON} from '../data/data';

export const getMarkerLanes = (marker: MarkerType): LaneType[] => {
  let lanesArry: LaneType[] = [];
  linesGeoJSON.features.forEach(value => {
    if (marker.properties.route_ids.includes(value.properties.route_id)) {
      lanesArry.push(value);
    }
  });
  return lanesArry;
};
