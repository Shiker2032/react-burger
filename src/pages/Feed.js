import React from "react";

import FeedOrder from "../components/feed-order/feedOrder";
function Feed(props) {
  return (
    <>
      <main>
        <FeedOrder />
        <FeedOrder />
        <FeedOrder />
      </main>
    </>
  );
}

export default Feed;
