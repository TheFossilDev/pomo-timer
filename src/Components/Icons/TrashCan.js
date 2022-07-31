import React from "react";

const TrashCan = (props) => {
  let css = `
  .trashCan {
    max-height: 100%;
    width: 3rem;
  }
  #lid {
    transition: all 500ms ease;
  }
  .trashCan:hover #lid {
    transform: rotate(-30deg) translateY(20px) translateX(-30px);
  }
  `;
  return (
    <>
      <style>{css}</style>

      <svg
        className="trashCan"
        width="170"
        height="170"
        viewBox="0 0 170 170"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="TrashCan">
          <rect
            id="body"
            x="47"
            y="53"
            width="77"
            height="101"
            rx="5"
            fill="#323232"
          />
          <g id="lid">
            <rect
              id="lidBase"
              x="43"
              y="42"
              width="84"
              height="9"
              rx="1"
              fill="#323232"
            />
            <path
              id="lidTop"
              d="M65 40C65 37.2386 67.2386 35 70 35H101C103.761 35 106 37.2386 106 40V42H65V40Z"
              fill="#323232"
            />
          </g>
        </g>
      </svg>
    </>
  );
};

export default TrashCan;
