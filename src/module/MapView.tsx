import React, { useRef, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLng } from "leaflet";

interface PositionUser {
    lat: number;
    lang: number;
}

export default function MapView(props: PositionUser) {
    const mapRef = useRef<any>();

    useEffect(() => {
        if (mapRef.current) {
            const map = mapRef.current.leafletElement;
            map.setView(new LatLng(props.lat, props.lang), 13);
        }
    }, [props.lat, props.lang]);

    return (
        <div>
            <MapContainer ref={mapRef}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[props.lat, props.lang]}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
}
