import { useContext, Component } from "react";

const components = require.context(
    "../drawers",
    false,
    /.tsx$/
);

const Drawers : any = [];

components.keys().forEach((fileName: string) => {
    const config = components(fileName);
    const name = fileName.replace(/^\.\//, '').replace(/\.\w+$/, '').replace(/tsx/, '');
    const Drawer = config.default

    Drawers.push({
        file: name,
        tag: Drawer,
    });

});

export default Drawers;