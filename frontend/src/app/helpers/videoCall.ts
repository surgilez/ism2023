/* eslint-disable no-restricted-globals */

export const videoCall = (room: string) => {
  window.open(
    room,
    'personal-meet',
    `width=${screen.width},height=${screen.height}`
  )
}
