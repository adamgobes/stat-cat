import React from 'react'

import NoImagePlayer from '../../assets/images/player.png'

const PlayerImage = ({ src, name, imageWidth, imageHeight, noImageHeight, noImageWidth }) =>
    (src && <img src={src} height={imageHeight} width={imageWidth} alt={name} />) ||
    (!src && <img src={NoImagePlayer} height={noImageHeight} width={noImageWidth} alt={name} />)

export default PlayerImage
