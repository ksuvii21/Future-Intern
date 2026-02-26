import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useSwipeable } from 'react-swipeable';

// Import assets
import futureIntensCertImg from '../assets/Future_Intens_Internship_Certificate.jpg';
import zidioCertImg from '../assets/Zidio_Development_Internship_Certificate.jpg';
import cognifyzCertImg from '../assets/Cognifyz_Technologies_Internship_Certificate.jpg';
import inamigosCertImg from '../assets/Certificate_InAmigos.png';
import aisashktCertImg from '../assets/AI_sashakt_certificate.png';
import pawzzCertImg from '../assets/Pawzz_Internship_Certificate.jpg';
import pawzzLetterImg from '../assets/Pawzz_Internship_Letter.jpg';
import sihCertImg from '../assets/Certificate_SIH_Internal.jpg';
import emergingCertImg from '../assets/Emerging_AI_Trends_in_Ethical_Hacking_Certificate.jpg';
import participationCertImg from '../assets/Participation Certificate_ICAT.jpg';
import codtechCertImg from '../assets/Codtech_Internship_Certificate.jpg';
import codingclubCertImg from '../assets/CodingClub_Certificate.png';
import tataCertImg from '../assets/Tata_Crucible_Certificate.png';
import skybriskCertImg from '../assets/Skybrisk_Internship_Certificate.png';
import ibmCertImg from '../assets/Getting_started_with_cybersecurity_IBM_Certificate.png';

const PADDING = 5; // Number of items to clone on each side for a seamless loop
const AUTO_SCROLL_INTERVAL = 3000;

// Real certificate data
const certificatesData = [
    {
      id: 1,
      title: "MERN Stack Internship Completion Certificate",
      issuer: "Future Intens",
      thumb: futureIntensCertImg,
      fullImage: futureIntensCertImg
    },
    {
      id: 2,
      title: "Zidio Development - Internship Completion Certificate",
      issuer: "Zidio Development",
      thumb: zidioCertImg,
      fullImage: zidioCertImg
    },
    {
      id: 3,
      title: "Internship Completion Certificate",
      issuer: "Cognifyz Technologies",
      thumb: cognifyzCertImg,
      fullImage: cognifyzCertImg
    },
    {
      id: 4,
      title: "Graphics Designer",
      issuer: "InAmigos Foundation (IAF)",
      thumb: inamigosCertImg,
      fullImage: inamigosCertImg
    },
    {
     id: 5,
     title: "AI Summit",
     issuer: "AISashkt",
     thumb: aisashktCertImg,
     fullImage: aisashktCertImg   
    },
    {
     id: 6,
     title: "Pawzz Internship Completion Certificate",
     issuer: "Pawzz",
     thumb: pawzzCertImg,
     fullImage: pawzzCertImg
    },
    {
     id: 7,
     title: "Pawzz Internship Letter of Recommendation",
     issuer: "Pawzz",
     thumb: pawzzLetterImg,
     fullImage: pawzzLetterImg
    },
    {
     id: 8,
     title: "SIH Internal Certificate",
     issuer: "Smart India Hackathon",
     thumb: sihCertImg,
     fullImage: sihCertImg
    },
    {
     id: 9,
     title: "Emerging AI Trends in Ethical Hacking Certificate",
     issuer: "Internshala",
     thumb: emergingCertImg,
     fullImage: emergingCertImg
    },
    {
      id: 10,
      title: "Participation Certificate - ICAT",
      issuer: "ICAT",
      thumb: participationCertImg,
      fullImage: participationCertImg
    },
    {
      id: 11,
      title: "Codtech Internship Completion Certificate",
      issuer: "Codtech Solutions",
      thumb: codtechCertImg,
      fullImage: codtechCertImg
    },
    {
      id: 12,
      title:"Coding Club Certificate of Appreciation",
      issuer:"Coding Club, IIT Indore",
      thumb:codingclubCertImg,
      fullImage:codingclubCertImg
    },
    {
      id : 13,
      title:"Tata Crucible Certificate of Appreciation",
      issuer:"Tata Crucible, IIT Indore",
      thumb:tataCertImg,
      fullImage:tataCertImg
    },
    {
        id : 14,
        title:"Skybrisk Internship Completion Certificate", 
        issuer:"Skybrisk Technologies", 
        thumb : skybriskCertImg, 
        fullImage : skybriskCertImg
    },
    {
        id : 15, 
        title:"Getting Started with Cybersecurity - IBM", 
        issuer:"IBM SkillsBuild", 
        thumb : ibmCertImg, 
        fullImage : ibmCertImg
    }
];

const Certifications = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCert, setSelectedCert] = useState(null);
    const [isPaused, setIsPaused] = useState(false);

    // --- Infinite Loop Logic ---
    const paddedData = useMemo(() => {
        if (certificatesData.length === 0) return [];
        const actualPadding = Math.min(certificatesData.length, PADDING);
        if (certificatesData.length <= actualPadding) {
            return [...certificatesData, ...certificatesData, ...certificatesData];
        }
        const start = certificatesData.slice(0, actualPadding);
        const end = certificatesData.slice(-actualPadding);
        return [...end, ...certificatesData, ...start];
    }, []);

    const initialIndex = useMemo(() => {
        if (certificatesData.length === 0) return 0;
        return certificatesData.length <= PADDING ? certificatesData.length : PADDING;
    }, []);

    const [trackIndex, setTrackIndex] = useState(initialIndex);
    const [isTransitioning, setIsTransitioning] = useState(true);

    const handleNext = useCallback(() => {
        if (!isTransitioning) return;
        setTrackIndex(prev => prev + 1);
    }, [isTransitioning]);

    const handlePrev = useCallback(() => {
        if (!isTransitioning) return;
        setTrackIndex(prev => prev - 1);
    }, [isTransitioning]);

    const onTransitionEnd = useCallback(() => {
        if (trackIndex < initialIndex) {
            setIsTransitioning(false);
            setTrackIndex(initialIndex + certificatesData.length - 1);
        }
        if (trackIndex >= initialIndex + certificatesData.length) {
            setIsTransitioning(false);
            setTrackIndex(initialIndex);
        }
    }, [trackIndex, initialIndex]);

    useEffect(() => {
        if (!isTransitioning) {
            const timer = setTimeout(() => setIsTransitioning(true), 50);
            return () => clearTimeout(timer);
        }
    }, [isTransitioning]);
    // --- End Infinite Loop Logic ---

    const openModal = useCallback((cert) => {
        setSelectedCert(cert);
        setIsModalOpen(true);
    }, []);

    const closeModal = useCallback(() => {
        setIsModalOpen(false);
        setSelectedCert(null);
    }, []);

    // Auto-Scroll with Pause on Hover
    useEffect(() => {
        if (isPaused || isModalOpen || !isTransitioning) return;
        const interval = setInterval(handleNext, AUTO_SCROLL_INTERVAL);
        return () => clearInterval(interval);
    }, [handleNext, isPaused, isModalOpen, isTransitioning]);

    // Keyboard Navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (isModalOpen) {
                if (e.key === 'Escape') closeModal();
            } else {
                if (e.key === "ArrowRight") handleNext();
                if (e.key === "ArrowLeft") handlePrev();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleNext, handlePrev, isModalOpen, closeModal]);

    // Swipe Support
    const handlers = useSwipeable({
        onSwipedLeft: handleNext,
        onSwipedRight: handlePrev,
        preventScrollOnSwipe: true,
        trackMouse: true,
    });

    return (
        <section className="certifications">
            <div className="section-title">
                <h2>Certifications</h2>
            </div>

            <div
                className="cert-slider"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                {...handlers}
            >
                <div
                    className="cert-slider-track"
                    onTransitionEnd={onTransitionEnd}
                    style={{
                        '--current-index': trackIndex,
                        transition: isTransitioning ? 'transform 0.5s ease' : 'none',
                    }}
                >
                    {paddedData.map((cert, index) => {
                        const isActive = index === trackIndex;
                        return (
                            <div
                                className={`cert-slide ${isActive ? 'active' : ''}`}
                                key={`${cert.id}-${index}`}
                                onClick={() => isActive && openModal(cert)}
                            >
                                <div className="cert-card">
                                    <img
                                        src={cert.thumb}
                                        alt={cert.title}
                                        className="cert-thumb"
                                        loading="lazy"
                                    />
                                    <div className="cert-info">
                                        <h4>{cert.title}</h4>
                                        <h5>{cert.issuer}</h5>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Navigation Buttons */}
                <button onClick={handlePrev} className="slider-btn prev-btn" aria-label="Previous" disabled={!isTransitioning}>‹</button>
                <button onClick={handleNext} className="slider-btn next-btn" aria-label="Next" disabled={!isTransitioning}>›</button>
            </div>

            {/* Counter Indicator */}
            <div className="cert-counter">
                {((trackIndex - initialIndex + certificatesData.length) % certificatesData.length) + 1} / {certificatesData.length}
            </div>

            {/* Premium Modal */}
            {isModalOpen && selectedCert && (
                <div className="cert-modal" onClick={closeModal}>
                    <div className="cert-modal-content" onClick={(e) => e.stopPropagation()}>
                        <img
                            src={selectedCert.fullImage || selectedCert.thumb}
                            alt={selectedCert.title}
                            className="cert-preview"
                        />
                        <div className="cert-details">
                            <h3>{selectedCert.title}</h3>
                            <h5>Issued by: {selectedCert.issuer}</h5>
                            <a href={selectedCert.fullImage} className="view-btn" target="_blank" rel="noopener noreferrer">
                                View Certificate
                            </a>
                            <button onClick={closeModal} className="close-modal-btn">Close</button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Certifications;