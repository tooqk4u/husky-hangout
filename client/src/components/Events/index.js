import React, { useEffect, useState } from "react";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import Arrow from "react-arrows";
import hockey from "../Events/assets/images/hockey.png";
import party from "../Events/assets/images/houseParty.jpg";
import knitting from "../Events/assets/images/knitting.jpg";
import useScreenSize from "../../hooks/screenSize/useScreenSize";
import { QUERY_EVENTS } from "../../utils/queries";
import { useQuery } from "@apollo/client";

function EventsMobile() {
  const { isDesktop } = useScreenSize();
  const [selected, setSelected] = useState([]);
  const { data } = useQuery(QUERY_EVENTS);
  const isItemSelected = (id) => !!selected.find((el) => el === id);

  const events = data?.events || [];

  const handleClick =
    (id) =>
    ({ getItemById, scrollToItem }) => {
      const itemSelected = isItemSelected(id);

      setSelected((currentSelected) =>
        itemSelected
          ? currentSelected.filter((el) => el !== id)
          : currentSelected.concat(id)
      );
    };

  if (isDesktop) {
    return <div>Desktop is rendering</div>;
  } else {
    return (
      !isDesktop && (
        <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
          {events.map(
            ({
              eventName,
              eventDate,
              eventText,
              createdAt,
              username,
              attending,
              id,
            }) => {
              return (
                <Card
                  key={id}
                  itemId={id}
                  eventName={eventName}
                  eventDate={eventDate}
                  eventText={eventText}
                  createdAt={createdAt}
                  username={username}
                  attending={attending}
                  onClick={handleClick(id)}
                  selected={isItemSelected(id)}
                />
              );
            }
          )}
        </ScrollMenu>
      )
    );
  }
}

function LeftArrow() {
  const { isDesktop } = useScreenSize();
  const { isFirstItemVisible, scrollPrev } =
    React.useContext(VisibilityContext);

  return (
    !isDesktop && (
      <Arrow disabled={isFirstItemVisible} onClick={() => scrollPrev()}>
        Left
      </Arrow>
    )
  );
}

function RightArrow() {
  const { isDesktop } = useScreenSize();
  const { isLastItemVisible, scrollNext } = React.useContext(VisibilityContext);

  return (
    !isDesktop && (
      <Arrow disabled={isLastItemVisible} onClick={() => scrollNext()}>
        Right
      </Arrow>
    )
  );
}

function Card({
  onClick,
  selected,
  eventName,
  eventDate,
  eventText,
  attending,
  itemId,
  key,
}) {
  const [img, setImg] = useState();

  const visibility = React.useContext(VisibilityContext);
  const { isDesktop } = useScreenSize();
  useEffect(() => {
    switch (eventName) {
      case "hockey":
        setImg(hockey);
        break;
      case "Knitting":
        setImg(knitting);
        break;
      case "House Party":
        setImg(party);
        break;
      case "90s Themed Summer Jam!":
        setImg(party);
        break;
      default:
        console.error("no image found!");
    }
  }, []);
  return (
    !isDesktop && (
      <div
        key={key}
        onClick={() => onClick(visibility)}
        style={{
          width: "400px",
        }}
        tabIndex={0}
      >
        <div className="event-card">
          <div className="event-title">
            <h2>{eventName}</h2>
          </div>
          <div className="flex">
            <img src={img} alt="" className="event-image"></img>
          </div>
          <div className="description-align"></div>
          <div className="eventDescription">
            <h5 className="text">{eventText}</h5>
          </div>
          <div className="attending">
            <h5>EventDate: {eventDate}</h5>
            <h5>Attending: {attending}</h5>
          </div>
          {/* <div>
            visible: {JSON.stringify(!!visibility.isItemVisible(itemId))}
          </div>
          <div>selected: {JSON.stringify(!!selected)}</div> */}
        </div>
        <div
          style={{
            height: "200px",
          }}
        />
      </div>
    )
  );
}

export default EventsMobile;
