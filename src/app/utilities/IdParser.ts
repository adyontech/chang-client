import { routeStructure } from '../shared/routes/input-pages-layout.routes';

const idPosition = routeStructure.split('/').indexOf(':id');

export const ParseId = () => {
    const splitPath = window.location.pathname.split('/');
    // Some browsers (including chrome) return the path with a leading /, remove it if exists.
    const sanitizedSplitPath = splitPath[0] === '' ? splitPath.slice(1) : splitPath;
    return sanitizedSplitPath[idPosition];
};
