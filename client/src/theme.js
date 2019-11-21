const dropStyles = `
	border-bottom-left-radius: 12px;
	border-bottom-right-radius: 12px;
	overflow: hidden;
`

export default {
    global: {
        font: {
            family: 'Thasadith',
            size: '14px',
            height: '20px',
        },
        colors: {
            brand: '#7781f7',
            secondary: 'black',
            backdrop: '#EFF1F3',
        },
        focus: {
            border: {
                color: 'none',
            },
        },
        drop: {
            shadowSize: 'medium',
            extend: dropStyles,
        },
    },
}
