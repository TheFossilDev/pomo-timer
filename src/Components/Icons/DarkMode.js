import React from "react";
import { useSelector } from "react-redux";

const DarkMode = (props) => {
  const darkMode = useSelector((state) => state.theme.darkMode);

  const css = `
  .moon {
    width: 2.9rem;
    height: 2.9rem;
  }
  .sun {
    width: 2.9rem;
    height: 2.9rem;
  }

  #bottomStar, #middleStar, #topStar {
    transition: fill-opacity 500ms ease;
    fill-opacity: 0%;
  }
  .moon:hover #bottomStar, .moon:hover #middleStar, .moon:hover #topStar {
    fill-opacity: 100%;
  }

  #north, #south, #east, #west, #northWest, #northEast, #southEast, #southWest {
    transform-origin: center;
    transition: transform 500ms ease;
  }

  .sun:hover #north, .sun:hover #south, .sun:hover #east, .sun:hover #west,.sun:hover #northWest, .sun:hover #northEast, .sun:hover #southEast, .sun:hover #southWest {
    transform: rotate(15deg);
  }
  `;

  return (
    <>
      <style>{css}</style>
      {darkMode ? (
        <svg
          className="sun"
          width="170"
          height="170"
          viewBox="0 0 170 170"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="Sun">
            <circle id="sun" cx="84.5" cy="85.5" r="52.5" fill="#323232" />
            <path
              id="north"
              d="M84.5 16L97.0574 28H71.9426L84.5 16Z"
              fill="#323232"
            />
            <path
              id="south"
              d="M84.5 155L71.9426 143H97.0574L84.5 155Z"
              fill="#323232"
            />
            <path
              id="southEast"
              d="M135.567 136.567L118.202 136.961L135.961 119.202L135.567 136.567Z"
              fill="#323232"
            />
            <path
              id="southWest"
              d="M31.2531 135.567L30.8589 118.202L48.6177 135.961L31.2531 135.567Z"
              fill="#323232"
            />
            <path
              id="northWest"
              d="M33.253 34.253L50.6177 33.8589L32.8589 51.6177L33.253 34.253Z"
              fill="#323232"
            />
            <path
              id="northEast"
              d="M135.567 34.253L135.961 51.6177L118.202 33.8589L135.567 34.253Z"
              fill="#323232"
            />
            <path
              id="east"
              d="M154 85.5L142 98.0574V72.9426L154 85.5Z"
              fill="#323232"
            />
            <path
              id="west"
              d="M15 85.5L27 72.9426V98.0574L15 85.5Z"
              fill="#323232"
            />
          </g>
        </svg>
      ) : (
        <></>
      )}
      {/* ========== MOON ========== */}
      {!darkMode ? (
        <svg
          className="moon"
          width="170"
          height="170"
          viewBox="0 0 170 170"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="Moon">
            <path
              id="moon"
              d="M72.0576 28.3385C81.9998 26.1744 92.3346 26.6408 102.041 29.6919C111.748 32.7429 120.492 38.273 127.408 45.736C134.324 53.1991 139.174 62.3371 141.479 72.2476C143.784 82.1581 143.464 92.4985 140.551 102.248C137.639 111.997 132.233 120.818 124.869 127.839C117.505 134.861 108.437 139.84 98.5597 142.285C88.6829 144.731 78.3391 144.558 68.5495 141.784C58.76 139.009 49.8633 133.729 42.7381 126.466L51.6241 122.688C64.7464 117.108 75.2362 106.719 80.9415 93.651V93.651C83.2885 88.275 84.5 82.4721 84.5 76.6061V69.5302C84.5 58.9855 82.0685 48.5829 77.3944 39.1307L72.0576 28.3385Z"
              fill="#323232"
            />
            <path
              id="bottomStar"
              className="star"
              d="M34.5 85L37.0819 92.9463H45.4371L38.6776 97.8574L41.2595 105.804L34.5 100.893L27.7405 105.804L30.3224 97.8574L23.5628 92.9463H31.9181L34.5 85Z"
              fill="#323232"
            />
            <path
              id="middleStar"
              className="star"
              d="M57.5 62L60.0819 69.9463H68.4371L61.6776 74.8574L64.2595 82.8037L57.5 77.8926L50.7405 82.8037L53.3224 74.8574L46.5628 69.9463H54.9181L57.5 62Z"
              fill="#323232"
            />
            <path
              id="topStar"
              className="star"
              d="M51.5 29L54.0819 36.9463H62.4371L55.6776 41.8574L58.2595 49.8037L51.5 44.8926L44.7405 49.8037L47.3224 41.8574L40.5628 36.9463H48.9181L51.5 29Z"
              fill="#323232"
            />
          </g>
        </svg>
      ) : (
        <></>
      )}
    </>
  );
};

export default DarkMode;
