import { Icon } from '@iconify/react';

export default function Header() {

    return (
        <div className="container mx-auto flex flex-col text-primary pt-16 pb-8 mb-8 px-4 md:px-0 text-left space-y-2">
            <h1 className="text-6xl font-bold text-left">My name's Evan.</h1>
            <h2 className="text-xl pt-1 text-muted">Software Engineer · Systems Administrator</h2>
            <h2 className="text-lg text-muted max-w-3xl">I'm a second-year computer science student and freelance web developer with a passion for coding and system administration I love building clean, functional web experiences and constantly learning new things along the way.</h2>
            
            {/* Social Media Icons */}
            <div className="flex items-center gap-3 pt-3">
                <a href="https://github.com/Evanm-Whogi" aria-label="GitHub" className="text-muted hover:text-accent transition-colors"><Icon icon="bxl:github" className="size-9" /></a>
                <a href="mailto:evan@etm.sh" aria-label="Email" className="text-muted hover:text-accent transition-colors"><Icon icon="ic:baseline-email" className="size-9" /></a>
                <a href="https://www.linkedin.com/in/evanm-whogi/" aria-label="LinkedIn" className="text-muted hover:text-accent transition-colors"><Icon icon="bxl:linkedin-square" className="size-9" /></a>
            </div>
        </div>
    )
}