import React, { useState } from 'react';

// Dummy data - replace this with your actual certificate data
const certificatesData = [
    { id: 1, thumb: 'https://via.placeholder.com/300x450/ff69b4/000000?text=Cert+1', title: 'Advanced React', issuer: 'React University', fullImage: 'https://via.placeholder.com/600x900/ff69b4/000000?text=Cert+1' },
    { id: 2, thumb: 'https://via.placeholder.com/300x450/4a9fff/000000?text=Cert+2', title: 'JavaScript Expert', issuer: 'JS Academy', fullImage: 'https://via.placeholder.com/600x900/4a9fff/000000?text=Cert+2' },
    { id: 3, thumb: 'https://via.placeholder.com/300x450/9d4dff/000000?text=Cert+3', title: 'Modern CSS', issuer: 'Design School', fullImage: 'https://via.placeholder.com/600x900/9d4dff/000000?text=Cert+3' },
    { id: 4, thumb: 'https://via.placeholder.com/300x450/3b82f6/ffffff?text=Cert+4', title: 'Node.js Backend', issuer: 'Server-side Bootcamp', fullImage: 'https://via.placeholder.com/600x900/3b82f6/ffffff?text=Cert+4' },
    { id: 5, thumb: 'https://via.placeholder.com/300x450/a78bfa/ffffff?text=Cert+5', title: 'Data Structures', issuer: 'CS Institute', fullImage: 'https://via.placeholder.com/600x900/a78bfa/ffffff?text=Cert+5' },
];

const Certifications = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCert, setSelectedCert] = useState(null);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % certificatesData.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + certificatesData.length) % certificatesData.length);
    };

    const openModal = (cert) => {
        setSelectedCert(cert);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedCert(null);
    };

    return (
        <section className="certifications">
            <div className="section-title">
                <h2>Certifications</h2>
            </div>

            <div className="cert-slider">
                <div className="cert-slider-track" style={{ '--current-index': currentIndex }}>
                    {certificatesData.map((cert, index) => (
                        <div
                            className={`cert-slide ${index === currentIndex ? 'active' : ''}`}
                            key={cert.id}
                            onClick={() => index === currentIndex && openModal(cert)}
                        >
                            <div className="cert-card">
                                <img src={cert.thumb} alt={cert.title} className="cert-thumb" />
                                <h4>{cert.title}</h4>
                                <h5>{cert.issuer}</h5>
                            </div>
                        </div>
                    ))}
                </div>

                <button onClick={handlePrev} className="slider-btn prev-btn">‹</button>
                <button onClick={handleNext} className="slider-btn next-btn">›</button>
            </div>

            {isModalOpen && selectedCert && (
                <div className="cert-modal" onClick={closeModal}>
                    <div className="cert-modal-content" onClick={(e) => e.stopPropagation()}>
                        <img src={selectedCert.fullImage || selectedCert.thumb} alt={selectedCert.title} className="cert-preview" />
                        <div className="cert-details">
                            <h3>{selectedCert.title}</h3>
                            <h5>Issued by: {selectedCert.issuer}</h5>
                            <a href={selectedCert.fullImage} className="view-btn" target="_blank" rel="noopener noreferrer">View Certificate</a>
                            <button onClick={closeModal} className="close-modal-btn">Close</button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Certifications;