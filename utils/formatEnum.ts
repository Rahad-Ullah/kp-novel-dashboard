export const formatEnum = (enumStr: string = "") =>
    enumStr
        .toLowerCase()
        .replace(/_/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());