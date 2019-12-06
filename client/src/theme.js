const dropStyles = `
	border-bottom-left-radius: 12px;
	border-bottom-right-radius: 12px;
	overflow: hidden;
`

const textInputStyles = `
	font-family: Roboto;
`

export default {
    textInput: {
        extend: textInputStyles,
    },
    select: {
        container: {
            extend: textInputStyles,
        },
    },
    textArea: {
        extend: textInputStyles,
    },
    global: {
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
