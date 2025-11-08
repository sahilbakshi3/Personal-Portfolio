// src/components/Sections/Projects/ProjectModal.jsx
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ExternalLink, Github, X } from 'lucide-react';

const FADE_MS = 250; // keep in sync with classes below

const ProjectModal = ({ project, isOpen, onClose }) => {
  const [isExiting, setIsExiting] = useState(false);
  const mountedRef = useRef(false);

  // Close with animation then notify parent
  const requestClose = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => {
      setIsExiting(false);
      onClose?.();
    }, FADE_MS);
  }, [onClose]);

  // ESC to close
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') requestClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, requestClose]);

  // Mount helper so we can animate on first paint
  useEffect(() => {
    if (isOpen) mountedRef.current = true;
    else mountedRef.current = false;
  }, [isOpen]);

  // Don't render at all when closed and not animating
  if ((!isOpen && !isExiting) || !project) return null;

  // Enter/exit classes
  const backdropBase =
    'fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-250';
  const backdropState = isExiting ? 'opacity-0' : 'opacity-100';

  const shellBase = 'fixed inset-0 z-50 overflow-y-auto';
  const frameBase =
    'flex min-h-full items-center justify-center p-4 transition-opacity duration-250 ' +
    (isExiting ? 'opacity-0' : 'opacity-100');

  const panelBase =
    'relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden transform transition-transform duration-250 ' +
    (isExiting ? 'translate-y-4' : 'translate-y-0');

  return (
    <>
      {/* Backdrop (click outside to close) */}
      <div
        className={`${backdropBase} ${backdropState}`}
        onClick={requestClose}
      />

      {/* Modal */}
      <div className={shellBase} aria-modal="true" role="dialog">
        <div className={frameBase} onClick={requestClose}>
          <div className={panelBase} onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <button
              onClick={requestClose}
              className="absolute top-4 right-4 z-10 p-2 bg-gray-900/80 hover:bg-gray-900 text-white rounded-full transition-all duration-200 hover:scale-110"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            {/* Scrollable Content */}
            <div className="overflow-y-auto max-h-[90vh]">
              {/* Hero Image */}
              <div className="relative h-80 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
                {project.image && (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    draggable={false}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                {/* Title Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <h2 className="text-4xl font-bold text-white mb-2">
                    {project.title}
                  </h2>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                {/* Description */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full" />
                    About This Project
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                    {project.description}
                  </p>
                  {project.longDescription && (
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed mt-4">
                      {project.longDescription}
                    </p>
                  )}
                </div>

                {/* Technologies */}
                {project.tags?.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <div className="w-1 h-6 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full" />
                      Technologies Used
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {project.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 text-blue-700 dark:text-blue-300 rounded-lg font-semibold text-sm border border-blue-200/50 dark:border-blue-800/50 hover:scale-105 transition-transform"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Features */}
                {project.features?.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <div className="w-1 h-6 bg-gradient-to-b from-pink-500 to-red-500 rounded-full" />
                      Key Features
                    </h3>
                    <ul className="space-y-3">
                      {project.features.map((feature, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-gray-700 dark:text-gray-300"
                        >
                          <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <div className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400" />
                          </div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Actions */}
                <div className="flex flex-wrap gap-4">
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 min-w-[200px] flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 text-base font-bold shadow-lg hover:shadow-xl transform hover:scale-[1.02] group"
                    >
                      <ExternalLink
                        size={20}
                        className="group-hover:rotate-45 transition-transform"
                      />
                      <span>View Live Demo</span>
                    </a>
                  )}
                  {project.codeUrl && (
                    <a
                      href={project.codeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 min-w-[200px] flex items-center justify-center gap-3 border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 py-4 px-6 rounded-xl hover:border-purple-500 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/10 transition-all duration-300 text-base font-bold transform hover:scale-[1.02] group"
                    >
                      <Github
                        size={20}
                        className="group-hover:rotate-12 transition-transform"
                      />
                      <span>View Source Code</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectModal;
