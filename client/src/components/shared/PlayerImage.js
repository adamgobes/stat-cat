import React from 'react'
import { Box } from 'grommet'
import styled from 'styled-components'

import NoImagePlayer from '../../assets/images/player.png'

const ImageWrapper = styled.div`
    width: ${props => (props.size === 'S' ? '70px' : '100px')};
    height: ${props => (props.size === 'S' ? '70px' : '100px')};
    border-radius: 100%;
    border: 2px solid
        ${props => (props.borderColor ? props.borderColor : props.theme.global.colors.brand)};
    overflow: hidden;
    background: white;
`

const PlayerImage = ({ src, name, size, borderColor }) => (
    <ImageWrapper size={size} borderColor={borderColor}>
        <Box align="center" justify="center" className="container" style={{ marginTop: '10px' }}>
            {(src && <img src={src} height="80%" width="100%" alt={name} />) ||
                (!src && <img src={NoImagePlayer} height="100%" width="100%" alt={name} />)}
        </Box>
    </ImageWrapper>
)

export default PlayerImage
