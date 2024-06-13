const Pin = (props: any) => {
    return (
        <>
        <svg className={props.color + "-pin"} width="65" height="46" viewBox="0 0 64 46" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d_2325_67)">
            <ellipse className="pin-shadow" cx="28" cy="25" rx="21" ry="14" fill="black" fillOpacity="0.1" shapeRendering="crispEdges"/>
            </g>
            <circle className="pin-lighter" cx="36" cy="24" r="21"/>
            <circle className="pin-darker" cx="41" cy="19" r="13" />
            <g filter="url(#filter2_i_2325_67)">
            <circle className="pin" cx="48.5" cy="15.5" r="15.5" />
            </g>
            <g filter="url(#filter3_f_2325_67)">
            <path fillRule="evenodd" clipRule="evenodd" d="M60.5747 14.5784C60.3913 15.3796 59.4856 14.8652 59.4856 14.0433V14.0433C59.4856 10.64 57.2282 7.76395 54.129 6.83088C53.9467 6.776 53.9608 6.51221 54.1511 6.51221V6.51221C57.7905 6.51221 60.7408 9.4625 60.7408 13.1019C60.7408 13.6095 60.6834 14.1037 60.5747 14.5784Z" fill="white"/>
            </g>
            <g filter="url(#filter4_f_2325_67)">
            <path fillRule="evenodd" clipRule="evenodd" d="M19.0953 26.1069C19.1037 26.0117 18.9734 25.978 18.9452 26.0693V26.0693C17.873 29.5472 19.8231 33.2357 23.3009 34.308C23.6624 34.4194 24.0261 34.4982 24.3889 34.546C24.7823 34.5979 24.7656 34.0859 24.3864 33.969V33.969C20.9269 32.9024 18.7886 29.5732 19.0953 26.1069Z" fill="white"/>
            </g>
            <defs>
            <filter id="filter0_d_2325_67" x="0" y="4" width="56" height="42" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feMorphology radius="2" operator="dilate" in="SourceAlpha" result="effect1_dropShadow_2325_67"/>
            <feOffset/>
            <feGaussianBlur stdDeviation="2.5"/>
            <feComposite in2="hardAlpha" operator="out"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2325_67"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2325_67" result="shape"/>
            </filter>
            <filter id="filter1_df_2325_67" x="20.6" y="4" width="35.4" height="35.4" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset dx="-4" dy="4"/>
            <feGaussianBlur stdDeviation="1.7"/>
            <feComposite in2="hardAlpha" operator="out"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0.807843 0 0 0 0 0.0431373 0 0 0 0 0.180392 0 0 0 0.75 0"/>
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2325_67"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2325_67" result="shape"/>
            <feGaussianBlur stdDeviation="1" result="effect2_foregroundBlur_2325_67"/>
            </filter>
            <filter id="filter2_i_2325_67" x="32.1" y="0" width="31.9" height="31.9" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feMorphology radius="2" operator="dilate" in="SourceAlpha" result="effect1_innerShadow_2325_67"/>
            <feOffset dx="-5" dy="4"/>
            <feGaussianBlur stdDeviation="1.45"/>
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0"/>
            <feBlend mode="normal" in2="shape" result="effect1_innerShadow_2325_67"/>
            </filter>
            <filter id="filter3_f_2325_67" x="52" y="4.51221" width="10.7412" height="12.4672" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
            <feGaussianBlur stdDeviation="1" result="effect1_foregroundBlur_2325_67"/>
            </filter>
            <filter id="filter4_f_2325_67" x="16.6514" y="24.0157" width="10.0264" height="12.5339" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
            <feGaussianBlur stdDeviation="1" result="effect1_foregroundBlur_2325_67"/>
            </filter>
            </defs>
        </svg>
        </>
    );
}

export default Pin;