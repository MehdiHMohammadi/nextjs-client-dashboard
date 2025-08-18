import React from "react";

type LoadingProps = {
  width: number | string;
  height: number | string;
};

const Loading = ({ width, height }: LoadingProps) => {
  return (
    <div className="flex items-center justify-center">
      <span className={`inline-block w-${width} h-${height} animate-spin rounded-full border-2 border-solid border-white border-t-transparent dark:border-primary dark:border-t-transparent`} />
    </div>
  );
};
export default Loading;
