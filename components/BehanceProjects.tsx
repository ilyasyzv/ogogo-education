import { BehanceProjectIds } from '@/data';
import React, { useState, useRef, useEffect } from 'react';

interface BehanceProjectsProps {}

const BehanceProjects: React.FC<BehanceProjectsProps> = () => {
    const [visibleProjects, setVisibleProjects] = useState<string[]>([]);
    const [itemsToShow, setItemsToShow] = useState(3);
    const loadMoreRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        // Set the initially visible projects
        setVisibleProjects(BehanceProjectIds.slice(0, itemsToShow));
    }, [BehanceProjectIds, itemsToShow]);

    // Intersection Observer for loading more projects
    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setItemsToShow(prev => prev + 3);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 1.0 });

        if (loadMoreRef.current) {
            observer.observe(loadMoreRef.current);
        }

        return () => {
            if (loadMoreRef.current) {
                observer.unobserve(loadMoreRef.current);
            }
        };
    }, [loadMoreRef]);

    return (
        <div className="p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                {visibleProjects.map(id => (
                    <div key={id} className="bg-black rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                        <iframe
                            src={`https://www.behance.net/embed/project/${id}?ilo0=1`}
                            height="316"
                            width="404"
                            allowFullScreen
                            loading="lazy"
                            frameBorder="0"
                            allow="clipboard-write"
                            referrerPolicy="strict-origin-when-cross-origin"
                        ></iframe>
                    </div>
                ))}
            </div>
            {visibleProjects.length < BehanceProjectIds.length && (
                <div ref={loadMoreRef} className="text-center my-4 mt-10">
                    <button 
                        onClick={() => setItemsToShow(prev => prev + 3)}
                        className="py-2 px-4 rounded bg-black hover:bg-white hover:text-black transition-all"
                    >
                        Больше проектов
                    </button>
                </div>
            )}
        </div>
    );
};

export default BehanceProjects;
