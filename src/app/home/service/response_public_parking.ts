export interface Parking {
    totalCount: number;
    start:      number;
    rows:       number;
    result:     Result[];
}

export interface Result {
    id:              number;
    title:           string;
    description:     string;
    horario?:        string;
    accesoPeaton?:   string;
    accesoVehiculo?: string;
    lastUpdated:     Date;
    geometry:        Geometry;
    icon:            string;
    uri:             string;
}

export interface Geometry {
    type:        Type;
    coordinates: number[];
}

export enum Type {
    Point = "Point",
}
