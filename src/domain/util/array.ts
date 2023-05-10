export function createArrayWithSize(size: number): number[] {
    if (size < 0) return [];

    const array = [];
    for (let i = 0; i < size; i++) {
        array.push(i);
    }
    return array;
}