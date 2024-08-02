import React, { useState } from 'react';
import Colorful from '@uiw/react-color-colorful';
import { hsvaToHex } from '@uiw/color-convert';

export default function Demo() {
const [hsva, setHsva] = useState({ h: 0, s: 0, v: 68, a: 1 });
return (
    <>
    <Colorful
        color={hsva}
        onChange={(color) => {
        setHsva(color.hsva);
        }}
    />
    <div style={{ background: hsvaToHex(hsva), marginTop: 30, padding: 10 }}>
        {JSON.stringify(hsva)}
    </div>
    </>
);
}