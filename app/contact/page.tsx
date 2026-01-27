'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitStatus({
          type: 'success',
          message: data.message || 'Thank you for your message! We will get back to you soon.',
        });
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        setSubmitStatus({
          type: 'error',
          message: data.error || data.details?.[0]?.message || 'Something went wrong. Please try again.',
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Network error. Please check your connection and try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    // 'min-h-screen' and changed top padding to 'pt-40'
    <div className="min-h-screen bg-white pt-40 pb-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
          Contact Us
        </h1>
        <p className="mt-3 text-sm text-slate-600 sm:text-base">
          We would love to hear from you. Reach out for enquiries, visits, or
          admissions.
        </p>

        <div className="mt-8 grid gap-10 md:grid-cols-2">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Status Messages */}
            {submitStatus.type && (
              <div
                className={`rounded-lg p-4 ${
                  submitStatus.type === 'success'
                    ? 'bg-green-50 text-green-800 border border-green-200'
                    : 'bg-red-50 text-red-800 border border-red-200'
                }`}
              >
                {submitStatus.message}
              </div>
            )}

            {/* Honeypot field (hidden from users) */}
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              style={{ position: 'absolute', left: '-9999px' }}
              aria-hidden="true"
            />

            <div>
              <label
                htmlFor="name"
                className="block text-xs font-medium text-slate-700"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                minLength={2}
                maxLength={100}
                disabled={isSubmitting}
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500 disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-medium text-slate-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                maxLength={255}
                disabled={isSubmitting}
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500 disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-xs font-medium text-slate-700"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                minLength={10}
                maxLength={20}
                disabled={isSubmitting}
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500 disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-xs font-medium text-slate-700"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                required
                minLength={10}
                maxLength={2000}
                disabled={isSubmitting}
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500 disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-full bg-violet-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>

          <div className="space-y-6 text-sm text-slate-700">
            <div>
              <p className="font-semibold text-slate-900">School Address</p>
              <p className="mt-1 text-sm text-slate-600">
                Windy Ridge, CP <br />
                Kasoa, Ghana
              </p>
            </div>
            <div>
              <p className="font-semibold text-slate-900">Phone</p>
              <p className="mt-1 text-sm text-slate-600">+233 (0) 54 975 3104 </p>
            </div>
            <div>
              <p className="font-semibold text-slate-900">Email</p>
              <p className="mt-1 text-sm text-slate-600">
                bwehschools@gmail.com
              </p>
            </div>
            <div>
              <p className="font-semibold text-slate-900">Office Hours</p>
              <p className="mt-1 text-sm text-slate-600">
                Monday - Friday: 7:30 AM - 4:00 PM <br />
                Saturday: 9:00 AM - 11:00 PM
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}