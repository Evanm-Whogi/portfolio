'use client';
import { useState, useEffect, useCallback } from "react";
import Card from "@/components/ui/Card"
import Badge from "@/components/ui/Badge"
import Button from "@/components/ui/Button";
import projects from "@/data/projects.json"
import { Icon } from "@iconify/react";
import Image from "next/image";

export default function FeaturedProjects() {
    const [showAll, setShowAll] = useState(false);
    const visibleProjects = showAll ? projects : projects.slice(0, 3);

    const [modalState, setModalState] = useState({
      isOpen: false,
      images: [] as any[],
      index: 0,
    });

    const openModal = useCallback((images: any[], index: number) => setModalState({ isOpen: true, images, index }), []);
    const closeModal = useCallback(() => setModalState(prev => ({ ...prev, isOpen: false })), []);
    const nextImage = useCallback(() => setModalState(prev => ({ ...prev, index: (prev.index + 1) % prev.images.length, })) , []);
    const prevImage = useCallback(() => setModalState(prev => ({ ...prev, index: (prev.index - 1 + prev.images.length) % prev.images.length,})), []);

    // Lock scroll when modal is open
    useEffect(() => {
        document.body.classList.toggle('overflow-hidden', modalState.isOpen);
        return () => document.body.classList.remove('overflow-hidden');
    }, [modalState.isOpen]);

    useEffect(() => {
        if (!modalState.isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight') nextImage();
            if (e.key === 'ArrowLeft') prevImage();
            if (e.key === 'Escape') closeModal();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [modalState.isOpen, nextImage, prevImage, closeModal]);

    return (
        <div className="container mx-auto text-primary mb-12">
            <div className="flex flex-col md:flex-row pb-4 text-left place-content-between items-center">
                <h1 className="text-4xl font-bold text-primary">Featured Projects</h1>
                <a href="https://github.com/WhogiTheRaccoon?tab=repositories" className="text-2xl text-muted hover:text-accent flex items-center">See all projects <Icon icon="formkit:arrowright" className="size-8 pt-1" /></a>
            </div>
            <div className="flex flex-col gap-4">
               { visibleProjects.map((project) => (
                    <Card key={project.name} className={`flex flex-row gap-6 shadow-md`}>
                        <div className="flex flex-col w-full md:w-1/3 space-y-1">
                            <a href={project.link || ''} className={` ${project.link ? 'hover:text-accent' : ''} text-3xl`} target="_blank" rel="noopener noreferrer">{project.name}</a>
                            <span className="text-muted text-sm flex items-center">{project.date}</span>
                            <p className="text-muted">{project.description}</p>
                            <hr className="text-borders my-2"/>
                            <div className="space-x-3">
                                {project.pills.map((pill) => (
                                    <Badge key={pill} className="bg-background border-none text-sm">{pill}</Badge>
                                ))}
                            </div>
                        </div>
                        <div className="hidden md:grid grid-cols-3 gap-2 mx-auto w-2/3">
                            {project.images.map((image, idx) => (
                                <div key={image.src} onClick={() => openModal(project.images, idx)} className="aspect-[4/3] w-full rounded-md overflow-hidden cursor-pointer hover:opacity-90 transition-opacity anim-up">
                                    <Image src={image.src} alt={image.alt} width={1920} height={1080} className="w-full h-full object-cover" />
                                </div>
                            ))}
                        </div>
                    </Card>
                ))}
                <div className="flex flex-row">
                    <Button id="showMore" onClick={() => setShowAll(!showAll)} className="bg-foreground px-2 py-1 text-2xl mx-auto">{showAll ? 'Show Less' : 'Show More'}</Button>
                </div>
            </div>
            

            {/* Image Modal */}
            {modalState.isOpen && (
                <>
                    <button onClick={closeModal} className="fixed top-4 right-4 z-[999] bg-black/40 rounded-full p-2 hover:bg-black/60 transition cursor-pointer"><Icon icon="material-symbols:close" className="text-white size-6 hover:text-accent" /></button>
                    <div className="fixed inset-0 z-50 bg-background/95 flex items-center justify-center" onClick={closeModal}>
                        <div className="relative w-full px-4">
                            <div className="flex items-center justify-between">
                            <button onClick={(e) => { e.stopPropagation(); prevImage(); }} className="text-primary text-4xl px-4 hover:text-accent cursor-pointer"><Icon icon="weui:arrow-outlined" className="rotate-180" /></button>
                            <Image src={modalState.images[modalState.index]?.src} alt={modalState.images[modalState.index]?.alt} width={1920} height={1080} className="max-h-[80vh] mx-auto rounded-lg object-contain" onClick={(e) => e.stopPropagation()}/>
                            <button onClick={(e) => { e.stopPropagation(); nextImage(); }} className="text-primary text-4xl px-4 hover:text-accent cursor-pointer"><Icon icon="weui:arrow-outlined" /></button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}