import React from "react";
import PropTypes from "prop-types";

/**
 * Timeline component
 * API:
 *  <Timeline
 *    data={[{ title: '2024', content: <div>...</div> }]}
 *    align="alternate" // 'left' | 'right' | 'alternate'
 *    lineClass="bg-blue-600"
 *    dotClass="bg-blue-600 ring-blue-300/40"
 *  />
 */
const Timeline = ({
  data = [],
  align = "alternate",
  lineClass = "bg-blue-600",
  dotClass = "bg-blue-600 ring-4 ring-blue-500/15",
}) => {
  return (
    <div className="relative w-full">
      {/* vertical line */}
      <div
        className={`pointer-events-none absolute left-1/2 top-0 hidden h-full w-0.5 -translate-x-1/2 md:block ${lineClass}`}
        aria-hidden
      />

      <ol className="space-y-10 md:space-y-14">
        {data.map((item, idx) => {
          const isLeft =
            align === "left" ? true :
            align === "right" ? false :
            idx % 2 === 0;

          return (
            <li key={idx} className="relative grid grid-cols-1 md:grid-cols-2 md:gap-12">
              {/* dot */}
              <div
                className="pointer-events-none absolute left-4 top-2 h-3 w-3 rounded-full md:left-1/2 md:-translate-x-1/2"
                aria-hidden
              >
                <span className={`block h-3 w-3 rounded-full ${dotClass}`} />
              </div>

              {/* Title (year) */}
              <div
                className={`mb-3 md:mb-0 ${isLeft ? "md:col-start-1 md:text-right" : "md:col-start-2"} `}
              >
                <h3 className="inline-block rounded-md bg-gray-100 px-2 py-1 text-xs font-semibold uppercase tracking-wide text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                  {item.title}
                </h3>
              </div>

              {/* Content card */}
              <div className={`${isLeft ? "md:col-start-2" : "md:col-start-1 md:row-start-2"}`}>
                <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
                  {item.content}
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

Timeline.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.node.isRequired,
      content: PropTypes.node.isRequired,
    })
  ),
  align: PropTypes.oneOf(["left", "right", "alternate"]),
  lineClass: PropTypes.string,
  dotClass: PropTypes.string,
};

export default Timeline;
