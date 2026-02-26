import React, { useState, useEffect } from 'react';

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

// Certificate data
const certificatesData = [
    {
      id: 1,
      title: "MERN Stack Internship Completion Certificate",
      issuer: "Future Intens",
      image: futureIntensCertImg
    },
    {
      id: 2,
      title: "Zidio Development - Internship Completion Certificate",
      issuer: "Zidio Development",
      image: zidioCertImg
    },
    {
      id: 3,
      title: "Internship Completion Certificate",
      issuer: "Cognifyz Technologies",
      image: cognifyzCertImg
    },
    {
      id: 4,
      title: "Graphics Designer",
      issuer: "InAmigos Foundation (IAF)",
      image: inamigosCertImg
    },
    {
      id: 5,
      title: "AI Summit",
      issuer: "AISashkt",
      image: aisashktCertImg   
    },
    {
      id: 6,
      title: "Pawzz Internship Completion Certificate",
      issuer: "Pawzz",
      image: pawzzCertImg
    },
    {
      id: 7,
      title: "Pawzz Internship Letter of Recommendation",
      issuer: "Pawzz",
      image: pawzzLetterImg
    },
    {
      id: 8,
      title: "SIH Internal Certificate",
      issuer: "Smart India Hackathon",
      image: sihCertImg
    },
    {
      id: 9,
      title: "Emerging AI Trends in Ethical Hacking Certificate",
      issuer: "Internshala",
      image: emergingCertImg
    },
    {
      id: 10,
      title: "Participation Certificate - ICAT",
      issuer: "ICAT",
      image: participationCertImg
    },
    {
      id: 11,
      title: "Codtech Internship Completion Certificate",
      issuer: "Codtech Solutions",
      image: codtechCertImg
    },
    {
      id: 12,
      title: "Coding Club Certificate of Appreciation",
      issuer: "Coding Club, IIT Indore",
      image: codingclubCertImg
    },
    {
      id: 13,
      title: "Tata Crucible Certificate of Appreciation",
      issuer: "Tata Crucible, IIT Indore",
      image: tataCertImg
    },
    {
      id: 14,
      title: "Skybrisk Internship Completion Certificate",
      issuer: "Skybrisk Technologies", 
      image: skybriskCertImg
    },
    {
      id: 15, 
      title: "Getting Started with Cybersecurity - IBM", 
      issuer: "IBM SkillsBuild", 
      image: ibmCertImg
    }
];

const Certifications = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCert, setSelectedCert] = useState(null);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % certificatesData.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + certificatesData.length) % certificatesData.length);
    };

    const openModal = (cert) => {
        setSelectedCert(cert);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedCert(null);
    };

    // Auto-advance slides
    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="certifications">
            <div className="section-title">
                <h2>Certifications</h2>
            </div>

            {/* Certificate Slider */}
            <div className="cert-slider-container">
                <button className="cert-nav-btn cert-prev" onClick={prevSlide}>
                    &#10094;
                </button>
                
                <div className="cert-slides-wrapper">
                    {certificatesData.map((cert, index) => {
                        // Show 3 certificates at a time
                        const isActive = index === currentIndex || 
                                        index === (currentIndex + 1) % certificatesData.length ||
                                        index === (currentIndex - 1 + certificatesData.length) % certificatesData.length;
                        
                        if (!isActive) return null;

                        const isCenter = index === currentIndex;
                        
                        return (
                            <div 
                                key={cert.id} 
                                className={`cert-slide ${isCenter ? 'active' : ''}`}
                                onClick={() => openModal(cert)}
                            >
                                <div className="cert-card">
                                    <img 
                                        src={cert.image} 
                                        alt={cert.title}
                                        className="cert-image"
                                    />
                                    <div className="cert-overlay">
                                        <span>View Certificate</span>
                                    </div>
                                </div>
                                <div className="cert-info">
                                    <h4>{cert.title}</h4>
                                    <h5>{cert.issuer}</h5>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <button className="cert-nav-btn cert-next" onClick={nextSlide}>
                    &#10095;
                </button>
            </div>

            {/* Dots Indicator */}
            <div className="cert-dots">
                {certificatesData.map((_, index) => (
                    <span 
                        key={index} 
                        className={`cert-dot ${index === currentIndex ? 'active' : ''}`}
                        onClick={() => setCurrentIndex(index)}
                    />
                ))}
            </div>

            {/* Modal */}
            {isModalOpen && selectedCert && (
                <div className="cert-modal" onClick={closeModal}>
                    <div className="cert-modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="cert-modal-close" onClick={closeModal}>&times;</button>
                        <img 
                            src={selectedCert.image} 
                            alt={selectedCert.title}
                            className="cert-modal-image"
                        />
                        <div className="cert-modal-info">
                            <h3>{selectedCert.title}</h3>
                            <p>Issued by: {selectedCert.issuer}</p>
                            <a 
                                href={selectedCert.image} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="cert-modal-btn"
                            >
                                Open Full Image
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Certifications;
