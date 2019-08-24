import styled, { keyframes } from 'styled-components'

const rotate = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
`

const Loader = styled.div`
    border: solid #f3f3f3;
    border-top: solid ${props => props.theme.global.colors.brand};
    border-radius: 50%;
    width: 20px;
    height: 20px;
    animation: ${rotate} 2s linear infinite;
`

export default Loader
