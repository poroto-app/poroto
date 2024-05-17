export function hasValue<TValue>(
    value: TValue | null | undefined
): value is TValue {
    return value !== null && value !== undefined;
}

// 条件がtrueのときだけ、値を返す
export function when<TValue>(
    condition: boolean,
    value: TValue
): TValue | undefined {
    return condition ? value : undefined;
}
