export const checkColor = (color:string) => {
    const pattern = /#([a-f]|[A-F]|[0-9]){3}(([a-f]|[A-F]|[0-9]){3})?\b/;
    return pattern.test(color);
}
