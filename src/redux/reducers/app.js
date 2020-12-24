import {
    CHANGE_LANG,
    CHANGE_THEME_TYPE
} from '../../consts/actionTypes';

const initialState = {
    lang: "EN",
    themeType: "dark"
};
export default function (state = initialState, action) {
    switch (action.type) {
        case CHANGE_LANG:
            return {...state, lang: action.payload.lang};
        case CHANGE_THEME_TYPE:
            return {...state, themeType: action.payload.themeType};
        default:
            return {...state};
    }
}
