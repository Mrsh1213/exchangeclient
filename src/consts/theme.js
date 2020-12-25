import {createMuiTheme} from '@material-ui/core/styles'
import {enUS, faIR} from '@material-ui/core/locale'

const languages = {
    "EN": enUS,
    "FA": faIR
};
const theme = (type, lang) => {
    return createMuiTheme(
        {
            typography: {
                fontFamily: ["UbuntuLight"],
            },
            palette: {
                common: {
                    black: "#1d272e",
                    white: "#fff",
                },
                type: type,
                info: {
                    light: "#64b5f6",
                    main: "#2196f3",
                    dark: "#1976d2",
                    contrastText: "#fff"
                },
                secondary: {
                    main: "#00a275",
                    dark: "#00a275",
                    light: "#ff1e8c",
                },
                primary: {
                    main: "#6c7983",
                    dark: "#6c7983",
                    light: "#524df6",
                    contrastText: "#fff"
                },
                error: {
                    main: "#f44336",
                    dark: "#f44336",
                },
                background: {
                    paper: type === "dark" ? "#26313a" : "#fff"
                },
                text: {
                    primary: "#fff",
                    secondary: "#00a275"
                },
                color: {
                    text1: {
                        light: "#151d24",
                        dark: "#e8eaeb",
                    },
                    0: {
                        light: "#eaeaea",
                        dark: "#151d24",
                    },
                    1: {
                        light: "#eaeaea",
                        dark: "#26313a",
                    },
                    2: {
                        light: "linear-gradient(to right, #12c49c, #0db475)",
                        dark: "linear-gradient(to right, #12c49c, #0db475)",
                    },
                    3: {
                        light: "#6c7983",
                        dark: "#6c7983",
                    },
                    4: {
                        light: "#eaeaea",
                        dark: "#1d272e",
                    },
                    5: {
                        light: "#d5ebf9",
                        dark: "#293843",
                    },

                }
            },
            direction: lang === "FA" ? "rtl" : "ltr",
            overrides: {
                // MuiSvgIcon: {
                //     root: {color: "#c0c7d1"},
                // },
                // MuiTypography: {
                //     root: {
                //         color: "#344563",
                //     }
                // },
                // MuiInputLabel: {
                //     outlined: {
                //         transform: "translate(14px, 11px) scale(1)"
                //     }
                // },
                // MuiOutlinedInput: {
                //     input: {
                //         padding: "12px 14px 6px"
                //     }
                // },
                // MuiToolbar: {
                //     gutters: {
                //         paddingRight: '16px !important',
                //         paddingLeft: '16px !important'
                //     }
                // },
                // MuiIconButton: {
                //     root: {
                //         padding: 8
                //     }
                // },
                // MuiListItem: {
                //     root: {
                //         paddingTop: 6,
                //         paddingBottom: 6
                //     }
                // },
                // MuiSlider: {
                //     root: {
                //         color: "#ca0c85"
                //     }
                // }
            }
        }, languages[lang]);
};
// theme.typography.body1 = {
//     [theme.breakpoints.up('md')]: {
//         fontSize: '0.8rem'
//     },
//     [theme.breakpoints.down('md')]: {
//         fontSize: '1.6rem'
//     }
// }
export default (theme)