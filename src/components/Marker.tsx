import React, { useRef, useState } from "react";
import { Marker } from "react-map-gl";
import { HiOutlineLocationMarker } from "react-icons/hi";
import {
  Card,
  CardContent,
  CardMedia,
  styled,
  Typography,
} from "@mui/material";

interface Props {
  lng: number;
  lat: number;
}

const CustomMarker = ({ lng, lat }: Props) => {
  const [showMarkerInfo, setShowMarkerInfo] = useState<boolean>(false);
  const cardRef = useRef<any>(null);

  const onOutClick = (e: MouseEvent) => {
    if (!cardRef.current) return;

    if (!e.composedPath().includes(cardRef.current)) {
      setShowMarkerInfo(false);
      return;
    }
    window.addEventListener("click", onOutClick, { once: true });
  };

  const handleMarkerClick = (e: any) => {
    console.log(lng, lat)
    setTimeout(
      () => {
        setShowMarkerInfo(!showMarkerInfo);
        e.nativeEvent.stopPropagation();

        if (!showMarkerInfo) {
          window.addEventListener("click", onOutClick, { once: true });
        }
      },
      0
    )
  };

  return (
    <Marker longitude={lng} latitude={lat}>
      <div ref={cardRef} style={{ position: "relative" }}>
        {showMarkerInfo && (
          <CustomCard sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              height="140"
              image="https://media.istockphoto.com/id/1297349747/photo/hot-air-balloons-flying-over-the-botan-canyon-in-turkey.jpg?b=1&s=170667a&w=0&k=20&c=1oQ2rt0FfJFhOcOgJ8hoaXA5gY4225BA4RdOP1RRBz4="
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Data
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lorem ipsum dolor sit amet
              </Typography>
            </CardContent>
          </CustomCard>
        )}
        <MarkerIcon onClick={handleMarkerClick} />
      </div>
    </Marker>
  );
};

const MarkerIcon = styled(HiOutlineLocationMarker)({
  width: "30px",
  height: "30px",
  zIndex: 1,
});

const CustomCard = styled(Card)({
  position: "absolute",
  bottom: "30px",
  right: "calc(-135px)",
  width: "300px",
  zIndex: -1,
});

export default CustomMarker;
