import React from 'react'
import { Box } from 'grommet'
import styled from 'styled-components'

import NoImagePlayer from '../../assets/images/player.png'

const sizeToPixelMap = {
    XS: '50',
    S: '70',
    M: '85',
    L: '100',
}

const ImageWrapper = styled.div`
    width: ${props => `${sizeToPixelMap[props.size]}px`};
    height: ${props => `${sizeToPixelMap[props.size]}px`};
    border-radius: 100%;
    border: 2px solid
        ${props => (props.borderColor ? props.borderColor : props.theme.global.colors.brand)};
    overflow: hidden;
    background: white;
`

const PlayerImage = ({ src, name, size = 'M', borderColor }) => (
    <ImageWrapper size={size} borderColor={borderColor}>
        <Box align="center" justify="center" className="container" style={{ marginTop: '8px' }}>
            {(src && <img src={src} height="95%" width="120%" alt={name} />) ||
                (!src && <img src={NoImagePlayer} height="100%" width="100%" alt={name} />)}
        </Box>
    </ImageWrapper>
)

export default PlayerImage
