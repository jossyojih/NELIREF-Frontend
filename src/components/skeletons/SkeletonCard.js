import React from 'react'
import './Skeleton.css'

function SkeletonCard({ type }) {
  const classes = `skeleton ${type}`

  return <div className={classes}></div>
}

export default SkeletonCard
