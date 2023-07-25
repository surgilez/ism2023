import { animateScroll } from 'react-scroll'

export const scrollToBottomChat = (id: string) => {
  animateScroll.scrollToBottom({
    containerId: id,
    duration: 0,
    smooth: true,
    offset: 0,
  })
}

export const scrollToBottomAnimatedChat = (id: string) => {
  animateScroll.scrollToBottom({
    duration: 1000,
    delay: 100,
    smooth: true,
    containerId: id,
    offset: 0, // Scrolls to element + 50 pixels down the page
  })
}
