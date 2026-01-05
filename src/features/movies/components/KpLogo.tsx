const KpLogo = () => (
    <svg width="200" height="80" viewBox="0 0 600 150" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="5" y="5" width="590" height="140" rx="20" stroke="url(#screen_gradient)"strokeWidth="8" />

        <g fill="#FFFFFF">
            <path d="M80 110V40H100V80L130 40H155L118 86L158 110H132L100 90V110H80Z" />
            <path d="M165 40H187L202 85L217 40H238L212 110H191L217 40L165 40Z" />
            <path d="M245 40H265V110H245V40Z" />

            <path d="M320 110V40H355C375 40 385 50 385 70C385 90 375 100 355 100H340V110H320ZM340 60V80H355C362 80 365 77 365 70C365 63 362 60 355 60H340Z" />
            <circle cx="420" cy="75" r="22" fill="#FF3366" />
            <path d="M424 68L430 75L424 82V68Z" fill="white" /> <path d="M460 110V40H480V70C485 50 500 50 510 70V110H490V75C488 65 482 65 480 75V110H460Z" />
        </g>

        <defs>
            <linearGradient id="screen_gradient" x1="0" y1="0" x2="600" y2="150" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FF3366" />
                <stop offset="1" stopColor="#7B2CBF" />
            </linearGradient>
        </defs>
    </svg>
);

export default KpLogo;