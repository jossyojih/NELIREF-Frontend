function formatTimeAgo(timestamp) {
  const currentDate = new Date()
  const previousDate = new Date(timestamp)
  const timeDifference = Math.abs(currentDate - previousDate) / 1000 // in seconds

  if (timeDifference < 60) {
    return 'a minute ago'
  } else if (timeDifference < 3600) {
    const minutes = Math.floor(timeDifference / 60)
    return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`
  } else if (timeDifference < 86400) {
    const hours = Math.floor(timeDifference / 3600)
    return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`
  } else if (timeDifference < 604800) {
    const days = Math.floor(timeDifference / 86400)
    return `${days} ${days === 1 ? 'day' : 'days'} ago`
  } else {
    return previousDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }
}

export default formatTimeAgo
