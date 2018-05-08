declare type SVGComponent = React.SFC<React.HTMLAttributes<SVGElement>>;

declare module '*.svg' {
    const svg: SVGComponent;
    export default svg;
}
