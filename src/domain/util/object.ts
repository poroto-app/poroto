export function copyObject<T>(object: T): T {
    if (!object) return object;
    return JSON.parse(JSON.stringify(object));
}
