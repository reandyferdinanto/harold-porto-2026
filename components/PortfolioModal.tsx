'use client';

import Image from 'next/image';

interface PortfolioItem {
  id: string;
  category: string;
  title: string;
  image: string;
  description: string;
  link?: string;
}

interface PortfolioModalProps {
  item: PortfolioItem;
  onClose: () => void;
}

export default function PortfolioModal({ item, onClose }: PortfolioModalProps) {
  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/70 z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-gray-100 hover:bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center z-10 font-bold text-xl"
          >
            ×
          </button>

          {/* Content */}
          <div className="relative w-full bg-gray-200" style={{aspectRatio: '16/10'}}>
            <Image
              src={item.image}
              alt={item.title}
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>

          <div className="p-8">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">{item.title}</h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              {item.description}
            </p>

            {item.link && (
              <div className="mt-6">
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition"
                >
                  View Full Project
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

