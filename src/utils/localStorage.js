export const getLocalStorage = (key) => {
    try {
        let result = localStorage.getItem(key);
        if (!result) return null;
        return JSON.parse(result);
    } catch (error) {
        console.error(`[getLocalStorage]: ${error.message}`);
    }
};

export const setLocalStorage = (key, value) => {
    try {
        let stringifyValue = JSON.stringify(value);
        localStorage.setItem(key, stringifyValue);
    } catch (error) {
        console.error(`[setLocalStorage]: ${error.message}`);
    }
};

export const removeLocalStorage = (key) => {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.error(`[removeLocalStorage]: ${error.message}`);
    }
};
