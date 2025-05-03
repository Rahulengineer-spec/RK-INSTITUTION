import React, { useState } from 'react';
import Image from 'next/image';
import './CourseCarousel.css';

interface Course {
  id: string;
  title: string;
  description: string;
  image: string;
}

interface CourseCarouselProps {
  courses: Course[];
}

const CourseCarousel: React.FC<CourseCarouselProps> = ({ courses }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const cardCount = courses.length;
  const angle = 360 / cardCount;

  const nextCard = () => setActiveIndex((prev) => (prev + 1) % cardCount);
  const prevCard = () => setActiveIndex((prev) => (prev - 1 + cardCount) % cardCount);

  return (
    <div className="carousel-container">
      <button className="carousel-btn prev" onClick={prevCard}>&lt;</button>
      <div className="carousel-3d">
        {courses.map((course, idx) => {
          const rotateY = angle * (idx - activeIndex);
          return (
            <div
              key={course.id}
              className="carousel-card"
              style={{
                transform: `rotateY(${rotateY}deg) translateZ(300px)`
              }}
            >
              <Image
                src={course.image}
                alt={course.title}
                className="carousel-image"
                width={100}
                height={100}
                priority={idx === activeIndex}
                loading={idx === activeIndex ? 'eager' : 'lazy'}
              />
              <h3>{course.title}</h3>
              <p>{course.description}</p>
            </div>
          );
        })}
      </div>
      <button className="carousel-btn next" onClick={nextCard}>&gt;</button>
    </div>
  );
};

export default CourseCarousel; 