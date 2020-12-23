import {get} from 'lodash';

export const getLang = state => get(state, 'app.lang');
export const getThemeType = state => get(state, 'app.themeType');
