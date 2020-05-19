const dropStyles = `
	border-bottom-left-radius: 12px;
	border-bottom-right-radius: 12px;
	overflow: hidden;
`

const textInputStyles = `
	font-family: Roboto;
`

const baseTheme = {
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
}

export const lightTheme = {
    ...baseTheme,
    global: {
        colors: {
            brand: '#7781f7',
            secondary: 'white',
            backdrop: '#EFF1F3',
            freeText: 'black',
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

export const darkTheme = {
    ...baseTheme,
    global: {
        colors: {
            brand: '#282B2F',
            secondary: 'black',
            backdrop: '#222529',
            freeText: 'white',
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
