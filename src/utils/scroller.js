import { scroller } from 'react-scroll';

export const scrollToBottom = (scrollId, containerId) => {
  scroller.scrollTo(scrollId, {
    duration: 800,
    delay: 0,
    smooth: true,
    containerId: containerId,
    offset: 50,
  });
};
