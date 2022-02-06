import React from "react";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

export interface CarouselProps {
  children: JSX.Element | JSX.Element[];
  settings?: Settings;
}

export const defaultSetting = {
  dots: false,
  infinite: true,
  swipeToSlide: true,
  speed: 300,
  arrows: false,
  autoplay: true,
  autoplaySpeed: 2000,
  pauseOnHover: true,
  cssEase: "linear",
  focusOnSelect: true,
};

function Carousel(props: CarouselProps) {
  const [settings] = React.useState<Settings>({
    ...defaultSetting,
    ...props.settings,
  });
  return (
    <Slider data-testid="Carousel" {...settings}>
      {props.children}
    </Slider>
  );
}

export default Carousel;
