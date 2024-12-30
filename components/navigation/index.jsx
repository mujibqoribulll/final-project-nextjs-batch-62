import React from "react";

const Navigation = () => {
  return (
    <div className="bg-white lg:rounded-lg h-fit lg:max-w-96 mb-3 lg:mb-0 py-3 sticky top-3 px-5 w-full hidden lg:flex flex-col">
      <h2 className="font-mono font-bold text-xl line-clamp-1 ">Navigations</h2>
      <ul className="">
        <li className="text-sm font-mono">Notifications</li>
        <li className="text-sm font-mono">All Posts</li>
        <li className="text-sm font-mono">All Posts</li>
      </ul>
    </div>
  );
};

export default Navigation;
