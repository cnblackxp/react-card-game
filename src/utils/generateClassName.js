export default function generateClassName(classNameObject, defaultClass = "") {
    let className = defaultClass;
    for (const key in classNameObject) {
        if (classNameObject[key]) {
            className += ` ${key}`;
        }
    }
    return className;
}