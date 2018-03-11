const regex = /\/form\/(.*)?\//;

export const ParseId = () => {
    const path = window.location.pathname;
    return regex.exec(path)[1];
};
