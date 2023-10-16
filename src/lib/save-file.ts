export const downloadImage = (blob: string, fileName: string) => {
  const fakeLink = window.document.createElement('a')
  // fakeLink.style = 'display:none;'
  fakeLink.download = fileName

  fakeLink.href = blob

  document.body.appendChild(fakeLink)
  fakeLink.click()
  document.body.removeChild(fakeLink)

  fakeLink.remove()
}
