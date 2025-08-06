// src/components/sections/Contact/ContactForm.jsx
import React, { useState, useRef } from 'react';
import { Send } from 'lucide-react';
import Button from '../../common/Button/Button';
import emailjs from '@emailjs/browser';
import toast, { Toaster } from 'react-hot-toast';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formRef = useRef();

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    setIsSubmitting(true);

    try {
      await emailjs.sendForm(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        formRef.current,
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      );

      // Reset form on success
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Show success toast - sticky
      toast.success('✅ Message sent successfully! I\'ll get back to you soon.', {
        id: 'contact-success', // Prevents duplicate toasts
        style: {
          background: '#10B981',
          color: '#fff',
          fontWeight: '500',
        },
        iconTheme: {
          primary: '#fff',
          secondary: '#10B981',
        },
      });

    } catch (error) {
      console.error('Error sending email:', error);
      
      // Show error toast - sticky
      toast.error('❌ Failed to send message. Please try again or contact me directly.', {
        id: 'contact-error', // Prevents duplicate toasts
        style: {
          background: '#EF4444',
          color: '#fff',
          fontWeight: '500',
        },
        iconTheme: {
          primary: '#fff',
          secondary: '#EF4444',
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = (fieldName) => `
    w-full px-4 py-3 rounded-lg border transition-all duration-200 
    ${errors[fieldName] 
      ? 'border-red-500 bg-red-50 dark:bg-red-900/10 focus:ring-red-200' 
      : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-blue-200'}
    text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400
    focus:ring-2 focus:border-transparent outline-none
  `;

  return (
    <div>
      {/* Toaster for notifications - Always visible, sticky bottom right */}
      <Toaster 
        position="bottom-right" 
        reverseOrder={false}
        gutter={8}
        containerStyle={{
          bottom: 20,
          right: 20,
          position: 'fixed',
          zIndex: 9999,
        }}
        toastOptions={{
          duration: Infinity, // Makes toasts sticky (never auto-dismiss)
          style: {
            borderRadius: '12px',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            fontSize: '14px',
            maxWidth: '400px',
            minWidth: '300px',
            padding: '16px',
          },
          success: {
            style: {
              background: '#F0FDF4',
              color: '#15803D',
              border: '1px solid #BBF7D0',
            },
          },
          error: {
            style: {
              background: '#FEF2F2',
              color: '#DC2626',
              border: '1px solid #FECACA',
            },
          },
        }}
      />

      <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={inputClasses('name')}
            placeholder="Enter your full name"
            required
          />
          {errors.name && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={inputClasses('email')}
            placeholder="Enter your email address"
            required
          />
          {errors.email && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Subject *
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className={inputClasses('subject')}
            placeholder="What's this about?"
            required
          />
          {errors.subject && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.subject}</p>}
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            className={inputClasses('message')}
            placeholder="Tell me about your project or inquiry..."
            required
          />
          {errors.message && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.message}</p>}
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            {formData.message.length}/500 characters
          </p>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Sending...</span>
            </div>
          ) : (
            <div className="flex items-center justify-center space-x-2">
              <Send size={20} />
              <span>Send Message</span>
            </div>
          )}
        </Button>

        <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
          By submitting this form, you agree to our privacy policy. 
          Your information will never be shared with third parties.
        </p>
      </form>
    </div>
  );
};

export default ContactForm;