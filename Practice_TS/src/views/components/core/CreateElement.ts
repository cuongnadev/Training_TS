export function CreateElement <K extends keyof HTMLElementTagNameMap>(
    tagName: K,
    className: string = "",
    children: (Node | string)[] = [],
    option?: ElementCreationOptions
): HTMLElementTagNameMap[K] {
    const element = document.createElement(tagName, option);
    element.className = className;
    element.append(...children);
    return element as HTMLElementTagNameMap[K];
}